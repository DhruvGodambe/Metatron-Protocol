const hre = require("hardhat");
import '@nomiclabs/hardhat-ethers';
import {ethers} from "hardhat";

const main = async () => {
    
  const Enoch = await ethers.getContractFactory("Enoch1");
  const enoch = await Enoch.attach(
    "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb" // The deployed contract address
  );
  
  // Now you can call functions of the contract
  //await enoch._mint();
  //await enoch._owner();

    // need a contract to interact with ERC20
    // ENOCH interface

    // TRANSFER ENOCH -> to my address 
    await enoch.transfer("0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE", 50);
    console.log("Transferred ENOCH to the given address");
    

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
