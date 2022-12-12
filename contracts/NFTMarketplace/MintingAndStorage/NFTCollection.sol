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

    using Strings for uint256;

    address public mintingFactory;
    address public exchange;
    string public baseURI;
    address public adminRegistry;

    constructor(string memory _name, string memory _symbol, address _adminRegistry, string memory _baseURI)
        ERC721(_name, _symbol)
    {
        mintingFactory = msg.sender;
        console.log("This is an NFT contract. Whoa!");
        adminRegistry = _adminRegistry;
        baseURI = _baseURI;
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


    function tokenURI(uint256 tokenId)
        public
        view virtual 
        override 
        returns (string memory)
    {         

            return string(abi.encodePacked(baseURI, tokenId.toString()));

    }


    function mintNewNFT(uint256 _tokenId) public onlyMintingFactory returns (uint256) {

        _mint(mintingFactory, _tokenId);
        
        return _tokenId;
    }


}
