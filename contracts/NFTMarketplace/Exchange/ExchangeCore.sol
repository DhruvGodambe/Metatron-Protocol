// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// import required interfaces
import "../Interface/IERC721.sol";
import "../Interface/IERC20.sol";
import "../Interface/IMintingFactory.sol";
import "../../Registry/IAdminRegistry.sol";

contract ExchangeCore is Ownable, Pausable {
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;

    address public treasury;
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
        uint256 _tokenId,
        string _tokenURL,
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
        string memory _nftId,
        address _buyer,
        address _buyerToken
        ) public onlyAdmin {

         _nftPrice *= 1e18;

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        
        require(validBuyer, "Buyer isn't valid");

        bool isCancelled = cancelledOrders[_buyer][_nftCollection][_tokenId];

        require(!isCancelled , "Order has been cancelled");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");


        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);

        string memory _tokenURL  = mintAndTransfer(_nftCollection, _tokenId, _nftId);

        emit FixedPricePrimarySale(_nftCollection, _tokenId, _tokenURL, _nftPrice,  _buyer, _buyerToken);

    }


    function mintAndTransfer(
        address _nftCollection,
        uint256 _tokenId,
        string memory _nftId
    ) internal returns(string memory) {
        
        
         (bool success, string memory _tokenURL) = IMintingFactory(mintingFactory).mintNFT(_nftCollection, _tokenId, _nftId);
        
        if(success){
            IERC721(_nftCollection).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }

        return _tokenURL;
        
    }


/* 
    v , r , s are the values for the transaction's signature.
    They can be used as in Get public key of any ethereum account. 
    A little more information, r and s are outputs of an ECDSA signature, 
    and v is the recovery id
*/

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) { return "0"; }
        uint j = _i; uint len;
        while (j != 0) { len++; j /= 10; }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) { k = k-1; uint8 temp = (48 + uint8(_i - _i / 10 * 10)); bytes1 b1 = bytes1(temp); bstr[k] = b1; _i /= 10; }
        return string(bstr);
    }

    
    function getMessageHash(
        string memory _message) public pure returns (bytes memory) {
        return abi.encodePacked(_message);
    }


    function getEthSignedMessageHash(bytes memory _messageHash) public pure returns (bytes32)
    {  string memory msgLength = uint2str(_messageHash.length);
        return
            keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", msgLength, _messageHash));
    }
    

    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v)
    {   require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return(r, s, v);
    }

    function verifySignature(
        bytes memory _messageHash,
        bytes memory signature,
        address _buyer
    ) public returns (bool) {
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

        address signer = recoverSigner(ethSignedMessageHash, signature);

        require(signer == _buyer, "Signer doesn't match the buyer");

        emit SignatureVerified(signer);

        return (true);
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }


    function auctionPrimarySale(
        address _nftCollection,
        uint256 _nftPrice,
        uint256 _tokenId,
        string memory _nftId,
        address _buyer,
        address _buyerToken,
        bytes memory _messageHash,
        bytes memory _signature
    ) public onlyAdmin whenNotPaused {

        // Validating the signature of buyer
        // bytes memory _messageHash = getMessageHash(_message);
        bool validSignature = verifySignature(_messageHash, _signature, _buyer);
        require(validSignature, "Signature mismatched with buyer's");

        _nftPrice *= 1e18;

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        require(validBuyer, "Buyer isn't valid");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
        mintAndTransfer(_nftCollection, _tokenId, _nftId);

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

        emit AuctionSecondarySaleExecuted(_nftCollection, _nftPrice, _tokenId, _buyer, _buyerToken);
    }

*/
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