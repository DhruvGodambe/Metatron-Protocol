const FinAxis = artifacts.require('FinAxis');

contract("FinAxis", accounts => {
    it('should transfer all tokens to deployer account address', async () => {
        let finaInstance = await FinAxis.deployed();
        const deployer_balance = await finaInstance.balanceOf(accounts[0]);
        
        assert.equal(deployer_balance.toString(), '210000000000000000');
    })

    it('should tranfer 100 FINA from deployer address to another address', async () => {
        let finaInstance = await FinAxis.deployed();
        const tx = await finaInstance.transfer(accounts[1], 1000000000000, {from: accounts[0]});

        const balance0 = await finaInstance.balanceOf(accounts[0]);
        console.log("FINA balance of account 0: ", balance0.toString());

        const balance1 = await finaInstance.balanceOf(accounts[1]);
        console.log("FINA balance of account 1: ", balance1.toString())
        
        assert.equal(balance1.toString(), "1000000000000");
    })

    it('should allow owner to mint 100 FINA', async () => {
        let finaInstance = await FinAxis.deployed();
        const tx = await finaInstance.mint(1000000000000, {from: accounts[0]});

        const balance0 = await finaInstance.balanceOf(accounts[0]);
        console.log("FINA balance of account 0 after minting 100 FINA: ", balance0.toString());
    })

    it('should not allow tranfer from account of low balance', async () => {
        let finaInstance = await FinAxis.deployed();
        try {
            const tx = await finaInstance.transfer(accounts[1], 1000000000000, {from: accounts[2]});
        } catch(e) {
            console.log(e.reason);
            assert.equal(e.reason, "ERC20: transfer amount exceeds balance");
        }
    })

    it('should not allow other accounts, except for owner, to mint FINA', async () => {
        let finaInstance = await FinAxis.deployed();
        try {
            const tx = await finaInstance.mint(1000000000000, {from: accounts[1]});
        } catch(e) {
            console.log(e.reason);
            assert.equal(e.reason, "You are not authorized to mint FINA");
        }
    })
})