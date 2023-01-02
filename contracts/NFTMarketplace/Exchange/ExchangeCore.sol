// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// import required interfaces
import "../Interface/IERC721.sol";
import "../Interface/IERC20.sol";
import "../Interface/IMintingFactory.sol";
import "../../Registry/IAdminRegistry.sol";
import "../SignatureLib.sol";
 
contract ExchangeCore is Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;

    address public treasury;
    address public adminRegistry;


    constructor(IMintingFactory _mintingFactory, address _adminRegistry, address _treasury) {
        mintingFactory = IMintingFactory(_mintingFactory);
        adminRegistry = _adminRegistry;
        treasury = _treasury;
    }

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
        address _nftCollection, 
        uint256 _tokenId,
        string _tokenURL,
        uint256 _nftPrice,  
        address _buyer, 
        address _buyerToken
    );


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
            IERC20(_buyerToken).allowance(_buyer, address(this)) >= _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(_buyerToken).balanceOf(_buyer) >= _amount,
            "Buyer doesn't have sufficient funds"
        );
        return true;
    }


    function fixedPricePrimarySale(
        address _nftCollection, 
        uint256 _nftPrice,
        uint256 _tokenId,
        string memory _nftId,
        address _buyer,
        address _buyerToken
        ) public onlyAdmin nonReentrant {

        //  _nftPrice *= 1e18;

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        require(validBuyer, "Buyer isn't valid");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);

        string memory _tokenURL  = mintAndTransfer(_nftCollection, _tokenId, _nftId);

        IMintingFactory(mintingFactory).updateOwner(_nftCollection, _buyer, _tokenId);

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
    

    function auctionPrimarySale(
        address _nftCollection,
        uint256 _nftPrice,
        uint256 _tokenId,
        string memory _nftId,
        address _buyer,
        address _buyerToken,
        string memory _message,
        bytes memory _signature
    ) public onlyAdmin nonReentrant whenNotPaused {
        
        bool validSignature = SignatureLib.verifySignature(_message, _signature, _buyer);
        require(validSignature, "Signature mismatched with buyer's");

        // _nftPrice *= 1e18;

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        require(validBuyer, "Buyer isn't valid");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
       
        string memory _tokenURL  = mintAndTransfer(_nftCollection, _tokenId, _nftId);

        IMintingFactory(mintingFactory).updateOwner(_nftCollection, _buyer, _tokenId);

        emit AuctionPrimarySaleExecuted(_nftCollection, _tokenId, _tokenURL, _nftPrice ,_buyer, _buyerToken);
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
}