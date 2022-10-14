/*
Run this script in Target testnet by : 
npx hardhat run .\scripts\Wormhole\UniversalBridge\Bridge1.ts --network <target chain>
*/

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
const {ethers} = require("hardhat");
const fs = require('fs');
const AddressBook = require("../BridgeAddresses.json");
const ChainIDBook = require("../ChainIDWormhole.json");
const txHash = require("../UniversalBridge/txReceiptfile.json");
const RPCURL = require("../RPC.json");

const bytes32FromAddress = (address:any) => {
  let bytes32 = ethers.utils.formatBytes32String(address);
  return bytes32;
}

const completeTransfer = async (
  sourceChain:any, 
  targetChain:any,
  ) => {
      
      const BridgeInteract = await ethers.getContractFactory("BridgeInteract");

      let bridgeInteractSource;
      let bridgeInteractTarget;
      let bridgeInteractTargetAddress;
      let sourceCoreChainID;
      let sourceCoreBridgeAddress;
      let tokenBridgeAddress;
      let sourceRPCurl;
      
      if(sourceChain == "Goerli"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.goerli;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.goerliBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.goerliBridgeAddress;
        bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.goerli);
        sourceRPCurl = RPCURL.RPCurl.goerli;
      }
      else if(sourceChain == "Mumbai"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.mumbai;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.mumbaiBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.mumbaiBridgeAddress;
        bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.mumbai);
        sourceRPCurl = RPCURL.RPCurl.mumbai;
      }
      else if(sourceChain == "Fuji"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.fuji;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.fujiBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.fujiBridgeAddress;
        bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.fuji);
        sourceRPCurl = RPCURL.RPCurl.fuji;
      }
      else if(sourceChain == "BSC"){
        sourceCoreChainID = ChainIDBook.wormholeChainIDs.bsc;
        sourceCoreBridgeAddress = AddressBook.coreBridgeAddresses.bscBridgeAddress;
        tokenBridgeAddress = AddressBook.tokenBridgeAddresses.bscBridgeAddress;
        bridgeInteractSource = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.bsc);
        sourceRPCurl = RPCURL.RPCurl.bsc;
      }
      
      if(targetChain == "Goerli"){
        bridgeInteractTarget = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.goerli);
        bridgeInteractTargetAddress = AddressBook.bridgeInteractAddresses.goerli;
      }
      else if(targetChain == "Mumbai"){
        bridgeInteractTarget = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.mumbai);
        bridgeInteractTargetAddress = AddressBook.bridgeInteractAddresses.mumbai;
      }
      else if(targetChain == "Fuji"){
        bridgeInteractTarget = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.fuji);
        bridgeInteractTargetAddress = AddressBook.bridgeInteractAddresses.fuji;
      }
      else if(targetChain == "BSC"){
        bridgeInteractTarget = await BridgeInteract.attach(AddressBook.bridgeInteractAddresses.bsc);
        bridgeInteractTargetAddress = AddressBook.bridgeInteractAddresses.fuji;
      }


          // IMPORTANT: NEED TX HASH 
    const transferHash = txHash.data;
    console.log("Transfer Tx Hash fetched from txReceiptfile.json is: ",transferHash);

    const provider = new ethers.providers.JsonRpcProvider(sourceRPCurl);
    console.log("Provider set");
    
    const txReceipt = await provider.waitForTransaction(transferHash);
    console.log(txReceipt);

    console.log("\n<------------------Getting VAA------------------------->");

    const restAddress = "https://wormhole-v2-testnet-api.certus.one";
    const emitterAddr = getEmitterAddressEth(tokenBridgeAddress);
    console.log("Emitter Address :   ", emitterAddr);
    
    // Here, interaction with the Core Bridge of the Source Chain
    const seq = parseSequenceFromLogEth(txReceipt, sourceCoreBridgeAddress);
    console.log("Sequence :  ", seq);
    
    const vaaURL = `${restAddress}/v1/signed_vaa/${sourceCoreChainID}/${emitterAddr}/${seq}`;
    let vaaBytes = await (await fetch(vaaURL)).json();
    while (!vaaBytes.vaaBytes) {
        console.log("VAA not found, retrying in 5s!");
        await new Promise((r) => setTimeout(r, 5000)); //Timeout to let Guardians pick up log and have VAA ready
        vaaBytes = await (await fetch(vaaURL)).json();
    }

    console.log("VAA Bytes is: ",vaaBytes);
    console.log("Type of VAA Bytes is: ",typeof vaaBytes.vaaBytes);
    
    console.log("Buffer of the above string is: ",Buffer.from(vaaBytes.vaaBytes, "base64"));
    console.log("vaaBytes.vaaBytes of the above buffer is: ",vaaBytes.vaaBytes);


    console.log("\n<------------------Complete Transfer function------------------------->");

    // STEP-4:  REDEEM
    console.log("Executing Complete Transfer function");
    
    const completeTransferTx = await bridgeInteractTarget.completeTransfer(
        Buffer.from(vaaBytes.vaaBytes, "base64")
    );

    console.log("Complete Transfer function executed, Waiting for Receipt");

    const receipt = await completeTransferTx.wait();
    console.log("Complete Transfer function receipt:  ",receipt);
    console.log("Tx hash of completeTransfer is: ", receipt.transactionHash);


}



const main = async () => {

    
  console.log("Starting the Complete Transfer...");

  await completeTransfer("Mumbai", "Fuji");

  /*  console.log("\n<------------------Complete Transfer function------------------------->");

    // function -> redeem
    // STEP-4
    // targetTokenBridge Fuji - 0x61E44E506Ca5659E6c0bba9b678586fA2d729756
    const completeTransferTx = await bridgeInteractFuji.completeTransfer(
        Buffer.from(vaaBytes.vaaBytes, "base64")
    );

    const receipt = await completeTransferTx.wait();
    console.log(receipt);
    */
    
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });