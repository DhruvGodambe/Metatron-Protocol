const { expect } = require("chai");
const { ethers } = require("hardhat");

let accounts, owner, ownerAddress, Staking, StakingInstance, EnochInstance, Enoch, PremiumNFTInstance, PremiumNFT;

describe("===================>Staking<==================", () => {
        
    before(async () => {
        [accounts] = await ethers.getSigners();
        owner = await ethers.getSigners();
        ownerAddress = await owner.address;

        Staking = await ethers.getContractFactory("Staking");
        StakingInstance = await Staking.deploy();
        await StakingInstance.deployed();
    console.log("Staking deployed at ", StakingInstance.address);

        Enoch = await ethers.getContractFactory("Enoch");
        EnochInstance = await Enoch.deploy();
        await EnochInstance.deployed();
    console.log("Enoch deployed at ", EnochInstance.address);

        PremiumNFT = await ethers.getContractFactory("PremiumNFT");
        PremiumNFTInstance = await PremiumNFT.deploy("PremiumNFT", "PNFT");
        await PremiumNFTInstance.deployed();
    console.log("PremiumNFT deployed at ", PremiumNFTInstance.address);

    });

    it('should initialize the function', async () => {
        await StakingInstance.initialize(PremiumNFTInstance.address, EnochInstance.address, 90, 90);
        
    });

    it('should stake', async () => {
        // ownerAddress = await owner.address;
        let tx1 = await PremiumNFTInstance.connect(owner).mint(ownerAddress, 1);
    let tx2 = await PremiumNFTInstance.connect(owner).approve(StakingInstance.address, 1);
    let tx3 = await StakingInstance.connect(owner).setRewardConstant(11741);

    let tx = await StakingInstance.connect(owner).stake(ownerAddress, 1, 100);
    console.log("Staked!");

    console.log("\nUser Stake Info\n");
    let tx4 = await StakingInstance.connect(owner).getStakedInfo(ownerAddress, 1);
    console.log(tx4);

    });

    it('should claim reward', async () => {
        ownerAddress = await owner.address;
        await StakingInstance.connect(owner).claimReward(ownerAddress, 1);
        console.log("reward claimed");
    });

    it('should calculate reward', async () => {
        const REWARD_CONSTANT = 11741;
        const rewards = 5*REWARD_CONSTANT;
        const rewardInstallment = rewards/3;
        expect(await StakingInstance._calculateRewards(5)).to.equal('58705', '19568.33');
        
    });
    
    it('should set reward constant', async () => {
        let x = 0.90;
        x += 1; 
        console.log("x", x);
        let y = 0.25;
        console.log("y", y);

        let val = (x**y).toPrecision(5);
        console.log("exponent", val);

        const reward_constant = val*10**4;
        console.log('Reward Constant', reward_constant);
        await StakingInstance.setRewardConstant(11741);
        expect(reward_constant.toString()).to.equal('11741');

});

    it('should get staked info', async () => {
        ownerAddress = await owner.address;
        await StakingInstance.getStakedInfo(ownerAddress, 1);
        
    });

    it('should get pending rewards info', async () => {
        ownerAddress = await owner.address;
        const Reward_info = await StakingInstance.getPendingRewardsInfo(ownerAddress, 1);
        expect(Reward_info).to.equal(0);
    });
    
})