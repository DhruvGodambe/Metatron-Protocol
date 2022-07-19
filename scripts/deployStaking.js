const hre = require("hardhat");

async function main() {

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


    await staking.initialize("0xE63bafbfD8A92Fa0F3993e7290D0857ba52E9B47", "0x71379c2d2df68896e88a55bed8b969dd99d65c84", 90, 90)
    await stakingProxy.initialize(staking.address)

    console.log("Hola!");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
