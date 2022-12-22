// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface INFTCollection {
    function tokenURI(
        uint256 _tokenId
        )
        external
        returns (string memory);

}