// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../../../Registry/IAdminRegistry.sol";

contract Collection is ERC721 {

    address public adminRegistry;
    address public mintingFactory;
    string public baseURI;

    mapping(uint256 => string) public tokenIdToNftId;

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


    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    event BaseURIChanged(string baseURI);
    event NFTMintedinCollection(address signer);

    function _setbaseURI(string memory _baseURI) internal onlyAdmin returns (string memory) {
        baseURI = _baseURI;

        emit BaseURIChanged(baseURI);
        
        return baseURI;
    }


    function tokenURI(uint256 _tokenId)
        public
        view virtual override
        returns (string memory)
    {       string memory _nftId = tokenIdToNftId[_tokenId];
            return string(abi.encodePacked(baseURI, _nftId));
    }


    function mintNewNFT(uint256 _tokenId, string memory _nftId) public onlyMintingFactory returns (uint256, string memory) {

        tokenIdToNftId[_tokenId] =_nftId;

        _mint(mintingFactory, _tokenId);

        emit NFTMintedinCollection(msg.sender);
        console.log("msg.sender in collection is : ", msg.sender );
        return (_tokenId ,string(abi.encodePacked(baseURI, _nftId)));
        
    }


}
