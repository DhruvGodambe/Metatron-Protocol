// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMintingFactory {
    function createNFTCollection(
        string memory _name, 
        string memory _symbol
        )
        external
        returns (address);

    function mintNFT(
        address _nftCollection
    ) external returns (bool, uint256);
    
    function updateOwner(
        address _nftCollection,
        uint256 _tokenId,
        address _newOwner
    ) external;
}
