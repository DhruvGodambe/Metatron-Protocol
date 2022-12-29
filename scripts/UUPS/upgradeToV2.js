const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
//deploylogicV2, then call upgradeTo fn
//fn: upgradeToV2, call in main
const main = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCoreV2");
    console.log("Deploying ExchangeCoreV2...");

    const ExchangeCoreV2 = await ExchangeCore.deploy();
    await ExchangeCoreV2.deployed();

    const tx1 = await ExchangeCoreV2.initialize(
          mintingFactoryAddress, //MintingFactory
          adminRegistryAddress, //AdminRegistry
          treasuryAddress //Treasury
      );
     const receipt1=  await tx1.wait();
      console.log("Exchange Core V2: ", ExchangeCoreV2);
      console.log("receipt1 : ", receipt1);

    console.log("ExchangeCoreV2 Contract deployed to: ", ExchangeCoreV2.address);


    // <==========================================================================> //    

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });