// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Barrel is ERC721 {
    constructor()
        ERC721("Knight Templer Distellery", "KTD")
    {}

    function mint(address account, uint256 tokenId) public {
        _mint(account, tokenId);
    }
}
