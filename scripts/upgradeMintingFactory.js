const { ethers, upgrades } = require("hardhat");

// const UPGRADEABLE_PROXY = "0xe5Ed8792299d052825Ade90DEb81191c7DE16D61";

const main = async () => {
    [admin, account1] = await ethers.getSigners();
    console.log("Admin address : ", admin.address);
    // console.log("Account1 address : ", account1.address); 0xaC099D7d6057B7871D1076f2600e1163643d0822


    const nftContractFactory = await hre.ethers.getContractFactory("ERC721MintingFactory");
    console.log("Deploying ERC721 Minting Factory...");
    const nftFactory = await upgrades.deployProxy(nftContractFactory, {
        initializer : "initialize",
    });
    await nftFactory.deployed();
    console.log("NFT Factory : ", nftFactory);
    console.log("Contract deployed to: ", nftFactory.address);
    console.log("ProxyAdmin address: ",nftFactory.deployTransaction.to);

    //-----------------------------------------------------------------//

   const MintingFactoryV2 = await ethers.getContractFactory("ERC721MintingFactoryV2");
   console.log("Upgrading ERC721MintingFactoryV1 contract...");
   let upgrade = await upgrades.upgradeProxy(nftFactory.address, MintingFactoryV2);
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address);
   console.log("upgrade:",upgrade);

   //--------------------------------------------------------------------//

   let collectionAddress = await nftFactory.createNFTContract("BlockNormandyNew", "BNN");
        console.log("Collection created");

        const receipt = await collectionAddress.wait();
        console.log("Receipt", receipt);
        nftContract = receipt.events[0].args.nftContract;
        
        console.log("Event",receipt.events[0].args);
        console.log("NFT contract:", nftContract);
        
        nftContractInstance = await new ethers.Contract(nftContract, NFTContractabi.abi, admin);
        console.log("Contract Address: ", nftContract);
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