const NFTContractabi = require('../artifacts/contracts/NFTMarketplace/MintingAndStorage/ERC721NFTContract.sol/ERC721NFTContract.json');

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


let account0, mintingFactoryI, nftContract, nftContractInstance;
let mintingFactoryAddress, newExchangeAddress;


describe("ERC721MintingFactory", async () => {
    const erc721MintingFactory = await ethers.getContractFactory("ERC721MintingFactory");
    mintingFactoryI = await erc721MintingFactory.deploy();
    console.log("Minting factory deployed");
    await mintingFactoryI.deployed();

    mintingFactoryAddress = mintingFactoryI.address;
    console.log("Minting Factory Address: ", mintingFactoryAddress);





    [account0] = await ethers.getSigners();
    console.log("account0 : ",account0);

    //Minting collection

        let collectionAddress = await mintingFactoryI.createNFTContract("BlockNormandy", "BN");
        console.log("Collection created");

        await collectionAddress.wait();

        // let nftContract;
        // console.log("Sender:", collectionAddress.from);

        // listen contract creation event
        mintingFactoryI.on("NFTContractCreated", (_name, _symbol, _nftContract) => {
            nftContract = _nftContract;
            console.log("name : ",_name, "symbol : ", _symbol, "NFT contract : ", _nftContract);
        });
        await new Promise(res => setTimeout(() => res(null), 5000));

        // take nft instance
        nftContractInstance = new ethers.Contract(nftContract, NFTContractabi.abi, account0);
        console.log("Contract Address: ", nftContract);
        // console.log(nftContractInstance);
        // expect(await nftContract).to.equal(collectionAddress);


})