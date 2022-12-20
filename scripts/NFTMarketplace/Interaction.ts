import { Address } from "cluster";
import { keccak256 } from "ethers/lib/utils";

const { ethers} = require("hardhat");
const hre = require("hardhat");
const { Wallet, providers } = require("ethers");

// const bytes32 = require('bytes32');
const fs = require('fs');
const { writeFileSync } = require("fs");
const path = require('path');
const Book = require("../NFTMarketplace/Addresses.json");

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

// const PrivateKey = process.env.PRIVATE_KEY_LOCALHOST_1;
// const providerURL = process.env.PROVIDER_URL;

const tokenId = 1;
const nftPrice = "550000050000050000500005";
const _hashedMessage = "0x48656c6c6f546865726521000000000000000000000000000000000000000000";
const _signature = "0xb2eeae6b144cea0408adf2d822e64e1c771322c09f9a7a3b66079c683dec746e27d225f672a85f8d6b5a5238805c8296ddfa0e2e83dd8f6ab4ea2fe3721de6f91b";

/*
marketplaceInteraction.ts requirements:
1. createCollection
2. mintNFT
3. fixedPricePrimarySale
4. auctionPrimarySale
*/
/*
const bytes32FromMessage = (message:string) => {
  let hexMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
  // let hexMessage = keccak256(message);
  let bytes32Message = ethers.utils.formatBytes32String(hexMessage,32);
  console.log("message:",message);
  console.log("hexMessage:",hexMessage);
  // console.log("bytes32FromMessage:",bytes32Message);
  return hexMessage;
}

const toBytes = (signature:string) => Array.from(Buffer.from(signature, 'utf8'));
*/


const main = async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");
  console.log(" PROVIDER : ", provider);

  const admin = new ethers.Wallet( "0x1d6817ca1509086f55f2f4751cf8464f305dd6ba713778d31ade993bd7b984bb" , provider );
  console.log(" Admin ADDRESS : ", admin.address);

    const accounts = await ethers.getSigners();
    const treasury = "0x404DbBbD516d101b41Ce1671C9e5D0766272d047";
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
              path.join(__dirname, 'Collection.json'),
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



    console.log("<<<<===============================================================>>>>");
/*
    //@ 5. FIXED PRICE Primary Sale
    console.log("@ 5. Fixed Price Primary Sale from ExchangeCore contract");

    const tx5 = await ExchangeCore.connect(admin).fixedPricePrimarySale(NFT_COLLECTION,
      nftPrice, 
      tokenId, 
      adminAddress,
      enochTokenAddress
    );

    const receipt5 = await tx5.wait();
    console.log("Primary sale for ", NFT_COLLECTION, " : ", receipt5);

*/    console.log("<<<<===============================================================>>>>");


const tx10 = await ExchangeCore.connect(admin).verifySignature(_hashedMessage,
  _signature,
  adminAddress
);

const receipt10 = await tx10.wait();
console.log("Signature verified");

    console.log("verify Signature ",receipt10);

    console.log("<<<<===============================================================>>>>");
/*
    //@ 1. Minting new NFT
    console.log("@ 4. Minting new NFT");

    const tx11 = await MintingFactory.connect(admin).mintNFT(NFT_COLLECTION, tokenId);

    const receipt11 = await tx11.wait();

    let event11 = receipt11.events?.find((event:any) => event.event === "NFTMinted");
    console.log(event11);
    

    console.log("Collection is : ", event2?.args.nftCollection);
    console.log("Token Id is : ", event11?.args.tokenId);
*/
    console.log("<<<<===============================================================>>>>");

    //@ 5. AUCTION Primary Market
    console.log("@ 5. Auction Primary Market from ExchangeCore contract");

    const tx9 = await ExchangeCore.connect(admin).auctionPrimarySale(NFT_COLLECTION,
      nftPrice, 
      tokenId, 
      adminAddress,
      enochTokenAddress,
      _hashedMessage,
      _signature
    );

    const receipt9 = await tx9.wait();
    console.log("Primary sale for ", NFT_COLLECTION, " : ", receipt9);

    console.log("<<<<===============================================================>>>>");
/*
    const Collection = new ethers.Contract(NFT_COLLECTION, NFTCollectionabi.abi, provider);
    console.log("Nft Collection instance : ",Collection);

    const tx8 = await Collection.tokenURI(tokenId);
    console.log("Token URI", tx8);
*/
    
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



};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });