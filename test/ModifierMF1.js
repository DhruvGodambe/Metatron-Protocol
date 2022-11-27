const NFTContractabi = require('../artifacts/contracts/NFTMarketplace/MintingAndStorage/ERC721NFTContract.sol/ERC721NFTContract.json');

const { expect, assert, beforeEach } = require("chai");
const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

let account0, mintingFactoryI, nftContract, nftContractInstance;
let mintingFactoryAddress;

console.log("Hey there!");


factoryContractInstance = async () => {
    console.log("Welcome inside the function!");
    [account0] = await hre.ethers.getSigners();
    console.log("account0 : ",account0.address);

    const erc721MintingFactory = await hre.ethers.getContractFactory("ERC721MintingFactory");
    mintingFactoryI = await upgrades.deployProxy(erc721MintingFactory, {
        initializer : "initialize",
    });
    console.log("Minting factory deployed");
    await mintingFactoryI.deployed();

    mintingFactoryAddress = mintingFactoryI.address;
    console.log("Minting Factory Address: ", mintingFactoryAddress);
}

describe("ERC721MintingFactory", () => {

    it()

    before(async () => {
        await factoryContractInstance();
        console.log("You are Inside describe, ");
        
                // calling the minting factory function to create its instance
        
            //Minting collection
        
                let collectionAddress = await mintingFactoryI.connect(account0).createNFTContract("BlockNormandy", "BN");
                console.log("Collection created");
        
                const receipt = await collectionAddress.wait();
                console.log("Receipt", receipt);
                
                nftContractInstance = await new ethers.Contract(nftContract, NFTContractabi.abi, account0);
                console.log("Contract Address: ", nftContract);
    });


        // let nftContract;
        // console.log("Sender:", collectionAddress.from);

        // // listen contract creation event
        // mintingFactoryI.on("NFTContractCreated", (_name, _symbol, _nftContract) => {
        //     nftContract = _nftContract;
        //     console.log("name : ",_name, "symbol : ", _symbol, "NFT contract : ", _nftContract);
        // });
        // await new Promise(res => setTimeout(() => res(null), 5000));

        // take nft instance
        // console.log(nftContractInstance);
        // expect(await nftContract).to.equal(collectionAddress);

})