// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// make it ownable
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// import required interfaces
import "./Interface/IERC20.sol";
import "./Interface/IERC721.sol";
import "./Interface/IMintingFactory.sol";

contract ExchangeCore is Ownable, Pausable {
    IMintingFactory internal mintingFactory;
    IERC20 internal WETH;

    constructor(IMintingFactory _mintingFactory, IERC20 _weth) {
        mintingFactory = IMintingFactory(_mintingFactory);
        WETH = IERC20(_weth);
    }

    function validate(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _auctionEndTime
    ) internal {
        require(
            IERC20(WETH).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(WETH).balanceOf(_buyer) > _amount,
            "Buyer doesn't have sufficient funds"
        );
        require(_auctionEndTime < block.timestamp, "Auction in progress");
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
        validate(
            _nftContract,
            _tokenId,
            _buyer,
            _seller,
            _amount,
            _auctionEndTime
        );

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
