const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

    // let StakingFactory;
    // let Staking;
    // let StakingProxyFactory;
    // let StakingProxy;
    // let StakeFactoryFactory;
    // let StakeFactory;
    // let DKFactory;
    // let DKToken;
    // let BarrelFactory;
    // let Barrel;


    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();
    await staking.deployed();
    console.log("Staking deployed at ", staking.address);

    const StakingProxy = await ethers.getContractFactory('StakingProxy');
    const stakingProxy = await StakingProxy.deploy(staking.address, "0x", {
        gasLimit: 10000000,
        gasPrice: 100000000000
    });
    await stakingProxy.deployed();
    console.log("Proxy deployed at ", stakingProxy.address);

    const StakeFactory = await ethers.getContractFactory('StakeFactory');
    const stakeFactory = await StakeFactory.deploy();
    await stakeFactory.deployed();
    console.log("Stake Factory deployed at ", stakeFactory.address);

    const DKToken = await ethers.getContractFactory('DKToken');
    const dkToken = await DKToken.deploy();
    await dkToken.deployed();
    console.log("DKToken deplyed at ", dkToken.address);

    const Barrel = await ethers.getContractFactory('Barrel');
    const barrel = await Barrel.deploy();
    await barrel.deployed();
    console.log("Barrel deplyed at ", barrel.address);

    await staking.initialize(barrel.address, dkToken.address, 90, 90)
    await stakingProxy.initialize(staking.address)
    await stakeFactory.initialize(staking.address);

    console.log("Hola!");

    // let's try deploying Staking from Factory
    let tx = await stakeFactory.setupStakeContract(barrel.address, dkToken.address, 90, 90, {
        gasLimit: 10000000,
        gasPrice: 100000000000
    });
    console.log("new stake instance ", tx);
    console.log("Heyaa!");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
