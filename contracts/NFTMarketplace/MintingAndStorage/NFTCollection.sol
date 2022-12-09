// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../../Registry/IAdminRegistry.sol";

contract NFTCollection is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public mintingFactory;
    address public exchange;
    string public baseURI;
    address public adminRegistry;

    constructor(string memory _name, string memory _symbol, address _adminRegistry)
        ERC721(_name, _symbol)
    {
        mintingFactory = msg.sender;
        console.log("This is an NFT contract. Whoa!");
        adminRegistry = _adminRegistry;
    }

     modifier onlyMintingFactory() {
        require(
            mintingFactory == msg.sender,
            "Only MintingFactory can call this!"
        );
        _;
    }

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

    event BaseURIChanged(string baseURI);

    function _setbaseURI(string memory _baseURI) internal onlyAdmin returns (string memory) {
        baseURI = _baseURI;

        emit BaseURIChanged(baseURI);
        
        return baseURI;
    }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override(ERC721, ERC721URIStorage)
    //     returns (string memory)
    // {
    //     return super.tokenURI(tokenId);
    // }


    function mintNewNFT(string memory tokenURI) public onlyMintingFactory returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(mintingFactory, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // console.log("New NFT minted");
        return newItemId;
    }

    function getTotalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
