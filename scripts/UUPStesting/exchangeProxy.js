const { ethers} = require("hardhat");
const hre = require("hardhat");

const main = async () => {

    const accounts = await ethers.getSigners();
    const admin  = accounts[0];
    console.log("admin", admin);

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

    const args = ["0x9725caA9Dc09884ABEDf8eD4C00703554027Fb49", 
        "0x69D260289D8422496F0BD50A17d6Ed6B98F1851E",
        "0x404DbBbD516d101b41Ce1671C9e5D0766272d047"
    ]

    let interface1= new ethers.utils.Interface(constructorABI);

    const encodedData = interface1.encodeFunctionData("initialize", args);
    console.log("encodedData : ", encodedData);


    const ExchangeCoreProxy = await hre.ethers.getContractFactory("ExchangeCoreProxy");
    console.log("Deploying ExchangeCore Proxy...");
    const proxy = await ExchangeCoreProxy.deploy
    (
        "0xe21AFF416783A1Cc8848763418b75D0eC1AFe8b9", //logic
        encodedData //bytes memory data
    );
    
    await proxy.deployed();
    console.log("Exchange Core V1: ", proxy);
    console.log("ExchangeCoreV1 Contract deployed to: ", proxy.address);

    console.log("Getting Implementation address");
    const Implementation  = await proxy.getImplementation();
    console.log("Implementation address : ", Implementation);

    const Owner  = await proxy.owner();
    console.log("Owner address : ", Owner);

    // const Upgrade  = await proxy.connect(admin).upgradeTo("0x735F056E9851f2Af235A4541D3ABD063DBAE78eb");
    // console.log("Upgrade : ", Upgrade);


    // <==========================================================================> //    

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });