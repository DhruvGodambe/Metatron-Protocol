// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  
  const goerliTokenBridge = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
  const mumbaiTokenBridge = "0x377D55a7928c046E18eEbb61977e714d2a76472a";

  const BridgeInteract = await hre.ethers.getContractFactory("BridgeInteract");
  const bridgeInteract = await BridgeInteract.deploy(mumbaiTokenBridge);

  await bridgeInteract.deployed();

  console.log("Bridge Interact deployed at ", bridgeInteract.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
