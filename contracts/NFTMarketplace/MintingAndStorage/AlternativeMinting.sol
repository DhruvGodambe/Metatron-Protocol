// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// import "./ERC721NFTContract.sol";

// contract ERC721MintingFactory {
//     // this contract creates an NFT contract
//     // and then it can mint NFT for that contract
//     // keeps track of all NFT contracts for the users

//     // exchangeAddress
//     // admin address

//     address public adminAddress;
//     address public exchangeAddress;

//     constructor() public {
//         adminAddress = msg.sender;
//     }

//     mapping(address => address[]) public ownerToNFTs;
//     // mapping => nft contract => (mapping (token id => owner))
//     mapping(address => mapping(uint256 => address)) public nftToIdToOwner;
//     // nftContract => ownerAddress
//     mapping(address => address) public nftToOwner;

//     // Events
//     event NFTContractCreated(string name, string symbol, address nftContract);
//     event NFTMinted(address nftContract, uint256 tokenId);
//     event OwnerUpdated(address nftContract, uint256 tokenId, address newOwner);
//     event ExchangeAddressChanged(address oldExchange, address newExchange);

//     modifier onlyCreatorOwner(address _nftContract) {
//         require(
//             nftToOwner[_nftContract] == msg.sender,
//             "Only Creator can call this!"
//         );
//         _;
//     }

//     modifier onlyExchange() {
//         require(msg.sender == exchangeAddress, "Only Exchange can call this!");
//         _;
//     }

//     modifier onlyAdmin() {
//         require(msg.sender == adminAddress, "Only Admin can call this!");
//         _;
//     }

//     function createNFTContract(string memory _name, string memory _symbol)
//         external
//         returns (address _nftcontract)
//     {
//         // create new contract
//         address nftContract = address(new ERC721NFTContract(_name, _symbol));
//         // update mapping of owner to NFTContracts
//         ownerToNFTs[msg.sender].push(nftContract);
//         nftToOwner[nftContract] = msg.sender;

//         emit NFTContractCreated(_name, _symbol, nftContract);
//         // return address of new contract
//         return nftContract;
//     }

//     // function => mintNFt
//     // onlyCreatorOwner can call it, so need a modifier it
//     // the one in above mapping could call it
//     function mintNFT(address _nftContract, string memory _tokenURI)
//         public
//         onlyCreatorOwner(_nftContract)
//     {
//         ERC721NFTContract(_nftContract).mintNewNFT(_tokenURI);
//         uint256 _tokenId = ERC721NFTContract(_nftContract).getTotalNFTs();

//         emit NFTMinted(_nftContract, _tokenId);
//     }

//     // updating owner in our factory records => just book-keeping
//     // should this work be done in mintNFT directly
//     // if not, who will update the owner
//     // update owner can be called by onlyExchange, create a new address as exchangeAddress, add modifier
//     // function changeExchangeAddress, called by onlyAdmin
//     // adminAddress => fixed, during constructor, the one who deploys factory
//     function updateOwner(
//         address _nftContract,
//         uint256 _tokenId,
//         address _newOwner
//     ) public onlyExchange {
//         nftToIdToOwner[_nftContract][_tokenId] = _newOwner;

//         emit OwnerUpdated(_nftContract, _tokenId, _newOwner);
//     }

//     function updateExchangeAddress(address _newExchange) public onlyAdmin {
//         address oldExchange = exchangeAddress;
//         exchangeAddress = _newExchange;
//         emit ExchangeAddressChanged(oldExchange, exchangeAddress);
//     }

//     // lists all NFT collections for a owner
//     function getNFTsForOwner(address user)
//         public
//         view
//         returns (address[] memory)
//     {
//         return ownerToNFTs[user];
//     }

//     // get total NFTs minted for a contract
//     function getTotalNFTsMinted(address _nftContract)
//         public
//         view
//         returns (uint256)
//     {
//         return ERC721NFTContract(_nftContract).getTotalNFTs();
//     }
// }
