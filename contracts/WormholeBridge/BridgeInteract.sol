// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.0;

import "./ITokenBridge.sol";

contract BridgeInteract {
    address public _tokenBridge;
    
    constructor(address tokenBridge) {
        _tokenBridge =  tokenBridge;
    }

    function transfer(
        address token,
        uint256 amount,
        uint16 recipientChain,
        bytes32 recipient,
        uint256 arbiterFee,
        uint32 nonce
    ) external {
        ITokenBridge(_tokenBridge).transferTokens(
            token,
            amount,
            recipientChain,
            recipient,
            arbiterFee,
            nonce
        );
    }

    function completeTransfer(bytes memory encodedVm) external {
        ITokenBridge(_tokenBridge).completeTransfer(encodedVm);
    }
} 