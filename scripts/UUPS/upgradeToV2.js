const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const ProxyJSON = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCoreProxy.sol/ExchangeCoreProxy.json');
const Book = require("../NFTMarketplace/Addresses.json");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
// const proxyContract = "0x112801EF14322a07aD8Dd2e32A1b19AB4F167610";
// const LogicV1 = "0x81f82eB6fbc4F5a5a419b8a10cbc30512981935E";
const upgradedLogic = "0xeA3C03A0E1ff7fF6F2005C425F9ED6953F365093";

const deployProxy = async (LogicV1) => {

      const constructorABI = [{
        "inputs": [
          {
            "internalType": "contract IMintingFactory",
            "name": "_mintingFactory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_adminRegistry",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_treasury",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }];

    const args = [mintingFactoryAddress, 
        adminRegistryAddress,
        treasuryAddress
    ]

    let interface= new ethers.utils.Interface(constructorABI);
    const encodedData = interface.encodeFunctionData("initialize", args);
    console.log("encodedData : ", encodedData);

    const ExchangeCoreProxy = await hre.ethers.getContractFactory("ExchangeCoreProxy");
    console.log("Deploying ExchangeCore Proxy...");
    const proxy = await ExchangeCoreProxy.deploy
    (
        LogicV1, // implementation V1 contract
        encodedData, // bytes memory data
    );

    await proxy.deployed();
    console.log("Exchange Core PROXY : ", proxy);
    console.log("Exchange Core PROXY address: ", proxy.address);

}

const deploylogicV2 = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCoreV2");
    console.log("Deploying ExchangeCoreV2...");

    const ExchangeCoreV2 = await ExchangeCore.deploy();
    await ExchangeCoreV2.deployed();

    const tx1 = await ExchangeCoreV2.initialize(
          mintingFactoryAddress, 
          adminRegistryAddress, 
          treasuryAddress
      );
     const receipt1=  await tx1.wait();
      console.log("Exchange Core V2: ", ExchangeCoreV2);
      console.log("receipt1 : ", receipt1);

    console.log("ExchangeCoreV2 Contract deployed to: ", ExchangeCoreV2.address);

}

const upgradeTo = async (proxyContract, upgradedLogic) => {

  const accounts = await ethers.getSigners();
  const admin  = accounts[0];
    console.log("admin", admin);

  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");
    console.log(" PROVIDER : ", provider);

  const proxy = new ethers.Contract(proxyContract, ProxyJSON.abi, provider);
    console.log("Proxy : ", proxy);

    console.log("Getting Current Implementation address");
  const CurrentImplementation  = await proxy.getImplementation();
    console.log("Current Implementation address : ", CurrentImplementation);

  const Owner  = await proxy.owner();
    console.log("Owner address : ", Owner);

  const UpgradeImplementation  = await proxy.connect(admin).upgradeTo(upgradedLogic);
    console.log("Upgrade Implementation : ", UpgradeImplementation);
  await UpgradeImplementation.wait();
    console.log("Congratulations! Implementation successfully upgraded");

    console.log("Getting Upgraded Implementation address");
  const UpgradedImplementation  = await proxy.getImplementation();
    console.log("Upgraded Implementation address : ", UpgradedImplementation);

}

const main = async () => {
    await deployProxy
    (
      "0x81f82eB6fbc4F5a5a419b8a10cbc30512981935E" // Logic V1 address
    );

    await deploylogicV2();

    await upgradeTo
    (
      "0x112801EF14322a07aD8Dd2e32A1b19AB4F167610", // Proxy contract address
      "0xeA3C03A0E1ff7fF6F2005C425F9ED6953F365093" // Logic V2 address (Upgraded Logic)
    );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });