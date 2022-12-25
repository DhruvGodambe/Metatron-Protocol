import { ethers } from "hardhat";
import { assert, expect } from "chai";
import {
    RWDToken,
    RWDToken__factory,
    RjToken,
    RjToken__factory,
    StakingPool,
    StakingPool__factory,
} from "../../typechain-types";
import { BigNumber, Signer } from "ethers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Staking Pool", () => {
    let accounts: Signer[], owner: Signer, user: Signer, user2: Signer;

    let ownerAddress: string, userAddress: string, user2Address: string;

    let rjTokenAddress: string, rwdTokenAddress: string, poolAddress: string;

    let RjToken: RjToken__factory,
        rjToken: RjToken,
        RWDToken: RWDToken__factory,
        rwdToken: RWDToken,
        StakingPool: StakingPool__factory,
        stakingPool: StakingPool;

    let RjTokenName: string = "RjToken";
    let RjTokenSymobol: string = "RJT";

    let RWDTokenName: string = "RWDToken";
    let RWDTokenSymobol: string = "RWD";

    let interval: BigNumber;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        owner = accounts[0];
        user = accounts[1];
        user2 = accounts[2];

        ownerAddress = await accounts[0].getAddress();
        userAddress = await accounts[1].getAddress();
        user2Address = await accounts[2].getAddress();

        //Staking Token

        RjToken = (await ethers.getContractFactory(
            "RjToken"
        )) as RjToken__factory;
        rjToken = await RjToken.deploy(RjTokenName, RjTokenSymobol);
        await rjToken.deployed();
        rjTokenAddress = rjToken.address;

        // Reward Token

        RWDToken = (await ethers.getContractFactory(
            "RWDToken"
        )) as RWDToken__factory;
        rwdToken = await RWDToken.deploy(RWDTokenName, RWDTokenSymobol);
        await rwdToken.deployed();
        rwdTokenAddress = rwdToken.address;

        // Staking Pool

        StakingPool = (await ethers.getContractFactory(
            "StakingPool"
        )) as StakingPool__factory;
        stakingPool = await StakingPool.deploy(rjTokenAddress, rwdTokenAddress);
        const poolReceipt = await stakingPool.deployed();
        poolAddress = stakingPool.address;
        interval = await stakingPool.minDuration();

        // Mint & Approve
        const mintAmount: number = 20000000;
        const mint = await rjToken
            .connect(owner)
            .mint(ownerAddress, mintAmount);

        const approve = await rjToken
            .connect(owner)
            .approve(poolAddress, mintAmount);

        const mintRWDAmount: number = 20000000;
        const mintRWD = await rwdToken
            .connect(owner)
            .mint(poolAddress, mintRWDAmount);

        // await time.increase(3600);
    });

    describe("Constructor", () => {
        it("Should set Staking Token Address correctly", async () => {
            const stakingAddress = await stakingPool.stakingToken();

            assert.equal(stakingAddress, rjTokenAddress);
        });

        it("Should set Reward Token Address correctly", async () => {
            const rewardAddress = await stakingPool.rewardToken();

            assert.equal(rewardAddress, rwdTokenAddress);
        });
    });

    describe("State Variable", () => {
        it("Should return value of Minimum Duration", async () => {
            let time: number = 60;
            const minDuration = await stakingPool.minDuration();

            assert.equal(minDuration.toNumber(), time);
        });

        it("Should return value of Annual reward percentage", async () => {
            let percentage: number = 20;
            const rewardPercentage = await stakingPool.rewardPercentage();

            assert.equal(rewardPercentage.toNumber(), percentage);
        });

        it("Should return value of YEAR in sec", async () => {
            let yearSec: number = 365 * 24 * 60 * 60;
            const YEAR = await stakingPool.YEAR();

            assert.equal(YEAR.toNumber(), yearSec);
        });
    });

    describe("Stake", () => {
        it("When User Stake, StakingToken will be sent to Staking Contract", async () => {
            const _amount: number = 10000000;

            const stake = await stakingPool.connect(owner).stake(_amount);
            const stakeReceipt = await stake.wait();

            const balanceOfPool = await rjToken
                .connect(owner)
                .balanceOf(poolAddress);

            assert.equal(_amount, balanceOfPool.toNumber());
        });
    });

    describe("Unstake", () => {
        it("When User Unstake, reward token should be sent to user", async () => {
            const _amount: number = 10000000;

            const stake = await stakingPool.connect(owner).stake(_amount);
            await stake.wait();

            //Time Travel
            await ethers.provider.send("evm_increaseTime", [
                interval.toNumber() + 120,
            ]);

            const _positionIndex: number = 0;
            const unstake = await stakingPool
                .connect(owner)
                .Unstake(_positionIndex);

            const unstakeReceipt = await unstake.wait();

            const reward = unstakeReceipt.events![2].args!._rewardAmount;

            const balanceOfUserRWD = await rwdToken
                .connect(owner)
                .balanceOf(ownerAddress);

            assert.equal(reward, balanceOfUserRWD.toNumber());
        });

        it("When User Unstake, Staking token should be sent to user", async () => {
            const _amount: number = 10000000;

            const stake = await stakingPool.connect(owner).stake(_amount);
            await stake.wait();

            //Time Travel
            await ethers.provider.send("evm_increaseTime", [
                interval.toNumber() + 120,
            ]);

            const _positionIndex: number = 0;
            const unstake = await stakingPool
                .connect(owner)
                .Unstake(_positionIndex);

            const unstakeReceipt = await unstake.wait();

            const intialAmount = unstakeReceipt.events![2].args!._stakedAmount;

            const balanceOfUserRJ = await rjToken
                .connect(owner)
                .balanceOf(ownerAddress);

            const currentBalance: number = 10000000;

            assert.equal(
                intialAmount,
                balanceOfUserRJ.toNumber() - currentBalance
            );
        });
    });
});
