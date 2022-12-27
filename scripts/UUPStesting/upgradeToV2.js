const { ethers} = require("hardhat");
const hre = require("hardhat");

const main = async () => {

    const ExchangeCoreV1Address = "0x2116482b0E2CCeaeD6F87a9c2a9611Cd1D00b48D"; //Proxy address

    const ExchangeCoreV2 = await ethers.getContractFactory("ExchangeCoreV2");
    console.log("Upgrading ExchangeCoreV1 contract...");
    const upgrade = await upgrades.upgradeProxy(ExchangeCoreV1Address, ExchangeCoreV2, [
        "0x9725caA9Dc09884ABEDf8eD4C00703554027Fb49", //MintingFactory
        "0x69D260289D8422496F0BD50A17d6Ed6B98F1851E", //AdminRegistry
        "0x404DbBbD516d101b41Ce1671C9e5D0766272d047" //Treasury
    ], {
        initializer : "initialize",
    });
    console.log("ExchangeCoreV1 Upgraded to ExchangeCoreV2");
    console.log("Implementation V2 Contract upgraded at proxy :", upgrade.address);
    console.log("upgrade:",upgrade);
    
    // <==========================================================================> //    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });