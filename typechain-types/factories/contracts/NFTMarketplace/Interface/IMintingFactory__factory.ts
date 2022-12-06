/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IMintingFactory,
  IMintingFactoryInterface,
} from "../../../../contracts/NFTMarketplace/Interface/IMintingFactory";

const _abi = [
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

export class IMintingFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IMintingFactoryInterface {
    return new utils.Interface(_abi) as IMintingFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMintingFactory {
    return new Contract(address, _abi, signerOrProvider) as IMintingFactory;
  }
}