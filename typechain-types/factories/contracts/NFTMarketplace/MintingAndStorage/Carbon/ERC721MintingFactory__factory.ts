/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721MintingFactory,
  ERC721MintingFactoryInterface,
} from "../../../../../contracts/NFTMarketplace/MintingAndStorage/Carbon/ERC721MintingFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldExchange",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newExchange",
        type: "address",
      },
    ],
    name: "ExchangeAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
    ],
    name: "NFTContractCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NFTMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "adminAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "createNFTContract",
    outputs: [
      {
        internalType: "address",
        name: "_nftcontract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getNFTsForOwner",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
    ],
    name: "getTotalNFTsMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nftToIdToOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nftToOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ownerToNFTs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newExchange",
        type: "address",
      },
    ],
    name: "updateExchangeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "updateOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055612472806100326000396000f3fe60806040523480156200001157600080fd5b5060043610620000b75760003560e01c8063ad0f93ad116200007a578063ad0f93ad146200015a578063bf7cc0bc1462000171578063da00183e14620001a8578063dc4c202614620001ce578063eacabe1414620001fa578063fc6f9468146200021157600080fd5b806314d76ffc14620000bc5780631bd5a5d314620000f057806331415a651462000109578063994212aa14620001205780639cd016051462000146575b600080fd5b620000d3620000cd36600462000801565b62000225565b6040516001600160a01b0390911681526020015b60405180910390f35b620001076200010136600462000889565b620002fe565b005b620001076200011a366004620008ca565b620003d9565b6200013762000131366004620008ca565b62000496565b604051620000e79190620008ef565b600154620000d3906001600160a01b031681565b620000d36200016b3660046200093e565b6200050e565b620000d3620001823660046200093e565b60036020908152600092835260408084209091529082529020546001600160a01b031681565b620001bf620001b9366004620008ca565b62000547565b604051908152602001620000e7565b620000d3620001df366004620008ca565b6004602052600090815260409020546001600160a01b031681565b620001076200020b3660046200096b565b620005b4565b600054620000d3906001600160a01b031681565b6000808383604051620002389062000748565b6200024592919062000a05565b604051809103906000f08015801562000262573d6000803e3d6000fd5b5033600081815260026020908152604080832080546001810182559084528284200180546001600160a01b0387166001600160a01b031991821681179092559084526004909252918290208054909116909217909155519091507fe05033be0f25d52c4b8af5abd6206011fe0006f22356a89e1ceaaeb5be9cce3d90620002ef9086908690859062000a37565b60405180910390a19392505050565b6001546001600160a01b031633146200035e5760405162461bcd60e51b815260206004820152601c60248201527f4f6e6c792045786368616e67652063616e2063616c6c2074686973210000000060448201526064015b60405180910390fd5b6001600160a01b03838116600081815260036020908152604080832087845282529182902080546001600160a01b0319169486169485179055815192835282018590528101919091527fbf7d716ccb48f073c088770f60a983dbc96730447d5eeccc755ba5f70efd4dac9060600160405180910390a1505050565b6000546001600160a01b03163314620004355760405162461bcd60e51b815260206004820152601960248201527f4f6e6c792041646d696e2063616e2063616c6c20746869732100000000000000604482015260640162000355565b600180546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527faae8f79ab8cb5fd21b5dcd706744632e9ad6eeb41f4f1517da1c17416c485d39910160405180910390a15050565b6001600160a01b0381166000908152600260209081526040918290208054835181840281018401909452808452606093928301828280156200050257602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311620004e3575b50505050509050919050565b600260205281600052604060002081815481106200052b57600080fd5b6000918252602090912001546001600160a01b03169150829050565b6000816001600160a01b03166330bdb3516040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000588573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005ae919062000a79565b92915050565b6001600160a01b038083166000908152600460205260409020548391163314620006215760405162461bcd60e51b815260206004820152601b60248201527f4f6e6c792043726561746f722063616e2063616c6c2074686973210000000000604482015260640162000355565b604051633157631f60e01b81526001600160a01b03841690633157631f906200064f90859060040162000a93565b6020604051808303816000875af11580156200066f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000695919062000a79565b506000836001600160a01b03166330bdb3516040518163ffffffff1660e01b8152600401602060405180830381865afa158015620006d7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620006fd919062000a79565b604080516001600160a01b0387168152602081018390529192507f4cc0a9c4a99ddc700de1af2c9f916a7cbfdb71f14801ccff94061ad1ef8a8040910160405180910390a150505050565b6119948062000aa983390190565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200077e57600080fd5b813567ffffffffffffffff808211156200079c576200079c62000756565b604051601f8301601f19908116603f01168101908282118183101715620007c757620007c762000756565b81604052838152866020858801011115620007e157600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080604083850312156200081557600080fd5b823567ffffffffffffffff808211156200082e57600080fd5b6200083c868387016200076c565b935060208501359150808211156200085357600080fd5b5062000862858286016200076c565b9150509250929050565b80356001600160a01b03811681146200088457600080fd5b919050565b6000806000606084860312156200089f57600080fd5b620008aa846200086c565b925060208401359150620008c1604085016200086c565b90509250925092565b600060208284031215620008dd57600080fd5b620008e8826200086c565b9392505050565b6020808252825182820181905260009190848201906040850190845b81811015620009325783516001600160a01b0316835292840192918401916001016200090b565b50909695505050505050565b600080604083850312156200095257600080fd5b6200095d836200086c565b946020939093013593505050565b600080604083850312156200097f57600080fd5b6200098a836200086c565b9150602083013567ffffffffffffffff811115620009a757600080fd5b62000862858286016200076c565b6000815180845260005b81811015620009dd57602081850181015186830182015201620009bf565b81811115620009f0576000602083870101525b50601f01601f19169290920160200192915050565b60408152600062000a1a6040830185620009b5565b828103602084015262000a2e8185620009b5565b95945050505050565b60608152600062000a4c6060830186620009b5565b828103602084015262000a608186620009b5565b91505060018060a01b0383166040830152949350505050565b60006020828403121562000a8c57600080fd5b5051919050565b602081526000620008e86020830184620009b556fe60806040523480156200001157600080fd5b5060405162001994380380620019948339810160408190526200003491620002a8565b8151829082906200004d90600090602085019062000128565b5080516200006390600190602084019062000128565b505050620000b16040518060400160405280601e81526020017f5468697320697320616e204e465420636f6e74726163742e2057686f61210000815250620000b960201b620007691760201c565b505062000384565b6200010481604051602401620000d0919062000312565b60408051601f198184030181529190526020810180516001600160e01b0390811663104c13eb60e21b179091526200010716565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054620001369062000347565b90600052602060002090601f0160209004810192826200015a5760008555620001a5565b82601f106200017557805160ff1916838001178555620001a5565b82800160010185558215620001a5579182015b82811115620001a557825182559160200191906001019062000188565b50620001b3929150620001b7565b5090565b5b80821115620001b35760008155600101620001b8565b634e487b7160e01b600052604160045260246000fd5b60005b8381101562000201578181015183820152602001620001e7565b8381111562000211576000848401525b50505050565b600082601f8301126200022957600080fd5b81516001600160401b0380821115620002465762000246620001ce565b604051601f8301601f19908116603f01168101908282118183101715620002715762000271620001ce565b816040528381528660208588010111156200028b57600080fd5b6200029e846020830160208901620001e4565b9695505050505050565b60008060408385031215620002bc57600080fd5b82516001600160401b0380821115620002d457600080fd5b620002e28683870162000217565b93506020850151915080821115620002f957600080fd5b50620003088582860162000217565b9150509250929050565b602081526000825180602084015262000333816040850160208701620001e4565b601f01601f19169190910160400192915050565b600181811c908216806200035c57607f821691505b602082108114156200037e57634e487b7160e01b600052602260045260246000fd5b50919050565b61160080620003946000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806342842e0e11610097578063a22cb46511610066578063a22cb465146101f4578063b88d4fde14610207578063c87b56dd1461021a578063e985e9c51461022d57600080fd5b806342842e0e146101b35780636352211e146101c657806370a08231146101d957806395d89b41146101ec57600080fd5b8063095ea7b3116100d3578063095ea7b31461016257806323b872dd1461017757806330bdb3511461018a5780633157631f146101a057600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d6101083660046110b4565b610269565b60405190151581526020015b60405180910390f35b61012a6102bb565b6040516101199190611129565b61014a61014536600461113c565b61034d565b6040516001600160a01b039091168152602001610119565b610175610170366004611171565b610374565b005b61017561018536600461119b565b61048f565b6101926104c0565b604051908152602001610119565b6101926101ae366004611263565b6104d0565b6101756101c136600461119b565b610501565b61014a6101d436600461113c565b61051c565b6101926101e73660046112ac565b61057c565b61012a610602565b6101756102023660046112c7565b610611565b610175610215366004611303565b610620565b61012a61022836600461113c565b610658565b61010d61023b36600461137f565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061029a57506001600160e01b03198216635b5e139f60e01b145b806102b557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102ca906113b2565b80601f01602080910402602001604051908101604052809291908181526020018280546102f6906113b2565b80156103435780601f1061031857610100808354040283529160200191610343565b820191906000526020600020905b81548152906001019060200180831161032657829003601f168201915b5050505050905090565b6000610358826107af565b506000908152600460205260409020546001600160a01b031690565b600061037f8261051c565b9050806001600160a01b0316836001600160a01b031614156103f25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061040e575061040e813361023b565b6104805760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103e9565b61048a838361080e565b505050565b610499338261087c565b6104b55760405162461bcd60e51b81526004016103e9906113ed565b61048a8383836108fa565b60006104cb60075490565b905090565b60006104e0600780546001019055565b60006104eb60075490565b90506104f73382610a96565b6102b58184610bd8565b61048a83838360405180602001604052806000815250610620565b6000818152600260205260408120546001600160a01b0316806102b55760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103e9565b60006001600160a01b0382166105e65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103e9565b506001600160a01b031660009081526003602052604090205490565b6060600180546102ca906113b2565b61061c338383610c72565b5050565b61062a338361087c565b6106465760405162461bcd60e51b81526004016103e9906113ed565b61065284848484610d41565b50505050565b6060610663826107af565b6000828152600660205260408120805461067c906113b2565b80601f01602080910402602001604051908101604052809291908181526020018280546106a8906113b2565b80156106f55780601f106106ca576101008083540402835291602001916106f5565b820191906000526020600020905b8154815290600101906020018083116106d857829003601f168201915b50505050509050600061071360408051602081019091526000815290565b9050805160001415610726575092915050565b81511561075857808260405160200161074092919061143b565b60405160208183030381529060405292505050919050565b61076184610d74565b949350505050565b6107ac8160405160240161077d9190611129565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610de8565b50565b6000818152600260205260409020546001600160a01b03166107ac5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103e9565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906108438261051c565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806108888361051c565b9050806001600160a01b0316846001600160a01b031614806108cf57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806107615750836001600160a01b03166108e88461034d565b6001600160a01b031614949350505050565b826001600160a01b031661090d8261051c565b6001600160a01b0316146109715760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103e9565b6001600160a01b0382166109d35760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103e9565b6109de60008261080e565b6001600160a01b0383166000908152600360205260408120805460019290610a07908490611480565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a35908490611497565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610aec5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103e9565b6000818152600260205260409020546001600160a01b031615610b515760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103e9565b6001600160a01b0382166000908152600360205260408120805460019290610b7a908490611497565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b0316610c535760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103e9565b6000828152600660209081526040909120825161048a92840190611005565b816001600160a01b0316836001600160a01b03161415610cd45760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103e9565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610d4c8484846108fa565b610d5884848484610e09565b6106525760405162461bcd60e51b81526004016103e9906114af565b6060610d7f826107af565b6000610d9660408051602081019091526000815290565b90506000815111610db65760405180602001604052806000815250610de1565b80610dc084610f07565b604051602001610dd192919061143b565b6040516020818303038152906040525b9392505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60006001600160a01b0384163b15610efc57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e4d903390899088908890600401611501565b6020604051808303816000875af1925050508015610e88575060408051601f3d908101601f19168201909252610e859181019061153e565b60015b610ee2573d808015610eb6576040519150601f19603f3d011682016040523d82523d6000602084013e610ebb565b606091505b508051610eda5760405162461bcd60e51b81526004016103e9906114af565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610761565b506001949350505050565b606081610f2b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f555780610f3f8161155b565b9150610f4e9050600a8361158c565b9150610f2f565b60008167ffffffffffffffff811115610f7057610f706111d7565b6040519080825280601f01601f191660200182016040528015610f9a576020820181803683370190505b5090505b841561076157610faf600183611480565b9150610fbc600a866115a0565b610fc7906030611497565b60f81b818381518110610fdc57610fdc6115b4565b60200101906001600160f81b031916908160001a905350610ffe600a8661158c565b9450610f9e565b828054611011906113b2565b90600052602060002090601f0160209004810192826110335760008555611079565b82601f1061104c57805160ff1916838001178555611079565b82800160010185558215611079579182015b8281111561107957825182559160200191906001019061105e565b50611085929150611089565b5090565b5b80821115611085576000815560010161108a565b6001600160e01b0319811681146107ac57600080fd5b6000602082840312156110c657600080fd5b8135610de18161109e565b60005b838110156110ec5781810151838201526020016110d4565b838111156106525750506000910152565b600081518084526111158160208601602086016110d1565b601f01601f19169290920160200192915050565b602081526000610de160208301846110fd565b60006020828403121561114e57600080fd5b5035919050565b80356001600160a01b038116811461116c57600080fd5b919050565b6000806040838503121561118457600080fd5b61118d83611155565b946020939093013593505050565b6000806000606084860312156111b057600080fd5b6111b984611155565b92506111c760208501611155565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611208576112086111d7565b604051601f8501601f19908116603f01168101908282118183101715611230576112306111d7565b8160405280935085815286868601111561124957600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561127557600080fd5b813567ffffffffffffffff81111561128c57600080fd5b8201601f8101841361129d57600080fd5b610761848235602084016111ed565b6000602082840312156112be57600080fd5b610de182611155565b600080604083850312156112da57600080fd5b6112e383611155565b9150602083013580151581146112f857600080fd5b809150509250929050565b6000806000806080858703121561131957600080fd5b61132285611155565b935061133060208601611155565b925060408501359150606085013567ffffffffffffffff81111561135357600080fd5b8501601f8101871361136457600080fd5b611373878235602084016111ed565b91505092959194509250565b6000806040838503121561139257600080fd5b61139b83611155565b91506113a960208401611155565b90509250929050565b600181811c908216806113c657607f821691505b602082108114156113e757634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b6000835161144d8184602088016110d1565b8351908301906114618183602088016110d1565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156114925761149261146a565b500390565b600082198211156114aa576114aa61146a565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611534908301846110fd565b9695505050505050565b60006020828403121561155057600080fd5b8151610de18161109e565b600060001982141561156f5761156f61146a565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261159b5761159b611576565b500490565b6000826115af576115af611576565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220c3fd84fa553e9d50cf3856dad682c830913d51e530fa601c188ac35ffe52cfd064736f6c634300080a0033a264697066735822122094b2dfbd52ff4e4019f904d7ff31d426fa0f7186b598d8743d31b223dadafe1764736f6c634300080a0033";

type ERC721MintingFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721MintingFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721MintingFactory__factory extends ContractFactory {
  constructor(...args: ERC721MintingFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721MintingFactory> {
    return super.deploy(overrides || {}) as Promise<ERC721MintingFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC721MintingFactory {
    return super.attach(address) as ERC721MintingFactory;
  }
  override connect(signer: Signer): ERC721MintingFactory__factory {
    return super.connect(signer) as ERC721MintingFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721MintingFactoryInterface {
    return new utils.Interface(_abi) as ERC721MintingFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721MintingFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC721MintingFactory;
  }
}
