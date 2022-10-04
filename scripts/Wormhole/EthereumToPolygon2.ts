import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
// import '@nomiclabs/hardhat-ethers';
const {ethers} = require("hardhat");    

const main = async () => {
    
    const enochAddress = "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb";
    const goerliBridgeAddress = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
    const mumbaiBridgeAddress = "0x377D55a7928c046E18eEbb61977e714d2a76472a";

    const BridgeInteractAddressMumbai = "0x24901bee51b1254147Fd74a03739C457E7578338";
    const BridgeInteractAddressGoerli = "0x7EB3798B9d3283F5342119a697B3FAfBF3378FCe";

    const BridgeInteract = await ethers.getContractFactory("BridgeInteract");
    const bridgeInteractMumbai = await BridgeInteract.attach(
        BridgeInteractAddressMumbai // The deployed contract address
    );

    const bridgeInteractGoerli = await BridgeInteract.attach(
        BridgeInteractAddressGoerli
    );

      
    const provider = new ethers.providers.JsonRpcProvider("https://ethereum-goerli-rpc.allthatnode.com/");
    const txReceipt = await provider.waitForTransaction(
      "0xd4fe7eff9b2d2d247a43c307ad6c642f55b42ca63831f4268d36bdc19937148d"
    );
    console.log(txReceipt);


    /*
    * MUMBAI
    */
    // function -> Getting VAA
    // STEP-3
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
    

    // function -> redeem
    // STEP-4
    // targetTokenBridge - 0x377D55a7928c046E18eEbb61977e714d2a76472a
    const completeTransferTx = await bridgeInteractMumbai.completeTransfer(
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