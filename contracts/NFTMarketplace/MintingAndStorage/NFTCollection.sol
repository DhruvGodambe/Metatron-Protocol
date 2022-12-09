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

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

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
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = baseURI;

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }


    function mintNewNFT(
        string memory _tokenURI
    ) public onlyMintingFactory returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(mintingFactory, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        // console.log("New NFT minted");
        return newItemId;
    }

    function getTotalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
}
