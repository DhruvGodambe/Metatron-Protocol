/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BridgeInteract,
  BridgeInteractInterface,
} from "../../../contracts/WormholeBridge/BridgeInteract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenBridge",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_tokenBridge",
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
        internalType: "bytes",
        name: "encodedVm",
        type: "bytes",
      },
    ],
    name: "completeTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "recipientChain",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "recipient",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "arbiterFee",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "nonce",
        type: "uint32",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161043e38038061043e83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6103ab806100936000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063afab7d3414610046578063c687851914610075578063fbed2d601461008a575b600080fd5b600054610059906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100886100833660046101bb565b61009d565b005b61008861009836600461026c565b610102565b60005460405163c687851960e01b81526001600160a01b039091169063c6878519906100cd9084906004016102ef565b600060405180830381600087803b1580156100e757600080fd5b505af11580156100fb573d6000803e3d6000fd5b5050505050565b60005460405162f5287b60e41b81526001600160a01b0388811660048301526024820188905261ffff87166044830152606482018690526084820185905263ffffffff841660a483015290911690630f5287b09060c4016020604051808303816000875af1158015610178573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019c9190610344565b50505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156101cd57600080fd5b813567ffffffffffffffff808211156101e557600080fd5b818401915084601f8301126101f957600080fd5b81358181111561020b5761020b6101a5565b604051601f8201601f19908116603f01168101908382118183101715610233576102336101a5565b8160405282815287602084870101111561024c57600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008060008060008060c0878903121561028557600080fd5b86356001600160a01b038116811461029c57600080fd5b955060208701359450604087013561ffff811681146102ba57600080fd5b9350606087013592506080870135915060a087013563ffffffff811681146102e157600080fd5b809150509295509295509295565b600060208083528351808285015260005b8181101561031c57858101830151858201604001528201610300565b8181111561032e576000604083870101525b50601f01601f1916929092016040019392505050565b60006020828403121561035657600080fd5b815167ffffffffffffffff8116811461036e57600080fd5b939250505056fea26469706673582212203ccd2127c5c6222e2ed2ea207ee73ecb3dea34b88e08502f8e57dd8856ebd1b764736f6c634300080a0033";

type BridgeInteractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeInteractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeInteract__factory extends ContractFactory {
  constructor(...args: BridgeInteractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    tokenBridge: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BridgeInteract> {
    return super.deploy(
      tokenBridge,
      overrides || {}
    ) as Promise<BridgeInteract>;
  }
  override getDeployTransaction(
    tokenBridge: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(tokenBridge, overrides || {});
  }
  override attach(address: string): BridgeInteract {
    return super.attach(address) as BridgeInteract;
  }
  override connect(signer: Signer): BridgeInteract__factory {
    return super.connect(signer) as BridgeInteract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeInteractInterface {
    return new utils.Interface(_abi) as BridgeInteractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeInteract {
    return new Contract(address, _abi, signerOrProvider) as BridgeInteract;
  }
}
