// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;

// import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

// import "./../Collection/Collection.sol";
// import "./../../../Registry/IAdminRegistry.sol";

// abstract contract MintingFactory is 
//     Initializable,
//     UUPSUpgradeable,
//     ReentrancyGuardUpgradeable,
//     PausableUpgradeable
// {

//     address public exchangeAddress;
//     address public adminRegistry;

//     mapping(address => address[]) public ownerToCollection;
// // mapping(address => mapping(address => uint256)) public collectionToOwnerToId;
// //     mapping(address => address) public collectionToOwner;

//     event NFTCollectionCreated(string name, string symbol, address nftCollection);
//     event OwnerUpdated(address nftCollection, address newOwner, uint256 tokenId);
//     event ExchangeAddressChanged(address oldExchange, address newExchange);
//     event MintExecutedinMintingFactory(address signer);


//     modifier onlyExchange() {
//         console.log("msg.sender is : ", msg.sender);
//         console.log("exchangeAddress is : ", exchangeAddress);
//         require(msg.sender == exchangeAddress, 
//         "Only Exchange can call this!");
//         _;
//     }

//     modifier onlyAdmin() {
//         require(IAdminRegistry(adminRegistry).isAdmin(msg.sender), 
//         "Only Admin can call this!");
//         _;
//     }

//     function initialize(
//         address _adminRegistry
//     ) external virtual initializer {
//         __UUPSUpgradeable_init();
//         __Pausable_init();
//         __ReentrancyGuard_init();
//         adminRegistry = _adminRegistry;
//     }


//     function createNFTCollection(
//         string memory _name, 
//         string memory _symbol,
//         string memory _baseURI
//     )   external onlyAdmin
//         returns (address _nftCollection)
//     {
//         // create new contract
//         address nftCollection = address(new Collection(_name, _symbol, adminRegistry, _baseURI));
//         // update mapping of owner to NFTCollections
//         ownerToCollection[msg.sender].push(nftCollection);
//         collectionToOwner[nftCollection] = msg.sender;

//         IERC721Upgradeable(nftCollection).setApprovalForAll(exchangeAddress, true);

//         emit NFTCollectionCreated(_name, _symbol, nftCollection);
//         // return address of new contract
//         return nftCollection;
//     }


// //    function updateOwner(
//         address _nftCollection,
//         address _newOwner,
//         uint256 _tokenId
//     ) public onlyExchange {
//         collectionToOwnerToId[_nftCollection][_newOwner] = _tokenId;

//         emit OwnerUpdated(_nftCollection, _newOwner, _tokenId);
//     }

//     function updateExchangeAddress(address _newExchange) public onlyAdmin {
//         address oldExchange = exchangeAddress;
//         exchangeAddress = _newExchange;
//         emit ExchangeAddressChanged(oldExchange, exchangeAddress);
//     }


//     // lists all NFT collections for a owner
//     function getCollectionForOwner(address user)
//         public
//         view
//         returns (address[] memory)
//     {
//         return ownerToCollection[user];
//     }


//     // lists all NFT IDs for a collection of owner
//     function getIdsForCollectionToOwner(address _nftCollection, address user)
//         public
//         view
//         returns (uint256)
//     {
//         return collectionToOwnerToId[_nftCollection][user] ;
//     }

//     function _authorizeUpgrade(address _newImplementation) internal onlyAdmin override {}
    
//     function pause() public virtual onlyAdmin whenNotPaused{
//         _pause();
//     }

//     function unPause() public virtual onlyAdmin whenPaused{
//         _unpause();
//     }

// }
