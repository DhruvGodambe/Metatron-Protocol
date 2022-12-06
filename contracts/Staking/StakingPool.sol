// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../Tokens/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


error StakingPool__StakeFailed(uint256 required);
error StakingPool__WithdrawFailed(uint256 required);

contract StakingPool {

    using Counters for Counters.Counter;
    Counters.Counter private positionId;

    struct UserInfo {
        uint32 positionId;
        uint256 startTime;
        uint256 endTime;
        uint256 tokenStakedAmount;
        
    }

    // UserInfo[] public userInfo;

    IERC20 public immutable stakingToken; //RJToken
    IERC20 public immutable rewardToken; //RWDToken

    mapping(address => UserInfo[]) public userPositions; 
    mapping(address => uint256) public balanceOf; //RJToken balance of a user
    mapping(address => uint256) public rewards; // User address => rewards already claimed

    // use openzepplin counter contract
    // uint32 public positionIdCounter;
    uint256 public APY;
    uint256 public constant PRECISION_CONSTANT = 10000;
    uint256 public stakingTimeConstant; 

    event Staked(
        address indexed _user,
        uint256 indexed _amount,
        uint256 _timestamp,
        uint256 indexed positionId
    );

    event Unstake(
        address indexed _user,
        uint256 indexed _amount,
        uint256 _timestamp
    );

    event RewardsClaimed(address indexed _user, uint256 _rewardAmount, uint256 _timestamp);


    constructor(address _stakingToken, address _rewardToken, uint256 _APY, uint256 _stakingTimeConstant) {
        owner = msg.sender;
        stakingToken = IERC20(_stakingToken); //RJToken
        rewardToken = IERC20(_rewardToken); //RWDToken
        APY = _APY;
        stakingTimeConstant = _stakingTimeConstant; // e.g. 2HR = 2*60*60 = 7200 sec
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function stake(uint _amount) external {
        require(_amount > 0, "amount cannot be 0");

        // check for approval         
        require(stakingToken.allowance(msg.sender, address(this)) >= _amount, "Staking Contract is not approved for this Token or approved amount is not equal to given amount" );  

        if(userPositions[msg.sender].positionId != 0 && msg.sender != address(0)) {
            // keep track of how much this user has staked
            uint256 position = userPositions[msg.sender].positionId.increment();
            userPositions[msg.sender].positionId = position ; 
            userPositions[msg.sender].startTime = block.timestamp;
            userPositions[msg.sender].tokenStakedAmount += _amount;
        }    


        bool success = stakingToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!success) {
            revert StakingPool__StakeFailed({required: _amount});
        }

        // 1. get users existing position and store it an array
        // 2. condition if user position empty creatae new array or else push new position in the user position array
        // set position id
        //3. update user position for perticular user
        // increment position id counter

        emit Staked(msg.sender, _amount, block.timestamp, position);
    }

    function withdraw() external {
        uint balance = userPositions[msg.sender].tokenStakedAmount; // create position for balances
        require(balance > 0, "amount = 0");

        require((block.timestamp - startTime[msg.sender]) >= stakingTimeConstant, "User cannot claim rewards before due time!");

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
        // get user position 
        // based on user positions claculate reward for each position for loop
        uint256 tokenStakedAmount 
        tokenStaked 
        // create precision constant = 10000 
        // save it in reward var
    }

    function earnReward(address _account) external {
        uint256 reward = getReward(_account); // should rename to  calculate reward 
        bool success = rewardToken.mint(msg.sender, reward);
        if(! success) {
            revert StakingPool__WithdrawFailed({required: reward});
        }
    }

    // get all position of the given user
    function getPositions (address _account) public view returns (uint256) {
        return 
    }

    // user position of _address return array of all user position
    //earned reward will take _address and positionId and return reward of particular postionId

}