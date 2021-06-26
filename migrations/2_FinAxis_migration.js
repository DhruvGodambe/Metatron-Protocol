const FinAxis = artifacts.require("FinAxis");

module.exports = async function (deployer, networks, accounts) {
  await deployer.deploy(FinAxis);
  const finaInstance = await FinAxis.deployed();
  
  const contract_balance = await finaInstance.balanceOf(finaInstance.address);
  console.log('intial contract balance: ', contract_balance.toString());
};
