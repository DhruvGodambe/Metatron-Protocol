//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingPool {
    IERC20 public immutable stakingToken; //RJToken
    IERC20 public immutable rewardToken; //RWDToken

    uint256 public minDuration = 60;

    // Annual reward percentage
    uint256 public rewardPercentage = 20; //20%

    uint256 public constant YEAR = 31536000; //365days * 24hours * 60min * 60sec

    uint256 public totalStakedAmount;

    struct StakedAmount {
        uint256 amount;
        uint256 duration;
    }

    //user address to an array of their staked amounts and durations
    mapping(address => StakedAmount[]) public stakes;

    event Staked(
        address indexed _user,
        uint256 indexed _amount,
        uint256 _timestamp
    );

    event RewardsClaimed(
        address indexed _user,
        uint256 _stakedAmount,
        uint256 _rewardAmount,
        uint256 _timestamp
    );

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken); //RJToken
        rewardToken = IERC20(_rewardToken); //RWDToken
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");
        require(
            stakingToken.allowance(msg.sender, address(this)) >= _amount,
            "Staking Contract is not approved for this Token or approved amount is not equal to given amount"
        );

        totalStakedAmount += _amount;

        // Create a new staked amount and duration for the user
        StakedAmount memory newStake = StakedAmount(_amount, block.timestamp);
        stakes[msg.sender].push(newStake);

        stakingToken.transferFrom(msg.sender, address(this), _amount);

        emit Staked(msg.sender, _amount, block.timestamp);
    }

    function Unstake(uint256 _positionIndex) public {
        require(_positionIndex < stakes[msg.sender].length, "Invalid position");

        // Get the staked amount and duration for the specified position
        StakedAmount memory stake = stakes[msg.sender][_positionIndex];
        uint256 amount = stake.amount;
        uint256 duration = block.timestamp - stake.duration;

        uint256 rewardAmount = ((amount * rewardPercentage * duration) /
            (100 * YEAR));

        require(duration >= minDuration, "Minimum staking duration not met");

        totalStakedAmount -= amount;

        stakingToken.transfer(msg.sender, amount);
        rewardToken.transfer(msg.sender, rewardAmount);

        delete stakes[msg.sender][_positionIndex];
        stakes[msg.sender][_positionIndex] = stakes[msg.sender][
            stakes[msg.sender].length - 1
        ];
        delete stakes[msg.sender][stakes[msg.sender].length - 1];

        emit RewardsClaimed(msg.sender, amount, rewardAmount, block.timestamp);
    }

    function getReward(uint256 _positionIndex) public view returns (uint256) {
        require(_positionIndex < stakes[msg.sender].length, "Invalid position");

        // Get the staked amount and duration for the specified position
        StakedAmount memory getStake = stakes[msg.sender][_positionIndex];
        uint256 amount = getStake.amount;
        uint256 duration = block.timestamp - getStake.duration;

        uint256 rewardAmount = ((amount * rewardPercentage * duration) /
            (100 * YEAR));

        return rewardAmount;
    }
}
//0.03805175038051750380517503805175
//380517.5038051750380517503805175
//31536000
//15768000
