const { expect } = require("chai");
const { ethers } = require("hardhat");

let accounts, Staking, StakingInstance;

describe("Staking", () => {
    beforeEach(async () => {
        accounts = await ethers.getSigners();

        Staking = await ethers.getContractFactory("Staking");
        StakingInstance = await Staking.deploy();
    })
})