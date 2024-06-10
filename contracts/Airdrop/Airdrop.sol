// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract AirdropContract {
    event AirdropERC20Completed(address sender, address tokenAddress, address[] recipients, uint256 amount);
    event AirdropERC721Completed(address sender, address tokenAddress, address[] recipients, uint256[] tokenIds);
    
    function airdropERC20(address[] calldata recipients, address tokenAddress, uint256 amount) external {
        require(recipients.length > 0, "No recipients specified");

        IERC20 erc20Token = IERC20(tokenAddress);
        uint256 decimalFactor = 10**18;

        for (uint256 i = 0; i < recipients.length; i++) {
            erc20Token.transferFrom(msg.sender, recipients[i], amount * decimalFactor);
        }
        emit AirdropERC20Completed(msg.sender, tokenAddress, recipients, amount * decimalFactor);
    }
    
    function airdropERC721(address[] calldata recipients, address tokenAddress, uint256[] calldata tokenIds) external {
        IERC721 token = IERC721(tokenAddress);
        
        require(recipients.length == tokenIds.length, "Array length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            token.transferFrom(msg.sender, recipients[i], tokenIds[i]);
        }
        
        emit AirdropERC721Completed(msg.sender, tokenAddress, recipients, tokenIds);
    }
}
