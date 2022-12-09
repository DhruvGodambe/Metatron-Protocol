const { ethers } = require("hardhat");
const abi = require("../../artifacts/contracts/Tokens/ERC1155.sol/GameItems.json");

const main = async () => {
  const accounts = await ethers.getSigners();

  owner = accounts[0];
  user = accounts[1];

  ownerAddress = await accounts[0].getAddress();
  userAddress = await accounts[1].getAddress();

  console.log(`---------- Creating Instance of ERC1155 ----------\n`);

  const GameItems = await ethers.getContractFactory("GameItems", owner);
  const gameItems = await GameItems.deploy();
  const txReceipt = await gameItems.deployed();

  //   console.log(Object.values(txReceipt));

  //   console.log(`Contract Instance ==> ${txReceipt}\n`);
  console.log(txReceipt);
  console.log(`Contract Address ==> ${txReceipt.address}\n`);

  console.log(`---------- Calling safeTransferFrom ----------`);
  const id = 2;
  const amount = 1;
  const data = 0x00;

  const tx1 = await gameItems.safeTransferFrom(
    ownerAddress,
    userAddress,
    id,
    amount,
    data
  );

  const tx1Receipt = await tx1.wait();
  //   console.log(`tx1Receipt ==> ${tx1Receipt}\n`);
  //   console.log(tx1Receipt);
  //   console.log(tx1Receipt.events[0].args);

  console.log("\nFrom Address", tx1Receipt.events[0].args.from);
  console.log("To Address", tx1Receipt.events[0].args.to);
  console.log("ERC1155 Id", tx1Receipt.events[0].args.id);
  console.log("ERC1155 value", tx1Receipt.events[0].args.value);

  console.log(`\n---------- Calling balanceOf ----------\n`);

  const tx2 = await gameItems.balanceOf(userAddress, id);
  //   const tx2Receipt = await tx2.wait();

  //   console.log(`tx2Receipt ==> ${tx2}`);
  //   console.log(tx2);
  console.log("balanceOf Address is", tx2);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
