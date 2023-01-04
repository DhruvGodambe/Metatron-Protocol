// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "../../Registry/IAdminRegistry.sol";

contract ExchangeCoreProxy is ERC1967Proxy {

    address public adminRegistry;

    constructor(address _logic, bytes memory _data, address _adminRegistry)
        payable
        ERC1967Proxy(_logic, _data)
    { 
        adminRegistry = _adminRegistry;
    }

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    function getImplementation() public view returns (address) {
        return _getImplementation();
    }

    function upgradeToNewImplementation(address newImplementation) public onlyAdmin {
        _upgradeTo(newImplementation);
    }
}
