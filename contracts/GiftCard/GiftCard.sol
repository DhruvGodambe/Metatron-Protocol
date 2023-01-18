// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./../NFTMarketplace/Interface/IERC20.sol";

contract GiftCard {

    using SafeMath for uint256;
    address public owner;
    address public spender;
    address public tokenAddress;


    mapping(address => mapping(address => uint256)) public balance;

    constructor(address _tokenAddress) public {
        owner = msg.sender;
        spender = address(this);
        tokenAddress = _tokenAddress;
    console.log("msg.sender is : ", msg.sender);
    console.log("address(this) is : ", address(this));
    }


    function topUp(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can top up gift cards");
        console.log("msg.sender in topUp is : ", msg.sender);
        // require(IERC20(tokenAddress).allowance(owner, spender) >= _amount , "Insufficient allowance");
        IERC20(tokenAddress).transferFrom(owner, spender, _amount);
        balance[spender][tokenAddress] = balance[spender][tokenAddress].add(_amount);
    }


    function payNow
    (
        address from, address to, 
        address[] memory tokens,
        uint256[] memory amounts
    ) public returns(bool) {

        for (uint i = 0; i < tokens.length-1; i++) {
            bool success = IERC20(tokens[i]).transferFrom(from, to, amounts[i]);
        
        return success;
        }
    }

    function payNowBatchTransfer
    (
        address token1, address token2, 
        address from, address to, 
        uint256 amount
    ) public returns (bool, bool) 
    {
        bool success1 = IERC20(token1).transferFrom(from, to, amount);
        bool success2 = IERC20(token2).transferFrom(from, to, amount);
        return (success1, success2);
    }

    function redeem(address _token) public {
        require(balance[address(this)][_token] > 0, "Gift card has no balance in the given token");
        IERC20(_token).transfer(msg.sender, balance[address(this)][_token]);
        balance[address(this)][_token] = 0;
    }

    function getBalance(address _token) public view returns (uint256) {
        return balance[spender][_token];
    }

}
