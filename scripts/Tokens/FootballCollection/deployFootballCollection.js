const { ethers } = require('hardhat');

async function main() {
  // Get the signers
  const [deployer] = await ethers.getSigners();

  // Deploy the contract
  const FootballJerseys = await ethers.getContractFactory('EnochFootballCollection');
  const baseURI = "https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Football+Collection+metadata/";
  const contractURI = "https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Football+Collection+metadata/contractURI.json";
  
  const contract = await FootballJerseys.deploy(baseURI, contractURI);
  await contract.deployed();

  // Print contract address
  console.log('Contract deployed to:', contract.address);
  console.log('Deployed by:', deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error deploying contract:', error);
    process.exit(1);
  });
