// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import required interfaces
import "./../Interface/IERC20.sol";
import "./../Interface/IERC721.sol";
import "./../Interface/IMintingFactory.sol";
import "../../Registry/IAdminRegistry.sol";

contract ExchangeCoreNew is Ownable, Pausable {
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;
    IERC20 internal WETH;
    address public treasury;
    address public exchange;
    address public adminRegistry;

    uint256 auctionTimeLimit = 28800;
    uint256 public constant tradingFeeFactorMax = 10000; // 100%
    uint256 public tradingFeeFactor = 400; // 2.5%

    constructor(IMintingFactory _mintingFactory, IERC20 _weth,address _adminRegistry, address _treasury) {
        mintingFactory = IMintingFactory(_mintingFactory);
        WETH = IERC20(_weth);
        treasury = _treasury;
        adminRegistry = _adminRegistry;
    }

    // One who bids for an nft, can cancel it anytime before auction ends
    // cancelledOrders[userAddress][nftCollection][id] => returns bool
    mapping(address => mapping(address => mapping(uint256 => bool)))
        public cancelledOrders;

    event OrderExecuted(
        address nftCollection,
        uint256 tokenId,
        address oldOwner,
        address newOwner
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


    function validateBuyer(address _buyer, uint256 _amount)
        internal view
        returns (bool)
    {
        require(
            IERC20(WETH).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(WETH).balanceOf(_buyer) > _amount,
            "Buyer doesn't have sufficient funds"
        );
        return true;
    }


//2 fns: PrimarySale and SecondarySale
//Primary sale: No tradingfee
//Sec sale: 4% trading fee

    function fixedPricePrimarySale(address _nftCollection, string memory _tokenURI, uint256 _nftPrice, uint256 _tokenId, address _buyer, address _buyerToken) public onlyAdmin {
        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
        mintAndTransfer(_nftCollection, _tokenURI, _tokenId);

    }



    function mintAndTransfer(address _nftCollection, string memory _tokenURI, uint256 _tokenId) public onlyExchange {
        bool success = IMintingFactory(mintingFactory).mintNFT(_nftCollection, _tokenURI);
        
        if(success){
            IERC721(_nftCollection).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }
        
    }

    function fixedPriceSecondarySale() public {

    }


    function executeOrder(
        address _nftCollection,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) public whenNotPaused {

        bool validSeller = validateSeller(_nftCollection, _tokenId, _seller);
        bool validBuyer = validateBuyer(_buyer, _amount);

        bool isCancel = cancelledOrders[_buyer][_nftCollection][_tokenId];

        require(validSeller, "Seller isn't valid");
        require(validBuyer, "Buyer isn't valid");
        require(isCancel == false, "Order is cancelled");

        _amount *= 1e18;

        // transfer tradingFee to the exchange
        uint256 fee = _amount.mul(tradingFeeFactor).div(tradingFeeFactorMax);
        IERC20(WETH).transferFrom(_buyer, address(this), fee);

        // transferring the amount to the seller
        uint256 transferableAmt = _amount
            .mul(tradingFeeFactorMax.sub(tradingFeeFactor))
            .div(tradingFeeFactorMax);
        IERC20(WETH).transferFrom(_buyer, _seller, transferableAmt);

        // transferring the NFT to the buyer
        IERC721(_nftCollection).transferFrom(_seller, _buyer, _tokenId);
        //Use this for second sale

        // updating the NFT ownership in our Minting Factory
        IMintingFactory(mintingFactory).updateOwner(
            _nftCollection,
            _tokenId,
            _buyer
        );

        emit OrderExecuted(_nftCollection, _tokenId, _seller, _buyer);
    }


    function cancelOrder(
        address _nftCollection,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) public {
        // approvals to be checked
        bool validSeller = validateSeller(_nftCollection, _tokenId, _seller);
        bool validBuyer = validateBuyer(_buyer, _amount);
        // decrease approval in web3 scripts
        // add this cancelled Order in the mapping
        if (validSeller && validBuyer) {
            cancelledOrders[_buyer][_nftCollection][_tokenId] = true;
            emit OrderCancelled(_nftCollection, _tokenId, _buyer);
        }
    }


//     function setTradingFeeFactor(uint256 _tradingFeeFactor) public onlyOwner {
//         require(_tradingFeeFactor != 0, "Fee cannot be zero");
//         tradingFeeFactor = _tradingFeeFactor;
//     }

//     function getTradingFeeFactor() public view returns (uint256) {
//         return tradingFeeFactor;
//     }
// }

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