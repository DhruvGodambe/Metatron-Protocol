const FinAxis = artifacts.require('FinAxis');

contract("FinAxis", accounts => {
    it('should transfer all tokens to deployer account address', async () => {
        let finaInstance = await FinAxis.deployed();
        const deployer_balance = await finaInstance.balanceOf(accounts[0]);
        
        assert.equal(deployer_balance.toString(), '210000000000000000');
    })
})