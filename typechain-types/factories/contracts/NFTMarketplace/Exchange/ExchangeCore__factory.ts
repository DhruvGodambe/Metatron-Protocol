/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  ExchangeCore,
  ExchangeCoreInterface,
} from "../../../../contracts/NFTMarketplace/Exchange/ExchangeCore";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IMintingFactory",
        name: "_mintingFactory",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "buyer",
        type: "address",
      },
    ],
    name: "OrderCancelled",
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
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OrderExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
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
        name: "_buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
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
    name: "cancelledOrders",
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
        name: "_buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_auctionEndTime",
        type: "uint256",
      },
    ],
    name: "executeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "paused",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tradingFeeFactor",
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
    inputs: [],
    name: "tradingFeeFactorMax",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405261708060035560fa60045534801561001b57600080fd5b50604051610f20380380610f2083398101604081905261003a916100e9565b61004333610081565b6000805460ff60a01b19169055600180546001600160a01b039384166001600160a01b03199182161790915560028054929093169116179055610123565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146100e657600080fd5b50565b600080604083850312156100fc57600080fd5b8251610107816100d1565b6020840151909250610118816100d1565b809150509250929050565b610dee806101326000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063715018a611610066578063715018a6146100f057806378bed526146100f85780638da5cb5b1461010b578063917e851d14610126578063f2fde38b1461015a57600080fd5b8063020c05ce146100985780635a011081146100ad5780635c975abb146100c95780636ede1bbb146100e7575b600080fd5b6100ab6100a6366004610bd4565b61016d565b005b6100b660045481565b6040519081526020015b60405180910390f35b600054600160a01b900460ff165b60405190151581526020016100c0565b6100b661271081565b6100ab610219565b6100ab610106366004610c2f565b61022d565b6000546040516001600160a01b0390911681526020016100c0565b6100d7610134366004610c94565b600560209081526000938452604080852082529284528284209052825290205460ff1681565b6100ab610168366004610cd5565b610681565b600061017a8686856106fa565b9050600061018885846108ab565b90508180156101945750805b15610210576001600160a01b038581166000818152600560209081526040808320948c168084529482528083208b8452825291829020805460ff19166001179055815193845283018990528201527fd26d0eaf100efe01fc00473fcd7c0d820f51e58b0ff954d6cdb7d984e000fb1c9060600160405180910390a15b50505050505050565b610221610a50565b61022b6000610aaa565b565b610235610a50565b61023d610afa565b600081156102555761024e82610b47565b9050610259565b5060015b60006102668888876106fa565b9050600061027487866108ab565b6001600160a01b038089166000908152600560209081526040808320938e1683529281528282208c83529052205490915060ff16836102fa5760405162461bcd60e51b815260206004820152601760248201527f41756374696f6e20697320616c7265616479206f76657200000000000000000060448201526064015b60405180910390fd5b8261033c5760405162461bcd60e51b815260206004820152601260248201527114d95b1b195c881a5cdb89dd081d985b1a5960721b60448201526064016102f1565b8161037d5760405162461bcd60e51b8152602060048201526011602482015270109d5e595c881a5cdb89dd081d985b1a59607a1b60448201526064016102f1565b80156103c05760405162461bcd60e51b815260206004820152601260248201527113dc99195c881a5cc818d85b98d95b1b195960721b60448201526064016102f1565b6103d2670de0b6b3a764000087610d08565b955060006103f76127106103f16004548a610b9490919063ffffffff16565b90610ba7565b6002546040516323b872dd60e01b81526001600160a01b038c81166004830152306024830152604482018490529293509116906323b872dd906064016020604051808303816000875af1158015610452573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104769190610d27565b5060006104a06127106103f1610499600454612710610bb390919063ffffffff16565b8b90610b94565b6002546040516323b872dd60e01b81526001600160a01b038d811660048301528c81166024830152604482018490529293509116906323b872dd906064016020604051808303816000875af11580156104fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105219190610d27565b506040516323b872dd60e01b81526001600160a01b038a811660048301528b81166024830152604482018d90528d16906323b872dd90606401600060405180830381600087803b15801561057457600080fd5b505af1158015610588573d6000803e3d6000fd5b5050600154604051631bd5a5d360e01b81526001600160a01b039091169250631bd5a5d391506105de908f908f908f906004016001600160a01b0393841681526020810192909252909116604082015260600190565b600060405180830381600087803b1580156105f857600080fd5b505af115801561060c573d6000803e3d6000fd5b505050507f4e1ab81a814e362e1949f27db0ebb266602cb8627246327f36ea0a0f77c735688c8c8b8d60405161066b94939291906001600160a01b03948516815260208101939093529083166040830152909116606082015260800190565b60405180910390a1505050505050505050505050565b610689610a50565b6001600160a01b0381166106ee5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102f1565b6106f781610aaa565b50565b6040516331a9108f60e11b81526004810183905260009081906001600160a01b03861690636352211e90602401602060405180830381865afa158015610744573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107689190610d49565b9050806001600160a01b0316836001600160a01b0316146107cb5760405162461bcd60e51b815260206004820152601e60248201527f53656c6c657220646f6573206e6f74206f776e732074686520746f6b656e000060448201526064016102f1565b60405163020604bf60e21b8152600481018590526000906001600160a01b0387169063081812fc90602401602060405180830381865afa158015610813573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108379190610d49565b90506001600160a01b038116301461089f5760405162461bcd60e51b815260206004820152602560248201527f436f6e7472616374206973206e6f7420617070726f76656420666f72207468696044820152641cc813919560da1b60648201526084016102f1565b50600195945050505050565b600254604051636eb1769f60e11b81526001600160a01b038481166004830152306024830152600092849291169063dd62ed3e90604401602060405180830381865afa1580156108ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109239190610d66565b116109805760405162461bcd60e51b815260206004820152602760248201527f416c6c6f77616e6365206973206c657373207468616e20746865204e4654277360448201526610383934b1b29760c91b60648201526084016102f1565b6002546040516370a0823160e01b81526001600160a01b038581166004830152849216906370a0823190602401602060405180830381865afa1580156109ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ee9190610d66565b11610a475760405162461bcd60e51b815260206004820152602360248201527f427579657220646f65736e277420686176652073756666696369656e742066756044820152626e647360e81b60648201526084016102f1565b50600192915050565b6000546001600160a01b0316331461022b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102f1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff161561022b5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016102f1565b6000428211610b8c5760405162461bcd60e51b8152602060048201526011602482015270105d58dd1a5bdb881a185cc8195b991959607a1b60448201526064016102f1565b506001919050565b6000610ba08284610d08565b9392505050565b6000610ba08284610d7f565b6000610ba08284610da1565b6001600160a01b03811681146106f757600080fd5b600080600080600060a08688031215610bec57600080fd5b8535610bf781610bbf565b9450602086013593506040860135610c0e81610bbf565b92506060860135610c1e81610bbf565b949793965091946080013592915050565b60008060008060008060c08789031215610c4857600080fd5b8635610c5381610bbf565b9550602087013594506040870135610c6a81610bbf565b93506060870135610c7a81610bbf565b9598949750929560808101359460a0909101359350915050565b600080600060608486031215610ca957600080fd5b8335610cb481610bbf565b92506020840135610cc481610bbf565b929592945050506040919091013590565b600060208284031215610ce757600080fd5b8135610ba081610bbf565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615610d2257610d22610cf2565b500290565b600060208284031215610d3957600080fd5b81518015158114610ba057600080fd5b600060208284031215610d5b57600080fd5b8151610ba081610bbf565b600060208284031215610d7857600080fd5b5051919050565b600082610d9c57634e487b7160e01b600052601260045260246000fd5b500490565b600082821015610db357610db3610cf2565b50039056fea2646970667358221220a62f706fe22d60da1397573853030ccee4803cf9b24848b44202c58defc6b7bb64736f6c634300080d0033";

type ExchangeCoreConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExchangeCoreConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExchangeCore__factory extends ContractFactory {
  constructor(...args: ExchangeCoreConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _mintingFactory: PromiseOrValue<string>,
    _weth: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ExchangeCore> {
    return super.deploy(
      _mintingFactory,
      _weth,
      overrides || {}
    ) as Promise<ExchangeCore>;
  }
  override getDeployTransaction(
    _mintingFactory: PromiseOrValue<string>,
    _weth: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_mintingFactory, _weth, overrides || {});
  }
  override attach(address: string): ExchangeCore {
    return super.attach(address) as ExchangeCore;
  }
  override connect(signer: Signer): ExchangeCore__factory {
    return super.connect(signer) as ExchangeCore__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExchangeCoreInterface {
    return new utils.Interface(_abi) as ExchangeCoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExchangeCore {
    return new Contract(address, _abi, signerOrProvider) as ExchangeCore;
  }
}
