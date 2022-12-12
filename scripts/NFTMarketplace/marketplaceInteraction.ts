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
const enochTokenabi = require('../../artifacts/contracts/Tokens/Enoch.sol/Enoch.json');


const adminAddress = Book.ADMIN_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const exchangeCoreAddress = Book.EXCHANGE_CORE_ADDRESS;
const enochTokenAddress = Book.ENOCHTOKEN_ADDRESS;

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

    const accounts = await ethers.getSigners();
    const admin  = accounts[0];
    const treasury = accounts[9];
    console.log("Inside main function ========>");
    

    const AdminRegistry = new ethers.Contract(adminRegistryAddress, AdminRegistryabi.abi, provider);
    console.log("AdminRegistry",AdminRegistry);
  
    const tx1 = await AdminRegistry.isAdmin(adminAddress);
    console.log(adminAddress, " is the admin of Admin Registry? ", tx1);
    

    console.log("<<<<=====================================================>>>>");

    const MintingFactory = new ethers.Contract(mintingFactoryAddress, mintingFactoryabi.abi, provider);
    console.log("MintingFactory : ",MintingFactory);

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


    console.log("<<<<===============================================================>>>>");

    const EnochToken = new ethers.Contract(enochTokenAddress, enochTokenabi.abi, provider);
    console.log("Enoch Token : ", EnochToken);

    //@ Approving buyer token to exchange core by admin

    const tx6 = await EnochToken.connect(admin).approve(exchangeCoreAddress, "55550000050000050000500005");
    const receipt6 = await tx6.wait();
    console.log("Approve receipt6 :", receipt6);

    console.log("Checking allowance");
    

    const tx7 = await EnochToken.connect(admin).allowance(adminAddress, exchangeCoreAddress);
    console.log("Allowance tx7 :", tx7);



    // console.log("<<<<===============================================================>>>>");

    // //@ 3. mintNewNFT
    // console.log("@ 3. Minting New NFT from NFT Collection contract");

    // const NFTCollection = await hre.ethers.getContractFactory('NFTCollection');
    // const nftCollection1 = await NFTCollection.deploy(
    //   "Saturday",
    //   "Sat",
    //   adminRegistryAddress,
    //   "https://ipfs.io/ipfs/"
    // );
    // await nftCollection1.deployed();

    // const tx3 = await nftCollection1.connect(admin).mintNewNFT();

    // const receipt3 = await tx3.wait();
    // console.log("receipt3 :", receipt3);

    // console.log("NFT  Minted from NFT Collection");
    

  /*  console.log("<<<<===============================================================>>>>");

    //@ 4. MintNFT
    console.log("@ 4. Minting NFT from Minting Factory");

    const tx4 = await MintingFactory.connect(ExchangeCore).mintNFT(NFT_COLLECTION);

    const receipt4 = await tx4.wait();
    console.log("receipt4 :", receipt4);

    let event4 = receipt4.events?.find((event:any) => event.event === "NFTMinted");

    console.log("NFT  Minted from Minting Factory");
    
    */

    console.log("<<<<===============================================================>>>>");

    //@ 5. FIXED PRICE Primary Sale
    console.log("@ 5. Fixed Price Primary Sale from ExchangeCore contract");

    const tx5 = await ExchangeCore.connect(admin).fixedPricePrimarySale(NFT_COLLECTION,
      1, //NFTPrice
      2, //TokenId
      adminAddress,
      enochTokenAddress
    );

    const receipt5 = await tx5.wait();
    console.log("Primary sale for ", NFT_COLLECTION, " : ", receipt5);



};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });