// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract StakingProxy is ERC1967Proxy, Initializable {
    constructor(address _logic, bytes memory _data)
        payable
        ERC1967Proxy(_logic, _data)
    {}

    function initialize(address implementation) public virtual initializer {
        _upgradeTo(implementation);
    }

    function getImplementation() public view returns (address) {
        return _getImplementation();
    }

    function upgradeTo(address newImplementation) public {
        _upgradeTo(newImplementation);
    }
}
