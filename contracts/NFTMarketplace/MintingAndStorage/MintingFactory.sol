// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFTContract.sol";

contract MintingFactory {
    // this contract creates an NFT contract
    // and then it can mint NFT for that contract
    // keeps track of all NFT contracts for the users

    // mapping(address => address[]) public allNFTContracts;
    NFTContract[] public allNFTContracts;
    mapping(address => NFTContract[]) public allContracts;

    function createNFTContract(string memory _name, string memory _symbol) external returns (NFTContract _nftcontract) {
        NFTContract newContract = new NFTContract(_name, _symbol);
        allNFTContracts.push(newContract);
        allContracts[msg.sender].push(newContract);
        return newContract;    
    }

    function getAllContracts(address user) public returns(NFTContract[] memory) {
        return allContracts[user];
    }
}