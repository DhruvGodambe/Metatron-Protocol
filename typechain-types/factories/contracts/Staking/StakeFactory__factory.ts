/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  StakeFactory,
  StakeFactoryInterface,
} from "../../../contracts/Staking/StakeFactory";

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
        name: "_stake",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_stakingToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "StakeCreated",
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
    inputs: [],
    name: "implementation",
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
        name: "_implementation",
        type: "address",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setupStakeContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
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
  "0x60a06040523060805234801561001457600080fd5b50608051611ad061004c600039600081816102110152818161025d015281816104eb0152818161052e01526107000152611ad06000f3fe6080604052600436106200009d5760003560e01c806352d1902d116200006057806352d1902d146200015f5780635c60da1b14620001865780635c975abb14620001a85780638456cb5914620001cd578063d499937f14620001e557600080fd5b80633659cfe614620000a25780633f4ba83a14620000c9578063485cc95514620000e15780634f1ef2861462000106578063511817f5146200011d575b600080fd5b348015620000af57600080fd5b50620000c7620000c136600462000e5a565b62000207565b005b348015620000d657600080fd5b50620000c7620002fb565b348015620000ee57600080fd5b50620000c76200010036600462000e78565b62000395565b620000c76200011736600462000ec6565b620004e1565b3480156200012a57600080fd5b50620001426200013c36600462000f94565b620005bd565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156200016c57600080fd5b5062000177620006f3565b60405190815260200162000156565b3480156200019357600080fd5b5060c95462000142906001600160a01b031681565b348015620001b557600080fd5b5060975460ff16604051901515815260200162000156565b348015620001da57600080fd5b50620000c7620007a9565b348015620001f257600080fd5b5060ca5462000142906001600160a01b031681565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036200025b5760405162461bcd60e51b8152600401620002529062000ff2565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316620002a660008051602062001a54833981519152546001600160a01b031690565b6001600160a01b031614620002cf5760405162461bcd60e51b815260040162000252906200103e565b620002da8162000841565b60408051600080825260208201909252620002f891839190620008cf565b50565b60ca54604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa15801562000344573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200036a91906200108a565b620003895760405162461bcd60e51b81526004016200025290620010ae565b6200039362000a47565b565b600054610100900460ff1615808015620003b65750600054600160ff909116105b80620003d25750303b158015620003d2575060005460ff166001145b620004375760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840162000252565b6000805460ff1916600117905580156200045b576000805461ff0019166101001790555b6200046562000a9b565b60c980546001600160a01b038086166001600160a01b03199283161790925560ca8054928516929091169190911790558015620004dc576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036200052c5760405162461bcd60e51b8152600401620002529062000ff2565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166200057760008051602062001a54833981519152546001600160a01b031690565b6001600160a01b031614620005a05760405162461bcd60e51b815260040162000252906200103e565b620005ab8262000841565b620005b982826001620008cf565b5050565b60c95460405160009182916001600160a01b0390911690620005df9062000e2f565b6001600160a01b039091168152604060208201819052600090820152606001604051809103906000f0801580156200061b573d6000803e3d6000fd5b506040516315fec97360e21b81526001600160a01b03898116600483015288811660248301526044820188905260648201879052858116608483015291925082918216906357fb25cc9060a401600060405180830381600087803b1580156200068357600080fd5b505af115801562000698573d6000803e3d6000fd5b5050604080516001600160a01b0385811682528c811660208301528b168183015290517fae3e5b0a6d0117af9225872200652f58ea11cae1e59666ac6d95e246f91ae6cb9350908190036060019150a1979650505050505050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614620007955760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840162000252565b5060008051602062001a5483398151915290565b60ca54604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa158015620007f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200081891906200108a565b620008375760405162461bcd60e51b81526004016200025290620010ae565b6200039362000b08565b60ca54604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa1580156200088a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620008b091906200108a565b620002f85760405162461bcd60e51b81526004016200025290620010ae565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156200090557620004dc8362000b48565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801562000962575060408051601f3d908101601f191682019092526200095f91810190620010f1565b60015b620009c75760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840162000252565b60008051602062001a54833981519152811462000a395760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840162000252565b50620004dc83838362000be7565b62000a5162000c18565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff16620003935760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b606482015260840162000252565b62000b1262000c63565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25862000a7e3390565b6001600160a01b0381163b62000bb75760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840162000252565b60008051602062001a5483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b62000bf28362000cab565b60008251118062000c005750805b15620004dc5762000c12838362000ced565b50505050565b60975460ff16620003935760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640162000252565b60975460ff1615620003935760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640162000252565b62000cb68162000b48565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b62000d575760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840162000252565b600080846001600160a01b03168460405162000d7491906200113a565b600060405180830381855af49150503d806000811462000db1576040519150601f19603f3d011682016040523d82523d6000602084013e62000db6565b606091505b509150915062000de1828260405180606001604052806027815260200162001a746027913962000dea565b95945050505050565b6060831562000dfb57508162000e28565b82511562000e0c5782518084602001fd5b8160405162461bcd60e51b815260040162000252919062001158565b9392505050565b6108c6806200118e83390190565b80356001600160a01b038116811462000e5557600080fd5b919050565b60006020828403121562000e6d57600080fd5b62000e288262000e3d565b6000806040838503121562000e8c57600080fd5b62000e978362000e3d565b915062000ea76020840162000e3d565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121562000eda57600080fd5b62000ee58362000e3d565b9150602083013567ffffffffffffffff8082111562000f0357600080fd5b818501915085601f83011262000f1857600080fd5b81358181111562000f2d5762000f2d62000eb0565b604051601f8201601f19908116603f0116810190838211818310171562000f585762000f5862000eb0565b8160405282815288602084870101111562000f7257600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b600080600080600060a0868803121562000fad57600080fd5b62000fb88662000e3d565b945062000fc86020870162000e3d565b9350604086013592506060860135915062000fe66080870162000e3d565b90509295509295909350565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000602082840312156200109d57600080fd5b8151801515811462000e2857600080fd5b60208082526023908201527f41646d696e52656769737472793a205265737472696374656420746f2061646d60408201526234b71760e91b606082015260800190565b6000602082840312156200110457600080fd5b5051919050565b60005b83811015620011285781810151838201526020016200110e565b8381111562000c125750506000910152565b600082516200114e8184602087016200110b565b9190910192915050565b6020815260008251806020840152620011798160408501602087016200110b565b601f01601f1916919091016040019291505056fe60806040526040516108c63803806108c683398101604081905261002291610318565b818161003082826000610039565b50505050610435565b6100428361006f565b60008251118061004f5750805b1561006a5761006883836100af60201b6100eb1760201c565b505b505050565b610078816100db565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d4838360405180606001604052806027815260200161089f602791396101ad565b9392505050565b6100ee8161028b60201b6101171760201c565b6101555760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b8061018c7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61029a60201b6101261760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b6102155760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161014c565b600080856001600160a01b03168560405161023091906103e6565b600060405180830381855af49150503d806000811461026b576040519150601f19603f3d011682016040523d82523d6000602084013e610270565b606091505b50909250905061028182828661029d565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102ac5750816100d4565b8251156102bc5782518084602001fd5b8160405162461bcd60e51b815260040161014c9190610402565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103075781810151838201526020016102ef565b838111156100685750506000910152565b6000806040838503121561032b57600080fd5b82516001600160a01b038116811461034257600080fd5b60208401519092506001600160401b038082111561035f57600080fd5b818501915085601f83011261037357600080fd5b815181811115610385576103856102d6565b604051601f8201601f19908116603f011681019083821181831017156103ad576103ad6102d6565b816040528281528860208487010111156103c657600080fd5b6103d78360208301602088016102ec565b80955050505050509250929050565b600082516103f88184602087016102ec565b9190910192915050565b60208152600082518060208401526104218160408501602087016102ec565b601f01601f19169190910160400192915050565b61045b806104446000396000f3fe60806040526004361061002d5760003560e01c80633659cfe614610044578063aaf10f42146100645761003c565b3661003c5761003a610095565b005b61003a610095565b34801561005057600080fd5b5061003a61005f366004610356565b6100a7565b34801561007057600080fd5b506100796100b3565b6040516001600160a01b03909116815260200160405180910390f35b6100a56100a06100b3565b610129565b565b6100b08161014d565b50565b60006100e67f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b606061011083836040518060600160405280602781526020016103ff6027913961018d565b9392505050565b6001600160a01b03163b151590565b90565b3660008037600080366000845af43d6000803e808015610148573d6000f35b3d6000fd5b6101568161026f565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0384163b6101fa5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b03168560405161021591906103af565b600060405180830381855af49150503d8060008114610250576040519150601f19603f3d011682016040523d82523d6000602084013e610255565b606091505b509150915061026582828661031d565b9695505050505050565b6001600160a01b0381163b6102dc5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016101f1565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b6060831561032c575081610110565b82511561033c5782518084602001fd5b8160405162461bcd60e51b81526004016101f191906103cb565b60006020828403121561036857600080fd5b81356001600160a01b038116811461011057600080fd5b60005b8381101561039a578181015183820152602001610382565b838111156103a9576000848401525b50505050565b600082516103c181846020870161037f565b9190910192915050565b60208152600082518060208401526103ea81604085016020870161037f565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c486b9abd76027f0b466853f2e358d46249322c8ff9d26eccae508532385e89464736f6c634300080d0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200f5b884dd86d119b87349f4145693125a04be97f4ae8c5844a4da366d1fca64f64736f6c634300080d0033";

type StakeFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakeFactory__factory extends ContractFactory {
  constructor(...args: StakeFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakeFactory> {
    return super.deploy(overrides || {}) as Promise<StakeFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakeFactory {
    return super.attach(address) as StakeFactory;
  }
  override connect(signer: Signer): StakeFactory__factory {
    return super.connect(signer) as StakeFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeFactoryInterface {
    return new utils.Interface(_abi) as StakeFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakeFactory {
    return new Contract(address, _abi, signerOrProvider) as StakeFactory;
  }
}
