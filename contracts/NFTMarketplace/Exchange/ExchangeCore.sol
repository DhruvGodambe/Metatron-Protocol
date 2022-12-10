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
    uint256 public tradingFeeFactor = 400; // 2.5%

    constructor(IMintingFactory _mintingFactory, address _adminRegistry, address _treasury) {
        mintingFactory = IMintingFactory(_mintingFactory);
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


    //@ Make validateSeller and validateBuyer as modifier later.

    function validateSeller(
        address _nftCollection,
        uint256 _tokenId,
        address _exchange
    ) internal view returns (bool) {
        // check if he owns the token
        address tokenOwner = IERC721(_nftCollection).ownerOf(_tokenId);
        require(_exchange == tokenOwner, "Seller does not owns the token");

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
        ) public onlyAdmin   {

        bool validSeller = validateSeller(_nftCollection, _tokenId, exchange);
        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        
        require(validSeller, "Seller isn't valid");
        require(validBuyer, "Buyer isn't valid");

        bool isCancelled = cancelledOrders[_buyer][_nftCollection][_tokenId];

        require(!isCancelled , "Order has been cancelled");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");


        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
        mintAndTransfer(_nftCollection);

    }


    function mintAndTransfer(
        address _nftCollection
    ) public onlyExchange {
        // bool success;
        // uint256 _tokenId;
        
         (bool success, uint256 _tokenId) = IMintingFactory(mintingFactory).mintNFT(_nftCollection);
        
        if(success){
            IERC721(_nftCollection).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }
        
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



//  function setTradingFeeFactor(uint256 _tradingFeeFactor) public onlyOwner {
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