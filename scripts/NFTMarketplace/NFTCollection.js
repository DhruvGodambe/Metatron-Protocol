const { ethers } = require("hardhat");

const main = async () => {
    const accounts = await ethers.getSigners();

    owner = accounts[0];
    user = accounts[1];

    ownerAddress = await accounts[0].getAddress();
    userAddress = await accounts[1].getAddress();

    const name = "Friday";
    const symbol = "FRI";
    const adminRegistry = ownerAddress;
    const baseURI = "ipfs://";

    const NFTCollection = await ethers.getContractFactory(
        "NFTCollection",
        owner
    );
    const nftCollection = await NFTCollection.deploy(
        name,
        symbol,
        adminRegistry,
        baseURI
    );
    await nftCollection.deployed();

    console.log(`NFTCollection Address --> ${nftCollection.address}`);

    console.log(`\n---------- Calling _setbaseURI ----------`);

    // const uri = "ipfs://";
    // const tx1 = await nftCollection._setbaseURI(uri);
    // const tx1Receipt = await tx1.wait();

    // console.log(`_setbaseURI ${tx1Receipt}`);

    console.log(`\n---------- Calling tokenURI ----------`);

    // const tokenId = 1;
    // const tx2 = await nftCollection.connect().tokenURI(tokenId);
    // // const tx2Receipt = await tx2.wait();

    // console.log(`tokenURI --> ${tx2}`);

    console.log(`\n---------- Calling mintNewNFT ----------`);

    // const _tokenId = 5;
    // const tx3 = await nftCollection.connect(owner).mintNewNFT(_tokenId);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
