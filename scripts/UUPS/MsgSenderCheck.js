const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const ExchangeProxyabi = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCoreProxy.sol/ExchangeCoreProxy.json');
const ExchangeCoreabi = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCore.sol/ExchangeCore.json');
const Book = require("../NFTMarketplace/Addresses.json");
const MintingFactoryProxyabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/MintingFactory/MintingFactoryProxy.sol/MintingFactoryProxy.json');
const MintingFactoryabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/MintingFactory/MintingFactory.sol/MintingFactory.json');
const enochTokenabi = require('../../artifacts/contracts/Tokens/Enoch.sol/Enoch.json');

const enochTokenAddress = "0x1d3702D92A8c9Fd3fcD0220e13e5A47f56375d7b";
const adminAddress = "0xCB61f141D37C320B4357173ec28Af37A5E09d949";
NFT_COLLECTION = "0x1669cBB15538A4B9dfE659A1601EEB9f24Cd0Cc9";
const tokenId = 5;
const nftId = "evening/day1";
const nftPrice = "550";
let Exchange_V1_ADDRESS = "0x9FA0f423Db56d2748ef70fa146A98cA6CB9BA959";
let exchange1967PROXY = "0xA176C49EC106C160d7B1a8768C9B451acdA9a83A";
let EXCHANGE_V1_Proxy = "";
let MintingFactory_V1_ADDRESS = "0x5649ED9F25bc669986B28c905ee5A4e9358ed758";
let mintingFactory1967PROXY = "0xcF69F1762C119C8CF41a1baa35efb74c1EcF9942";
let MINTINGfACTORY_V1_Proxy = "";



const ExchangeLogicV1Proxy = async () => {
  
  const accounts = ethers.getSigners();
  const admin  = accounts[0];
  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");

  const proxy = new ethers.Contract(exchange1967PROXY, ExchangeCoreabi.abi, provider);
  EXCHANGE_V1_Proxy = proxy.address;

}


const MintingFactoryLogicV1Proxy = async () => {

  const accounts = ethers.getSigners();
  const admin  = accounts[0];
  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");
  
  const proxy = new ethers.Contract(mintingFactory1967PROXY, MintingFactoryabi.abi, provider);
  MINTINGfACTORY_V1_Proxy = proxy.address;

  console.log("Exchange Proxy Address in Minting Factory already set in deployment script");

}

const ApproveBuyerToken = async () => {

  const accounts = ethers.getSigners();
  const admin  = accounts[0];
  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");

  const EnochToken = new ethers.Contract(enochTokenAddress, enochTokenabi.abi, provider);

  const tx6 = await EnochToken.connect(admin).approve(Exchange_V1_ADDRESS, "5550000000000000000000000000");
  await tx6.wait();

    console.log("Checking allowance");
  const tx7 = await EnochToken.connect(admin).allowance(adminAddress, Exchange_V1_ADDRESS);
    console.log("Allowance tx7 :", tx7);
}

const FixedPricePrimarySale = async () => {

  const accounts = ethers.getSigners();
  const admin  = accounts[0];
  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");

    console.log("*@. Fixed Price Primary Sale from ExchangeCore contract*");

  const ExchangeV1proxy = new ethers.Contract(exchange1967PROXY, ExchangeCoreabi.abi, provider);

    try{
      const tx5 = await ExchangeV1proxy.connect(admin).fixedPricePrimarySale(NFT_COLLECTION,
      nftPrice, 
      tokenId,
      nftId,
      adminAddress,
      enochTokenAddress
    );

    const receipt5 = await tx5.wait();
    } catch(error){
        console.log("error : ", error)
    }
    console.log("Fixed Price Primary sale for ", NFT_COLLECTION, " is executed");

    // let event5 = receipt5.events?.find((event) => event.event === "FixedPricePrimarySale");
    // console.log(event5);

    // console.log("Token URL for the corresponding token Id is  : ", event5?.args._tokenURL);
}


const main = async () => {
    await deployExchangeCoreV1();
    await deployExchangeCoreProxy();
    await ExchangeLogicV1Proxy();
    await deployMintingFactoryV1();
    await deployMintingFactoryProxy();
    await MintingFactoryLogicV1Proxy();
    await ApproveBuyerToken();
    await FixedPricePrimarySale();
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });