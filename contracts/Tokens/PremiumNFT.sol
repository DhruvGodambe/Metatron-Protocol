// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../Staking/Stakable.sol";

// Premium NFTS are collections from KTDs and AZTECH.
contract PremiumNFT is Stakable, ERC721 {
    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol)
    {}

    function mint(address account, uint256 tokenId) public {
        _mint(account, tokenId);
        
        // just for consideration if not updated automatically
        tokenStaked[tokenId] = false;
    }

    function burn(uint256 _tokenId) public {
        _burn(_tokenId);
    }
    
}
