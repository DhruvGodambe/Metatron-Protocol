// airdropERC20Script.js
// const { ethers } = require('ethers');
// const walletAddresses = require("../../wallet_addresses.json")
const accounts = require("./NFTrecipients.json")

async function airdropERC721() {
  // Get the accounts
  const [deployer] = await ethers.getSigners();

  // Contract and function parameters
  const recipients = accounts.map((user: any) => user["Wallet Address"]);

  console.log(recipients)
  const tokenAddress = "0x07c20878809E284D4c94cf14c39b3Ed80c3B3A0e"; // Replace with the ERC721 token contract address
  const airdropContractAddress = "0xD5F99C7C99df394603B5Af5fF3A15C7E5602d0F4"
  const startIndex = 300;

  // Load the AirdropContract
  const AirdropContract = await ethers.getContractFactory("AirdropContract");
  const airdropContract = await AirdropContract.attach(airdropContractAddress); // Replace with the deployed AirdropContract address
  const tokenIds = Array.from({length: 100}, (_, index) => index + startIndex + 1);
  console.log(tokenIds)

  // Call the airdropERC20 function
  const tx = await airdropContract.airdropERC721(recipients, tokenAddress, tokenIds);
  const resp = await tx.wait();

  console.log({tx, resp});
  console.log("Airdrop completed successfully!");
}

airdropERC721()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
