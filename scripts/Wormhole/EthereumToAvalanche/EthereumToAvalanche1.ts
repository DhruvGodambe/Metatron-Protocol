//Run this script in Goerli testnet

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
const {ethers} = require("hardhat");    

const main = async () => {
    
    const enochAddressGoerli = "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb";
    const goerliBridgeAddress = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";   //Token Bridge
    const fujiBridgeAddress = "0x61E44E506Ca5659E6c0bba9b678586fA2d729756";     //Token Bridge

    const BridgeInteractAddressGoerli = "0x7EB3798B9d3283F5342119a697B3FAfBF3378FCe"; // deployed BridgeInteract address
    const BridgeInteractAddressFuji = "0x930CcF606e0d1eeC7ce9142C33171229791C0dA3"; // deployed BridgeInteract address

    
    const Enoch1 = await ethers.getContractFactory("Enoch1");
    const enochGoerli = await Enoch1.attach(
        enochAddressGoerli 
    );
        
    const BridgeInteract = await ethers.getContractFactory("BridgeInteract");
    const bridgeInteractGoerli = await BridgeInteract.attach(
        BridgeInteractAddressGoerli // The deployed contract address
    );
    const bridgeInteractFuji = await BridgeInteract.attach(
        BridgeInteractAddressFuji // The deployed contract address
    );




      console.log("<------------------Approve Function------------------------->");
      

    /*
    * EXECUTE ON GOERLI
    */
      //Approve function
        const bridgeAmt = ethers.utils.parseUnits("7000", "18");
        const approveTx = await enochGoerli.approve(goerliBridgeAddress, bridgeAmt,{
          gasLimit: 2000000,
        });
        const approveTxReceipt = await approveTx.wait();
        console.log(approveTxReceipt);



        console.log("<------------------Transfer Tokens Function------------------------->");

    //     address token, --->Enoch token's address in source chain
    //     uint256 amount,  --->Amount of Enoch tokens
    //     uint16 recipientChain, ---> Target chains's wormhole ChainID (Core Bridge)
    //     bytes32 recipient, --->Sender's Account Address
    //     uint256 arbiterFee, ---->Put 0
    //     uint32 nonce ---->Current nonce

    /*
    * EXECUTE ON GOERLI
    */
    const transferTx = await bridgeInteractGoerli.transfer(
      enochAddressGoerli,
      5000,
      6,
      "0x000000000000000000000000aC099D7d6057B7871D1076f2600e1163643d0822",
      0,
      72
      );

      const transferTxReceipt = await transferTx.wait();
      console.log(transferTxReceipt);


};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });