import { ethers } from "hardhat";
import {
    RWDToken,
    RWDToken__factory,
    RjToken,
    RjToken__factory,
    StakingPool,
    StakingPool__factory,
} from "../../typechain-types";
import { setTimeout } from "timers/promises";

const main = async () => {
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
    let rjTokenAddress: string, rwdTokenAddress: string, poolAddress: string;

    const accounts = await ethers.getSigners();

    const owner = accounts[0];
    const user = accounts[1];

    const ownerAddress = await accounts[0].getAddress();
    const userAddress = await accounts[1].getAddress();
    const user2Address = await accounts[2].getAddress();
    const user3Address = await accounts[3].getAddress();

    console.log("\n---------- Deploying RJToken Contract ----------");

    RjToken = (await ethers.getContractFactory("RjToken")) as RjToken__factory;
    rjToken = await RjToken.deploy(RjTokenName, RjTokenSymobol);
    await rjToken.deployed();
    rjTokenAddress = rjToken.address;

    console.log(`RjToken deployed at --> ${rjTokenAddress}`);

    console.log("\n---------- Deploying RWDToken Contract ----------");

    RWDToken = (await ethers.getContractFactory(
        "RWDToken"
    )) as RWDToken__factory;
    rwdToken = await RWDToken.deploy(RWDTokenName, RWDTokenSymobol);
    await rwdToken.deployed();
    rwdTokenAddress = rwdToken.address;

    console.log(`RWDToken deployed at --> ${rwdTokenAddress}`);

    console.log("\n---------- Deploying StakingPool Contract ----------");

    StakingPool = (await ethers.getContractFactory(
        "StakingPool"
    )) as StakingPool__factory;
    stakingPool = await StakingPool.deploy(rjTokenAddress, rwdTokenAddress);
    const poolReceipt = await stakingPool.deployed();
    poolAddress = stakingPool.address;

    console.log(poolReceipt);

    console.log("\n----------------------------------------------\n");
    const mintAmount: number = 20000000;
    const mint = await rjToken.connect(owner).mint(ownerAddress, mintAmount);

    const rjBalance = await rjToken.connect(owner).balanceOf(ownerAddress);
    console.log(rjBalance);

    const approve = await rjToken
        .connect(owner)
        .approve(poolAddress, mintAmount);

    console.log("\n----------------------------------------------\n");

    let _amount: number = 10000000;
    const tx1 = await stakingPool.connect(owner).stake(_amount);
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);

    let time = tx1Receipt.events![2].args!._timestamp;
    let date = new Date(time * 1000).toLocaleTimeString("it-IT");

    console.log(
        `\nStaked User Address -->${tx1Receipt.events![2].args!._user}`
    );
    console.log(`\nStaked Amount -->${tx1Receipt.events![2].args!._amount}`);
    console.log(`\nStaked Time -->${date}`);

    console.log("\n----------------------------------------------\n");

    const rwdBalance = await rwdToken.connect(owner).balanceOf(ownerAddress);
    console.log(rwdBalance);

    console.log("\n----------------------------------------------\n");
    const _positionIndex: number = 0;

    const tx2 = await stakingPool.connect(owner).Unstake(_positionIndex);
    
    const tx2Receipt = await tx2.wait();
    console.log(tx2Receipt);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
