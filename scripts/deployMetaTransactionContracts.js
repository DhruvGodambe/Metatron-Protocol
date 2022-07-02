const { ethers } = require("hardhat");
const { writeFileSync } = require("fs");

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((f) => f.deployed());
}

async function main() {
  const forwarder = await deploy("MinimalForwarder");
  const registry = await deploy("Registry", forwarder.address);
  const mockToken = await deploy("MockToken", "MockToken", "MT_1");

  writeFileSync(
    "deploy.json",
    JSON.stringify(
      {
        MinimalForwarder: forwarder.address,
        Registry: registry.address,
        MockToken: mockToken.address,
      },
      null,
      2
    )
  );

  console.log(
    `MinimalForwarder: ${forwarder.address}\nRegistry: ${registry.address}\nMockToken: ${mockToken.address}`
  );
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
