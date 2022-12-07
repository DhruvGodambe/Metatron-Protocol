/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  NFTContract,
  NFTContractInterface,
} from "../../../../contracts/NFTMarketplace/MintingAndStorage/NFTContract";

const _abi = [
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
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [],
    name: "getTotalNFTs",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintNewNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001993380380620019938339810160408190526200003491620002a8565b8151829082906200004d90600090602085019062000128565b5080516200006390600190602084019062000128565b505050620000b16040518060400160405280601e81526020017f5468697320697320616e204e465420636f6e74726163742e2057686f61210000815250620000b960201b620007671760201c565b505062000383565b6200010481604051602401620000d0919062000312565b60408051601f198184030181529190526020810180516001600160e01b0390811663104c13eb60e21b179091526200010716565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054620001369062000347565b90600052602060002090601f0160209004810192826200015a5760008555620001a5565b82601f106200017557805160ff1916838001178555620001a5565b82800160010185558215620001a5579182015b82811115620001a557825182559160200191906001019062000188565b50620001b3929150620001b7565b5090565b5b80821115620001b35760008155600101620001b8565b634e487b7160e01b600052604160045260246000fd5b60005b8381101562000201578181015183820152602001620001e7565b8381111562000211576000848401525b50505050565b600082601f8301126200022957600080fd5b81516001600160401b0380821115620002465762000246620001ce565b604051601f8301601f19908116603f01168101908282118183101715620002715762000271620001ce565b816040528381528660208588010111156200028b57600080fd5b6200029e846020830160208901620001e4565b9695505050505050565b60008060408385031215620002bc57600080fd5b82516001600160401b0380821115620002d457600080fd5b620002e28683870162000217565b93506020850151915080821115620002f957600080fd5b50620003088582860162000217565b9150509250929050565b602081526000825180602084015262000333816040850160208701620001e4565b601f01601f19169190910160400192915050565b600181811c908216806200035c57607f821691505b6020821081036200037d57634e487b7160e01b600052602260045260246000fd5b50919050565b61160080620003936000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806342842e0e11610097578063a22cb46511610066578063a22cb465146101f4578063b88d4fde14610207578063c87b56dd1461021a578063e985e9c51461022d57600080fd5b806342842e0e146101b35780636352211e146101c657806370a08231146101d957806395d89b41146101ec57600080fd5b8063095ea7b3116100d3578063095ea7b31461016257806323b872dd1461017757806330bdb3511461018a5780633157631f146101a057600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d6101083660046110b7565b610269565b60405190151581526020015b60405180910390f35b61012a6102bb565b604051610119919061112c565b61014a61014536600461113f565b61034d565b6040516001600160a01b039091168152602001610119565b610175610170366004611174565b610374565b005b61017561018536600461119e565b61048e565b6101926104bf565b604051908152602001610119565b6101926101ae366004611266565b6104cf565b6101756101c136600461119e565b610500565b61014a6101d436600461113f565b61051b565b6101926101e73660046112af565b61057b565b61012a610601565b6101756102023660046112ca565b610610565b610175610215366004611306565b61061f565b61012a61022836600461113f565b610657565b61010d61023b366004611382565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061029a57506001600160e01b03198216635b5e139f60e01b145b806102b557506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102ca906113b5565b80601f01602080910402602001604051908101604052809291908181526020018280546102f6906113b5565b80156103435780601f1061031857610100808354040283529160200191610343565b820191906000526020600020905b81548152906001019060200180831161032657829003601f168201915b5050505050905090565b6000610358826107ad565b506000908152600460205260409020546001600160a01b031690565b600061037f8261051b565b9050806001600160a01b0316836001600160a01b0316036103f15760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061040d575061040d813361023b565b61047f5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103e8565b610489838361080c565b505050565b610498338261087a565b6104b45760405162461bcd60e51b81526004016103e8906113ef565b6104898383836108f8565b60006104ca60075490565b905090565b60006104df600780546001019055565b60006104ea60075490565b90506104f63382610a94565b6102b58184610bd6565b6104898383836040518060200160405280600081525061061f565b6000818152600260205260408120546001600160a01b0316806102b55760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103e8565b60006001600160a01b0382166105e55760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103e8565b506001600160a01b031660009081526003602052604090205490565b6060600180546102ca906113b5565b61061b338383610c70565b5050565b610629338361087a565b6106455760405162461bcd60e51b81526004016103e8906113ef565b61065184848484610d3e565b50505050565b6060610662826107ad565b6000828152600660205260408120805461067b906113b5565b80601f01602080910402602001604051908101604052809291908181526020018280546106a7906113b5565b80156106f45780601f106106c9576101008083540402835291602001916106f4565b820191906000526020600020905b8154815290600101906020018083116106d757829003601f168201915b50505050509050600061071260408051602081019091526000815290565b90508051600003610724575092915050565b81511561075657808260405160200161073e92919061143d565b60405160208183030381529060405292505050919050565b61075f84610d71565b949350505050565b6107aa8160405160240161077b919061112c565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610de5565b50565b6000818152600260205260409020546001600160a01b03166107aa5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103e8565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906108418261051b565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806108868361051b565b9050806001600160a01b0316846001600160a01b031614806108cd57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b8061075f5750836001600160a01b03166108e68461034d565b6001600160a01b031614949350505050565b826001600160a01b031661090b8261051b565b6001600160a01b03161461096f5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103e8565b6001600160a01b0382166109d15760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103e8565b6109dc60008261080c565b6001600160a01b0383166000908152600360205260408120805460019290610a05908490611482565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a33908490611499565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610aea5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103e8565b6000818152600260205260409020546001600160a01b031615610b4f5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103e8565b6001600160a01b0382166000908152600360205260408120805460019290610b78908490611499565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b0316610c515760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103e8565b6000828152600660209081526040909120825161048992840190611008565b816001600160a01b0316836001600160a01b031603610cd15760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103e8565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610d498484846108f8565b610d5584848484610e06565b6106515760405162461bcd60e51b81526004016103e8906114b1565b6060610d7c826107ad565b6000610d9360408051602081019091526000815290565b90506000815111610db35760405180602001604052806000815250610dde565b80610dbd84610f07565b604051602001610dce92919061143d565b6040516020818303038152906040525b9392505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60006001600160a01b0384163b15610efc57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e4a903390899088908890600401611503565b6020604051808303816000875af1925050508015610e85575060408051601f3d908101601f19168201909252610e8291810190611540565b60015b610ee2573d808015610eb3576040519150601f19603f3d011682016040523d82523d6000602084013e610eb8565b606091505b508051600003610eda5760405162461bcd60e51b81526004016103e8906114b1565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061075f565b506001949350505050565b606081600003610f2e5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f585780610f428161155d565b9150610f519050600a8361158c565b9150610f32565b60008167ffffffffffffffff811115610f7357610f736111da565b6040519080825280601f01601f191660200182016040528015610f9d576020820181803683370190505b5090505b841561075f57610fb2600183611482565b9150610fbf600a866115a0565b610fca906030611499565b60f81b818381518110610fdf57610fdf6115b4565b60200101906001600160f81b031916908160001a905350611001600a8661158c565b9450610fa1565b828054611014906113b5565b90600052602060002090601f016020900481019282611036576000855561107c565b82601f1061104f57805160ff191683800117855561107c565b8280016001018555821561107c579182015b8281111561107c578251825591602001919060010190611061565b5061108892915061108c565b5090565b5b80821115611088576000815560010161108d565b6001600160e01b0319811681146107aa57600080fd5b6000602082840312156110c957600080fd5b8135610dde816110a1565b60005b838110156110ef5781810151838201526020016110d7565b838111156106515750506000910152565b600081518084526111188160208601602086016110d4565b601f01601f19169290920160200192915050565b602081526000610dde6020830184611100565b60006020828403121561115157600080fd5b5035919050565b80356001600160a01b038116811461116f57600080fd5b919050565b6000806040838503121561118757600080fd5b61119083611158565b946020939093013593505050565b6000806000606084860312156111b357600080fd5b6111bc84611158565b92506111ca60208501611158565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561120b5761120b6111da565b604051601f8501601f19908116603f01168101908282118183101715611233576112336111da565b8160405280935085815286868601111561124c57600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561127857600080fd5b813567ffffffffffffffff81111561128f57600080fd5b8201601f810184136112a057600080fd5b61075f848235602084016111f0565b6000602082840312156112c157600080fd5b610dde82611158565b600080604083850312156112dd57600080fd5b6112e683611158565b9150602083013580151581146112fb57600080fd5b809150509250929050565b6000806000806080858703121561131c57600080fd5b61132585611158565b935061133360208601611158565b925060408501359150606085013567ffffffffffffffff81111561135657600080fd5b8501601f8101871361136757600080fd5b611376878235602084016111f0565b91505092959194509250565b6000806040838503121561139557600080fd5b61139e83611158565b91506113ac60208401611158565b90509250929050565b600181811c908216806113c957607f821691505b6020821081036113e957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b6000835161144f8184602088016110d4565b8351908301906114638183602088016110d4565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000828210156114945761149461146c565b500390565b600082198211156114ac576114ac61146c565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061153690830184611100565b9695505050505050565b60006020828403121561155257600080fd5b8151610dde816110a1565b60006001820161156f5761156f61146c565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261159b5761159b611576565b500490565b6000826115af576115af611576565b500690565b634e487b7160e01b600052603260045260246000fdfea26469706673582212206bcfd7d9a356a24eb7e9bfbf314c8a7ee3a8ba2eab4e418f418079b3969d419a64736f6c634300080d0033";

type NFTContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTContract__factory extends ContractFactory {
  constructor(...args: NFTContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTContract> {
    return super.deploy(
      _name,
      _symbol,
      overrides || {}
    ) as Promise<NFTContract>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override attach(address: string): NFTContract {
    return super.attach(address) as NFTContract;
  }
  override connect(signer: Signer): NFTContract__factory {
    return super.connect(signer) as NFTContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTContractInterface {
    return new utils.Interface(_abi) as NFTContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTContract {
    return new Contract(address, _abi, signerOrProvider) as NFTContract;
  }
}
