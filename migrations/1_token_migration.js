const FinAxis = artifacts.require("FinAxis");
const Panda = artifacts.require("Panda");

module.exports = async function (deployer, networks, accounts) {
  await deployer.deploy(FinAxis);
  await deployer.deploy(Panda);
  
  const finaInstance = await FinAxis.deployed();
  const pandaInstance = await Panda.deployed();
  
  const fina_balance = await finaInstance.balanceOf(finaInstance.address);
  const panda_balance = await pandaInstance.balanceOf(pandaInstance.address);

  console.log('intial FINA contract balance: ', fina_balance.toString());
  console.log('intial PANDA contract balance: ', panda_balance.toString());
};
