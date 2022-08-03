const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

    // const Staking = await hre.ethers.getContractFactory("Staking");
    // const staking = await Staking.deploy();
    // await staking.deployed();
    // console.log("Staking deployed at ", staking.address);

    // const StakeFactory = await ethers.getContractFactory('StakeFactory');
    // const stakeFactory = await StakeFactory.deploy();
    // await stakeFactory.deployed();
    // console.log("Stake Factory deployed at ", stakeFactory.address);

    // const Enoch = await ethers.getContractFactory('Enoch');
    // const enoch = await Enoch.deploy();
    // await enoch.deployed();
    // console.log("Enoch deplyed at ", enoch.address);

    const PremiumNFT = await ethers.getContractFactory('PremiumNFT');
    const premiumNFT = await PremiumNFT.deploy("Knight Templer Distillery", "KTD");
    await premiumNFT.deployed();
    console.log("PremiumNFT deplyed at ", premiumNFT.address);

    // await staking.initialize(barrel.address, dkToken.address, 90, 90)
    // await stakeFactory.initialize(staking.address);

    // console.log("Hola!");

    // let's try deploying Staking from Factory
    // let tx = await stakeFactory.setupStakeContract(barrel.address, dkToken.address, 90, 90, {
    //     gasLimit: 10000000,
    //     gasPrice: 100000000000
    // });
    // console.log("new stake instance ", tx);
    // console.log("Heyaa!");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
