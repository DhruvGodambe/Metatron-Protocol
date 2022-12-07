// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//While mint the collection, approve the exchange address (approveAll);
//Exchange calls transferFrom fn;

import "./NFTContract.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFTMintingFactory is Initializable{
    // this contract creates an NFT contract
    // and then it can mint NFT for that contract
    // keeps track of all NFT contracts for the users

    // exchangeAddress
    // admin address

    address public adminAddress;
    address public exchangeAddress;

    function initialize() public initializer {
        adminAddress = msg.sender;
    }

    //owner=>collection
    mapping(address => address[]) public ownerToCollection;
    // collection => (owner => token Id)
    mapping(address => mapping(address => uint256)) public collectionToOwnerToId;
    // collection => owner
    mapping(address => address) public collectionToOwner;

    // Events
    event NFTContractCreated(string name, string symbol, address nftContract);
    event NFTMinted(address nftContract, uint256 tokenId);
    event OwnerUpdated(address nftContract, address newOwner, uint256 tokenId);
    event ExchangeAddressChanged(address oldExchange, address newExchange);

    modifier onlyOwner(address _nftContract) {
        require(
            collectionToOwner[_nftContract] == msg.sender,
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

    function createNFTContract(string memory _name, string memory _symbol)
        external onlyAdmin
        returns (address _nftcontract)
    {
        // create new contract
        address nftContract = address(new NFTContract(_name, _symbol));
        // update mapping of owner to NFTContracts
        ownerToCollection[msg.sender].push(nftContract);
        collectionToOwner[nftContract] = msg.sender;

        emit NFTContractCreated(_name, _symbol, nftContract);
        // return address of new contract
        return nftContract;
    }

    // function => mintNFt
    // onlyAdmin can call it, so need a modifier it
    // the one in above mapping could call it
    function mintNFT(address _nftContract, string memory _tokenURI)
        public
        onlyExchange 
        returns (bool)
    {
        uint256 tokenId = NFTContract(_nftContract).mintNewNFT(_tokenURI);

        emit NFTMinted(_nftContract, tokenId);
        return true;
    }

    // updating owner in our factory records => just book-keeping
    // should this work be done in mintNFT directly
    // if not, who will update the owner
    // update owner can be called by onlyExchange, create a new address as exchangeAddress, add modifier
    // function changeExchangeAddress, called by onlyAdmin
    // adminAddress => fixed, during constructor, the one who deploys factory
    function updateOwner(
        address _nftContract,
        address _newOwner,
        uint256 _tokenId
    ) public onlyExchange {
        collectionToOwnerToId[_nftContract][_newOwner] = _tokenId;

        emit OwnerUpdated(_nftContract, _newOwner, _tokenId);
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
    // function getIdsForCollectionToOwner(address _nftContract, address user)
    //     public
    //     view
    //     returns (uint256[] memory)
    // {
    //     return collectionToOwnerToId[_nftContract][user];
    // }

    // get total NFTs minted for a contract
    // function getTotalNFTsMinted(address _nftContract)
    //     public
    //     view
    //     returns (uint256)
    // {
    //     return NFTContract(_nftContract).getTotalNFTs();
    // }
}
