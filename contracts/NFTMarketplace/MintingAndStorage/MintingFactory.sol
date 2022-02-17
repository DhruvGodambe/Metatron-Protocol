// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFTContract.sol";

contract MintingFactory {
    // this contract creates an NFT contract
    // and then it can mint NFT for that contract
    // keeps track of all NFT contracts for the users
    
    mapping(address => address[]) public ownerToNFTs;
    // mapping => nft contract => (mapping (token id => owner))
    mapping(address => mapping(uint256 => address)) public nftToIdToOwner;

    // Events
    event NFTContractCreated(string name, string symbol, address nftContract);
    event NFTMinted(address nftContract, uint256 tokenId);
    event OwnerUpdated(address nftContract, uint256 tokenId, address newOwner);

    // update owner - function

    function createNFTContract(string memory _name, string memory _symbol) external returns (address _nftcontract) {
        // create new contract
        address nftContract = address(new NFTContract(_name, _symbol));
        // update mapping of owner to NFTContracts
        ownerToNFTs[msg.sender].push(nftContract);
        
        emit NFTContractCreated(_name, _symbol, nftContract);
        // return address of new contract    
        return nftContract;
    }

    // function => mintNFt
    function mintNFT(address _nftContract, string memory _tokenURI) public {
        NFTContract(_nftContract).mintNewNFT(_tokenURI);
        uint256 _tokenId = NFTContract(_nftContract).getTotalNFTs();
        
        emit NFTMinted(_nftContract, _tokenId);
    }

    function updateOwner(address _nftContract, uint256 _tokenId, address _newOwner) public {
        nftToIdToOwner[_nftContract][_tokenId] = _newOwner;

        emit OwnerUpdated(_nftContract, _tokenId, _newOwner);
    }

    function getNFTsForOwner(address user) public view returns(address[] memory) {
        return ownerToNFTs[user];
    }

    // get total NFTs minted for a contract
    function getTotalNFTsMinted(address _nftContract) public view returns (uint256) {
        return NFTContract(_nftContract).getTotalNFTs();
    }
}