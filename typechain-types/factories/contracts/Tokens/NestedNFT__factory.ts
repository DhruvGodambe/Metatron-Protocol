/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  NestedNFT,
  NestedNFTInterface,
} from "../../../contracts/Tokens/NestedNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_enochToken",
        type: "address",
      },
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "VoucherRedeemed",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
    inputs: [],
    name: "baseURI",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getValueOf",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040819052600060808190526200001b91600891620000b7565b503480156200002957600080fd5b5060405162001fc838038062001fc88339810160408190526200004c9162000247565b83518490849062000065906000906020850190620000b7565b5080516200007b906001906020840190620000b7565b5050600980546001600160a01b039485166001600160a01b031991821617909155600a8054939094169216919091179091555062000313915050565b828054620000c590620002d6565b90600052602060002090601f016020900481019282620000e9576000855562000134565b82601f106200010457805160ff191683800117855562000134565b8280016001018555821562000134579182015b828111156200013457825182559160200191906001019062000117565b506200014292915062000146565b5090565b5b8082111562000142576000815560010162000147565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200018557600080fd5b81516001600160401b0380821115620001a257620001a26200015d565b604051601f8301601f19908116603f01168101908282118183101715620001cd57620001cd6200015d565b81604052838152602092508683858801011115620001ea57600080fd5b600091505b838210156200020e5785820183015181830184015290820190620001ef565b83821115620002205760008385830101525b9695505050505050565b80516001600160a01b03811681146200024257600080fd5b919050565b600080600080608085870312156200025e57600080fd5b84516001600160401b03808211156200027657600080fd5b620002848883890162000173565b955060208701519150808211156200029b57600080fd5b50620002aa8782880162000173565b935050620002bb604086016200022a565b9150620002cb606086016200022a565b905092959194509250565b600181811c90821680620002eb57607f821691505b602082108114156200030d57634e487b7160e01b600052602260045260246000fd5b50919050565b611ca580620003236000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80636352211e116100ad578063b88d4fde11610071578063b88d4fde14610284578063c87b56dd14610297578063d499937f146102aa578063db006a75146102bd578063e985e9c5146102d057600080fd5b80636352211e1461023b5780636c0360eb1461024e57806370a082311461025657806395d89b4114610269578063a22cb4651461027157600080fd5b806323b872dd116100f457806323b872dd146101dc57806340c10f19146101ef57806342842e0e1461020257806342966c681461021557806355f804b31461022857600080fd5b806301ffc9a71461013157806306fdde0314610159578063081812fc1461016e578063095ea7b3146101995780630ab2b6b9146101ae575b600080fd5b61014461013f36600461162d565b61030c565b60405190151581526020015b60405180910390f35b61016161035e565b60405161015091906116a2565b61018161017c3660046116b5565b6103f0565b6040516001600160a01b039091168152602001610150565b6101ac6101a73660046116ea565b610417565b005b6101ce6101bc3660046116b5565b6000908152600b602052604090205490565b604051908152602001610150565b6101ac6101ea366004611714565b610532565b6101ce6101fd3660046116ea565b610563565b6101ac610210366004611714565b6106dd565b6101ac6102233660046116b5565b6106f8565b6101ac6102363660046117dc565b610704565b6101816102493660046116b5565b6107a3565b610161610803565b6101ce610264366004611825565b610891565b610161610917565b6101ac61027f36600461184e565b610926565b6101ac610292366004611885565b610931565b6101616102a53660046116b5565b610969565b600a54610181906001600160a01b031681565b6101ac6102cb3660046116b5565b610a7a565b6101446102de366004611901565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061033d57506001600160e01b03198216635b5e139f60e01b145b8061035857506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461036d90611934565b80601f016020809104026020016040519081016040528092919081815260200182805461039990611934565b80156103e65780601f106103bb576101008083540402835291602001916103e6565b820191906000526020600020905b8154815290600101906020018083116103c957829003601f168201915b5050505050905090565b60006103fb82610c38565b506000908152600460205260409020546001600160a01b031690565b6000610422826107a3565b9050806001600160a01b0316836001600160a01b031614156104955760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806104b157506104b181336102de565b6105235760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161048c565b61052d8383610c97565b505050565b61053c3382610d05565b6105585760405162461bcd60e51b815260040161048c9061196f565b61052d838383610d83565b600a54604051630935e01b60e21b81523360048201526000916001600160a01b0316906324d7806c90602401602060405180830381865afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d091906119bd565b6105ec5760405162461bcd60e51b815260040161048c906119da565b6105fa600780546001019055565b600061060560075490565b90506000600861061483610f1f565b604051602001610625929190611a39565b6040516020818303038152906040529050610640858361101d565b61064a828261115f565b6000828152600b6020526040908190208590556009549051633950935160e01b81526001600160a01b03878116600483015260248201879052909116906339509351906044016020604051808303816000875af11580156106af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d391906119bd565b5090949350505050565b61052d83838360405180602001604052806000815250610931565b610701816111f9565b50565b600a54604051630935e01b60e21b81523360048201526001600160a01b03909116906324d7806c90602401602060405180830381865afa15801561074c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077091906119bd565b61078c5760405162461bcd60e51b815260040161048c906119da565b805161079f906008906020840190611548565b5050565b6000818152600260205260408120546001600160a01b0316806103585760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161048c565b6008805461081090611934565b80601f016020809104026020016040519081016040528092919081815260200182805461083c90611934565b80156108895780601f1061085e57610100808354040283529160200191610889565b820191906000526020600020905b81548152906001019060200180831161086c57829003601f168201915b505050505081565b60006001600160a01b0382166108fb5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161048c565b506001600160a01b031660009081526003602052604090205490565b60606001805461036d90611934565b61079f338383611239565b61093b3383610d05565b6109575760405162461bcd60e51b815260040161048c9061196f565b61096384848484611308565b50505050565b606061097482610c38565b6000828152600660205260408120805461098d90611934565b80601f01602080910402602001604051908101604052809291908181526020018280546109b990611934565b8015610a065780601f106109db57610100808354040283529160200191610a06565b820191906000526020600020905b8154815290600101906020018083116109e957829003601f168201915b505050505090506000610a2460408051602081019091526000815290565b9050805160001415610a37575092915050565b815115610a69578082604051602001610a51929190611ae0565b60405160208183030381529060405292505050919050565b610a728461133b565b949350505050565b610a83816107a3565b6001600160a01b0316336001600160a01b031614610ae35760405162461bcd60e51b815260206004820152601f60248201527f53656e64657220646f65736e2774206f776e732074686520766f756368657200604482015260640161048c565b6000818152600b6020526040902054610afb30610891565b1015610b585760405162461bcd60e51b815260206004820152602660248201527f436f6e747261637420646f65736e277420686176652073756666696369656e746044820152652066756e647360d01b606482015260840161048c565b6009546000828152600b6020526040908190205490516323b872dd60e01b815230600482015233602482015260448101919091526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610bc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be491906119bd565b50610bee816106f8565b6000818152600b6020908152604091829020548251338152918201527f0ecf23dcd6c307394973e88626336a7c5550b25fc52d1a06d4368513f1b3b123910160405180910390a150565b6000818152600260205260409020546001600160a01b03166107015760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161048c565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610ccc826107a3565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d11836107a3565b9050806001600160a01b0316846001600160a01b03161480610d5857506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610a725750836001600160a01b0316610d71846103f0565b6001600160a01b031614949350505050565b826001600160a01b0316610d96826107a3565b6001600160a01b031614610dfa5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161048c565b6001600160a01b038216610e5c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161048c565b610e67600082610c97565b6001600160a01b0383166000908152600360205260408120805460019290610e90908490611b25565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ebe908490611b3c565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b606081610f435750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f6d5780610f5781611b54565b9150610f669050600a83611b85565b9150610f47565b60008167ffffffffffffffff811115610f8857610f88611750565b6040519080825280601f01601f191660200182016040528015610fb2576020820181803683370190505b5090505b8415610a7257610fc7600183611b25565b9150610fd4600a86611b99565b610fdf906030611b3c565b60f81b818381518110610ff457610ff4611bad565b60200101906001600160f81b031916908160001a905350611016600a86611b85565b9450610fb6565b6001600160a01b0382166110735760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161048c565b6000818152600260205260409020546001600160a01b0316156110d85760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161048c565b6001600160a01b0382166000908152600360205260408120805460019290611101908490611b3c565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b03166111da5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b606482015260840161048c565b6000828152600660209081526040909120825161052d92840190611548565b611202816113af565b6000818152600660205260409020805461121b90611934565b159050610701576000818152600660205260408120610701916115cc565b816001600160a01b0316836001600160a01b0316141561129b5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161048c565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611313848484610d83565b61131f8484848461144a565b6109635760405162461bcd60e51b815260040161048c90611bc3565b606061134682610c38565b600061135d60408051602081019091526000815290565b9050600081511161137d57604051806020016040528060008152506113a8565b8061138784610f1f565b604051602001611398929190611ae0565b6040516020818303038152906040525b9392505050565b60006113ba826107a3565b90506113c7600083610c97565b6001600160a01b03811660009081526003602052604081208054600192906113f0908490611b25565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60006001600160a01b0384163b1561153d57604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061148e903390899088908890600401611c15565b6020604051808303816000875af19250505080156114c9575060408051601f3d908101601f191682019092526114c691810190611c52565b60015b611523573d8080156114f7576040519150601f19603f3d011682016040523d82523d6000602084013e6114fc565b606091505b50805161151b5760405162461bcd60e51b815260040161048c90611bc3565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610a72565b506001949350505050565b82805461155490611934565b90600052602060002090601f01602090048101928261157657600085556115bc565b82601f1061158f57805160ff19168380011785556115bc565b828001600101855582156115bc579182015b828111156115bc5782518255916020019190600101906115a1565b506115c8929150611602565b5090565b5080546115d890611934565b6000825580601f106115e8575050565b601f01602090049060005260206000209081019061070191905b5b808211156115c85760008155600101611603565b6001600160e01b03198116811461070157600080fd5b60006020828403121561163f57600080fd5b81356113a881611617565b60005b8381101561166557818101518382015260200161164d565b838111156109635750506000910152565b6000815180845261168e81602086016020860161164a565b601f01601f19169290920160200192915050565b6020815260006113a86020830184611676565b6000602082840312156116c757600080fd5b5035919050565b80356001600160a01b03811681146116e557600080fd5b919050565b600080604083850312156116fd57600080fd5b611706836116ce565b946020939093013593505050565b60008060006060848603121561172957600080fd5b611732846116ce565b9250611740602085016116ce565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561178157611781611750565b604051601f8501601f19908116603f011681019082821181831017156117a9576117a9611750565b816040528093508581528686860111156117c257600080fd5b858560208301376000602087830101525050509392505050565b6000602082840312156117ee57600080fd5b813567ffffffffffffffff81111561180557600080fd5b8201601f8101841361181657600080fd5b610a7284823560208401611766565b60006020828403121561183757600080fd5b6113a8826116ce565b801515811461070157600080fd5b6000806040838503121561186157600080fd5b61186a836116ce565b9150602083013561187a81611840565b809150509250929050565b6000806000806080858703121561189b57600080fd5b6118a4856116ce565b93506118b2602086016116ce565b925060408501359150606085013567ffffffffffffffff8111156118d557600080fd5b8501601f810187136118e657600080fd5b6118f587823560208401611766565b91505092959194509250565b6000806040838503121561191457600080fd5b61191d836116ce565b915061192b602084016116ce565b90509250929050565b600181811c9082168061194857607f821691505b6020821081141561196957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b6000602082840312156119cf57600080fd5b81516113a881611840565b60208082526023908201527f41646d696e52656769737472793a205265737472696374656420746f2061646d60408201526234b71760e91b606082015260800190565b60008151611a2f81856020860161164a565b9290920192915050565b600080845481600182811c915080831680611a5557607f831692505b6020808410821415611a7557634e487b7160e01b86526022600452602486fd5b818015611a895760018114611a9a57611ac7565b60ff19861689528489019650611ac7565b60008b81526020902060005b86811015611abf5781548b820152908501908301611aa6565b505084890196505b505050505050611ad78185611a1d565b95945050505050565b60008351611af281846020880161164a565b835190830190611b0681836020880161164a565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611b3757611b37611b0f565b500390565b60008219821115611b4f57611b4f611b0f565b500190565b6000600019821415611b6857611b68611b0f565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611b9457611b94611b6f565b500490565b600082611ba857611ba8611b6f565b500690565b634e487b7160e01b600052603260045260246000fd5b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611c4890830184611676565b9695505050505050565b600060208284031215611c6457600080fd5b81516113a88161161756fea2646970667358221220a630d9ca98e45d47feef47f0dc3bf443c5dddafdb5e3a175b25aa153626007a964736f6c634300080a0033";

type NestedNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NestedNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NestedNFT__factory extends ContractFactory {
  constructor(...args: NestedNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _enochToken: PromiseOrValue<string>,
    _adminRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NestedNFT> {
    return super.deploy(
      _name,
      _symbol,
      _enochToken,
      _adminRegistry,
      overrides || {}
    ) as Promise<NestedNFT>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _enochToken: PromiseOrValue<string>,
    _adminRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _enochToken,
      _adminRegistry,
      overrides || {}
    );
  }
  override attach(address: string): NestedNFT {
    return super.attach(address) as NestedNFT;
  }
  override connect(signer: Signer): NestedNFT__factory {
    return super.connect(signer) as NestedNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NestedNFTInterface {
    return new utils.Interface(_abi) as NestedNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NestedNFT {
    return new Contract(address, _abi, signerOrProvider) as NestedNFT;
  }
}
