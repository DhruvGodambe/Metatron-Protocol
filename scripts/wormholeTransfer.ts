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

    const bridgeInteractGoerli = await BridgeInteract.attach(BridgeInteractAddressGoerli);

    
    //     address token,
    //     uint256 amount,
    //     uint16 recipientChain,
    //     bytes32 recipient,
    //     uint256 arbiterFee,
    //     uint32 nonce

    /*
    * EXECUTE ON GOERLI
    */
    // const transferTx = await bridgeInteractGoerli.transfer(
    //   enochAddress,
    //   5000,
    //   5,
    //   "0x000000000000000000000000259989150c6302d5a7aeec4da49abfe1464c58fe",
    //   0,
    //   238
    //   );

    //   const transferTxReceipt = await transferTx.wait();
    //   console.log(transferTxReceipt);
      
    const provider = new ethers.providers.JsonRpcProvider("https://ethereum-goerli-rpc.allthatnode.com/");
    const txReceipt = await provider.waitForTransaction(
      "0xecb87067ba323ae146a464a6ab149ea9d74ee7223e1119f999a2af14c0da6456"
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
    console.log(emitterAddr);
    
    const seq = parseSequenceFromLogEth(txReceipt, bridgeAddress);
    console.log(seq);
    
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