const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
//make main functin as logic and call in main fn;
const logic = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCore");
    console.log("Deploying ExchangeCore...");

    const ExchangeCoreV1 = await ExchangeCore.deploy();
    await ExchangeCoreV1.deployed();

    const tx1 = await ExchangeCoreV1.initialize(
          mintingFactoryAddress,
          adminRegistryAddress,
          treasuryAddress
      );
     const receipt1=  await tx1.wait();
      console.log("Exchange Core V1: ", ExchangeCoreV1);
      console.log("receipt1 : ", receipt1);

    console.log("ExchangeCoreV1 Contract deployed to: ", ExchangeCoreV1.address);

}

const main = async () => {
    await logic();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });