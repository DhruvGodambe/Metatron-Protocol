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
} from "../../common";

export interface StakingPoolInterface extends utils.Interface {
  functions: {
    "APY()": FunctionFragment;
    "PRECISION_CONSTANT()": FunctionFragment;
    "getReward(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "rewardToken()": FunctionFragment;
    "rewards(address)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "stakingTimeConstant()": FunctionFragment;
    "stakingToken()": FunctionFragment;
    "userPositions(address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "APY"
      | "PRECISION_CONSTANT"
      | "getReward"
      | "owner"
      | "rewardToken"
      | "rewards"
      | "stake"
      | "stakingTimeConstant"
      | "stakingToken"
      | "userPositions"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "APY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "PRECISION_CONSTANT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getReward",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rewardToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewards",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingTimeConstant",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userPositions",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "APY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "PRECISION_CONSTANT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getReward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewards", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakingTimeConstant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "RewardsClaimed(address,uint256,uint256)": EventFragment;
    "Staked(address,uint256,uint256,uint256)": EventFragment;
    "Unstake(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RewardsClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstake"): EventFragment;
}

export interface RewardsClaimedEventObject {
  _user: string;
  _rewardAmount: BigNumber;
  _timestamp: BigNumber;
}
export type RewardsClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  RewardsClaimedEventObject
>;

export type RewardsClaimedEventFilter = TypedEventFilter<RewardsClaimedEvent>;

export interface StakedEventObject {
  _user: string;
  _amount: BigNumber;
  _timestamp: BigNumber;
  positionId: BigNumber;
}
export type StakedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  StakedEventObject
>;

export type StakedEventFilter = TypedEventFilter<StakedEvent>;

export interface UnstakeEventObject {
  _user: string;
  _amount: BigNumber;
  _timestamp: BigNumber;
}
export type UnstakeEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  UnstakeEventObject
>;

export type UnstakeEventFilter = TypedEventFilter<UnstakeEvent>;

export interface StakingPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StakingPoolInterface;

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
    APY(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRECISION_CONSTANT(overrides?: CallOverrides): Promise<[BigNumber]>;

    getReward(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rewardToken(overrides?: CallOverrides): Promise<[string]>;

    rewards(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    stake(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakingTimeConstant(overrides?: CallOverrides): Promise<[BigNumber]>;

    stakingToken(overrides?: CallOverrides): Promise<[string]>;

    userPositions(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        positionId: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        tokenStakedAmount: BigNumber;
      }
    >;

    withdraw(
      _positionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  APY(overrides?: CallOverrides): Promise<BigNumber>;

  PRECISION_CONSTANT(overrides?: CallOverrides): Promise<BigNumber>;

  getReward(
    _account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  rewardToken(overrides?: CallOverrides): Promise<string>;

  rewards(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  stake(
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakingTimeConstant(overrides?: CallOverrides): Promise<BigNumber>;

  stakingToken(overrides?: CallOverrides): Promise<string>;

  userPositions(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      positionId: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
      tokenStakedAmount: BigNumber;
    }
  >;

  withdraw(
    _positionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    APY(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION_CONSTANT(overrides?: CallOverrides): Promise<BigNumber>;

    getReward(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    rewardToken(overrides?: CallOverrides): Promise<string>;

    rewards(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stake(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    stakingTimeConstant(overrides?: CallOverrides): Promise<BigNumber>;

    stakingToken(overrides?: CallOverrides): Promise<string>;

    userPositions(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        positionId: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        tokenStakedAmount: BigNumber;
      }
    >;

    withdraw(
      _positionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "RewardsClaimed(address,uint256,uint256)"(
      _user?: PromiseOrValue<string> | null,
      _rewardAmount?: null,
      _timestamp?: null
    ): RewardsClaimedEventFilter;
    RewardsClaimed(
      _user?: PromiseOrValue<string> | null,
      _rewardAmount?: null,
      _timestamp?: null
    ): RewardsClaimedEventFilter;

    "Staked(address,uint256,uint256,uint256)"(
      _user?: PromiseOrValue<string> | null,
      _amount?: PromiseOrValue<BigNumberish> | null,
      _timestamp?: null,
      positionId?: PromiseOrValue<BigNumberish> | null
    ): StakedEventFilter;
    Staked(
      _user?: PromiseOrValue<string> | null,
      _amount?: PromiseOrValue<BigNumberish> | null,
      _timestamp?: null,
      positionId?: PromiseOrValue<BigNumberish> | null
    ): StakedEventFilter;

    "Unstake(address,uint256,uint256)"(
      _user?: PromiseOrValue<string> | null,
      _amount?: PromiseOrValue<BigNumberish> | null,
      _timestamp?: null
    ): UnstakeEventFilter;
    Unstake(
      _user?: PromiseOrValue<string> | null,
      _amount?: PromiseOrValue<BigNumberish> | null,
      _timestamp?: null
    ): UnstakeEventFilter;
  };

  estimateGas: {
    APY(overrides?: CallOverrides): Promise<BigNumber>;

    PRECISION_CONSTANT(overrides?: CallOverrides): Promise<BigNumber>;

    getReward(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rewardToken(overrides?: CallOverrides): Promise<BigNumber>;

    rewards(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stake(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakingTimeConstant(overrides?: CallOverrides): Promise<BigNumber>;

    stakingToken(overrides?: CallOverrides): Promise<BigNumber>;

    userPositions(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      _positionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    APY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRECISION_CONSTANT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReward(
      _account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewards(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stake(
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakingTimeConstant(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userPositions(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      _positionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}