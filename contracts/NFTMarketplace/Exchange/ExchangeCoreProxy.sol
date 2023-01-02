// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExchangeCoreProxy is ERC1967Proxy, Ownable {

    constructor(address _logic, bytes memory _data)
        payable
        ERC1967Proxy(_logic, _data)
    { }

    function getImplementation() public view returns (address) {
        return _getImplementation();
    }

    function upgradeToNewImplementation(address newImplementation) public onlyOwner {
        _upgradeTo(newImplementation);
    }
}
