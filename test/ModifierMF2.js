const NFTContractabi = require('../artifacts/contracts/NFTMarketplace/MintingAndStorage/ERC721NFTContract.sol/ERC721NFTContract.json');

const { expect, assert } = require("chai");
const { ethers, upgrades} = require("hardhat");
const hre = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

let account0, account1, account2, account3, mintingFactoryI, nftContract, nftContractInstance;
let mintingFactoryAddress;

console.log("Hey there!");


factoryContractInstance = async () => {
    console.log("Welcome inside the function!");

    [account0, account1, account2, account3] = await hre.ethers.getSigners();
    console.log("account0 : ",account0.address);
    console.log("account1 : ",account1.address);
    // console.log("account2 : ",account2.address);
    // console.log("account3 : ",account3.address);

    const MintingFactoryV2 = await ethers.getContractFactory("ERC721MintingFactoryV2");
    console.log("Upgrading ERC721MintingFactoryV1 contract...");
    let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, MintingFactoryV2, {
     initializer : "initialize",
     });
    console.log("V1 Upgraded to V2");
    console.log("V2 Contract Deployed To:", upgrade.address);

}


describe("ERC721MintingFactory", async () => {


        // calling the minting factory function to create its instance
        factoryContractInstance();
        console.log("You are Inside describe, ");

    //Minting collection

        let collectionAddress = await mintingFactoryI.connect(account1).createNFTContract("BlockNormandy", "BN");
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