require("@nomiclabs/hardhat-etherscan");
import '@nomiclabs/hardhat-ethers'
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox');
require("@nomicfoundation/hardhat-chai-matchers");
const { task } = require("hardhat/config");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
const RPCURL = require("./scripts/Wormhole/RPC.json");


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
    


    goerli: {
      // url: "https://eth-goerli.g.alchemy.com/v2/OW3K8LQl3oZeZLxuOTzgbRkFsEBkThgA",
      url: RPCURL.RPCurl.goerli,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 5,
    },

    mumbai: {
      // url: `https://matic-mumbai.chainstacklabs.com`,
      url: RPCURL.RPCurl.mumbai,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 80001,
    },

    fuji: {
      // url: `https://api.avax-test.network/ext/bc/C/rpc`,
      url: RPCURL.RPCurl.fuji,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 43113,
    },

    bsc: {
      // url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      url: RPCURL.RPCurl.bsc,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 97,
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
      },{
        version: "0.8.13",
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
    // apiKey: [process.env.ETHERSCAN_API_KEY]
    // goerli
    // apiKey: "E64T3MHX34J6QRFHSSIAMM4QSR2PXFZ5KK"
    // mumbai
    apiKey: "7ADQVGNSBRPGF84Q1XK4MX2FW4ZJ7JDHUS"
  }
};
