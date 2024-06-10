// airdropERC20Script.js
// const { ethers } = require('ethers');
const walletAddresses = require("./recipients.json")

async function airdropERC20() {
  // Get the accounts
  const [deployer] = await ethers.getSigners();

  // Contract and function parameters
  const recipients = walletAddresses.map((user: any) => user["Wallet Address"]);

  console.log(recipients)
  const amount = 5000; // Replace with the desired airdrop amount
  const tokenAddress = "0xAB441e93cE586b15D4D636dbf3e20Cc72Fd38cCb"; // Replace with the ERC20 token contract address
  const airdropContractAddress = "0xD5F99C7C99df394603B5Af5fF3A15C7E5602d0F4"

  // Load the AirdropContract
  const AirdropContract = await ethers.getContractFactory("AirdropContract");
  const airdropContract = await AirdropContract.attach(airdropContractAddress); // Replace with the deployed AirdropContract address

  // Call the airdropERC20 function
  const tx = await airdropContract.airdropERC20(recipients, tokenAddress, amount);
  const resp = await tx.wait();

  console.log({tx, resp});
  console.log("Airdrop completed successfully!");
}

airdropERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
