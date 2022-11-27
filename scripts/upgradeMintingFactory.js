const { ethers, upgrades } = require("hardhat");

// const UPGRADEABLE_PROXY = "0xe5Ed8792299d052825Ade90DEb81191c7DE16D61";

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory("ERC721MintingFactoryV2");
    console.log("Deploying ERC721 Minting Factory...");
    const nftFactory2 = await upgrades.deployProxy(nftContractFactory, {
        initializer : "initialize",
    });
    await nftFactory2.deployed();
    console.log("Contract deployed to: ", nftFactory2.address);

   const MintingFactoryV2 = await ethers.getContractFactory("ERC721MintingFactoryV2");
   console.log("Upgrading ERC721MintingFactoryV1 contract...");
   let upgrade = await upgrades.upgradeProxy("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", MintingFactoryV2);
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address);
   console.log("upgrade:",upgrade);
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