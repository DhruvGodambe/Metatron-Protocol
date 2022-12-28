const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const main = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCore");
    console.log("Deploying ExchangeCore...");

    const ExchangeCoreV1 = await ExchangeCore.deploy();
    await ExchangeCoreV1.deployed();

    const tx1 = await ExchangeCoreV1.initialize(
          "0x9725caA9Dc09884ABEDf8eD4C00703554027Fb49", //MintingFactory
          "0x69D260289D8422496F0BD50A17d6Ed6B98F1851E", //AdminRegistry
          "0x404DbBbD516d101b41Ce1671C9e5D0766272d047" //Treasury
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