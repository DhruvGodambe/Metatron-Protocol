// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//While mint the collection, approve the exchange address (approveAll);
//Exchange calls transferFrom fn;

import "./NFTCollection.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFTMintingFactory {
    // this contract creates an NFT Collection
    // and then it can mint NFT for that Collection
    // keeps track of all NFT Collections for the users

    // exchangeAddress
    // admin address

    address public adminAddress;
    address public exchangeAddress;

    constructor() public {
        adminAddress = msg.sender;
    }

    //owner=>collection
    mapping(address => address[]) public ownerToCollection;
    // collection => (owner => token Id)
    mapping(address => mapping(address => uint256)) public collectionToOwnerToId;
    // collection => owner
    mapping(address => address) public collectionToOwner;

    // Events
    event NFTCollectionCreated(string name, string symbol, address nftCollection);
    event NFTMinted(address nftCollection, uint256 tokenId);
    event OwnerUpdated(address nftCollection, address newOwner, uint256 tokenId);
    event ExchangeAddressChanged(address oldExchange, address newExchange);

    modifier onlyOwner(address _nftCollection) {
        require(
            collectionToOwner[_nftCollection] == msg.sender,
            "Only Creator can call this!"
        );
        _;
    }

    modifier onlyExchange() {
        require(msg.sender == exchangeAddress, "Only Exchange can call this!");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Only Admin can call this!");
        _;
    }


    function createNFTCollection(string memory _name, string memory _symbol)
        external onlyAdmin
        returns (address _nftCollection)
    {
        // create new contract
        address nftCollection = address(new NFTCollection(_name, _symbol));
        // update mapping of owner to NFTCollections
        ownerToCollection[msg.sender].push(nftCollection);
        collectionToOwner[nftCollection] = msg.sender;

        IERC721(nftCollection).setApprovalForAll(exchangeAddress, true);

        emit NFTCollectionCreated(_name, _symbol, nftCollection);
        // return address of new contract
        return nftCollection;
    }

    // function => mintNFt
    // onlyExchange can call it, so need a modifier for it
    // the one in above mapping could call it
    function mintNFT(address _nftCollection, string memory _tokenURI)
        public
        onlyExchange 
        returns (bool)
    {
        uint256 _tokenId = NFTCollection(_nftCollection).mintNewNFT(_tokenURI);

        emit NFTMinted(_nftCollection, _tokenId);
        return true;
    }

    // updating owner in our factory records => just book-keeping
    // should this work be done in mintNFT directly
    // if not, who will update the owner
    // update owner can be called by onlyExchange, create a new address as exchangeAddress, add modifier
    // function changeExchangeAddress, called by onlyAdmin
    // adminAddress => fixed, during constructor, the one who deploys factory
    function updateOwner(
        address _nftCollection,
        address _newOwner,
        uint256 _tokenId
    ) public onlyExchange {
        collectionToOwnerToId[_nftCollection][_newOwner] = _tokenId;

        emit OwnerUpdated(_nftCollection, _newOwner, _tokenId);
    }

    function updateExchangeAddress(address _newExchange) public onlyAdmin {
        address oldExchange = exchangeAddress;
        exchangeAddress = _newExchange;
        emit ExchangeAddressChanged(oldExchange, exchangeAddress);
    }

    // lists all NFT collections for a owner
    function getCollectionForOwner(address user)
        public
        view
        returns (address[] memory)
    {
        return ownerToCollection[user];
    }


    // // lists all NFT IDs for a collection of owner
    // function getIdsForCollectionToOwner(address _nftCollection, address user)
    //     public
    //     view
    //     returns (uint256[] memory)
    // {
    //     return collectionToOwnerToId[_nftCollection][user];
    // }

    // get total NFTs minted for a contract
    // function getTotalNFTsMinted(address _nftCollection)
    //     public
    //     view
    //     returns (uint256)
    // {
    //     return NFTCollection(_nftCollection).getTotalNFTs();
    // }
}
