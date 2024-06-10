const hre = require("hardhat");


const verify = async () => {
    const proxy = "0x58618fe0d38292A1D1c0FB40E257552a8dd9b063"
    const impl = "0xC858D67961467B05d0a8620F6418FCC762e5Af50"
    const encodedData = "0xfe4b84df0000000000000000000000000000000000000000019d971e4fe8401e74000000"

    return await hre.run("verify:verify", {
        address: proxy,
        // contract: "contracts/Tokens/LoveUUPS/Love.sol:Love",
        // contract: "contracts/Tokens/LoveUUPS/LoveProxy.sol:LoveProxy",
        contract: "contracts/Tokens/Enoch.sol:Enoch",
        constructorArguments: [
          // impl,
          // encodedData
        ]
      });    
}
const main = () => {
    verify();
}

main()