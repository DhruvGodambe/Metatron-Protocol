const { ethers } = require("hardhat");
const { writeFileSync } = require("fs");

async function main() {
  let result = {};

  for (let i = 0; i < 4; i++) {
    let wallet = ethers.Wallet.createRandom();
    result[`account_${i + 1}`] = {};
    result[`account_${i + 1}`].address = wallet.address;
    result[`account_${i + 1}`].mnemonic = wallet.mnemonic.phrase;
    result[`account_${i + 1}`].privateKey = wallet.privateKey;
  }

  //    writing accounts to the accounts.json file
  //   writeFileSync("accounts.json", JSON.stringify(result, null, 2));
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
