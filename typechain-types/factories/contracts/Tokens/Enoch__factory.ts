/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Enoch, EnochInterface } from "../../../contracts/Tokens/Enoch";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_adminRegistry",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_owner",
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
    name: "adminRegistry",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
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
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526af8277896582678ac0000006007553480156200002057600080fd5b5060405162000f1c38038062000f1c83398101604081905262000043916200018e565b60408051808201825260058082526408a9c9e86960db1b6020808401828152855180870190965292855284015281519192916200008391600391620000e8565b50805162000099906004906020840190620000e8565b505060058054336001600160a01b0319918216811790925560075460009283526008602052604090922091909155600680549091166001600160a01b03939093169290921790915550620001fd565b828054620000f690620001c0565b90600052602060002090601f0160209004810192826200011a576000855562000165565b82601f106200013557805160ff191683800117855562000165565b8280016001018555821562000165579182015b828111156200016557825182559160200191906001019062000148565b506200017392915062000177565b5090565b5b8082111562000173576000815560010162000178565b600060208284031215620001a157600080fd5b81516001600160a01b0381168114620001b957600080fd5b9392505050565b600181811c90821680620001d557607f821691505b60208210811415620001f757634e487b7160e01b600052602260045260246000fd5b50919050565b610d0f806200020d6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a9059cbb11610066578063a9059cbb146101ee578063b2bdfa7b14610201578063d499937f1461022c578063dd62ed3e1461023f57600080fd5b806370a082311461019757806395d89b41146101c05780639dc29fac146101c8578063a457c2d7146101db57600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce56714610160578063395093511461016f57806340c10f191461018257600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b610102610252565b60405161010f9190610ac8565b60405180910390f35b61012b610126366004610b39565b6102e4565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b366004610b63565b6102fc565b6040516012815260200161010f565b61012b61017d366004610b39565b610320565b610195610190366004610b39565b610342565b005b61013f6101a5366004610b9f565b6001600160a01b031660009081526020819052604090205490565b6101026103e1565b6101956101d6366004610b39565b6103f0565b61012b6101e9366004610b39565b610482565b61012b6101fc366004610b39565b6104fd565b600554610214906001600160a01b031681565b6040516001600160a01b03909116815260200161010f565b600654610214906001600160a01b031681565b61013f61024d366004610bc1565b61050b565b60606003805461026190610bf4565b80601f016020809104026020016040519081016040528092919081815260200182805461028d90610bf4565b80156102da5780601f106102af576101008083540402835291602001916102da565b820191906000526020600020905b8154815290600101906020018083116102bd57829003601f168201915b5050505050905090565b6000336102f2818585610536565b5060019392505050565b60003361030a85828561065b565b6103158585856106d5565b506001949350505050565b6000336102f2818585610333838361050b565b61033d9190610c45565b610536565b600654604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa15801561038a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ae9190610c5d565b6103d35760405162461bcd60e51b81526004016103ca90610c7f565b60405180910390fd5b6103dd82826108a3565b5050565b60606004805461026190610bf4565b600654604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa158015610438573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045c9190610c5d565b6104785760405162461bcd60e51b81526004016103ca90610c7f565b6103dd8282610982565b60003381610490828661050b565b9050838110156104f05760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103ca565b6103158286868403610536565b6000336102f28185856106d5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166105985760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103ca565b6001600160a01b0382166105f95760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103ca565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610667848461050b565b905060001981146106cf57818110156106c25760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103ca565b6106cf8484848403610536565b50505050565b6001600160a01b0383166107395760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103ca565b6001600160a01b03821661079b5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103ca565b6001600160a01b038316600090815260208190526040902054818110156108135760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103ca565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061084a908490610c45565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161089691815260200190565b60405180910390a36106cf565b6001600160a01b0382166108f95760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103ca565b806002600082825461090b9190610c45565b90915550506001600160a01b03821660009081526020819052604081208054839290610938908490610c45565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166109e25760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103ca565b6001600160a01b03821660009081526020819052604090205481811015610a565760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103ca565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610a85908490610cc2565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161064e565b600060208083528351808285015260005b81811015610af557858101830151858201604001528201610ad9565b81811115610b07576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610b3457600080fd5b919050565b60008060408385031215610b4c57600080fd5b610b5583610b1d565b946020939093013593505050565b600080600060608486031215610b7857600080fd5b610b8184610b1d565b9250610b8f60208501610b1d565b9150604084013590509250925092565b600060208284031215610bb157600080fd5b610bba82610b1d565b9392505050565b60008060408385031215610bd457600080fd5b610bdd83610b1d565b9150610beb60208401610b1d565b90509250929050565b600181811c90821680610c0857607f821691505b60208210811415610c2957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c5857610c58610c2f565b500190565b600060208284031215610c6f57600080fd5b81518015158114610bba57600080fd5b60208082526023908201527f41646d696e52656769737472793a205265737472696374656420746f2061646d60408201526234b71760e91b606082015260800190565b600082821015610cd457610cd4610c2f565b50039056fea26469706673582212200657c4815170c46537d236650d14f4e7232bbe67bcbaf7f17cbf9f1b602dd90664736f6c634300080a0033";

type EnochConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EnochConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Enoch__factory extends ContractFactory {
  constructor(...args: EnochConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _adminRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Enoch> {
    return super.deploy(_adminRegistry, overrides || {}) as Promise<Enoch>;
  }
  override getDeployTransaction(
    _adminRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_adminRegistry, overrides || {});
  }
  override attach(address: string): Enoch {
    return super.attach(address) as Enoch;
  }
  override connect(signer: Signer): Enoch__factory {
    return super.connect(signer) as Enoch__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EnochInterface {
    return new utils.Interface(_abi) as EnochInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Enoch {
    return new Contract(address, _abi, signerOrProvider) as Enoch;
  }
}
