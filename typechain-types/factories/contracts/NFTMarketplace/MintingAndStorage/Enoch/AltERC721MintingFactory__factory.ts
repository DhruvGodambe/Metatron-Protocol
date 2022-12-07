/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  AltERC721MintingFactory,
  AltERC721MintingFactoryInterface,
} from "../../../../../contracts/NFTMarketplace/MintingAndStorage/Enoch/AltERC721MintingFactory";

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
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905561250e806100326000396000f3fe60806040523480156200001157600080fd5b5060043610620000b75760003560e01c8063ad0f93ad116200007a578063ad0f93ad146200015a578063bf7cc0bc1462000171578063da00183e14620001a8578063dc4c202614620001ce578063eacabe1414620001fa578063fc6f9468146200021157600080fd5b806314d76ffc14620000bc5780631bd5a5d314620000f057806331415a651462000109578063994212aa14620001205780639cd016051462000146575b600080fd5b620000d3620000cd36600462000803565b62000225565b6040516001600160a01b0390911681526020015b60405180910390f35b62000107620001013660046200088b565b62000300565b005b620001076200011a366004620008cc565b620003db565b6200013762000131366004620008cc565b62000498565b604051620000e79190620008f1565b600154620000d3906001600160a01b031681565b620000d36200016b36600462000940565b62000510565b620000d36200018236600462000940565b60036020908152600092835260408084209091529082529020546001600160a01b031681565b620001bf620001b9366004620008cc565b62000549565b604051908152602001620000e7565b620000d3620001df366004620008cc565b6004602052600090815260409020546001600160a01b031681565b620001076200020b3660046200096d565b620005b6565b600054620000d3906001600160a01b031681565b60008083833360405162000239906200074a565b620002479392919062000a07565b604051809103906000f08015801562000264573d6000803e3d6000fd5b5033600081815260026020908152604080832080546001810182559084528284200180546001600160a01b0387166001600160a01b031991821681179092559084526004909252918290208054909116909217909155519091507fe05033be0f25d52c4b8af5abd6206011fe0006f22356a89e1ceaaeb5be9cce3d90620002f19086908690859062000a07565b60405180910390a19392505050565b6001546001600160a01b03163314620003605760405162461bcd60e51b815260206004820152601c60248201527f4f6e6c792045786368616e67652063616e2063616c6c2074686973210000000060448201526064015b60405180910390fd5b6001600160a01b03838116600081815260036020908152604080832087845282529182902080546001600160a01b0319169486169485179055815192835282018590528101919091527fbf7d716ccb48f073c088770f60a983dbc96730447d5eeccc755ba5f70efd4dac9060600160405180910390a1505050565b6000546001600160a01b03163314620004375760405162461bcd60e51b815260206004820152601960248201527f4f6e6c792041646d696e2063616e2063616c6c20746869732100000000000000604482015260640162000357565b600180546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527faae8f79ab8cb5fd21b5dcd706744632e9ad6eeb41f4f1517da1c17416c485d39910160405180910390a15050565b6001600160a01b0381166000908152600260209081526040918290208054835181840281018401909452808452606093928301828280156200050457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311620004e5575b50505050509050919050565b600260205281600052604060002081815481106200052d57600080fd5b6000918252602090912001546001600160a01b03169150829050565b6000816001600160a01b03166330bdb3516040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200058a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005b0919062000a49565b92915050565b6001600160a01b038083166000908152600460205260409020548391163314620006235760405162461bcd60e51b815260206004820152601b60248201527f4f6e6c792043726561746f722063616e2063616c6c2074686973210000000000604482015260640162000357565b604051633157631f60e01b81526001600160a01b03841690633157631f906200065190859060040162000a63565b6020604051808303816000875af115801562000671573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000697919062000a49565b506000836001600160a01b03166330bdb3516040518163ffffffff1660e01b8152600401602060405180830381865afa158015620006d9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620006ff919062000a49565b604080516001600160a01b0387168152602081018390529192507f4cc0a9c4a99ddc700de1af2c9f916a7cbfdb71f14801ccff94061ad1ef8a8040910160405180910390a150505050565b611a608062000a7983390190565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200078057600080fd5b813567ffffffffffffffff808211156200079e576200079e62000758565b604051601f8301601f19908116603f01168101908282118183101715620007c957620007c962000758565b81604052838152866020858801011115620007e357600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080604083850312156200081757600080fd5b823567ffffffffffffffff808211156200083057600080fd5b6200083e868387016200076e565b935060208501359150808211156200085557600080fd5b5062000864858286016200076e565b9150509250929050565b80356001600160a01b03811681146200088657600080fd5b919050565b600080600060608486031215620008a157600080fd5b620008ac846200086e565b925060208401359150620008c3604085016200086e565b90509250925092565b600060208284031215620008df57600080fd5b620008ea826200086e565b9392505050565b6020808252825182820181905260009190848201906040850190845b81811015620009345783516001600160a01b0316835292840192918401916001016200090d565b50909695505050505050565b600080604083850312156200095457600080fd5b6200095f836200086e565b946020939093013593505050565b600080604083850312156200098157600080fd5b6200098c836200086e565b9150602083013567ffffffffffffffff811115620009a957600080fd5b62000864858286016200076e565b6000815180845260005b81811015620009df57602081850181015186830182015201620009c1565b81811115620009f2576000602083870101525b50601f01601f19169290920160200192915050565b60608152600062000a1c6060830186620009b7565b828103602084015262000a308186620009b7565b91505060018060a01b0383166040830152949350505050565b60006020828403121562000a5c57600080fd5b5051919050565b602081526000620008ea6020830184620009b756fe60806040523480156200001157600080fd5b5060405162001a6038038062001a608339810160408190526200003491620002c9565b8251839083906200004d90600090602085019062000149565b5080516200006390600190602084019062000149565b505050620000b16040518060400160405280601e81526020017f5468697320697320616e204e465420636f6e74726163742e2057686f61210000815250620000da60201b620007f51760201c565b600880546001600160a01b0319166001600160a01b039290921691909117905550620003c79050565b6200012581604051602401620000f1919062000356565b60408051601f198184030181529190526020810180516001600160e01b0390811663104c13eb60e21b179091526200012816565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b82805462000157906200038b565b90600052602060002090601f0160209004810192826200017b5760008555620001c6565b82601f106200019657805160ff1916838001178555620001c6565b82800160010185558215620001c6579182015b82811115620001c6578251825591602001919060010190620001a9565b50620001d4929150620001d8565b5090565b5b80821115620001d45760008155600101620001d9565b634e487b7160e01b600052604160045260246000fd5b60005b838110156200022257818101518382015260200162000208565b8381111562000232576000848401525b50505050565b600082601f8301126200024a57600080fd5b81516001600160401b0380821115620002675762000267620001ef565b604051601f8301601f19908116603f01168101908282118183101715620002925762000292620001ef565b81604052838152866020858801011115620002ac57600080fd5b620002bf84602083016020890162000205565b9695505050505050565b600080600060608486031215620002df57600080fd5b83516001600160401b0380821115620002f757600080fd5b620003058783880162000238565b945060208601519150808211156200031c57600080fd5b506200032b8682870162000238565b604086015190935090506001600160a01b03811681146200034b57600080fd5b809150509250925092565b60208152600082518060208401526200037781604085016020870162000205565b601f01601f19169190910160400192915050565b600181811c90821680620003a057607f821691505b602082108103620003c157634e487b7160e01b600052602260045260246000fd5b50919050565b61168980620003d76000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806342842e0e11610097578063a22cb46511610066578063a22cb46514610212578063b88d4fde14610225578063c87b56dd14610238578063e985e9c51461024b57600080fd5b806342842e0e146101d15780636352211e146101e457806370a08231146101f757806395d89b411461020a57600080fd5b8063095ea7b3116100d3578063095ea7b31461018057806323b872dd1461019557806330bdb351146101a85780633157631f146101be57600080fd5b806301ffc9a71461010557806302d05d3f1461012d57806306fdde0314610158578063081812fc1461016d575b600080fd5b610118610113366004611145565b610287565b60405190151581526020015b60405180910390f35b600854610140906001600160a01b031681565b6040516001600160a01b039091168152602001610124565b6101606102d9565b60405161012491906111ba565b61014061017b3660046111cd565b61036b565b61019361018e3660046111fd565b610392565b005b6101936101a3366004611227565b6104ac565b6101b06104dd565b604051908152602001610124565b6101b06101cc3660046112ef565b6104ed565b6101936101df366004611227565b61058e565b6101406101f23660046111cd565b6105a9565b6101b0610205366004611338565b610609565b61016061068f565b610193610220366004611353565b61069e565b61019361023336600461138f565b6106ad565b6101606102463660046111cd565b6106e5565b61011861025936600461140b565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b14806102b857506001600160e01b03198216635b5e139f60e01b145b806102d357506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102e89061143e565b80601f01602080910402602001604051908101604052809291908181526020018280546103149061143e565b80156103615780601f1061033657610100808354040283529160200191610361565b820191906000526020600020905b81548152906001019060200180831161034457829003601f168201915b5050505050905090565b60006103768261083b565b506000908152600460205260409020546001600160a01b031690565b600061039d826105a9565b9050806001600160a01b0316836001600160a01b03160361040f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061042b575061042b8133610259565b61049d5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610406565b6104a7838361089a565b505050565b6104b63382610908565b6104d25760405162461bcd60e51b815260040161040690611478565b6104a7838383610986565b60006104e860075490565b905090565b6008546000906001600160a01b0316331461054a5760405162461bcd60e51b815260206004820152601a60248201527f4f6e6c792043726561746f722063616e2063616c6c20746869730000000000006044820152606401610406565b610558600780546001019055565b600061056360075490565b60085490915061057c906001600160a01b031682610b22565b6105868184610c64565b90505b919050565b6104a7838383604051806020016040528060008152506106ad565b6000818152600260205260408120546001600160a01b0316806105865760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610406565b60006001600160a01b0382166106735760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610406565b506001600160a01b031660009081526003602052604090205490565b6060600180546102e89061143e565b6106a9338383610cfe565b5050565b6106b73383610908565b6106d35760405162461bcd60e51b815260040161040690611478565b6106df84848484610dcc565b50505050565b60606106f08261083b565b600082815260066020526040812080546107099061143e565b80601f01602080910402602001604051908101604052809291908181526020018280546107359061143e565b80156107825780601f1061075757610100808354040283529160200191610782565b820191906000526020600020905b81548152906001019060200180831161076557829003601f168201915b5050505050905060006107a060408051602081019091526000815290565b905080516000036107b2575092915050565b8151156107e45780826040516020016107cc9291906114c6565b60405160208183030381529060405292505050919050565b6107ed84610dff565b949350505050565b6108388160405160240161080991906111ba565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610e73565b50565b6000818152600260205260409020546001600160a01b03166108385760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610406565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906108cf826105a9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610914836105a9565b9050806001600160a01b0316846001600160a01b0316148061095b57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806107ed5750836001600160a01b03166109748461036b565b6001600160a01b031614949350505050565b826001600160a01b0316610999826105a9565b6001600160a01b0316146109fd5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610406565b6001600160a01b038216610a5f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610406565b610a6a60008261089a565b6001600160a01b0383166000908152600360205260408120805460019290610a9390849061150b565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ac1908490611522565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610b785760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610406565b6000818152600260205260409020546001600160a01b031615610bdd5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610406565b6001600160a01b0382166000908152600360205260408120805460019290610c06908490611522565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b0316610cdf5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610406565b600082815260066020908152604090912082516104a792840190611096565b816001600160a01b0316836001600160a01b031603610d5f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610406565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610dd7848484610986565b610de384848484610e94565b6106df5760405162461bcd60e51b81526004016104069061153a565b6060610e0a8261083b565b6000610e2160408051602081019091526000815290565b90506000815111610e415760405180602001604052806000815250610e6c565b80610e4b84610f95565b604051602001610e5c9291906114c6565b6040516020818303038152906040525b9392505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60006001600160a01b0384163b15610f8a57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610ed890339089908890889060040161158c565b6020604051808303816000875af1925050508015610f13575060408051601f3d908101601f19168201909252610f10918101906115c9565b60015b610f70573d808015610f41576040519150601f19603f3d011682016040523d82523d6000602084013e610f46565b606091505b508051600003610f685760405162461bcd60e51b81526004016104069061153a565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107ed565b506001949350505050565b606081600003610fbc5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610fe65780610fd0816115e6565b9150610fdf9050600a83611615565b9150610fc0565b60008167ffffffffffffffff81111561100157611001611263565b6040519080825280601f01601f19166020018201604052801561102b576020820181803683370190505b5090505b84156107ed5761104060018361150b565b915061104d600a86611629565b611058906030611522565b60f81b81838151811061106d5761106d61163d565b60200101906001600160f81b031916908160001a90535061108f600a86611615565b945061102f565b8280546110a29061143e565b90600052602060002090601f0160209004810192826110c4576000855561110a565b82601f106110dd57805160ff191683800117855561110a565b8280016001018555821561110a579182015b8281111561110a5782518255916020019190600101906110ef565b5061111692915061111a565b5090565b5b80821115611116576000815560010161111b565b6001600160e01b03198116811461083857600080fd5b60006020828403121561115757600080fd5b8135610e6c8161112f565b60005b8381101561117d578181015183820152602001611165565b838111156106df5750506000910152565b600081518084526111a6816020860160208601611162565b601f01601f19169290920160200192915050565b602081526000610e6c602083018461118e565b6000602082840312156111df57600080fd5b5035919050565b80356001600160a01b038116811461058957600080fd5b6000806040838503121561121057600080fd5b611219836111e6565b946020939093013593505050565b60008060006060848603121561123c57600080fd5b611245846111e6565b9250611253602085016111e6565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561129457611294611263565b604051601f8501601f19908116603f011681019082821181831017156112bc576112bc611263565b816040528093508581528686860111156112d557600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561130157600080fd5b813567ffffffffffffffff81111561131857600080fd5b8201601f8101841361132957600080fd5b6107ed84823560208401611279565b60006020828403121561134a57600080fd5b610e6c826111e6565b6000806040838503121561136657600080fd5b61136f836111e6565b91506020830135801515811461138457600080fd5b809150509250929050565b600080600080608085870312156113a557600080fd5b6113ae856111e6565b93506113bc602086016111e6565b925060408501359150606085013567ffffffffffffffff8111156113df57600080fd5b8501601f810187136113f057600080fd5b6113ff87823560208401611279565b91505092959194509250565b6000806040838503121561141e57600080fd5b611427836111e6565b9150611435602084016111e6565b90509250929050565b600181811c9082168061145257607f821691505b60208210810361147257634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b600083516114d8818460208801611162565b8351908301906114ec818360208801611162565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561151d5761151d6114f5565b500390565b60008219821115611535576115356114f5565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906115bf9083018461118e565b9695505050505050565b6000602082840312156115db57600080fd5b8151610e6c8161112f565b6000600182016115f8576115f86114f5565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611624576116246115ff565b500490565b600082611638576116386115ff565b500690565b634e487b7160e01b600052603260045260246000fdfea264697066735822122023e786927b4219f75001340dcd8d611d0417ad9fc1abb0c8bbc2291ac0b5c8cb64736f6c634300080d0033a2646970667358221220855d77c44ec5b60e99ad5cc89e9855c425c201d1e161a302c17204382c015ecb64736f6c634300080d0033";

type AltERC721MintingFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AltERC721MintingFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AltERC721MintingFactory__factory extends ContractFactory {
  constructor(...args: AltERC721MintingFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AltERC721MintingFactory> {
    return super.deploy(overrides || {}) as Promise<AltERC721MintingFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AltERC721MintingFactory {
    return super.attach(address) as AltERC721MintingFactory;
  }
  override connect(signer: Signer): AltERC721MintingFactory__factory {
    return super.connect(signer) as AltERC721MintingFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AltERC721MintingFactoryInterface {
    return new utils.Interface(_abi) as AltERC721MintingFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AltERC721MintingFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AltERC721MintingFactory;
  }
}
