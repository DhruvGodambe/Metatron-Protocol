const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;

const main = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCore");
    console.log("Deploying ExchangeCore...");

    const ExchangeCoreV1 = await ExchangeCore.deploy();
    await ExchangeCoreV1.deployed();

    const tx1 = await ExchangeCoreV1.initialize(
          mintingFactoryAddress, //MintingFactory
          adminRegistryAddress, //AdminRegistry
          treasuryAddress //Treasury
      );
     const receipt1=  await tx1.wait();
      console.log("Exchange Core V1: ", ExchangeCoreV1);
      console.log("receipt1 : ", receipt1);

    console.log("ExchangeCoreV1 Contract deployed to: ", ExchangeCoreV1.address);


    // <==========================================================================> //    

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });