const { expect } = require("chai");
const { ethers } = require("hardhat");

let Staking, StakingInstance;
describe("====>Staking<====", () => {
    beforeEach(async () => {
        const accounts = await ethers.getSigners();
        Staking = await ethers.getContractFactory("Staking");
        StakingInstance = await Staking.deploy();
    })


    it('should get the Pool Status', async () => {
        
    })

    it('should get the Staking Period', async () => {
        const staking_period = await StakingInstance.STAKING_PERIOD();
        console.log(staking_period);
        expect(staking_period.toString()).to.equal('0');
    })

    it('should get the Reward Composition', async () => {
        
    })

    it('should get the Total Pool Size', async () => {
        
    })

    it('should get the volume in 24 hours', async () => {
        
    })

    it('should get the address of stakers', async () => {
        
    })
    
    it('should get the APY', async () => {
        const apy = await StakingInstance.APY();
        expect(apy.toString()).to.equal('0');
        console.log(apy);
    })

    it('should set the Reward Constant', async () => {
            // Earned Amount = Initial Stake * [1 + r/n] ^ (n * y)
            // Since n = 1,
            // Total Earning = d * [1 + r] ^ y
            // suppose x**y; x = 1.90, y = 0.25;
            // x**y = 1.1741
            // REWARD_CONSTANT = 11741
    let r = 0.90;
    r += 1; 
    console.log("r", r);
    let y = 0.25;
    console.log("y", y);
    
    let val = (r**y).toPrecision(5);
    console.log("exponent", val);
    
    const reward_constant = val*10**4;
    console.log('Reward Constant', reward_constant);
    })


    it('should get the Reward Constant', async () => {
        let r = 0.90;
    r += 1;
    console.log("r", r);
    let y = 0.25;
    console.log("y", y);
    
    let val = (r**y).toPrecision(5);
    console.log("exponent", val);
    console.log('Reward Constant', reward_constant);
    })

})