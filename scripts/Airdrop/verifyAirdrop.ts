// verifyAirdropContract.js
// const { ethers, run } = require("hardhat");
const hre = require("hardhat");

async function airdropVerify() {
  // Get the contract address
  const contractAddress = "0xA36Af193c4d6e717a037463341FDDB55DB4a34A2"; // Replace with the deployed contract address

  console.log("Verifying AirdropContract on Etherscan...");
  await hre.run("verify:verify", {
    address: contractAddress,
    contract: "contracts/Airdrop/Airdrop.sol:AirdropContract",
    constructorArguments: []
  });

  console.log("AirdropContract verification complete!");
}

airdropVerify()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


