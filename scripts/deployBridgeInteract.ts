const hre = require("hardhat");

async function main() {
  
  const goerliTokenBridge = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
  const mumbaiTokenBridge = "0x377D55a7928c046E18eEbb61977e714d2a76472a";
  const fujiTokenBridge = "0x61E44E506Ca5659E6c0bba9b678586fA2d729756";

  const BridgeInteract = await hre.ethers.getContractFactory("BridgeInteract");
  const bridgeInteract = await BridgeInteract.deploy(fujiTokenBridge);

  await bridgeInteract.deployed();

  console.log("Bridge Interact deployed at ", bridgeInteract.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
