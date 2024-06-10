const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = '0xDA7aFcA27E0C4a9C2579d9Ae981E135e79fBbB82';
  const baseURI = "https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Daily+Missions+metadata/";
  const contractURI = "https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Daily+Missions+metadata/contractURI.json";
  
  // Verify the contract
  await hre.run('verify:verify', {
    address: contractAddress,
    contract: "contracts/Tokens/EnochDailyMissions.sol:EnochDailyMissions",
    constructorArguments: [baseURI, contractURI],
  });

  console.log('Contract verified successfully:', contractAddress);
  console.log('Verified by:', deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error verifying contract:', error);
    process.exit(1);
  });
