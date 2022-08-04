import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { log } from "console";

const { expectRevert, time } = require("@openzeppelin/test-helpers");

describe("===================>Staking<==================",function () {
    let accounts: Signer[];
    let owner: Signer;
    let ownerAddress: string; 
    let user: Signer;
    let Staking: any;
    let staking: any; 
    let enoch: any;
    let Enoch: any;
    let premiumNFT: any;
    let PremiumNFT: any;
    let AdminRegistry: any;
    let adminRegistry: any;
    let StakeFactory: any;
    let stakeFactory: any;

    let StakingInstance: any;

    this.beforeAll(async function () {
        accounts = await ethers.getSigners();
    
        AdminRegistry = await ethers.getContractFactory("AdminRegistry");
        Staking = await ethers.getContractFactory("Staking");
        StakeFactory = await ethers.getContractFactory("StakeFactory");
        Enoch = await ethers.getContractFactory('Enoch');
        PremiumNFT = await ethers.getContractFactory('PremiumNFT');
    
      });

    this.beforeEach(async () => {
        
        owner = accounts[0];
        user = accounts[1];
        ownerAddress = await accounts[0].getAddress();
        // userAddress = await accounts[1].getAddress();
        
        adminRegistry = await AdminRegistry.deploy(ownerAddress);
        await adminRegistry.deployed();
    // console.log("AdminRegistry deployed at ", adminRegistry.address);

        staking = await Staking.deploy();
        await staking.deployed();
    // console.log("Staking deployed at ", staking.address);

        stakeFactory = await StakeFactory.deploy();    
        await stakeFactory.deployed();
    // console.log("Factory deployed at ", stakeFactory.address);
    
    enoch = await Enoch.deploy(adminRegistry.address);
    await enoch.deployed();
    // console.log("Enoch deployed at ", enoch.address);
    
    premiumNFT = await PremiumNFT.deploy("Knight Templer Distillery", "KTD", adminRegistry.address);
    await premiumNFT.deployed();
    // console.log("PremiumNFT deployed at ", premiumNFT.address);
    
    await stakeFactory.initialize(staking.address, adminRegistry.address);
    
});


    it('INITIALIZING STAKING CONTRACT', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt = await tx.wait();
        let event = receipt.events?.find((event:any) => event.event === "StakeCreated");
        console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        // console.log("Staking Instance", StakingInstance);

        console.log("fetching some public values from StakingInstance");
        let rewardToken = await StakingInstance.rewardToken();
        console.log("reward Token", rewardToken);
        
    });

    it('should STAKE', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt = await tx.wait();
        let event = receipt.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;
        
        console.log("\nHere are the steps involved in staking: \n");
        
        let tx1 = await premiumNFT.connect(owner).mint(ownerAddress);
        console.log("Minting done");
        
        let tx2 = await premiumNFT.connect(owner).approve(stakingAddress, 1);
        console.log("Approve done");

        let tx3 = await StakingInstance.connect(owner).setRewardConstant(11663);
        console.log("Reward Constant set");
        
        let tx4 = await StakingInstance.connect(owner).stake(ownerAddress, 1, 100);
        console.log("Staked!");

        const receipt2 = await tx4.wait();
        const event2 = receipt2.events?.find((event:any) => event.event === "NFTStaked");
        console.log("\nHere are the events emitted out of 'NFTStaked' :\n");
        
        console.log("User staking the NFT is: ", event2?.args.user);
        console.log("Token ID is: ", event2?.args.tokenId.toString());
        console.log("Initial Balance is: ", event2?.args.initialBalance.toString());
        console.log("Timestamp is: ", event2?.args.timestamp.toString());

    });

    it('should CLAIM REWARD', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt1 = await tx.wait();
        let event = receipt1.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;

        console.log("\nHere are the steps involved in staking: \n");
        let tx1 = await premiumNFT.connect(owner).mint(ownerAddress);
        console.log("mint done");
        
        let tx2 = await premiumNFT.connect(owner).approve(stakingAddress, 1);
        console.log("approve done");

        let tx3 = await StakingInstance.connect(owner).setRewardConstant(11663);
        console.log("reward constant set");
        
        let tx4 = await StakingInstance.connect(owner).stake(ownerAddress, 1, 100);
        console.log("Staked!");

        let tx5 = await StakingInstance.connect(owner)._calculateRewards(100);
        console.log("Rewards Calculated");

        let tx6 = await StakingInstance.connect(owner).claimReward(ownerAddress, 1);
        console.log("Rewards claimed!");

        const receipt2 = await tx6.wait();
        const event2 = receipt2.events?.find((event:any) => event.event === "RewardsClaimed");
        console.log("\nHere are the events emitted out of 'RewardsClaimed' :\n");
        console.log("User is: ", event2?.args._user.toString());
        console.log("Staked Token ID is: ", event2?.args._stakedTokenId.toString());
        console.log("Reward Amount is: ", event2?.args._rewardAmount.toString());
        console.log("Timestamp is: ", event2?.args._timestamp.toString());

    });

    it('should CALCULATE REWARD', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt1 = await tx.wait();
        let event = receipt1.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;

        console.log("\nHere are the steps involved in calculating the Rewards: \n");
        let tx1 = await StakingInstance.connect(owner).setRewardConstant(11663);
        console.log("Reward Constant set");

        let tx2 = await StakingInstance.connect(owner)._calculateRewards(100);
        console.log("Rewards Calculated");
        const receipt2 = await tx2.wait();
        const event2 = receipt2.events?.find((event:any) => event.event === "MsgSender");
        console.log("\nHere are the events emitted out of 'MsgSender' :\n");
        console.log("Sender's address is: ", event2?.args._sender.toString());
    });
    
    it('should SET REWARD CONSTANT', async () => {
//         // let x = 0.90;
//         // x += 1; 
//         // console.log("x", x);
//         // let y = 0.25;
//         // console.log("y", y);

//         // let val:any = (x**y).toPrecision(5);
//         // console.log("exponent", val);

//         // const reward_constant = val*10**4;
//         // console.log('Reward Constant', reward_constant);

        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt1 = await tx.wait();
        let event = receipt1.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;

        let tx1 = await StakingInstance.connect(owner).setRewardConstant(11663);
        console.log("Reward Constant set");
        // console.log(tx1);
        // expect(tx1.toString()).to.equal('11663');

});

    it('should GET STAKED INFO', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt = await tx.wait();
        let event = receipt.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);

        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;
        
        console.log("\nHere are the steps involved in Staking: \n");
        let tx1 = await premiumNFT.connect(owner).mint(ownerAddress);
        console.log("mint done");
        
        let tx2 = await premiumNFT.connect(owner).approve(stakingAddress, 1);
        console.log("approve done");
        let tx3 = await StakingInstance.connect(owner).setRewardConstant(11663);
        console.log("reward constant set");
        
        let tx4 = await StakingInstance.connect(owner).stake(ownerAddress, 1, 100);
        console.log("Staked!");

        console.log("\nUser Stake Info\n");
        let tx5 = await StakingInstance.connect(owner).getStakedInfo(ownerAddress, 1);
        console.log("stakingTimestamp, stakedAmount, totalClaimableRewards, claimedRewards, rewardInstallment, lastWithdrawalTime is: ", tx5.toString(), "respectively.");
        
    });

    it('should GET PENDING REWARDS INFO', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
        const receipt = await tx.wait();
        let event = receipt.events?.find((event:any) => event.event === "StakeCreated");
        // console.log("event: ", event?.args);
    
        StakingInstance = await Staking.attach(event?.args?._stake);
        let stakingAddress: any = event?.args?._stake;
        
        let tx1 = await StakingInstance.connect(owner).getPendingRewardsInfo(ownerAddress, 1);
        console.log("Pending reward INfo is: ",tx1.toString());
        
        expect(tx1).to.equal(0);
    });
    
});