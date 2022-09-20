// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Love is ERC20 {
    mapping(address => uint256) private _balances;
    address public _owner;

    uint256 private _initialSupply = 10000000000000000000000000;  // 10 M
    uint256 private maxTotalSupply = 1000000000000000000000000000; // 1 B LOVE tokens
    uint256 private _totalSupply; 

    constructor() ERC20("Love", "LOVE") {
        _owner = msg.sender;
        _balances[_owner] = _initialSupply;
        _totalSupply += _initialSupply;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to mint LOVE");
        require(maxTotalSupply > (_totalSupply + amount), "Token Supply cannot exceed the limit");
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to burn LOVE");
        _burn(_owner, amount);
    }
}