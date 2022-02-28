// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// import required interfaces
import "./../Interface/IERC20.sol";
import "./../Interface/IERC721.sol";
import "./../Interface/IMintingFactory.sol";

contract ExchangeCore is Ownable, Pausable {
    IMintingFactory internal mintingFactory;
    IERC20 internal WETH;

    uint256 auctionTimeLimit = 28800;

    constructor(IMintingFactory _mintingFactory, IERC20 _weth) {
        mintingFactory = IMintingFactory(_mintingFactory);
        WETH = IERC20(_weth);
    }

    // function putOnDirectSale(address _nftContract, uint256 _tokenId)
    //     public
    //     returns (address, uint256)
    // {
    //     // check if the sender owns this nft
    //     address nftOwner = IERC721(_nftContract).ownerOf(_tokenId);
    //     require(
    //         msg.sender == nftOwner,
    //         "Message sender is not the owner of NFT"
    //     );
    //     // then approve this nft to the contract
    //     // this function in web3, we'll add approve functionality

    //     return (_nftContract, _tokenId);
    // }

    // function putOnAuction(address _nftContract, uint256 _tokenId)
    //     public
    //     returns (
    //         address,
    //         uint256,
    //         uint256
    //     )
    // {
    //     // check if sender owns this nft
    //     address nftOwner = IERC721(_nftContract).ownerOf(_tokenId);
    //     require(
    //         msg.sender == nftOwner,
    //         "Message sender is not the owner of NFT"
    //     );
    //     // then approve this nft to the contract
    //     // then, add auctionTimeLimit to blocktime and that is auctionEndTime
    //     uint256 auctionEndTime = block.timestamp + auctionTimeLimit;
    //     return (_nftContract, _tokenId, auctionEndTime);
    // }

    function validate(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) internal {
        require(
            IERC20(WETH).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(WETH).balanceOf(_buyer) > _amount,
            "Buyer doesn't have sufficient funds"
        );
    }

    function validateAuctionTime(uint256 _auctionEndTime) internal view {
        require(
            _auctionEndTime > block.timestamp,
            "Auction has ended"
        );
    }

    function executeOrder(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _auctionEndTime
    )
        public
        onlyOwner
        whenNotPaused
        returns (address newOwner, uint256 tokenId)
    {
        // Validating all the requirements

        if (_auctionEndTime != 0) {
            validateAuctionTime(_auctionEndTime);
        }

        validate(_nftContract, _tokenId, _buyer, _seller, _amount);

        // transferring the amount to the seller
        IERC20(WETH).transferFrom(_buyer, _seller, _amount);
        // transferring the NFT to the buyer
        IERC721(_nftContract).transferFrom(_seller, _buyer, _tokenId);
        // updating the NFT ownership in our Minting Factory
        IMintingFactory(mintingFactory).updateOwner(
            _nftContract,
            _tokenId,
            _buyer
        );

        return (_buyer, _tokenId);
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
}

// place Order => sell order / buy order (nftCollection, tokenId)
// =>
// approve (amt to Exchange)  // require => min amt limit  => auctionTime
//
// validation => signature, buyer address, auctionTime
// => calls execute order(signature) internal fn
//      => update owner of NFT in Minting Factory (Interface)
//      => Royalties distribution
