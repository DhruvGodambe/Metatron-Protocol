const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0xe5Ed8792299d052825Ade90DEb81191c7DE16D61";

const main = async () => {
   const MintingFactoryV2 = await ethers.getContractFactory("ERC721MintingFactoryV2");
   console.log("Upgrading ERC721MintingFactoryV1 contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, MintingFactoryV2, {
    initializer : "initialize",
    });
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();