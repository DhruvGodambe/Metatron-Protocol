import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { log } from "console";

const { expectRevert, time } = require("@openzeppelin/test-helpers");

describe("====>Staking<====", function () {
  let accounts: Signer[];
  let owner: Signer;
  let user: Signer;
  let ownerAddress: string;
  let userAddress: string;
  let userAddress2: string;
  let Staking: any;
  let staking: any;
  let StakeFactory: any;
  let stakeFactory: any;
  let Enoch: any;
  let enoch: any;
  let PremiumNFT: any;
  let premiumNFT: any;


  this.beforeAll(async function () {
    accounts = await ethers.getSigners();

    Staking = await ethers.getContractFactory("Staking");
    StakeFactory = await ethers.getContractFactory("StakeFactory");
    Enoch = await ethers.getContractFactory('Enoch');
    PremiumNFT = await ethers.getContractFactory('PremiumNFT');

  });

  this.beforeEach(async () => {
    owner = accounts[0];
    user = accounts[1];
    ownerAddress = await accounts[0].getAddress();
    userAddress = await accounts[1].getAddress();
    userAddress2 = await accounts[2].getAddress();

    console.log("Aho!");
    
    staking = await Staking.deploy();
    await staking.deployed();
    console.log("Staking deployed at ", staking.address);

    stakeFactory = await StakeFactory.deploy();
    await stakeFactory.deployed();
    console.log("Factory deployed at ", stakeFactory.address);

    enoch = await Enoch.deploy();
    await enoch.deployed();
    console.log("DKToken deployed at ", enoch.address);

    premiumNFT = await PremiumNFT.deploy("Knight Templer Distillery", "KTD");
    await premiumNFT.deployed();
    console.log("Barrel deployed at ", premiumNFT.address);

    await staking.initialize(premiumNFT.address, enoch.address, 90, 3)
    await stakeFactory.initialize(staking.address);

    // try deploying one contract from factory


  });

  it ("Kuch to krna chahinye", async () => {
    console.log("Helle from tests!");
  });

  it ("Check my ERC-20 bal && Mint NFT", async () => {
    let tx = await enoch.connect(owner).balanceOf(ownerAddress);
    console.log("Helle from tests!");
    console.log("balance", tx);

    let tx2 = await premiumNFT.connect(owner).mint(ownerAddress, 1);
    console.log("Helle from tests!");

    let tx3 = await premiumNFT.connect(owner).balanceOf(ownerAddress);
    console.log("Barrel Bal.", tx3);
  });

  it ("Chalo stake karte hai", async () => {
    let tx1 = await premiumNFT.connect(owner).mint(ownerAddress, 1);
    let tx2 = await premiumNFT.connect(owner).approve(staking.address, 1);
    let tx3 = await staking.connect(owner).setRewardConstant(11633);

    let tx = await staking.connect(owner).stake(ownerAddress, 1, 100);
    console.log("Staked!");

    console.log("\nUser Stake Info\n");
    let tx4 = await staking.connect(owner).getStakedInfo(ownerAddress, 1);
    console.log(tx4);
  });

  it ("Let's do some caln.", async () => {
    let x = 0.85;
    x += 1;
    console.log("x", x);
    let y = 0.25;
    console.log("y", y);
    
    let val = (x**y).toPrecision(5);
    console.log("exponent", val);
  });

  it ("Calling calculate rewards", async () => {
    console.log("The owner calling", ownerAddress);
    
    let tx1 = await staking.setRewardConstant(10000);
    // const receipt = await tx1.wait();
    // console.log("tx1", tx1);
    
    let tx = await staking._calculateRewards(100);
    // const receipt2 = await tx.wait();
    // console.log("tx", receipt2);
    
  });

  it ("Creating StakingProxy using StakeFactory",async () => {
    let tx = await stakeFactory.connect(owner).setupStakeContract(premiumNFT.address, enoch.address, 90, 3);
    console.log(tx);
    
   
  })


});
