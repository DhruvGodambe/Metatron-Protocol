/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface NFTMintingFactoryInterface extends utils.Interface {
  functions: {
    "adminAddress()": FunctionFragment;
    "collectionToOwner(address)": FunctionFragment;
    "collectionToOwnerToId(address,address)": FunctionFragment;
    "createNFTContract(string,string)": FunctionFragment;
    "exchangeAddress()": FunctionFragment;
    "getCollectionForOwner(address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "mintNFT(address,string)": FunctionFragment;
    "ownerToCollection(address,uint256)": FunctionFragment;
    "updateExchangeAddress(address)": FunctionFragment;
    "updateOwner(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "adminAddress"
      | "collectionToOwner"
      | "collectionToOwnerToId"
      | "createNFTContract"
      | "exchangeAddress"
      | "getCollectionForOwner"
      | "initialize"
      | "mintNFT"
      | "ownerToCollection"
      | "updateExchangeAddress"
      | "updateOwner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "adminAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collectionToOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "collectionToOwnerToId",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createNFTContract",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionForOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintNFT",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerToCollection",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateExchangeAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOwner",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "adminAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectionToOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "collectionToOwnerToId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionForOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerToCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateExchangeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOwner",
    data: BytesLike
  ): Result;

  events: {
    "ExchangeAddressChanged(address,address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "NFTContractCreated(string,string,address)": EventFragment;
    "NFTMinted(address,uint256)": EventFragment;
    "OwnerUpdated(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExchangeAddressChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTContractCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
}

export interface ExchangeAddressChangedEventObject {
  oldExchange: string;
  newExchange: string;
}
export type ExchangeAddressChangedEvent = TypedEvent<
  [string, string],
  ExchangeAddressChangedEventObject
>;

export type ExchangeAddressChangedEventFilter =
  TypedEventFilter<ExchangeAddressChangedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface NFTContractCreatedEventObject {
  name: string;
  symbol: string;
  nftContract: string;
}
export type NFTContractCreatedEvent = TypedEvent<
  [string, string, string],
  NFTContractCreatedEventObject
>;

export type NFTContractCreatedEventFilter =
  TypedEventFilter<NFTContractCreatedEvent>;

export interface NFTMintedEventObject {
  nftContract: string;
  tokenId: BigNumber;
}
export type NFTMintedEvent = TypedEvent<
  [string, BigNumber],
  NFTMintedEventObject
>;

export type NFTMintedEventFilter = TypedEventFilter<NFTMintedEvent>;

export interface OwnerUpdatedEventObject {
  nftContract: string;
  newOwner: string;
  tokenId: BigNumber;
}
export type OwnerUpdatedEvent = TypedEvent<
  [string, string, BigNumber],
  OwnerUpdatedEventObject
>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface NFTMintingFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NFTMintingFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    adminAddress(overrides?: CallOverrides): Promise<[string]>;

    collectionToOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    collectionToOwnerToId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createNFTContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exchangeAddress(overrides?: CallOverrides): Promise<[string]>;

    getCollectionForOwner(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintNFT(
      _nftContract: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownerToCollection(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    updateExchangeAddress(
      _newExchange: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateOwner(
      _nftContract: PromiseOrValue<string>,
      _newOwner: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  adminAddress(overrides?: CallOverrides): Promise<string>;

  collectionToOwner(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  collectionToOwnerToId(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createNFTContract(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exchangeAddress(overrides?: CallOverrides): Promise<string>;

  getCollectionForOwner(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  initialize(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintNFT(
    _nftContract: PromiseOrValue<string>,
    _tokenURI: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownerToCollection(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  updateExchangeAddress(
    _newExchange: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateOwner(
    _nftContract: PromiseOrValue<string>,
    _newOwner: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    adminAddress(overrides?: CallOverrides): Promise<string>;

    collectionToOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    collectionToOwnerToId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createNFTContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    exchangeAddress(overrides?: CallOverrides): Promise<string>;

    getCollectionForOwner(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    initialize(overrides?: CallOverrides): Promise<void>;

    mintNFT(
      _nftContract: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    ownerToCollection(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    updateExchangeAddress(
      _newExchange: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateOwner(
      _nftContract: PromiseOrValue<string>,
      _newOwner: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ExchangeAddressChanged(address,address)"(
      oldExchange?: null,
      newExchange?: null
    ): ExchangeAddressChangedEventFilter;
    ExchangeAddressChanged(
      oldExchange?: null,
      newExchange?: null
    ): ExchangeAddressChangedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "NFTContractCreated(string,string,address)"(
      name?: null,
      symbol?: null,
      nftContract?: null
    ): NFTContractCreatedEventFilter;
    NFTContractCreated(
      name?: null,
      symbol?: null,
      nftContract?: null
    ): NFTContractCreatedEventFilter;

    "NFTMinted(address,uint256)"(
      nftContract?: null,
      tokenId?: null
    ): NFTMintedEventFilter;
    NFTMinted(nftContract?: null, tokenId?: null): NFTMintedEventFilter;

    "OwnerUpdated(address,address,uint256)"(
      nftContract?: null,
      newOwner?: null,
      tokenId?: null
    ): OwnerUpdatedEventFilter;
    OwnerUpdated(
      nftContract?: null,
      newOwner?: null,
      tokenId?: null
    ): OwnerUpdatedEventFilter;
  };

  estimateGas: {
    adminAddress(overrides?: CallOverrides): Promise<BigNumber>;

    collectionToOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    collectionToOwnerToId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createNFTContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exchangeAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionForOwner(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintNFT(
      _nftContract: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownerToCollection(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateExchangeAddress(
      _newExchange: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateOwner(
      _nftContract: PromiseOrValue<string>,
      _newOwner: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    adminAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    collectionToOwner(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collectionToOwnerToId(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createNFTContract(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exchangeAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollectionForOwner(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintNFT(
      _nftContract: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownerToCollection(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateExchangeAddress(
      _newExchange: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateOwner(
      _nftContract: PromiseOrValue<string>,
      _newOwner: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
