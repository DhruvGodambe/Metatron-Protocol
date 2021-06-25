// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Vesting.sol';
import '@openzeppelin/upgrades/contracts/upgradeability/ProxyFactory.sol';

contract VestingFactory is ProxyFactory {
    string[] allocationType = ['seed', 'strategic', 'private', 'auction'];

    function createVesting(string allocationType, address beneficiary) external returns (bool) {
        
    }
}