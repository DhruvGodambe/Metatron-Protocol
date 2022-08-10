/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Amber, AmberInterface } from "../../../contracts/Tokens/Amber";

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
  "0x60806040526a084595161401484a0000006007556b033b2e3c9fd0803ce80000006008553480156200003057600080fd5b506040518060400160405280600581526020016420b6b132b960d91b8152506040518060400160405280600581526020016420a6a122a960d91b815250816003908051906020019062000085929190620000e8565b5080516200009b906004906020840190620000e8565b5050600680546001600160a01b031916339081179091556007546000918252600560205260408220819055600980549193509190620000dc9084906200018e565b90915550620001f29050565b828054620000f690620001b5565b90600052602060002090601f0160209004810192826200011a576000855562000165565b82601f106200013557805160ff191683800117855562000165565b8280016001018555821562000165579182015b828111156200016557825182559160200191906001019062000148565b506200017392915062000177565b5090565b5b8082111562000173576000815560010162000178565b60008219821115620001b057634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680620001ca57607f821691505b60208210811415620001ec57634e487b7160e01b600052602260045260246000fd5b50919050565b610cd680620002026000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806342966c681161008c578063a457c2d711610066578063a457c2d7146101d0578063a9059cbb146101e3578063b2bdfa7b146101f6578063dd62ed3e1461022157600080fd5b806342966c681461018c57806370a082311461019f57806395d89b41146101c857600080fd5b806323b872dd116100c857806323b872dd14610142578063313ce56714610155578063395093511461016457806340c10f191461017757600080fd5b806306fdde03146100ef578063095ea7b31461010d57806318160ddd14610130575b600080fd5b6100f7610234565b6040516101049190610adb565b60405180910390f35b61012061011b366004610b4c565b6102c6565b6040519015158152602001610104565b6009545b604051908152602001610104565b610120610150366004610b76565b6102de565b60405160128152602001610104565b610120610172366004610b4c565b610302565b61018a610185366004610b4c565b610324565b005b61018a61019a366004610bb2565b610407565b6101346101ad366004610bcb565b6001600160a01b031660009081526020819052604090205490565b6100f7610486565b6101206101de366004610b4c565b610495565b6101206101f1366004610b4c565b610510565b600654610209906001600160a01b031681565b6040516001600160a01b039091168152602001610104565b61013461022f366004610bed565b61051e565b60606003805461024390610c20565b80601f016020809104026020016040519081016040528092919081815260200182805461026f90610c20565b80156102bc5780601f10610291576101008083540402835291602001916102bc565b820191906000526020600020905b81548152906001019060200180831161029f57829003601f168201915b5050505050905090565b6000336102d4818585610549565b5060019392505050565b6000336102ec85828561066e565b6102f78585856106e8565b506001949350505050565b6000336102d4818585610315838361051e565b61031f9190610c71565b610549565b6006546001600160a01b0316331461038f5760405162461bcd60e51b8152602060048201526024808201527f596f7520617265206e6f7420617574686f72697a656420746f206d696e74204160448201526326a122a960e11b60648201526084015b60405180910390fd5b8060095461039d9190610c71565b600854116103f95760405162461bcd60e51b8152602060048201526024808201527f546f6b656e20537570706c792063616e6e6f742065786365656420746865206c6044820152631a5b5a5d60e21b6064820152608401610386565b61040382826108b6565b5050565b6006546001600160a01b0316331461046d5760405162461bcd60e51b8152602060048201526024808201527f596f7520617265206e6f7420617574686f72697a656420746f206275726e204160448201526326a122a960e11b6064820152608401610386565b600654610483906001600160a01b031682610995565b50565b60606004805461024390610c20565b600033816104a3828661051e565b9050838110156105035760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610386565b6102f78286868403610549565b6000336102d48185856106e8565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166105ab5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610386565b6001600160a01b03821661060c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610386565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b600061067a848461051e565b905060001981146106e257818110156106d55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610386565b6106e28484848403610549565b50505050565b6001600160a01b03831661074c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610386565b6001600160a01b0382166107ae5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610386565b6001600160a01b038316600090815260208190526040902054818110156108265760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610386565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061085d908490610c71565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108a991815260200190565b60405180910390a36106e2565b6001600160a01b03821661090c5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610386565b806002600082825461091e9190610c71565b90915550506001600160a01b0382166000908152602081905260408120805483929061094b908490610c71565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166109f55760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610386565b6001600160a01b03821660009081526020819052604090205481811015610a695760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610386565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610a98908490610c89565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610661565b600060208083528351808285015260005b81811015610b0857858101830151858201604001528201610aec565b81811115610b1a576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610b4757600080fd5b919050565b60008060408385031215610b5f57600080fd5b610b6883610b30565b946020939093013593505050565b600080600060608486031215610b8b57600080fd5b610b9484610b30565b9250610ba260208501610b30565b9150604084013590509250925092565b600060208284031215610bc457600080fd5b5035919050565b600060208284031215610bdd57600080fd5b610be682610b30565b9392505050565b60008060408385031215610c0057600080fd5b610c0983610b30565b9150610c1760208401610b30565b90509250929050565b600181811c90821680610c3457607f821691505b60208210811415610c5557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c8457610c84610c5b565b500190565b600082821015610c9b57610c9b610c5b565b50039056fea26469706673582212202ec1f5a8a63f9a7056a14be72e2d8e794a0adbd250b9a0012510af8a8d73120d64736f6c634300080a0033";

type AmberConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AmberConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Amber__factory extends ContractFactory {
  constructor(...args: AmberConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Amber> {
    return super.deploy(overrides || {}) as Promise<Amber>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Amber {
    return super.attach(address) as Amber;
  }
  override connect(signer: Signer): Amber__factory {
    return super.connect(signer) as Amber__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AmberInterface {
    return new utils.Interface(_abi) as AmberInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Amber {
    return new Contract(address, _abi, signerOrProvider) as Amber;
  }
}
