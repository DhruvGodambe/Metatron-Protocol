import { Address } from "cluster";

const { ethers} = require("hardhat");
const hre = require("hardhat");

const fs = require('fs');
const { writeFileSync } = require("fs");
const path = require('path');
const Book = require("../NFTMarketplace/marketplaceAddresses.json");

const NFTCollectionabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTCollection.sol/NFTCollection.json');
const IMintingFactory = require('../../artifacts/contracts/NFTMarketplace/Interface/IMintingFactory.sol/IMintingFactory.json');
const IAdminRegistry = require('../../artifacts/contracts/Registry/IAdminRegistry.sol/IAdminRegistry.json');
const AdminRegistryabi = require('../../artifacts/contracts/Registry/AdminRegistry.sol/AdminRegistry.json');
const mintingFactoryabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTMintingFactory.sol/NFTMintingFactory.json');
const exchangeCoreabi = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCore.sol/ExchangeCore.json');
// const nftCollectionabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTCollection.sol/NFTCollection.json');


const adminAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const adminRegistryAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
const treasuryAddress = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
const mintingFactoryAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
const exchangeCoreAddress = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82"

const PrivateKey = process.env.PRIVATE_KEY_LOCALHOST_1;
const providerURL = process.env.PROVIDER_URL;

/*
marketplaceInteraction.ts requirements:
1. createCollection
2. mintNFT
3. fixedPricePrimarySale
*/



const main = async () => {

  const provider = new ethers.providers.JsonRpcProvider(providerURL);
    // const account = new ethers.Wallet( PrivateKey , provider )
    // console.log("account",account);

    const accounts = await ethers.getSigners();
    const admin  = accounts[0];
    const treasury = accounts[9];
    console.log("Inside main function ========>");
    
    console.log("Admin address", admin.address);
    console.log("Treasury address", treasury.address);

    const AdminRegistry = new ethers.Contract(adminRegistryAddress, AdminRegistryabi.abi, provider);
    console.log("AdminRegistry",AdminRegistry);
    
    const tx1 = await AdminRegistry.isAdmin(adminAddress);
    console.log("Is Admin", tx1);

    console.log("<<<<=====================================================>>>>");

    const MintingFactory = new ethers.Contract(mintingFactoryAddress, mintingFactoryabi.abi, provider);
    console.log("AdminRegistry",AdminRegistry);

    //@ 1. Create NFT Collection
    console.log("@ 1. Creating NFT Collection");

    const tx2 = await MintingFactory.connect(admin).createNFTCollection("StephCurry", "SC", "https://ipfs.io/ipfs/");

    const receipt2 = await tx2.wait();

    let event2 = receipt2.events?.find((event:any) => event.event === "NFTCollectionCreated");
    console.log(event2);
    

    console.log("Name of Collection is : ", event2?.args.name);
    console.log("Symbol of Collection is : ", event2?.args.symbol);
    console.log("Collection is : ", event2?.args.nftCollection);
    
    console.log("<<<<=====================================================>>>>");

    console.log("Saving the data of Create Collection in a json file");

    let NFT_NAME = event2?.args.name;
    let NFT_SYMBOL = event2?.args.symbol;
    let NFT_COLLECTION = event2?.args.nftCollection;
            
            
            console.log("Writing a new file to store Marketplace address...");
            
            await writeFileSync(
              path.join(__dirname, 'nftCollection.json'),
              JSON.stringify(
                {
                  NFT_NAME,
                  NFT_SYMBOL,
                  NFT_COLLECTION
                },
                null,
                2
                )
                );
                
            console.log("<=====  Written NFT Collection data in nftCollection.json  =====>");



    console.log("<<<<=====================================================>>>>");

    const ExchangeCore = new ethers.Contract(exchangeCoreAddress, exchangeCoreabi.abi, provider);
    console.log("ExchangeCore : ",ExchangeCore);
    
    //@ 2. Updating Exchange Address
    console.log("Setting Exchange Address in Minting Factory");

    let tx = await MintingFactory.connect(admin).updateExchangeAddress(ExchangeCore.address);
    console.log("Update Exchange Address tx : ", tx);

    const receipt = await tx.wait();

    let event = receipt.events?.find((event:any) => event.event === "ExchangeAddressChanged");

    console.log("Updated Exchange Address is : ", event?.args.newExchange);


    console.log("<<<<===============================================================>>>>");

    //@ 3. mintNewNFT
    console.log("@ 3. Minting New NFT from NFT Collection contract");

    const NFTCollection = await hre.ethers.getContractFactory('NFTCollection');
    const nftCollection1 = await NFTCollection.deploy(
      "Saturday",
      "Work",
      adminRegistryAddress,
      "https://ipfs.io/ipfs/"
    );
    await nftCollection1.deployed();

    const tx3 = await nftCollection1.connect(admin).mintNewNFT();

    const receipt3 = await tx3.wait();
    console.log("receipt3 :", receipt3);

    console.log("NFT  Minted from NFT Collection");
    

    console.log("<<<<===============================================================>>>>");

    //@ 4. MintNFT
    console.log("@ 4. Minting NFT from Minting Factory");

    const tx4 = await MintingFactory.connect(exchangeCoreAddress).mintNFT(NFT_COLLECTION);

    const receipt4 = await tx4.wait();
    console.log("receipt4 :", receipt4);

    let event4 = receipt4.events?.find((event:any) => event.event === "NFTMinted");

    console.log("NFT  Minted from Minting Factory");
    
    

    console.log("<<<<===============================================================>>>>");

    const tx5 = await ExchangeCore.connect(admin).fixedPricePrimarySale(event2?.args.nftCollection,
      "2",
      "1",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "0xBF7386b82aEF544a0Fb114800f7aD02933Db434C"
    );

    const receipt5 = await tx5.wait();
    console.log("receipt5 :", receipt5);



};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });