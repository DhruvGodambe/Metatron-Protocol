require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox');
// require("@nomicfoundation/hardhat-chai-matchers");
const { task } = require("hardhat/config");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs:any, hre:any) => {
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
    goerli: {
      url: 'https://ethereum-goerli-rpc.allthatnode.com/',
      accounts: ['80ece692ca12026fc0e22c8a30fede47908513e49d86eddb8598f02e51f23f19'],
      chainId: 5,
      blockConfirmations: 6,
    },

    mumbai: {
      url: `https://polygon-testnet-rpc.allthatnode.com:8545`,
      accounts: ['80ece692ca12026fc0e22c8a30fede47908513e49d86eddb8598f02e51f23f19'],
      chainId: 80001,
      blockConfirmations: 6,
    },
    
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: ['80ece692ca12026fc0e22c8a30fede47908513e49d86eddb8598f02e51f23f19'],
      chainId: 43113,
      blockConfirmations: 6,
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
    apiKey: "7ADQVGNSBRPGF84Q1XK4MX2FW4ZJ7JDHUS"
  }
};
