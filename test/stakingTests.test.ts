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
  let DKToken: any;
  let dkToken: any;
  let Barrel: any;
  let barrel: any;


  this.beforeAll(async function () {
    accounts = await ethers.getSigners();

    Staking = await ethers.getContractFactory("Staking");
    StakeFactory = await ethers.getContractFactory("StakeFactory");
    DKToken = await ethers.getContractFactory('DKToken');
    Barrel = await ethers.getContractFactory('Barrel');

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

    dkToken = await DKToken.deploy();
    await dkToken.deployed();
    console.log("DKToken deployed at ", dkToken.address);

    barrel = await Barrel.deploy();
    await barrel.deployed();
    console.log("Barrel deployed at ", barrel.address);

    await staking.initialize(barrel.address, dkToken.address, 90, 90)
    await stakeFactory.initialize(staking.address);

    // try deploying one contract from factory


  });

  it ("Kuch to krna chahinye", async () => {
    console.log("Helle from tests!");
  });

  it ("Check my ERC-20 bal && Mint NFT", async () => {
    let tx = await dkToken.connect(owner).balanceOf(ownerAddress);
    console.log("Helle from tests!");
    console.log("balance", tx);

    let tx2 = await barrel.connect(owner).mint(ownerAddress, 1);
    console.log("Helle from tests!");

    let tx3 = await barrel.connect(owner).balanceOf(ownerAddress);
    console.log("Barrel Bal.", tx3);
  });

  it ("Chalo stake karte hai", async () => {
    let tx1 = await barrel.connect(owner).mint(ownerAddress, 1);
    let tx2 = await barrel.connect(owner).approve(Staking.address, 1);
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


});
