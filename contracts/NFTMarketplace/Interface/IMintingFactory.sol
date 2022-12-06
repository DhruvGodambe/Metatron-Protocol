// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMintingFactory {
    function createNFTContract(
        string memory _name, 
        string memory _symbol
        )
        external
        returns (address);

    function mintNFT(
        address _nftContract, 
        string memory _tokenURI
        ) external;
    
    function updateOwner(
        address _nftContract,
        uint256 _tokenId,
        address _newOwner
    ) external;
}
