// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IERC20.sol";

contract GiftCard {

    using SafeMath for uint256;

    mapping(address => mapping(address => uint256)) public balance;
    address public owner;

    function initialize() public {
        owner = msg.sender;
    }

    function topUp(address _token, uint256 _value) public {
        require(msg.sender == owner, "Only the owner can top up gift cards");
        IERC20(_token).approve(address(this), _value);
        IERC20(_token).transferFrom(msg.sender, address(this), _value);
        balance[msg.sender][_token] = balance[msg.sender][_token].add(_value);
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
        return balance[address(this)][_token];
    }

}
