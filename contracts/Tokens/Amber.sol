// SPDX-License-Identifier: MIT
//Rename from Amber to Love along with Dheeraj

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Amber is ERC20 {
    mapping(address => uint256) private _balances;
    address public _owner;

    uint256 private _initialSupply = 10000000000000000000000000;  // 10 M
    uint256 private maxTotalSupply = 1000000000000000000000000000; // 1 B AMBER tokens
    uint256 private _totalSupply; 

    constructor() ERC20("Amber", "AMBER") {
        _owner = msg.sender;
        _balances[_owner] = _initialSupply;
        _totalSupply += _initialSupply;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to mint AMBER");
        require(maxTotalSupply > (_totalSupply + amount), "Token Supply cannot exceed the limit");
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to burn AMBER");
        _burn(_owner, amount);
    }
}