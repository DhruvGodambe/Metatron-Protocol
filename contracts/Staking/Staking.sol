// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/utils/math/SafeCast.sol";

import "../NFTMarketplace/Interface/IERC721.sol";
import "../Tokens/IERC20.sol";

// APY - 90%
// Staking period - 3 Months
// APY && term fixed => Interest changes with compound frequency
// caln in how many decimals ??

contract Staking is
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable
{
    // Initializable,
    // Pausable
    using SafeMath for uint256;
    // using SafeCast for uint256;

    address public stakingToken; // ERC721
    address public rewardToken; // ERC20 - Enoch Tokens

    uint256 public interestRate; // initialize
    uint256 public stakingPeriod; // initialize

    uint256 public apy;

    // user => rewards (enoch tokens)
    mapping(address => uint256) public userRewards;
    // user => user stake details
    mapping(address => User) public UserInfo;

    event NFTStaked(
        address indexed user,
        uint256 indexed tokenId,
        uint256 initialBalance
    );

    struct User {
        uint256 stakingTimestamp;
        uint256 tokenId;
        uint256 stakedAmount;
        uint256 rewardsEarned;
        uint256 claimedRewards;
        uint256 rewardInstallment;
        uint256 lastWithdrawalTime;
    }

    function initialize(
        address _stakingToken,
        address _rewardToken,
        uint256 _interestRate,
        uint256 _stakingPeriod
    ) external initializer {
        __UUPSUpgradeable_init();
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
        interestRate = _interestRate;
        apy = _interestRate;
        stakingPeriod = _stakingPeriod;
    }

    function stake(
        uint256 _initialBalance,
        uint256 _tokenId,
        address _user
    ) external whenNotPaused {
        require(
            IERC721(stakingToken).ownerOf(_tokenId) == msg.sender,
            "Owner does not owns this NFT!"
        );
        // Check approval NFT -> this contract
        require(
            IERC721(stakingToken).getApproved(_tokenId) == address(this),
            "Staking Contract is not approved for this NFT!"
        );

        // transfer the tokens to this contract
        IERC721(stakingToken).transferFrom(msg.sender, address(this), _tokenId);

        // keep track of how much this user has staked
        UserInfo[_user].stakingTimestamp = block.timestamp;
        UserInfo[_user].tokenId = _tokenId;
        UserInfo[_user].stakedAmount = _initialBalance;

        // do calcn here and store in mapping
        (uint256 _totalRewards, uint256 _rewardInstallment) = _calculateRewards(
            _initialBalance,
            interestRate,
            stakingPeriod
        );
        UserInfo[_user].rewardsEarned = _totalRewards;
        UserInfo[_user].rewardInstallment = _rewardInstallment;

        emit NFTStaked(_user, _tokenId, _initialBalance);
    }

    function claimReward(address _user) external {
        uint256 remainingRewards = UserInfo[_user].rewardsEarned.sub(
            UserInfo[_user].claimedRewards
        );

        require(remainingRewards >= 0, "You have claimed your rewards!");
        uint256 installment = UserInfo[_user].rewardInstallment;
        // pay one installments
        UserInfo[_user].claimedRewards += installment;
        UserInfo[_user].lastWithdrawalTime = block.timestamp;
        // transfer
        IERC20(rewardToken).transfer(msg.sender, installment);

        if (UserInfo[_user].rewardsEarned == UserInfo[_user].claimedRewards) {
            // burn the token
            IERC721(stakingToken).transferFrom(
                msg.sender,
                address(0),
                UserInfo[_user].tokenId
            );
        }
    }

    // APY and REWARDS Calculation
    // Compound Frequency fixed
    // APY = [{ 1 + r/n } ^ n] - 1
    // where, r - interest rate
    // n is number of times the interest is compounded per year
    // Since compound frequency is fixed to annually, therefore
    // n = 1
    //
    // APY = [{ 1 + r/1 } ^ 1] - 1
    //     = 1 + r - 1
    // APY = r = Interest Rate
    //
    // Total Staking Earnings Calculation
    // Suppose, your initial stake is d, and you stake for y years, interest rate - r
    // Earned Amount = Initial Stake * [1 + r/n] ^ (n * y)
    // Since n = 1,
    // Total Earning = d * [1 + r] ^ y
    //

    function _calculateRewards(
        uint256 _userStake,
        uint256 _interestRate,
        uint256 _term
    ) internal pure returns (uint256, uint256) {
        // staking period in months and so is _term
        _term = _term.div(12);
        uint256 rewards = _userStake.mul((1 + _interestRate)**_term);

        uint256 rewardInstallment = rewards.div(3);
        return (rewards, rewardInstallment);
    }

    function getStakedInfo(address _user)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        // return all details
        return (
            UserInfo[_user].stakingTimestamp,
            UserInfo[_user].tokenId,
            UserInfo[_user].stakedAmount,
            UserInfo[_user].rewardsEarned,
            UserInfo[_user].claimedRewards,
            UserInfo[_user].rewardInstallment,
            UserInfo[_user].lastWithdrawalTime
        );
    }

    function _authorizeUpgrade(address) internal override {}

    // admin functions => implement later
    function pause() external {
        _pause();
    }

    function unpause() external {
        _unpause();
    }

    function _msgSender() internal view override returns (address) {
        return msg.sender;
    }

    function _msgData() internal view override returns (bytes calldata) {
        return msg.data;
    }
}
