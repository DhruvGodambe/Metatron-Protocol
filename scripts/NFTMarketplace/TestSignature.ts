import {ethers} from 'hardhat';
const hre = require("hardhat");

const runmain = async () => {

    const accounts = await ethers.getSigners();
    const admin  = accounts[0];

    
    console.log("Deploying test sign...");

    const TestSign = await hre.ethers.getContractFactory("TestSign");
    const testSign = await TestSign.deploy();

    await testSign.deployed();
    console.log("Address : ", testSign.address);

    const obj = "0x48656c6c6f414b00000000000000000000000000000000000000000000000000";
    // const str = JSON.stringify(obj);

    // console.log("str : ", str);
    

    let tx1 = await testSign.getMessageHash(obj);
    console.log("get message hash tx : ", tx1);
    
    let tx2 = await testSign.getEthSignedMessageHash(tx1);
    console.log("get eth signed message hash :", tx2);

    const signature = "0xfd4e57f54c99af3992693a5c524c49c8d29d18da208796c7e55082e298bda1044da8cd453aa10ba2201ea7959c8b5b3d5d005012b775b0d99925404c8f4d33841b";
    // let verified = await ethers.utils.verifyMessage(obj, signature);
    // console.log("verified : ",verified);
    

    let tx3 = await testSign.recoverSigner(tx2, signature);
    console.log("recover signer : ", tx3 );

    let tx4 = await testSign.verify("0xCB61f141D37C320B4357173ec28Af37A5E09d949", obj, signature);
    console.log("tx4 : ", tx4);
    
    


    






};

runmain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });