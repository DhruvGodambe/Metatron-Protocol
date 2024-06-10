// deployAirdropContract.js
// const { ethers } = require("hardhat");

async function airdropDeploy() {
  // Get the accounts
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy AirdropContract
  const AirdropContract = await ethers.getContractFactory("AirdropContract");
  const airdropContract = await AirdropContract.deploy();
  await airdropContract.deployed();

  console.log("AirdropContract deployed to:", airdropContract.address);
}

airdropDeploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
