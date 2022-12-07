//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "../Tokens/IERC20.sol";
import "hardhat/console.sol";

error StakingPool__StakeFailed(uint256 required);
error StakingPool__WithdrawFailed(uint256 required);

contract StakingPool {

    using Counters for Counters.Counter;
    Counters.Counter private positionIdCounter;

    address public owner;

    struct UserInfo {
        uint256 positionId;
        uint256 startTime;
        uint256 endTime;
        uint256 tokenStakedAmount;        
    }
    // UserInfo[] public userInfo;

    IERC20 public immutable stakingToken; //RJToken
    IERC20 public immutable rewardToken; //RWDToken

    mapping(address => UserInfo[]) public userPositions; 
    // User address => rewards already claimed
    mapping(address => uint256) public rewards;

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
        APY = _APY; // 20 %
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
        
        UserInfo memory currentUserInfo = UserInfo(positionIdCounter.current(), block.timestamp, block.timestamp + stakingTimeConstant, _amount);
        
        UserInfo[] storage currentUserPositions = userPositions[msg.sender];

        if(currentUserPositions.length > 0) {
            currentUserPositions.push(currentUserInfo);
        } else {

            
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

        emit Staked(msg.sender, _amount, block.timestamp, positionIdCounter.current());
        positionIdCounter.increment();
    }

    function withdraw(uint256 _positionId) external {
        // for loop on which user position of msg sender will return an array
        // in for loop compare every element of every array with positioId of the argument
        //if the postionid matches with struct use that struct withdrawing further
        // uint256 balance = userPositions[msg.sender]._positionId.tokenStakedAmount; // create position for balances
        // require(balance > 0, "you have not staked token");

        // uint256 position = userPositions[msg.sender].positionId;
        // require(position > 0 , "you have to stack first");

        // require((block.timestamp - userPositions[msg.sender].startTime) >= stakingTimeConstant, "User cannot claim rewards before due time!");

        // userPositions[msg.sender].endTime = block.timestamp;

        // bool success = stakingToken.transfer(msg.sender, balance);
        // if (!success) {
        //     revert StakingPool__WithdrawFailed({required: balance});
        // }

        // emit Unstake(msg.sender, balance, block.timestamp);
    }

    function getReward(address _account) public view returns (uint256) {
        // uint256 balance = userPositions[msg.sender].tokenStakedAmount;
        // require(balance > 0, "you have not staked token");

        // // get user position 
        // for(uint i = 0; i<= userPositions[msg.sender].positionId; i++) {
        // return (userPositions[msg.sender].i.tokenStakedAmount *(((block.timestamp - userPositions[_account].startTime)) * APY) / PRECISION_CONSTANT);

        }
        // based on user positions claculate reward for each position for loop
        // create precision constant = 10000 
        // save it in reward var
    

    // function claimReward(address _account, uint _positionId) external {
    //     uint256 reward = userPositions[_account]._positionId.tokenStakedAmount * ((((block.timestamp - userPositions[_account].startTime) ) * APY) / PRECISION_CONSTANT );
    //     bool success = rewardToken.mint(msg.sender, reward);
    //     if(! success) {
    //         revert StakingPool__WithdrawFailed({required: reward});
    //     }
        
    //     emit RewardsClaimed(_account, reward, block.timestap);
    // }

    // // get all position of the given user
    // function getPositions (address _account) public view returns (uint256) {
    //     return userPositions[msg.sender];
    // }
}