import { Address } from "cluster";

const { ethers} = require("hardhat");
const hre = require("hardhat");

const NFTCollectionabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTCollection.sol/NFTCollection.json');
const IMintingFactory = require('../../artifacts/contracts/NFTMarketplace/Interface/IMintingFactory.sol/IMintingFactory.json');
const IAdminRegistry = require('../../artifacts/contracts/Registry/IAdminRegistry.sol/IAdminRegistry.json');


/*
marketplaceInteraction.ts requirements:
1. createCollection
2. mintNFT
3. fixedPricePrimarySale
*/



const main = async () => {
    const [admin] = await ethers.getSigners();

    const treasury = "0xaC099D7d6057B7871D1076f2600e1163643d0822";
    
    console.log("Deploying Admin Registry...");

    const AdminRegistry = await hre.ethers.getContractFactory("AdminRegistry");
    const adminRegistry = await AdminRegistry.deploy(admin.address);

    
    console.log("Admin address : ", admin.address);
    
    await adminRegistry.deployed();
    
    console.log("AdminRegistry address : ", adminRegistry.address);
    
    const tx1 = await adminRegistry.isAdmin(admin.address);
    // const receipt1 = await tx1.wait();
    console.log(admin.address, " is the admin of Admin Registry? ", tx1);

    console.log("<<<<=====================================================>>>>");

    console.log("Deploying Minting Factory...");
    
    const MintingFactory = await hre.ethers.getContractFactory("NFTMintingFactory");

    const mintingFactory = await MintingFactory.deploy(adminRegistry.address);    

    await mintingFactory.deployed();
    console.log("Minting Factory address : ", mintingFactory.address);

    console.log("<<<<=====================================================>>>>");

    //@ 1. Create NFT Collection

    console.log("@ 1. Creating NFT Collection");

    const tx2 = await mintingFactory.createNFTCollection("StephCurry", "SC", "https://ipfs.io/ipfs/");

    const receipt2 = await tx2.wait();

    let event2 = receipt2.events?.find((event:any) => event.event === "NFTCollectionCreated");
    console.log(event2);
    

    console.log("Name of Collection is : ", event2?.args.name);
    console.log("Symbol of Collection is : ", event2?.args.symbol);
    console.log("Collection is : ", event2?.args.nftCollection);



    console.log("<<<<=====================================================>>>>");

    console.log("Deploying Exchange Core...");

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCore");

    const exchangeCore = await ExchangeCore.deploy(mintingFactory.address, 
        adminRegistry.address, 
        treasury
    );    

    await exchangeCore.deployed();
    console.log("Exchange Core address : ", exchangeCore.address);


    console.log("<<<<=====================================================>>>>");

    console.log("Setting Exchange Address in Minting Factory");

    let tx = await mintingFactory.updateExchangeAddress(exchangeCore.address);
    console.log("Update Exchange Address tx : ", tx);

    const receipt = await tx.wait();

    let event = receipt.events?.find((event:any) => event.event === "ExchangeAddressChanged");

    console.log("Updated Exchange Address is : ", event?.args.newExchange);

    console.log("<<<<===============================================================>>>>");

    //@ 2. Mint NFT

    console.log("@ 2. Minting NFT");
    

    const tx3 = await mintingFactory.mintNFT("0x115f303ee8bCa7899D40EeE33B5f33551EEebA9c", "StephenCurry30GoldenStateWarriors").onlyExchange(exchangeCore.address);

    const receipt3 = await tx3.wait();
    console.log("receipt3 :", receipt3);
    
    
    let event3 = receipt3.events?.find((event:any) => event.event === "NFTMinted");
    console.log(event3);



};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });