const { ethers } = require("hardhat");
const { writeFileSync } = require("fs");

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((f) => f.deployed());
}

async function main() {
  const forwarder = await deploy("MinimalForwarder");
  await forwarder.deployed();
  const registry = await deploy("Registry", forwarder.address);
  await registry.deployed();
  // const registry = { address: "0x00" };
  // const forwarder = { address: "0x7424B39abD3fb87517aE6900C398996ed01548A8" };
  // const registry = { address: "0x00" };

  const mockToken = await deploy(
    "MockToken",
    "Mock Token",
    "MT_1",
    forwarder.address
  );
  await mockToken.deployed();

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
