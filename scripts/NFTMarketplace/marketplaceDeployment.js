import { Address } from "cluster";

const { ethers} = require("hardhat");
const hre = require("hardhat");

const NFTCollectionabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTCollection.sol/NFTCollection.json');
const IMintingFactory = require('../../artifacts/contracts/NFTMarketplace/Interface/IMintingFactory.sol/IMintingFactory.json');
const IAdminRegistry = require('../../artifacts/contracts/Registry/IAdminRegistry.sol/IAdminRegistry.json');


/*
marketplaceDeployment.ts requirements:
1. deploy adminregistry 
2. set admin addresses
3. deploy mintingfactory
4. deploy exchangeCore
5. set exchange address in minting factory
*/


let admin, treasury;


const main = async () => {
    [admin, treasury] = await ethers.getSigners();
    
    console.log("Deploying Admin Registry...");
    

    const AdminRegistry = await hre.ethers.getContractFactory("AdminRegistry");
    const adminRegistry = AdminRegistry.deploy(admin.address);

    // const tx = await adminRegistry.isAdmin(admin.address);
    // const receipt = await tx.wait();
    // console.log("Admin get from Admin Registry is : ", receipt);
    
    console.log("Admin address : ", admin.address);

    await adminRegistry.deployed();

    console.log("AdminRegistry address : ", adminRegistry.address);

    //=======================================

    console.log("Deploying Minting Factory...");
    
    const MintingFactory = await hre.ethers.getContractFactory("NFTMintingFactory");

    const mintingFactory = MintingFactory.deploy(adminRegistry.address);    

    await mintingFactory.deployed();
    console.log("Minting Factory address : ", mintingFactory.address);

    //========================================

    console.log("Deploying Exchange Core");

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCore");

    const exchangeCore = ExchangeCore.deploy(IMintingFactory(mintingFactory.address), 
        IAdminRegistry(adminRegistry.address), 
        treasury.address
    );    

    await exchangeCore.deployed();
    console.log("Exchange Core address : ", exchangeCore.address);

    //=========================================

    console.log("Setting Exchange Address in Minting Factory");

    let tx1 = await mintingFactory.updateExchangeAddress(exchangeCore.address);
    console.log("Update Exchange Address tx : ", tx1);

    const receipt1 = await tx1.wait();

    let event = receipt1.events?.find((event:any) => event.event === "ExchangeAddressChanged");

    console.log("Updated Exchange Address is : ", event?.args.newExchange);

    //=========================================

    



};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });