require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
import "@openzeppelin/hardhat-upgrades";

import { task } from "hardhat/config";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    hardhat: {},

    // rinkeby: {
    //   url: process.env.RINKEBY_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
    //   chainId: 4,
    //   blockConfirmations: 6,
    // },
    // goerli: {
    //   url: process.env.GOERLI_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
    //   chainId: 5,
    //   blockConfirmations: 6,
    // },

    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/1lo5rOEtPbYlohlrOYiNa9xTUc2Qm8uD`,
      accounts: ['4fc7459f2cbdf22e0456f3e6fb980903bdcfa52ce068defba7bc73978069847a'],
      chainId: 80001,
      blockConfirmations: 6,
      // gas: 100000000000,
      // gasPrice: 100000000000,
      // blockGasLimit: 8000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: "HCR74CJFG27EPP8H1ZF2DMNP59FS6Q4W4H"
  }
};
