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
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers"


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    


    goerli: {
      url: RPCURL.RPCurl.goerli,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 5,
    },

    mumbai: {
      url: RPCURL.RPCurl.mumbai,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 80001,
    },

    fuji: {
      url: RPCURL.RPCurl.fuji,
      accounts: [process.env.PRIVATE_KEY_1],
      chainId: 43113,
    },

    bsc: {
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
        version: "0.8.17",
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
    apiKey: [process.env.ETHERSCAN_API_KEY]
  }
};
