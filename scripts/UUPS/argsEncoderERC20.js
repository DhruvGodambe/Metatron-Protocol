const { ethers} = require("hardhat");

const Book = require("../NFTMarketplace/Addresses.json");
const adminRegistryAddress = Book.ADMIN_REGISTRY_ADDRESS;

const main = async () => {

    const constructorABI = [{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adminRegistry",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}];


	const decimals = 18;
	const EnochSupply = "90000000"; // $90M
	// const LoveSupply = "1000000000"; // $1B
	const _initialSupply = ethers.utils.parseUnits(EnochSupply, decimals);

    const args = ["0x0CF20Fa8217D666eA2fA99F674C395e33BA4e79C", _initialSupply];

    let interface= new ethers.utils.Interface(constructorABI);
    const encodedData = interface.encodeFunctionData("initialize", args);
    console.log("encodedData : ", encodedData);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error: ", error);
    process.exit(1);
  });