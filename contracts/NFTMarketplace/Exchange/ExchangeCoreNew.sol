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

contract ExchangeCoreNew is Ownable, Pausable {
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;
    IERC20 internal WETH;

    uint256 auctionTimeLimit = 28800;
    uint256 public constant tradingFeeFactorMax = 10000; // 100%
    uint256 public tradingFeeFactor = 250; // 2.5%

    constructor(IMintingFactory _mintingFactory, IERC20 _weth) {
        mintingFactory = IMintingFactory(_mintingFactory);
        WETH = IERC20(_weth);
    }

    // One who bids for an nft, can cancel it anytime before auction ends
    // cancelledOrders[userAddress][nftContract][id] => returns bool
    mapping(address => mapping(address => mapping(uint256 => bool)))
        public cancelledOrders;

    event OrderExecuted(
        address nftContract,
        uint256 tokenId,
        address oldOwner,
        address newOwner
    );

    event OrderCancelled(address nftContract, uint256 tokenId, address buyer);


    function validateSeller(
        address _nftContract,
        uint256 _tokenId,
        address _seller
    ) internal view returns (bool) {
        // check if he owns the token
        address tokenOwner = IERC721(_nftContract).ownerOf(_tokenId);
        require(_seller == tokenOwner, "Seller does not owns the token");

        // check token approval
        address tokenApprovedAddress = IERC721(_nftContract).getApproved(
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


    function mintAndTransfer(address _nftContract, string memory _tokenURI, uint256 _tokenId) public {
        bool success = IMintingFactory(mintingFactory).mintNFT(_nftContract, _tokenURI);
        
        if(success){
            IERC721(_nftContract).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }
        
    }


//2 fns: PrimarySale and SecondarySale
//Primary sale: No tradingfee
//Sec sale: 4% trading fee

    function executeOrder(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) public whenNotPaused {

        bool validSeller = validateSeller(_nftContract, _tokenId, _seller);
        bool validBuyer = validateBuyer(_buyer, _amount);

        bool isCancel = cancelledOrders[_buyer][_nftContract][_tokenId];

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
        IERC721(_nftContract).transferFrom(_seller, _buyer, _tokenId);
        //Use this for second sale

        // updating the NFT ownership in our Minting Factory
        IMintingFactory(mintingFactory).updateOwner(
            _nftContract,
            _tokenId,
            _buyer
        );

        emit OrderExecuted(_nftContract, _tokenId, _seller, _buyer);
    }


    function cancelOrder(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) public {
        // approvals to be checked
        bool validSeller = validateSeller(_nftContract, _tokenId, _seller);
        bool validBuyer = validateBuyer(_buyer, _amount);
        // decrease approval in web3 scripts
        // add this cancelled Order in the mapping
        if (validSeller && validBuyer) {
            cancelledOrders[_buyer][_nftContract][_tokenId] = true;
            emit OrderCancelled(_nftContract, _tokenId, _buyer);
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