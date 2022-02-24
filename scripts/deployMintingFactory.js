const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory("ERC721MintingFactory");
    const nftFactory = await nftContractFactory.deploy();
    await nftFactory.deployed();
    console.log("Contract deployed to: ", nftFactory.address);

    const accounts = await hre.ethers.getSigners()

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