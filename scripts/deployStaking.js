const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

    const [account, account2] = await ethers.getSigners();

    const AdminRegistry = await ethers.getContractFactory("AdminRegistry");
    const adminRegistry = await AdminRegistry.deploy(account.address);
    await adminRegistry.deployed();
    console.log("AdminRegistry deployed at ", adminRegistry.address);

    const Staking = await hre.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();
    await staking.deployed();
    console.log("Staking deployed at ", staking.address);

    const StakeFactory = await ethers.getContractFactory('StakeFactory');
    const stakeFactory = await StakeFactory.deploy();
    await stakeFactory.deployed();
    console.log("Stake Factory deployed at ", stakeFactory.address);

    const Enoch = await ethers.getContractFactory('Enoch');
    const enoch = await Enoch.deploy(adminRegistry.address);
    await enoch.deployed();
    console.log("Enoch deplyed at ", enoch.address);

    const PremiumNFT = await ethers.getContractFactory('PremiumNFT');
    const premiumNFT = await PremiumNFT.deploy("Knight Templer Distillery", "KTD", adminRegistry.address);
    await premiumNFT.deployed();
    console.log("PremiumNFT deplyed at ", premiumNFT.address);

    await stakeFactory.initialize(staking.address, adminRegistry.address);

    console.log("Hola!");

    // let's try deploying Staking from Factory
    let tx = await stakeFactory.setupStakeContract(premiumNFT.address, enoch.address, 90, 3, adminRegistry.address, {
        gasLimit: 10000000,
        gasPrice: 100000000000
    });
    console.log("new stake instance ", tx);

    const receipt = await tx.wait();
    let event = receipt.events?.find((event) => event.event === "StakeCreated");
    console.log("contract: ", event?.args._stake);

    console.log("Heyaa!");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
