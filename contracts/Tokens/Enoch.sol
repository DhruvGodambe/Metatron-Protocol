// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../Registry/IAdminRegistry.sol";

contract Enoch is ERC20 {

    address public _owner;
    address public adminRegistry;


    uint256 private _totalSupply = 300000000000000000000000000; //300,000,000 ENOCH tokens

    mapping(address => uint256) private _balances;
    
    constructor(address _adminRegistry) ERC20("ENOCH", "ENOCH") {
        _owner = msg.sender;
        _balances[_owner] = _totalSupply;
        adminRegistry = _adminRegistry;
    }

     modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "AdminRegistry: Restricted to admin."
        );
        _;
    }

    // access-control
    function mint(address account, uint256 amount) public onlyAdmin {
        _mint(account, amount);
    }

    // access-control
    function burn(address account, uint256 amount) public onlyAdmin {
        _burn(account, amount);
    }

}