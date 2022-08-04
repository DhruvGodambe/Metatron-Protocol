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
    let userAddress: string;
    let userAddress2: string;
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
        console.log("BeforeALL set");
    
      });

    this.beforeEach(async () => {
        // [accounts] = await ethers.getSigners();
        // owner = await ethers.getSigners();
        // user = await ethers.getSigners();
        // ownerAddress = await owner.address;
        // userAddress = await user.address;
        console.log("Setting beforeEach");

        owner = accounts[0];
        user = accounts[1];
        ownerAddress = await accounts[0].getAddress();
        userAddress = await accounts[1].getAddress();
        // userAddress2 = await accounts[2].getAddress();

        adminRegistry = await AdminRegistry.deploy(ownerAddress);
        await adminRegistry.deployed();
    console.log("AdminRegistry deployed at ", adminRegistry.address);

        staking = await Staking.deploy();
        await staking.deployed();
    console.log("Staking deployed at ", staking.address);

        stakeFactory = await StakeFactory.deploy();    
        await stakeFactory.deployed();
    console.log("Factory deployed at ", stakeFactory.address);
        
        enoch = await Enoch.deploy(adminRegistry.address);
        await enoch.deployed();
    console.log("Enoch deployed at ", enoch.address);
        
        premiumNFT = await PremiumNFT.deploy("Knight Templer Distillery", "KTD", adminRegistry.address);
        await premiumNFT.deployed();
    console.log("PremiumNFT deployed at ", premiumNFT.address);
        
    
});

    it('should initialize the stakeFactory', async () => {
        await stakeFactory.initialize(staking.address, adminRegistry.address);
        
    });

    it('Should set up staking contract', async () => {
        let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address);
    
    const receipt = await tx.wait();
    let event = receipt.events?.find((event:any) => event.event === "StakeCreated");
    console.log("event: ", event?.args);

    StakingInstance = await Staking.attach(event?.args?._stake);
    console.log("Staking Instance", StakingInstance);

    console.log("Let's fetch some public values from StakingInstance");

    let rewardToken = await StakingInstance.rewardToken();
    console.log("reward Token", rewardToken);
        
    });

    it('should stake', async () => {
        let tx1 = await premiumNFT.connect(owner).mint(ownerAddress, 1);
        let tx2 = await premiumNFT.connect(owner).approve(staking.address, 1);
        let tx3 = await staking.connect(owner).setRewardConstant(11663);

        let tx = await staking.connect(owner).stake(ownerAddress, 1, 100);
        console.log("Staked!");

    });

    it('should claim reward', async () => {
        console.log("The owner calling", ownerAddress);
        let tx1 = await staking.setRewardConstant(11663);
        console.log(tx1);
        let tx = await staking._calculateRewards(100);
        console.log(tx);
        await staking.connect(owner).claimReward(ownerAddress, 1);
        console.log("Reward claimed");
    });

    it('should calculate reward', async () => {
        let tx1 = await staking.setRewardConstant(11663);
        let tx = await staking._calculateRewards(100);
        expect(tx).to.equal('1166300', '');

    });
    
    it('should set reward constant', async () => {
        let x = 0.90;
        x += 1; 
        console.log("x", x);
        let y = 0.25;
        console.log("y", y);

        let val:any = (x**y).toPrecision(5);
        console.log("exponent", val);

        const reward_constant = val*10**4;
        console.log('Reward Constant', reward_constant);
        expect(await staking.setRewardConstant(11663)).to.equal('11663');

});

    it('should get staked info', async () => {

        let tx1 = await premiumNFT.connect(owner).mint(ownerAddress, 1);
        let tx2 = await premiumNFT.connect(owner).approve(staking.address, 1);
        let tx3 = await staking.connect(owner).setRewardConstant(11663);

        let tx = await staking.connect(owner).stake(ownerAddress, 1, 100);
        console.log("Staked!");

        console.log("\nUser Stake Info\n");
        let tx4 = await staking.connect(owner).getStakedInfo(ownerAddress, 1);
        console.log(tx4);
        
    });

    it('should get pending rewards info', async () => {
        let tx = await staking.connect(owner).getStakedInfo(ownerAddress, 1);
        console.log(tx);
        const Reward_info1 = await staking.getStakedInfo.totalClaimableRewards;
        const Reward_info2 = await staking.getStakedInfo.claimedRewards;
        const Reward_info = Reward_info1 - Reward_info2;
        await staking.connect(owner).getPendingRewardsInfo(ownerAddress, 1) == Reward_info;
        expect(Reward_info).to.equal(0);
    });
    
})