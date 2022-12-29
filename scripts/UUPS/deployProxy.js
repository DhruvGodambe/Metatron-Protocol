const { ethers} = require("hardhat");
const hre = require("hardhat");

const ProxyJSON = require('../../artifacts/contracts/NFTMarketplace/Exchange/ExchangeCoreProxy.sol/ExchangeCoreProxy.json');
const Book = require("../NFTMarketplace/Addresses.json");

const mintingFactoryAddress = Book.MINTING_FACTORY_ADDRESS;
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;
const treasuryAddress = Book.TREASURY_ADDRESS;
const proxyContract = "0x112801EF14322a07aD8Dd2e32A1b19AB4F167610";
const verson1Logic = "0x81f82eB6fbc4F5a5a419b8a10cbc30512981935E";
const currentLogic = "0xeA3C03A0E1ff7fF6F2005C425F9ED6953F365093";
const upgradedLogic = "0x81f82eB6fbc4F5a5a419b8a10cbc30512981935E";

const main = async () => {


  // @** TO DEPLOY PROXY ========================================>

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
        verson1Logic, // implementation V1 contract
        encodedData, // bytes memory data
        "29"
    );
    
    await proxy.deployed();
    console.log("Exchange Core PROXY : ", proxy);
    console.log("Exchange Core PROXY address: ", proxy.address);

    // <========================Deploying Proxy ENDS here! ============================>

/*
    
    // @** TO Upgrade Implementation contract ================================================>

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

    // <==========================================================================> //    
*/
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });