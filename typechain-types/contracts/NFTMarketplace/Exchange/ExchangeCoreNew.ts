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

export interface ExchangeCoreNewInterface extends utils.Interface {
  functions: {
    "cancelOrder(address,uint256,address,address,uint256)": FunctionFragment;
    "cancelledOrders(address,address,uint256)": FunctionFragment;
    "exchange()": FunctionFragment;
    "executeOrder(address,uint256,address,address,uint256)": FunctionFragment;
    "fixedPricePrimarySale(address,string,uint256,uint256,address,address)": FunctionFragment;
    "mintAndTransfer(address,string,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "tradingFeeFactor()": FunctionFragment;
    "tradingFeeFactorMax()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelOrder"
      | "cancelledOrders"
      | "exchange"
      | "executeOrder"
      | "fixedPricePrimarySale"
      | "mintAndTransfer"
      | "owner"
      | "paused"
      | "renounceOwnership"
      | "tradingFeeFactor"
      | "tradingFeeFactorMax"
      | "transferOwnership"
      | "treasury"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelledOrders",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "exchange", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "executeOrder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "fixedPricePrimarySale",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mintAndTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradingFeeFactor",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradingFeeFactorMax",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelledOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exchange", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fixedPricePrimarySale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintAndTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradingFeeFactor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradingFeeFactorMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;

  events: {
    "OrderCancelled(address,uint256,address)": EventFragment;
    "OrderExecuted(address,uint256,address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface OrderCancelledEventObject {
  nftContract: string;
  tokenId: BigNumber;
  buyer: string;
}
export type OrderCancelledEvent = TypedEvent<
  [string, BigNumber, string],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

export interface OrderExecutedEventObject {
  nftCollection: string;
  tokenId: BigNumber;
  oldOwner: string;
  newOwner: string;
}
export type OrderExecutedEvent = TypedEvent<
  [string, BigNumber, string, string],
  OrderExecutedEventObject
>;

export type OrderExecutedEventFilter = TypedEventFilter<OrderExecutedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface ExchangeCoreNew extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExchangeCoreNewInterface;

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
    cancelOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelledOrders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    exchange(overrides?: CallOverrides): Promise<[string]>;

    executeOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fixedPricePrimarySale(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _nftPrice: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _buyerToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintAndTransfer(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tradingFeeFactor(overrides?: CallOverrides): Promise<[BigNumber]>;

    tradingFeeFactorMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;
  };

  cancelOrder(
    _nftCollection: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _buyer: PromiseOrValue<string>,
    _seller: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelledOrders(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  exchange(overrides?: CallOverrides): Promise<string>;

  executeOrder(
    _nftCollection: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _buyer: PromiseOrValue<string>,
    _seller: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fixedPricePrimarySale(
    _nftCollection: PromiseOrValue<string>,
    _tokenURI: PromiseOrValue<string>,
    _nftPrice: PromiseOrValue<BigNumberish>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _buyer: PromiseOrValue<string>,
    _buyerToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintAndTransfer(
    _nftCollection: PromiseOrValue<string>,
    _tokenURI: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tradingFeeFactor(overrides?: CallOverrides): Promise<BigNumber>;

  tradingFeeFactorMax(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    cancelOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelledOrders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    exchange(overrides?: CallOverrides): Promise<string>;

    executeOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fixedPricePrimarySale(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _nftPrice: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _buyerToken: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    mintAndTransfer(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    tradingFeeFactor(overrides?: CallOverrides): Promise<BigNumber>;

    tradingFeeFactorMax(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "OrderCancelled(address,uint256,address)"(
      nftContract?: null,
      tokenId?: null,
      buyer?: null
    ): OrderCancelledEventFilter;
    OrderCancelled(
      nftContract?: null,
      tokenId?: null,
      buyer?: null
    ): OrderCancelledEventFilter;

    "OrderExecuted(address,uint256,address,address)"(
      nftCollection?: null,
      tokenId?: null,
      oldOwner?: null,
      newOwner?: null
    ): OrderExecutedEventFilter;
    OrderExecuted(
      nftCollection?: null,
      tokenId?: null,
      oldOwner?: null,
      newOwner?: null
    ): OrderExecutedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    cancelOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelledOrders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    exchange(overrides?: CallOverrides): Promise<BigNumber>;

    executeOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fixedPricePrimarySale(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _nftPrice: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _buyerToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintAndTransfer(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tradingFeeFactor(overrides?: CallOverrides): Promise<BigNumber>;

    tradingFeeFactorMax(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelledOrders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    exchange(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeOrder(
      _nftCollection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _seller: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fixedPricePrimarySale(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _nftPrice: PromiseOrValue<BigNumberish>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _buyer: PromiseOrValue<string>,
      _buyerToken: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintAndTransfer(
      _nftCollection: PromiseOrValue<string>,
      _tokenURI: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tradingFeeFactor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tradingFeeFactorMax(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
