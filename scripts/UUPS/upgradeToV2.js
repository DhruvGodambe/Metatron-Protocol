const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");

const ProxyJSON = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCoreProxy.sol/ExchangeCoreProxy.json');
const V2abi = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCoreV2.sol/ExchangeCoreV2.json');
const Book = require("../NFTMarketplace/Addresses.json");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
let PROXY_ADDRESS;
let LOGIC_V2_ADDRESS;

const deployProxy = async (LOGIC_V1_ADDRESS) => {

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

    const exchangeCoreProxy = await hre.ethers.getContractFactory("ExchangeCoreProxy");
    console.log("Deploying ExchangeCore Proxy...");
    const proxy = await exchangeCoreProxy.deploy
    (
      LOGIC_V1_ADDRESS, // implementation V1 contract
      encodedData, // bytes memory data
    );

    await proxy.deployed();
    console.log("Exchange Core PROXY : ", proxy);
    PROXY_ADDRESS = proxy.address;
    console.log("Exchange Core PROXY address: ", proxy.address);

}

const deploylogicV2 = async () => {

    const ExchangeCore = await hre.ethers.getContractFactory("ExchangeCoreV2");
    console.log("Deploying ExchangeCoreV2...");

    const ExchangeCoreV2 = await ExchangeCore.deploy();
    await ExchangeCoreV2.deployed();

      console.log("Exchange Core V2: ", ExchangeCoreV2);

    LOGIC_V2_ADDRESS = ExchangeCoreV2.address;
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

  const UpgradeImplementation  = await proxy.connect(admin).upgradeToNewImplementation(upgradedLogic);
    console.log("Upgrade Implementation : ", UpgradeImplementation);
  await UpgradeImplementation.wait();
    console.log("Congratulations! Implementation successfully upgraded");

    console.log("Getting Upgraded Implementation address");
  const UpgradedImplementation  = await proxy.getImplementation();
    console.log("Upgraded Implementation address : ", UpgradedImplementation);

}


const initializeV2 = async () => {

  const accounts = await ethers.getSigners();
  const admin  = accounts[0];
    console.log("admin", admin);

  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA");
    console.log(" PROVIDER : ", provider);

  const LogicV2atProxy = new ethers.Contract(PROXY_ADDRESS, V2abi.abi, provider);
    console.log("Logic V2 at Proxy : ", LogicV2atProxy);

  const V2  = await LogicV2atProxy.connect(admin).initialize();
    console.log("Initialized V2 : ", V2);
    
    console.log("Congratulations! Implementation V2 successfully initialized");

    const Treasury_Address  = await LogicV2atProxy.treasury();
    console.log("Treasury_Address : ", Treasury_Address);
    

}

const main = async () => {
    await deployProxy(
      "0x40Aff068f0F9d3C40164b840C5A33722aCbf5d6e" //LogicV1 address
      );

    await deploylogicV2();

    await upgradeTo
    (
      PROXY_ADDRESS, // Proxy contract address
      LOGIC_V2_ADDRESS // Logic V2 address (Upgraded Logic)
    );

    await initializeV2();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });