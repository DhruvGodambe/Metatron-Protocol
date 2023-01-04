// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
//interface
import "../../Registry/IAdminRegistry.sol";

contract LoveV2 is Initializable, UUPSUpgradeable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable {


    address public adminRegistry;
    address public _owner;
    mapping(address => uint256) private _balances;
    string public ID;

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    function initialize(string memory _id) public onlyAdmin {
        ID = _id;
    }

    function setID(string memory _newID) public onlyAdmin {
        ID = _newID;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(address _newImplementation) internal onlyAdmin override {}
    
    function pause() public onlyAdmin whenNotPaused {
        _pause();
    }

    function unpause() public onlyAdmin whenPaused {
        _unpause();
    }
}