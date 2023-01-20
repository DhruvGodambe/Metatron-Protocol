// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
//interface
import "../../Registry/IAdminRegistry.sol";

contract LoveV1 is 
    Initializable, 
    UUPSUpgradeable, 
    ERC20Upgradeable, 
    ERC20BurnableUpgradeable, 
    PausableUpgradeable 
{

    address public adminRegistry;
    address public _owner;
    mapping(address => uint256) private _balances;

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    function initialize(address _adminRegistry, uint256 _initialSupply) external initializer {
        __ERC20_init("LOVE token", "LOVE");
        __ERC20Burnable_init();
        __Pausable_init();
        adminRegistry = _adminRegistry;
        _owner = msg.sender;
        mint(msg.sender, _initialSupply);
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function mint(address to, uint256 amount) internal onlyAdmin {
        _mint(to, amount);
    }

    function burn(uint256 amount) public virtual override onlyAdmin {
        _burn(_msgSender(), amount);
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