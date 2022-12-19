// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import required interfaces
import "../Interface/IERC20.sol";
import "../Interface/IERC721.sol";
import "../Interface/IMintingFactory.sol";
import "../../Registry/IAdminRegistry.sol";

contract ExchangeCore is Ownable, Pausable {
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;
    IERC20 internal WETH;

    address public treasury;
    address public exchange;
    address public adminRegistry;

    uint256 auctionTimeLimit = 28800;
    uint256 public constant tradingFeeFactorMax = 10000; // 100%
    uint256 public tradingFeeFactor = 400; // 4%

    constructor(IMintingFactory _mintingFactory, address _adminRegistry, address _treasury) {
        mintingFactory = IMintingFactory(_mintingFactory);
        adminRegistry = _adminRegistry;
        treasury = _treasury;
    }

    // One who bids for an nft, can cancel it anytime before auction ends

    mapping(address => mapping(address => mapping(uint256 => bool)))
        public cancelledOrders;

    event FixedPricePrimarySale(
        address _nftCollection, 
        uint256 tokenId,
        uint256 _nftPrice,  
        address _buyer, 
        address _buyerToken
    );

    event SignatureVerified(
        address signer
    );

    event AuctionPrimarySaleExecuted(
        address nftCollection,
        uint256 _nftPrice,
        uint256 tokenId,
        address _buyer,
        address _buyerToken
    );

    event OrderCancelled(address nftContract, uint256 tokenId, address buyer);

    modifier onlyExchange() {
        require(
            exchange == msg.sender,
            "Only Exchange can call this!"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }


    //@ Make validateSeller and validateBuyer as modifier later.

    function validateSeller(
        address _nftCollection,
        uint256 _tokenId,
        address _seller
    ) internal view returns (bool) {
        // check if he owns the token
        address tokenOwner = IERC721(_nftCollection).ownerOf(_tokenId);
        require(_seller == tokenOwner, "Seller does not owns the token");

        // check token approval
        address tokenApprovedAddress = IERC721(_nftCollection).getApproved(
            _tokenId
        );
        require(
            tokenApprovedAddress == address(this),
            "Contract is not approved for this NFT"
        );

        return true;
    }


    function validateBuyer(
        address _buyer, 
        uint256 _amount, 
        address _buyerToken
    ) internal view returns (bool)  {

        require(
            IERC20(_buyerToken).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(_buyerToken).balanceOf(_buyer) > _amount,
            "Buyer doesn't have sufficient funds"
        );
        return true;
    }


//2 fns: PrimarySale and SecondarySale
//Primary sale: No tradingfee
//Sec sale: 4% trading fee

    function fixedPricePrimarySale(
        address _nftCollection, 
        uint256 _nftPrice,
        uint256 _tokenId,
        address _buyer,
        address _buyerToken
        ) public onlyAdmin {

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        
        require(validBuyer, "Buyer isn't valid");

        bool isCancelled = cancelledOrders[_buyer][_nftCollection][_tokenId];

        require(!isCancelled , "Order has been cancelled");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");


        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
        mintAndTransfer(_nftCollection, _tokenId);

        emit FixedPricePrimarySale(_nftCollection, _tokenId, _nftPrice,  _buyer, _buyerToken);

    }


    function mintAndTransfer(
        address _nftCollection,
        uint256 _tokenId
    ) internal {
        // bool success;
        // uint256 _tokenId;
        
         (bool success) = IMintingFactory(mintingFactory).mintNFT(_nftCollection, _tokenId);
        
        if(success){
            IERC721(_nftCollection).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }
        
    }

/*
    function putOnAuction(
        address _nftCollection,
        uint256 _tokenId
    ) public view returns (address, uint256, uint256)  {
        // check if sender owns this nft
        address nftOwner = IERC721(_nftCollection).ownerOf(_tokenId);
        require(
            msg.sender == nftOwner,
            "Message sender is not the owner of NFT"
        );
        // then approve this nft to the contract
        // then, add auctionTimeLimit to blocktime and that is auctionEndTime
        uint256 auctionEndTime = block.timestamp + auctionTimeLimit;
        return (_nftCollection, _tokenId, auctionEndTime);
    }
*/


/* 
    v , r , s are the values for the transaction's signature.
    They can be used as in Get public key of any ethereum account. 
    A little more information, r and s are outputs of an ECDSA signature, 
    and v is the recovery id
*/

    function splitSignature(bytes memory _signature)
        internal pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(_signature.length == 65, "invalid signature length");

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(_signature, 32))
            // second 32 bytes
            s := mload(add(_signature, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(_signature, 96)))
        }

        return (r,s,v);
    }

    function verifySignature(
        bytes32 _hashedMessage,
        bytes memory _signature,
        address _buyer
    ) internal returns (bool) {
        
        // Adding prefix to hashed message
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));

        //calling splitSignature function
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        address signer = ecrecover(prefixedHashMessage, v, r, s);

        require(signer == _buyer, "Signer doesn't match the buyer");

        emit SignatureVerified(signer);

        return (true);
    }


    function auctionPrimarySale(
        address _nftCollection,
        uint256 _nftPrice,
        uint256 _tokenId,
        address _buyer,
        address _buyerToken,
        bytes32 _hashedMessage,
        bytes memory _signature
    ) public onlyAdmin whenNotPaused {

        // Validating the signature of buyer
        bool validSignature = verifySignature(_hashedMessage, _signature, _buyer);
        require(validSignature, "Signature mismatched with buyer's");

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        require(validBuyer, "Buyer isn't valid");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);

        // transferring the NFT to the buyer
        IERC721(_nftCollection).transferFrom(address(mintingFactory), _buyer, _tokenId);
        // updating the NFT ownership in our Minting Factory
        mintingFactory.updateOwner(
            _nftCollection,
            _tokenId,
            _buyer
        );

        emit AuctionPrimarySaleExecuted(_nftCollection, _nftPrice ,_tokenId, _buyer, _buyerToken);
    }


 /*   
    function auctionSecondarySale(
        address _nftCollection,
        uint256 _tokenId,
        uint256 _nftPrice,
        address _exchange,
        address _buyer,
        address _buyerToken

    ) public onlyAdmin whenNotPaused {

        // Validating the signature of buyer
        // bool validSignature = VerifySignature(_hashedMessage, _v, _r, _s, _buyer);
        // require(validSignature, "Signature mismatched with buyer's");


        // Validating all the requirements
        // bool validTime;
        // if (_auctionEndTime != 0) {
        //     validTime = validateAuctionTime(_auctionEndTime);
        // } else {
        //     validTime = true;
        // }

        bool validSeller = validateSeller(_nftCollection, _tokenId, _exchange);
        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);

        // bool isCancel = cancelledOrders[_buyer][_nftCollection][_tokenId];

        // require(validTime, "Auction is already over");
        require(validSeller, "Seller isn't valid");
        require(validBuyer, "Buyer isn't valid");
        // require(isCancel == false, "Order is cancelled");

        _nftPrice *= 1e18;

        // transfer tradingFee to the exchange 4%
        //ERC20
        uint256 fee = _nftPrice.mul(tradingFeeFactor).div(tradingFeeFactorMax);
        IERC20(_buyerToken).transferFrom(_buyer, address(this), fee);


        // transferring the amount to the seller
        uint256 transferableAmt = _nftPrice-fee;

        // uint256 transferableAmt = _nftPrice
        //     .mul(tradingFeeFactorMax.sub(tradingFeeFactor))
        //     .div(tradingFeeFactorMax);
        // IERC20(_buyerToken).transferFrom(_buyer, _exchange, transferableAmt);
        IERC20(_buyerToken).transferFrom(_buyer, treasury, transferableAmt);

        // transferring the NFT to the buyer
        IERC721(_nftCollection).transferFrom(_exchange, _buyer, _tokenId);
        // updating the NFT ownership in our Minting Factory
        IMintingFactory(mintingFactory).updateOwner(
            _nftCollection,
            _tokenId,
            _buyer
        );

        emit AuctionPrimarySaleExecuted(_nftCollection, _nftPrice, _tokenId, _buyer, _buyerToken);
    }

*/
    

    function validateAuctionTime(uint256 _auctionEndTime)
        internal
        view
        returns (bool)
    {
        require(_auctionEndTime > block.timestamp, "Auction has ended");
        return true;
    }


    function setTradingFeeFactor(uint256 _tradingFeeFactor) public onlyAdmin {
        require(_tradingFeeFactor != 0, "Fee cannot be zero");
        tradingFeeFactor = _tradingFeeFactor;
    }

    function getTradingFeeFactor() public view returns (uint256) {
        return tradingFeeFactor;
    }


    function cancelOrder(
        address _nftCollection,
        uint256 _tokenId,
        address _buyer,
        address _exchange,
        uint256 _amount,
        address _buyerToken
    ) public {
        // approvals to be checked
        bool validSeller = validateSeller(_nftCollection, _tokenId, _exchange);
        bool validBuyer = validateBuyer(_buyer, _amount, _buyerToken);
        // decrease approval in web3 scripts
        // add this cancelled Order in the mapping
        if (validSeller && validBuyer) {
            cancelledOrders[_buyer][_nftCollection][_tokenId] = true;
            emit OrderCancelled(_nftCollection, _tokenId, _buyer);
        }
    }


    function isOrderCancelled(
        address _nftCollection,
        uint256 _tokenId,
        address _buyer
    ) public view returns (bool) {
        return cancelledOrders[_buyer][_nftCollection][_tokenId];
    }




// function=> placeOrder (nftCollection, tokenId)
//   primary market - nft's listing price -. min price bid, auction time in web2
//      approve weth amt to exchange contract
// function=> putOnAuction (nftCollection, tokenId)
//      approve nft to exchange contract
// function executeOrder(nftCollection, tokenId, buyer, amt)
//      transfer bid amt to seller
//      transfer nft to buyer
//      who will pay Gas Fee ??    ***
//      update nft owner in Minting Factory
//      Takes Marketplace fee  (First time : Auction fee)

// place Order => sell order / buy order (nftCollection, tokenId)
// =>
// approve (amt to Exchange)  // require => min amt limit  => auctionTime
//
// validation => signature, buyer address, auctionTime
// => calls execute order(signature) internal fn
//      => update owner of NFT in Minting Factory (Interface)
//      => Royalties distribution
}