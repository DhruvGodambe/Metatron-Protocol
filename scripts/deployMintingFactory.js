const { ethers, upgrades } = require("hardhat");

const NFTContractabi = require('../artifacts/contracts/NFTMarketplace/MintingAndStorage/ERC721NFTContract.sol/ERC721NFTContract.json');


const main = async () => {
    [admin] = await ethers.getSigners();
    let nftContract;

    const nftContractFactory = await hre.ethers.getContractFactory("ERC721MintingFactory");
    console.log("Deploying ERC721 Minting Factory...");
    const nftFactory1 = await upgrades.deployProxy(nftContractFactory, {
        initializer : "initialize",
    });
    await nftFactory1.deployed();
    console.log("Contract deployed to: ", nftFactory1.address);
    
    // calling the minting factory function to create its instance

    //Minting collection

        let collectionAddress = await nftFactory1.connect(admin).createNFTContract("BlockNormandy", "BN");
        console.log("Collection created");

        const receipt = await collectionAddress.wait();
        console.log("Receipt", receipt);
        nftContract = receipt.events[0].args.nftContract;
        
        console.log("Event",receipt.events[0].args);
        console.log("NFT contract:", nftContract);
        
        nftContractInstance = await new ethers.Contract(nftContract, NFTContractabi.abi, admin);
        console.log("Contract Address: ", nftContract);

    // const [account, account2, account3] = await hre.ethers.getSigners();

    // let creator = account3.address;

    // *****   // accounts3 => creator bana dena

    // creator will mint his nft,
    // then, console log the nft address and creator address.

    // let txn = await nftFactory.createNFTContract("CHENNAI SUPER KINGS", "CSK");
    // await txn.wait()
    // console.log("NFT Contract minted!");

    // // get the contract address now
    // let txn2 = nftFactory.getNFTsForOwner(accounts[0]);
    // await txn.wait();
    // console.log(txn);


}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();