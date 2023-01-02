const { ethers} = require("hardhat");
const hre = require("hardhat");

const main = async () => {

    const constructorABI = [{
			"inputs": [
				{
					"internalType": "string",
					"name": "_nickName",
					"type": "string"
				}
			],
			"name": "initialize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}];

    const args = ["anku"]

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