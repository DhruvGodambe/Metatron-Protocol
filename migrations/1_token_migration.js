const FinAxis = artifacts.require("FinAxis");
const Enoch = artifacts.require("Enoch");

module.exports = async function (deployer, networks, accounts) {
  await deployer.deploy(FinAxis);
  await deployer.deploy(Enoch);
};
