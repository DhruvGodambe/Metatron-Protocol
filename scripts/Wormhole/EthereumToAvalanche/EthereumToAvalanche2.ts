//Run this script in Fuji (Avalanche) testnet

import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
const {ethers} = require("hardhat");    

const main = async () => {
    
    const enochAddressGoerli = "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb";
    const goerliBridgeAddress = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";  //Token Bridge
    const fujiBridgeAddress = "0x61E44E506Ca5659E6c0bba9b678586fA2d729756";    //Token Bridge

    const BridgeInteractAddressGoerli = "0x7EB3798B9d3283F5342119a697B3FAfBF3378FCe";  // deployed BridgeInteract address
    const BridgeInteractAddressFuji = "0x930CcF606e0d1eeC7ce9142C33171229791C0dA3";    // deployed BridgeInteract address

    const BridgeInteract = await ethers.getContractFactory("BridgeInteract");
    const bridgeInteractFuji = await BridgeInteract.attach(
        BridgeInteractAddressFuji 
    );

    const bridgeInteractGoerli = await BridgeInteract.attach(
        BridgeInteractAddressGoerli
    );

    // IMPORTANT: NEED TX HASH 
    const provider = new ethers.providers.JsonRpcProvider("https://ethereum-goerli-rpc.allthatnode.com/");
    const txReceipt = await provider.waitForTransaction(
      "0xced046fa496356f8f2cee24059f7ce46b9e4df4b946f59e6ae669edcb2cfe7bb" //Paste the tx hash after executing transfer function from EthereumToPolygon1.ts script 
    );
    console.log(txReceipt);


    /*
    * Execute on FUJI
    */

    console.log("\n<------------------Getting VAA------------------------->");

    // function -> Getting VAA
    // STEP-3 //Core Bridge --> Goerli
    const restAddress = "https://wormhole-v2-testnet-api.certus.one";
    const chainId = 2;
    const bridgeAddress = "0x706abc4E45D419950511e474C7B9Ed348A4a716c";
    const emitterAddr = getEmitterAddressEth(goerliBridgeAddress);
    console.log("Emitter Address:   ", emitterAddr);
    
    const seq = parseSequenceFromLogEth(txReceipt, bridgeAddress);
    console.log("Sequence:  ", seq);
    
    const vaaURL = `${restAddress}/v1/signed_vaa/${chainId}/${emitterAddr}/${seq}`;
    let vaaBytes = await (await fetch(vaaURL)).json();
    while (!vaaBytes.vaaBytes) {
        console.log("VAA not found, retrying in 5s!");
        await new Promise((r) => setTimeout(r, 5000)); //Timeout to let Guardiand pick up log and have VAA ready
        vaaBytes = await (await fetch(vaaURL)).json();
    }

    console.log(vaaBytes);
    console.log(typeof vaaBytes.vaaBytes);
    
    console.log(Buffer.from(vaaBytes.vaaBytes, "base64"));
    console.log(vaaBytes.vaaBytes);
    

    console.log("\n<------------------Complete Transfer function------------------------->");

    // function -> redeem
    // STEP-4
    // targetTokenBridge Fuji - 0x61E44E506Ca5659E6c0bba9b678586fA2d729756
    const completeTransferTx = await bridgeInteractFuji.completeTransfer(
        Buffer.from(vaaBytes.vaaBytes, "base64")
    );

    const receipt = await completeTransferTx.wait();
    console.log(receipt);
    
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });