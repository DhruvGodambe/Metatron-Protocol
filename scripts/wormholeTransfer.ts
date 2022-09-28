import { getEmitterAddressEth, parseSequenceFromLogEth, tryNativeToHexString } from "@certusone/wormhole-sdk";

const hre = require("hardhat");
// import '@nomiclabs/hardhat-ethers';
const {ethers} = require("hardhat");    

const main = async () => {
    
    const Enoch = await ethers.getContractFactory("Enoch1");
    const enoch = await Enoch.attach(
        "0xC7cB566FB6f662E4543E28D3DeADdE2a3b9637Eb" // The deployed contract address
    );
  
    await enoch.transfer("0x259989150c6302D5A7AeEc4DA49ABfe1464C58fE", 50);
    console.log("Transferred ENOCH to the given address");
    
    const goerliBridgeAddress = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
    const mumbaiBridgeAddress = "0x377D55a7928c046E18eEbb61977e714d2a76472a";

    // function -> approve to token bridge
    const bridgeAmt = ethers.utils.parseUnits("500", "18");
    await enoch.approve(goerliBridgeAddress, bridgeAmt, {
        gasLimit: 2000000,
    });


    // function -> transfer of tokens
    // STEP-2
    // const targetRecepient = Buffer.from(
    //     tryNativeToHexString(goerliBridgeAddress, "ethereum"),
    //     "hex"
    // );
      
    // const tx = await (
    //     await enoch.transfer(
    //       bridgeAmt,
    //       targetNetwork.wormholeChainId,
    //       targetRecepient
    //     )
    //   ).wait();

    // function -> Getting VAA
    // STEP-3
    // const emitterAddr = getEmitterAddressEth(network.tokenBridgeAddress);
    // const seq = parseSequenceFromLogEth(tx, network.bridgeAddress);
    // const vaaURL = `${config.wormhole.restAddress}/v1/signed_vaa/${network.wormholeChainId}/${emitterAddr}/${seq}`;
    // let vaaBytes = await (await fetch(vaaURL)).json();
    // while (!vaaBytes.vaaBytes) {
    //     console.log("VAA not found, retrying in 5s!");
    //     await new Promise((r) => setTimeout(r, 5000)); //Timeout to let Guardiand pick up log and have VAA ready
    //     vaaBytes = await (await fetch(vaaURL)).json();
    // }

    // function -> redeem
    // STEP-4
    // targetTokenBridge - 0x377D55a7928c046E18eEbb61977e714d2a76472a
    // const completeTransferTx = await targetTokenBridge.completeTransfer(
    //     Buffer.from(vaaBytes.vaaBytes, "base64")
    // );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });
