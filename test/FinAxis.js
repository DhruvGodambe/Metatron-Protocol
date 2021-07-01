const FinAxis = artifacts.require('FinAxis');

contract("FinAxis", accounts => {
    it('should transfer all tokens to deployer account address', async () => {
        let finaInstance = await FinAxis.deployed();
        const deployer_balance = await finaInstance.balanceOf(accounts[0]);
        
        assert.equal(deployer_balance.toString(), '210000000000000000');
    })

    it('should tranfer 100 FINA from deployer address to another address', async () => {
        let finaInstance = await FinAxis.deployed();
        const tx = await finaInstance.transfer(accounts[1], 1000000000000);

        const balance0 = await finaInstance.balanceOf(accounts[0]);
        console.log("FINA balance of account 0: ", balance0.toString());

        const balance1 = await finaInstance.balanceOf(accounts[1]);
        console.log("FINA balance of account 1: ", balance1.toString())

    })
})