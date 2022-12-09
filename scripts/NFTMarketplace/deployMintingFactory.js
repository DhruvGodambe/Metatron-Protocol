const { ethers, upgrades } = require("hardhat");

const NFTCollectionabi = require('../../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTCollection.sol/NFTCollection.json');


const main = async () => {
    [admin] = await ethers.getSigners();
    console.log("Admin address : ", admin.address);
    // let nftCollection;

    const mintingFactoryContract = await hre.ethers.getContractFactory("NFTMintingFactory");
    console.log("Deploying ERC721 Minting Factory Proxy...");
    const mintingFactoryProxy = await upgrades.deployProxy(mintingFactoryContract, {
        initializer : "initialize",
    });
    await mintingFactoryProxy.deployed();
    console.log("Proxy contract deployed at : ", mintingFactoryProxy.address);
    console.log("Minting Factory Proxy  : ", mintingFactoryProxy);


    //Minting collection
        // console.log("Creating a collection ...");
        // let collectionAddress = await mintingFactoryProxy.connect(admin).createNFTCollection("BlockNormandy", "BN");
        // console.log("Collection created");

        // const receipt = await collectionAddress.wait();
        // console.log("Receipt : ", receipt);
        // nftCollection = receipt.events[0].args.nftCollection;
        
        // console.log("Event : ",receipt.events[0].args);
        // console.log("NFT Collection :  ", nftCollection);
        
        // nftCollectionInstance = await new ethers.Contract(nftCollection, NFTCollectionabi.abi, admin);
        // console.log("Contract Address: ", nftCollection);

    // const [account, account2, account3] = await hre.ethers.getSigners();

    // let creator = account3.address;


    // creator will mint his nft,
    // then, console log the nft address and creator address.

    // let txn = await nftFactory.createNFTCollection("CHENNAI SUPER KINGS", "CSK");
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