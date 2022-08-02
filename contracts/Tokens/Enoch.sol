// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Enoch is ERC20 {

    address public _owner;

    uint256 private _totalSupply = 300000000000000000000000000; //300,000,000 ENOCH tokens

    mapping(address => uint256) private _balances;
    
    constructor() ERC20("ENOCH", "ENOCH") {
        _owner = msg.sender;
        _balances[_owner] = _totalSupply;
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to mint ENOCH");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(msg.sender == _owner, "You are not authorized to burn ENOCH");
        _burn(account, amount);
    }

}