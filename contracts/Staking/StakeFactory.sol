// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

import "./Staking.sol";
import "./StakingProxy.sol";

contract StakeFactory is UUPSUpgradeable, AccessControlUpgradeable, PausableUpgradeable {

     /// @notice Address for implementation of Staking to clone
    address public implementation;

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not an Admin!");
        _;
    }

    event StakeCreated(address _stake, address _stakingToken, address _rewardToken);

    /// @dev Initializes the proxy contract
    function initialize(address _implementation) external initializer {
        __UUPSUpgradeable_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        implementation = _implementation;
    }

    function setupStakeContract(
        address _stakingToken,
        address _rewardToken,
        uint256 _interestRate,
        uint256 _stakingPeriod
    ) public returns (address) {
        StakingProxy newStake = new StakingProxy(implementation, "");

        address payable newStakeAddress = payable(address(newStake));

        Staking(newStakeAddress).initialize(
            _stakingToken,
            _rewardToken,
            _interestRate,
            _stakingPeriod
        );

        emit StakeCreated(newStakeAddress, _stakingToken, _rewardToken);
        return newStakeAddress;
    }

     function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyAdmin
    {}

    function addAdmin(address account) external onlyAdmin {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    function removeAdmin(address account) external onlyAdmin {
        revokeRole(DEFAULT_ADMIN_ROLE, account);
    }

    function leaveAdminRole() external onlyAdmin {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

     function pause() external {
        _pause();
    }

    function unpause() external {
        _unpause();
    }


}
