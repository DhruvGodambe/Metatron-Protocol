/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Staking,
  StakingInterface,
} from "../../../contracts/Staking/Staking";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "NFTStaked",
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
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_stakedTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_rewardAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "RewardsClaimed",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "APY",
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
    name: "PRECISION_CONSTANT",
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
    name: "REWARD_CONSTANT",
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
    name: "STAKING_MONTHS",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "UserInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "stakingTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "NFTvalue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalClaimableRewards",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimedRewards",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardInstallment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastWithdrawalTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastRewardAccumulatedTime",
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
        name: "_nftValue",
        type: "uint256",
      },
    ],
    name: "_calculateRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getPendingRewardsInfo",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getStakedInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakingPeriod",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_adminRegistry",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxUnclaimableToken",
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
    name: "oneMonthTimeConstant",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseStatus",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
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
        internalType: "uint256",
        name: "_rewardConstant",
        type: "uint256",
      },
    ],
    name: "setRewardConstant",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_nftValue",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b50608051611d2f61004c60003960008181610dd101528181610e1101528181610f4e01528181610f8e01526110180152611d2f6000f3fe60806040526004361061014b5760003560e01c806357fb25cc116100b65780639c61c6311161006f5780639c61c63114610462578063b5ef95ea14610478578063bc0547e31461048f578063d499937f146104c4578063ef8bd305146104e5578063f7c618c1146104fb57600080fd5b806357fb25cc1461031d5780635c975abb1461033d57806372f702f31461035557806377ae89211461038d5780638456cb59146103ad5780638c996d06146103c257600080fd5b80633659cfe6116101085780633659cfe6146102855780633f4ba83a146102a55780633f63e763146102ba578063466916ca146102d05780634f1ef286146102f557806352d1902d1461030857600080fd5b8063094e503e146101505780630c51b88f14610183578063174e31c4146101a557806329951061146101c557806329ec7948146101dc578063345bc64c146101f2575b600080fd5b34801561015c57600080fd5b5061017061016b366004611899565b61051b565b6040519081526020015b60405180910390f35b34801561018f57600080fd5b506101a361019e3660046118c7565b6105b7565b005b3480156101b157600080fd5b506101a36101c03660046118fc565b6109ee565b3480156101d157600080fd5b5061017062278d0081565b3480156101e857600080fd5b5061017060ff5481565b3480156101fe57600080fd5b5061025861020d3660046118fc565b6001600160a01b039190911660009081526101026020908152604080832093835292905220805460018201546002830154600384015460048501546005909501549395929491939092565b604080519687526020870195909552938501929092526060840152608083015260a082015260c00161017a565b34801561029157600080fd5b506101a36102a0366004611928565b610dc6565b3480156102b157600080fd5b506101a3610e9d565b3480156102c657600080fd5b5061017061271081565b3480156102dc57600080fd5b506102e5610f30565b604051901515815260200161017a565b6101a361030336600461195b565b610f43565b34801561031457600080fd5b5061017061100b565b34801561032957600080fd5b506101a3610338366004611a1f565b6110be565b34801561034957600080fd5b5060c95460ff166102e5565b34801561036157600080fd5b5060fb54610375906001600160a01b031681565b6040516001600160a01b03909116815260200161017a565b34801561039957600080fd5b506101706103a83660046118fc565b611239565b3480156103b957600080fd5b506101a3611278565b3480156103ce57600080fd5b5061042d6103dd3660046118fc565b610102602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154908060030154908060040154908060050154908060060154905087565b604080519788526020880196909652948601939093526060850191909152608084015260a083015260c082015260e00161017a565b34801561046e57600080fd5b5061017060fd5481565b34801561048457600080fd5b506101706101005481565b34801561049b57600080fd5b506104af6104aa366004611899565b611309565b6040805192835260208301919091520161017a565b3480156104d057600080fd5b5061010154610375906001600160a01b031681565b3480156104f157600080fd5b5061017060fe5481565b34801561050757600080fd5b5060fc54610375906001600160a01b031681565b61010154604051630935e01b60e21b81523360048201526000916001600160a01b0316906324d7806c90602401602060405180830381865afa158015610565573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105899190611a7e565b6105ae5760405162461bcd60e51b81526004016105a590611aa0565b60405180910390fd5b5060ff81905590565b6105bf611348565b61010154604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa158015610608573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062c9190611a7e565b6106485760405162461bcd60e51b81526004016105a590611aa0565b60fb54604051635cbd739160e11b8152600481018490526001600160a01b039091169063b97ae72290602401602060405180830381865afa158015610691573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b59190611a7e565b156107025760405162461bcd60e51b815260206004820152601c60248201527f546f6b656e20616c7265616479207374616b6564206561726c6965720000000060448201526064016105a5565b60fb546040516331a9108f60e11b81526004810184905233916001600160a01b031690636352211e90602401602060405180830381865afa15801561074b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076f9190611ae3565b6001600160a01b0316146107c55760405162461bcd60e51b815260206004820152601d60248201527f4f776e657220646f6573206e6f74206f776e732074686973204e46542100000060448201526064016105a5565b60fb5460405163020604bf60e21b81526004810184905230916001600160a01b03169063081812fc90602401602060405180830381865afa15801561080e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108329190611ae3565b6001600160a01b03161461089f5760405162461bcd60e51b815260206004820152602e60248201527f5374616b696e6720436f6e7472616374206973206e6f7420617070726f76656460448201526d20666f722074686973204e46542160901b60648201526084016105a5565b60fb546040516323b872dd60e01b81526001600160a01b03858116600483015230602483015260448201859052909116906323b872dd90606401600060405180830381600087803b1580156108f357600080fd5b505af1158015610907573d6000803e3d6000fd5b5050506001600160a01b03841660009081526101026020908152604080832086845290915290204290555061093e8161271061138e565b6001600160a01b0384166000908152610102602090815260408083208684529091528120600101919091558061097383611309565b6001600160a01b0387166000818152610102602090815260408083208a84528252918290206002810186905560040184905581518881524291810191909152939550919350869290917f375f4f041ef0aea92b9f42612f1cf95d9be53adf8c2723e05d11ca6617caded9910160405180910390a35050505050565b61010154604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa158015610a37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5b9190611a7e565b610a775760405162461bcd60e51b81526004016105a590611aa0565b6001600160a01b03821660009081526101026020908152604080832084845290915281206003810154600290910154610aaf9161139a565b6001600160a01b03841660009081526101026020908152604080832086845290915290205490915060b490610ae49042611b16565b10158015610b2557506001600160a01b03831660009081526101026020908152604080832085845290915290206006015460b490610b229042611b16565b10155b610b845760405162461bcd60e51b815260206004820152602a60248201527f557365722063616e6e6f7420636c61696d2072657761726473206265666f7265604482015269206475652074696d652160b01b60648201526084016105a5565b610100548111610bd65760405162461bcd60e51b815260206004820152601e60248201527f596f75206861766520636c61696d656420796f7572207265776172647321000060448201526064016105a5565b6001600160a01b038316600090815261010260209081526040808320858452909152812060048101546003909101805491928392610c15908490611b2d565b90915550506001600160a01b0384166000908152610102602090815260408083208684529091528120426005820155600601805460b49290610c58908490611b2d565b909155505060fc546040516340c10f1960e01b8152336004820152602481018390526001600160a01b03909116906340c10f1990604401600060405180830381600087803b158015610ca957600080fd5b505af1158015610cbd573d6000803e3d6000fd5b505050506001600160a01b03841660009081526101026020908152604080832086845290915290206003810154600291820154610cf99161139a565b11610d5d5760fb5460405163cda6b84760e01b8152600481018590526001600160a01b039091169063cda6b84790602401600060405180830381600087803b158015610d4457600080fd5b505af1158015610d58573d6000803e3d6000fd5b505050505b6001600160a01b03841660008181526101026020908152604080832087845282529182902060030154825187815291820152428183015290517f56253d287efacdb2c4cd76dd03624a4821c1ce721d1152e8f5f5718f6087c9bf9181900360600190a250505050565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610e0f5760405162461bcd60e51b81526004016105a590611b45565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610e58600080516020611cb3833981519152546001600160a01b031690565b6001600160a01b031614610e7e5760405162461bcd60e51b81526004016105a590611b91565b60408051600080825260208201909252610e9a918391906113a6565b50565b61010154604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa158015610ee6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0a9190611a7e565b610f265760405162461bcd60e51b81526004016105a590611aa0565b610f2e611516565b565b6000610f3e60c95460ff1690565b905090565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610f8c5760405162461bcd60e51b81526004016105a590611b45565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610fd5600080516020611cb3833981519152546001600160a01b031690565b6001600160a01b031614610ffb5760405162461bcd60e51b81526004016105a590611b91565b611007828260016113a6565b5050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146110ab5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016105a5565b50600080516020611cb383398151915290565b600054610100900460ff16158080156110de5750600054600160ff909116105b806110f85750303b1580156110f8575060005460ff166001145b61115b5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105a5565b6000805460ff19166001179055801561117e576000805461ff0019166101001790555b611186611568565b60fb80546001600160a01b038089166001600160a01b03199283161790925560fc80549288169290911691909117905560fe84905560fd8390556111cb600184611b16565b6101005561010180546001600160a01b0319166001600160a01b0384161790558015611231576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b6001600160a01b038216600090815261010260209081526040808320848452909152812060038101546002909101546112719161139a565b9392505050565b61010154604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa1580156112c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e59190611a7e565b6113015760405162461bcd60e51b81526004016105a590611aa0565b610f2e6115d3565b600080600061132360ff548561138e90919063ffffffff16565b9050600061133c60fd548361161090919063ffffffff16565b91959194509092505050565b60c95460ff1615610f2e5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016105a5565b60006112718284611bdd565b60006112718284611b16565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156113de576113d98361161c565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611438575060408051601f3d908101601f1916820190925261143591810190611bfc565b60015b61149b5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016105a5565b600080516020611cb3833981519152811461150a5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016105a5565b506113d98383836116b8565b61151e6116e3565b60c9805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff16610f2e5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016105a5565b6115db611348565b60c9805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861154b3390565b60006112718284611c15565b6001600160a01b0381163b6116895760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016105a5565b600080516020611cb383398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6116c18361172c565b6000825111806116ce5750805b156113d9576116dd838361176c565b50505050565b60c95460ff16610f2e5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016105a5565b6117358161161c565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6117d45760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016105a5565b600080846001600160a01b0316846040516117ef9190611c63565b600060405180830381855af49150503d806000811461182a576040519150601f19603f3d011682016040523d82523d6000602084013e61182f565b606091505b50915091506118578282604051806060016040528060278152602001611cd360279139611860565b95945050505050565b6060831561186f575081611271565b82511561187f5782518084602001fd5b8160405162461bcd60e51b81526004016105a59190611c7f565b6000602082840312156118ab57600080fd5b5035919050565b6001600160a01b0381168114610e9a57600080fd5b6000806000606084860312156118dc57600080fd5b83356118e7816118b2565b95602085013595506040909401359392505050565b6000806040838503121561190f57600080fd5b823561191a816118b2565b946020939093013593505050565b60006020828403121561193a57600080fd5b8135611271816118b2565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561196e57600080fd5b8235611979816118b2565b9150602083013567ffffffffffffffff8082111561199657600080fd5b818501915085601f8301126119aa57600080fd5b8135818111156119bc576119bc611945565b604051601f8201601f19908116603f011681019083821181831017156119e4576119e4611945565b816040528281528860208487010111156119fd57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b600080600080600060a08688031215611a3757600080fd5b8535611a42816118b2565b94506020860135611a52816118b2565b935060408601359250606086013591506080860135611a70816118b2565b809150509295509295909350565b600060208284031215611a9057600080fd5b8151801515811461127157600080fd5b60208082526023908201527f41646d696e52656769737472793a205265737472696374656420746f2061646d60408201526234b71760e91b606082015260800190565b600060208284031215611af557600080fd5b8151611271816118b2565b634e487b7160e01b600052601160045260246000fd5b600082821015611b2857611b28611b00565b500390565b60008219821115611b4057611b40611b00565b500190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000816000190483118215151615611bf757611bf7611b00565b500290565b600060208284031215611c0e57600080fd5b5051919050565b600082611c3257634e487b7160e01b600052601260045260246000fd5b500490565b60005b83811015611c52578181015183820152602001611c3a565b838111156116dd5750506000910152565b60008251611c75818460208701611c37565b9190910192915050565b6020815260008251806020840152611c9e816040850160208701611c37565b601f01601f1916919091016040019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220ad4b7826c1068c4353cea53fc36215d11801cb225b8be3d233d94309e705809964736f6c634300080a0033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Staking> {
    return super.deploy(overrides || {}) as Promise<Staking>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  override connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
