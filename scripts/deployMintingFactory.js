const { ethers, upgrades } = require("hardhat");

const NFTContractabi = require('../artifacts/contracts/NFTMarketplace/MintingAndStorage/NFTContract.sol/NFTContract.json');


const main = async () => {
    [admin] = await ethers.getSigners();
    console.log("Admin address : ", admin.address);
    // let nftContract;

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
        // let collectionAddress = await mintingFactoryProxy.connect(admin).createNFTContract("BlockNormandy", "BN");
        // console.log("Collection created");

        // const receipt = await collectionAddress.wait();
        // console.log("Receipt : ", receipt);
        // nftContract = receipt.events[0].args.nftContract;
        
        // console.log("Event : ",receipt.events[0].args);
        // console.log("NFT contract :  ", nftContract);
        
        // nftContractInstance = await new ethers.Contract(nftContract, NFTContractabi.abi, admin);
        // console.log("Contract Address: ", nftContract);

    // const [account, account2, account3] = await hre.ethers.getSigners();

    // let creator = account3.address;


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