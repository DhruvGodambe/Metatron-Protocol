const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = '0x07c20878809E284D4c94cf14c39b3Ed80c3B3A0e';

  // Verify the contract
  await hre.run('verify:verify', {
    address: contractAddress,
    constructorArguments: ['https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Football+Collection+metadata/','https://frontnd-s3-enoch-dev.s3.eu-west-2.amazonaws.com/Enoch+Football+Collection+metadata/contractURI.json'],
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
