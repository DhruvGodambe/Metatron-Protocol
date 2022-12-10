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

contract ExchangeCoreOld is Ownable, Pausable {
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
    // cancelledOrders[userAddress][nftCollection][id] => returns bool
    mapping(address => mapping(address => mapping(uint256 => bool)))
        public cancelledOrders;

    event OrderExecuted(
        address nftCollection,
        uint256 tokenId,
        address oldOwner,
        address newOwner
    );

    event OrderCancelled(address nftCollection, uint256 tokenId, address buyer);


    // function putOnDirectSale(address _nftCollection, uint256 _tokenId)
    //     public
    //     returns (address, uint256)
    // {
    //     // check if the sender owns this nft
    //     address nftOwner = IERC721(_nftCollection).ownerOf(_tokenId);
    //     require(
    //         msg.sender == nftOwner,
    //         "Message sender is not the owner of NFT"
    //     );
    //     // then approve this nft to the contract
    //     // this function in web3, we'll add approve functionality

    //     return (_nftCollection, _tokenId);
    // }


    // function putOnAuction(address _nftCollection, uint256 _tokenId)
    //     public
    //     returns (
    //         address,
    //         uint256,
    //         uint256
    //     )
    // {
    //     // check if sender owns this nft
    //     address nftOwner = IERC721(_nftCollection).ownerOf(_tokenId);
    //     require(
    //         msg.sender == nftOwner,
    //         "Message sender is not the owner of NFT"
    //     );
    //     // then approve this nft to the contract
    //     // then, add auctionTimeLimit to blocktime and that is auctionEndTime
    //     uint256 auctionEndTime = block.timestamp + auctionTimeLimit;
    //     return (_nftCollection, _tokenId, auctionEndTime);
    // }


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


    function validateAuctionTime(uint256 _auctionEndTime)
        internal
        view
        returns (bool)
    {
        require(_auctionEndTime > block.timestamp, "Auction has ended");
        return true;
    }


    function executeOrder(
        address _nftCollection,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _auctionEndTime
    ) public onlyOwner whenNotPaused {
        // Validating all the requirements
        bool validTime;
        if (_auctionEndTime != 0) {
            validTime = validateAuctionTime(_auctionEndTime);
        } else {
            validTime = true;
        }

        bool validSeller = validateSeller(_nftCollection, _tokenId, _seller);
        bool validBuyer = validateBuyer(_buyer, _amount);

        bool isCancel = cancelledOrders[_buyer][_nftCollection][_tokenId];

        require(validTime, "Auction is already over");
        require(validSeller, "Seller isn't valid");
        require(validBuyer, "Buyer isn't valid");
        require(isCancel == false, "Order is cancelled");

        _amount *= 1e18;

        // transfer tradingFee to the exchange 4%
        uint256 fee = _amount.mul(tradingFeeFactor).div(tradingFeeFactorMax);
        IERC20(WETH).transferFrom(_buyer, address(this), fee);

        // transferring the amount to the seller
        uint256 transferableAmt = _amount
            .mul(tradingFeeFactorMax.sub(tradingFeeFactor))
            .div(tradingFeeFactorMax);
        IERC20(WETH).transferFrom(_buyer, _seller, transferableAmt);

        // transferring the NFT to the buyer
        IERC721(_nftCollection).transferFrom(_seller, _buyer, _tokenId);
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