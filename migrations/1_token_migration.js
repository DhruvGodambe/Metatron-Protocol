const FinAxis = artifacts.require("FinAxis");
const Enoch = artifacts.require("Enoch");

module.exports = async function (deployer, networks, accounts) {
  await deployer.deploy(FinAxis);
  await deployer.deploy(Enoch);
  
  const finaInstance = await FinAxis.deployed();
  const EnochInstance = await Enoch.deployed();
  
  const fina_balance = await finaInstance.balanceOf(finaInstance.address);
  const Enoch_balance = await EnochInstance.balanceOf(EnochInstance.address);

  console.log('intial FINA contract balance: ', fina_balance.toString());
  console.log('intial Enoch contract balance: ', Enoch_balance.toString());
};
