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

    const obj = {"nonce":326843,"timestamp":"1671607403144","message":"I am signing in at 2022-12-21T07:23:23.144Z"};
    // const obj = "0x48656c6c6f414b00000000000000000000000000000000000000000000000000";
    const str = JSON.stringify(obj);

    // console.log("str : ", str);
    

    // let tx1 = await testSign.getMessageHash(obj);
    // console.log("get message hash tx : ", tx1);
    
    // let tx2 = await testSign.getEthSignedMessageHash(tx1);
    // console.log("get eth signed message hash :", tx2);

    const signature = "0x6e6af43443ea1324faa048a4a64d98d38b96ab33d876c97c55fd59302b47f68217ea7a335e452b306f4080cf01cf0dd0683dd86a845bc23586601d8e3acaf4841c";
    let verified = await ethers.utils.verifyMessage(str, signature);
    console.log("verified : ",verified);
    

    // let tx3 = await testSign.recoverSigner(tx2, signature);
    // console.log("recover signer : ", tx3 );

    // let tx4 = await testSign.verify("0xCB61f141D37C320B4357173ec28Af37A5E09d949", obj, signature);
    // console.log("tx4 : ", tx4);
    
    


    






};

runmain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });