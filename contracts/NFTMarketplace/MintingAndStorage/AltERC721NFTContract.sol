// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AltERC721NFTContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public creator;

    constructor(
        string memory _name,
        string memory _symbol,
        address _creator
    ) ERC721(_name, _symbol) {
        console.log("This is an NFT contract. Whoa!");
        creator = _creator;
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "Only Creator can call this");
        _;
    }

    function mintNewNFT(string memory tokenURI)
        public
        onlyCreator
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(creator, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // console.log("New NFT minted");
        return newItemId;
    }

    function getTotalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
