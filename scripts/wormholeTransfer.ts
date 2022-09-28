const hre = require("hardhat");
import '@nomiclabs/hardhat-ethers';
import {ethers} from "hardhat";
const ExToken1Goerliabi = require("../artifacts/contracts/Tokens/Example1Goerli.sol/Example1Goerli.json");
const ExToken2Polygonabi = require("../artifacts/contracts/Tokens/Example2Polygon.sol/Example2Polygon.json");

const main = async () => {
    
  const Enoch = await ethers.getContractFactory("Enoch1");
  const enoch = await Enoch.attach(
    "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb" // The deployed contract address
  );
  

  
  // const exToken1Goerli  = new ethers.Contract("0xF890982f9310df57d00f659cf4fd87e65adEd8d7", ExToken1Goerliabi.abi, provider);
  
  //const exToken2Polygon  = new ethers.Contract("0x377D55a7928c046E18eEbb61977e714d2a76472a", ExToken2Polygonabi.abi, provider);
  

  //This method can also be used to create instance of deployed contract
  // const contractAddressGoerli = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
  // const myContract = await hre.ethers.getContractAt("TokenBridge", contractAddressGoerli);
  
  //This method can also be used to create instance of deployed contract
  // const contractAddressPolygon = "0x377D55a7928c046E18eEbb61977e714d2a76472a";
  // const myContract = await hre.ethers.getContractAt("ContractKaName", contractAddressPolygon);


    // CALL FUNCTIONS HERE 
    await enoch.transfer("0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE", 50);
    console.log("Transferred ENOCH to the given address");
    
    // exToken1Goerli.attestToken("0xF890982f9310df57d00f659cf4fd87e65adEd8d7",uint32 nonce); //Call function here
    // console.log("Functions are working for this contract deployed in Goerli");
    
    // exToken2Polygon.attestToken("0x377D55a7928c046E18eEbb61977e714d2a76472a",uint32 nonce); //Call function here
    // console.log("Functions are working for this contract deployed in Polygon");


    

    // function -> approve to token bridge
    // function -> transfer of tokens
    // function -> redeem
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });