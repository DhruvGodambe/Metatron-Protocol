/*
Register Tokens from UI in the target chain before transferring tokens
https://wormhole-foundation.github.io/example-token-bridge-ui/#/register
Run this script in Source testnet by :
npx hardhat run .\scripts\Wormhole\UniversalBridge\Bridge1.ts --network <source chain>
*/

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
const {ethers} = require("hardhat");
const AddressBook = require("../BridgeAddresses.json");
const ChainIDBook = require("../ChainIDWormhole.json");


const bytes32FromAddress = (address:any) => {
  let bytes32 = ethers.utils.formatBytes32String(address);
  return bytes32;
}

const bridgeTransfer = async (
      sourceChain:any, 
      targetChain:any, 
      approveAmt:any,
      transferAmt:any, 
      recipientAddress:any,
      nonce:any
      ) => {
          const Enoch1 = await ethers.getContractFactory("Enoch1");
          const BridgeInteract = await ethers.getContractFactory("BridgeInteract");

          let bridgeInteractSource;
          let sourceBridgeAddress;
          let tokenAddress;
          let chainID;
          
          if(sourceChain == "Goerli"){
            //Load the enoch ethereum contract abi
            tokenAddress = await Enoch1.attach(AddressBook.tokenAddresses.goerli);
            //Assign the correct abi to the bridge interact source variable
            bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.goerli);
            sourceBridgeAddress = AddressBook.coreBridgeAddresses.goerliBridgeAddress;
          }
          else if(sourceChain == "Mumbai"){
            tokenAddress = await Enoch1.attach(AddressBook.tokenAddresses.mumbai);
            bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.mumbai);
            sourceBridgeAddress = AddressBook.coreBridgeAddresses.mumbaiBridgeAddress;
          }
          else if(sourceChain == "Fuji"){
            tokenAddress = await Enoch1.attach(AddressBook.tokenAddresses.fuji);
            bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.fuji);
            sourceBridgeAddress = AddressBook.coreBridgeAddresses.fujiBridgeAddress;
          }
          else if(sourceChain == "BSC"){
            tokenAddress = await Enoch1.attach(AddressBook.tokenAddresses.bsc);
            bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.bsc);
            sourceBridgeAddress = AddressBook.coreBridgeAddresses.bscBridgeAddress;
          }
          else if(targetChain == "Goerli"){
            chainID = ChainIDBook.wormholeChainIDs.goerli;
          }
          else if(targetChain == "Mumbai"){
            chainID = ChainIDBook.wormholeChainIDs.mumbai;
          }
          else if(targetChain == "Fuji"){
            chainID = ChainIDBook.wormholeChainIDs.fuji;
          }
          else if(targetChain == "BSC"){
            chainID = ChainIDBook.wormholeChainIDs.bsc;
          }


        console.log("<------------------Approve Function------------------------->");
        // approveAmt = ethers.utils.parseUnits("8000", "18");
        const approveTx = await tokenAddress.approve(sourceBridgeAddress, approveAmt,{
          gasLimit: 2000000,
        });
        const approveTxReceipt = await approveTx.wait();
        console.log(approveTxReceipt);


        console.log("<------------------Transfer Function------------------------->");

          const transferTx = await bridgeInteractSource.transfer(
            tokenAddress,
            transferAmt,
            chainID,
            bytes32FromAddress(recipientAddress),
            0,
            nonce
            );

            const transferTxReceipt = await transferTx.wait();
            console.log(transferTxReceipt);

}


const main = async () => {

      // console.log("<------------------Approve Function------------------------->");
      // //Approve function
      //   const bridgeAmt = ethers.utils.parseUnits("8000", "18");
      //   const approveTx = await bridgeTransfer.tokenAddress.approve(AddressBook.tokenBridgeAddresses.goerli, bridgeAmt,{
      //     gasLimit: 2000000,
      //   });
      //   const approveTxReceipt = await approveTx.wait();
      //   console.log(approveTxReceipt);



        // console.log("<------------------Transfer Tokens Function------------------------->");

    //     address token, --->Enoch token's address in source chain
    //     uint256 amount,  --->Amount of Enoch tokens
    //     uint16 recipientChain, ---> Target chains's wormhole ChainID (Core Bridge)
    //     bytes32 recipient, --->Sender's Account Address
    //     uint256 arbiterFee, ---->Put 0
    //     uint32 nonce ---->Current nonce

    /*
    * EXECUTE ON GOERLI
    */
    // const transferTx = await bridgeInteractGoerli.transfer(
    //   enochAddressGoerli,
    //   5000,
    //   6,
    //   "0x000000000000000000000000aC099D7d6057B7871D1076f2600e1163643d0822",
    //   0,
    //   74
    //   );

    //   const transferTxReceipt = await transferTx.wait();
    //   console.log(transferTxReceipt);


};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });