// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../Tokens/IERC20.sol";

error StakingPool__StakeFailed(uint256 required);
error StakingPool__WithdrawFailed(uint256 required);

contract Pool {

    struct UserInfo {
        address userAddress;
        uint256 lastDepositedTime; // keep track of deposited time.
        uint256 tokenStaked;
    }

    UserInfo[] public userInfo;

    IERC20 public immutable stakingToken; //RJToken
    IERC20 public immutable rewardToken; //RWDToken

    mapping(address => uint256) public balanceOf; //RJToken balance of a user
    mapping(address => uint256) public startTime;
    mapping (address => uint256) public endTime; //when user unstakes time stores here
    mapping(address => uint256) public rewards; // User address => rewards to be claimed


    uint256 public duration;
    uint256 public APY;
    uint256 public twoMonthTimeConstant = 5184000;

    event Staked(
        address indexed user,
        uint256 indexed amount,
        uint256 timestamp
    );

    event WithdrawStake(
        address indexed user,
        uint256 indexed amount,
        uint256 timestamp
    );

    constructor(address _stakingToken, address _rewardToken, uint256 _APY) {
        owner = msg.sender;
        stakingToken = IERC20(_stakingToken); //RJToken
        rewardToken = IERC20(_rewardToken); //RWDToken
        APY = _APY;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function stake(uint _amount) external {
        require(_amount > 0, "amount = 0");

        // check for approval 
        
        require(stakingToken.allowance(msg.sender, address(this)) >= _amount, "Staking Contract is not approved for this Token!");        

        balanceOf[msg.sender] += _amount;
        startTime[msg.sender] = block.timestamp;
        userInfo.push(UserInfo(msg.sender, block.timestamp, _amount));

        bool success = stakingToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        // require(success, "Failed to Stake");
        if (!success) {
            revert StakingPool__StakeFailed({required: _amount});
        }

        emit Staked(msg.sender, _amount, block.timestamp);
    }

    function withdraw() external {
        uint balance = balanceOf[msg.sender];
        require(balance > 0, "amount = 0");

        // two month = 2*30*24*60*60 = 5184000
        require((block.timestamp - startTime[msg.sender]) >= twoMonthTimeConstant, "User cannot claim rewards before due time!");

        balanceOf[msg.sender] = 0;
        endTime[msg.sender] = block.timestamp;
       

        bool success = stakingToken.transfer(msg.sender, balance);
        if (!success) {
            revert StakingPool__WithdrawFailed({required: balance});
        }

        emit WithdrawStake(msg.sender, balance, block.timestamp);
    }

    function getReward(address _account) public view returns (uint256) {
        require(balanceOf[_account] > 0, "amount = 0");

        return (balanceOf[_account] *(((block.timestamp - startTime[_account])) * APY) / 100);
    }

    function earnReward(address _account) external {
        uint256 reward = getReward(_account);
        bool success = rewardToken.mint(msg.sender, reward);
        if(! success) {
            revert StakingPool__WithdrawFailed({required: reward});
        }
    }


}