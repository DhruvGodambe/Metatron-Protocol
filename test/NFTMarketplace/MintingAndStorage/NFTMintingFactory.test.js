const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("NFTMintingFactory", () => {
    let accounts, owner, user, user2, treasurer, exchange;
    let ownerAddress, userAddress, user2Address, treasuryAddress;
    let NFTMintingFactory, nftMintingFactory, AdminRegistry, adminRegistry;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        owner = accounts[0];
        user = accounts[1];
        user2 = accounts[2];
        exchange = accounts[8];
        treasurer = accounts[9];

        ownerAddress = await accounts[0].getAddress();
        userAddress = await accounts[1].getAddress();
        user2Address = await accounts[2].getAddress();
        treasuryAddress = await accounts[9].getAddress();
        exchangeAddress = await accounts[8].getAddress();

        // Admin Registry

        AdminRegistry = await ethers.getContractFactory("AdminRegistry");
        adminRegistry = await AdminRegistry.deploy(
            ownerAddress,
            treasuryAddress
        );
        await adminRegistry.deployed();
        const aRegistryAddress = adminRegistry.address;

        // NFTMinting Factory

        NFTMintingFactory = await ethers.getContractFactory(
            "NFTMintingFactory"
        );
        nftMintingFactory = await NFTMintingFactory.deploy(aRegistryAddress);
        await nftMintingFactory.deployed();
    });

    // it("should set constructor addresses correctly", async () => {});

    it("Only Admin can create NFT Collection", async () => {
        const name = "Friday";
        const symbol = "FRI";
        const baseURI = "ipfs://";

        const tx1 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx1Receipt = await tx1.wait();

        const tx1Name = tx1Receipt.events[1].args.name;
        const tx1Symbol = tx1Receipt.events[1].args.symbol;

        assert.equal(name, tx1Name);
        assert.equal(symbol, tx1Symbol);
    });

    it("Only Exchange can call mint NFT", async () => {
        const name = "Friday";
        const symbol = "FRI";
        const baseURI = "ipfs://";
        const tokenId = 10;

        const tx2 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx2Receipt = await tx2.wait();

        const NFTCollection = tx2Receipt.events[1].args.nftCollection;

        const tx3 = await nftMintingFactory
            .connect(owner)
            .updateExchangeAddress(exchangeAddress);
        await tx3.wait();

        const tx4 = await nftMintingFactory
            .connect(exchange)
            .mintNFT(NFTCollection, tokenId);
        const tx4Receipt = await tx4.wait();

        const tx4NFTCollection = tx4Receipt.events[1].args.nftCollection;
        const tx4TokenId = tx4Receipt.events[1].args.tokenId;

        assert.equal(NFTCollection, tx4NFTCollection);
        assert.equal(tokenId, tx4TokenId);
    });

    it("Only Exchange can update Owner", async () => {
        const name = "Friday";
        const symbol = "FRI";
        const baseURI = "ipfs://";
        const tokenId = 10;

        const tx2 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx2Receipt = await tx2.wait();

        const NFTCollection = tx2Receipt.events[1].args.nftCollection;

        const tx3 = await nftMintingFactory
            .connect(owner)
            .updateExchangeAddress(exchangeAddress);
        await tx3.wait();

        const tx4 = await nftMintingFactory
            .connect(exchange)
            .mintNFT(NFTCollection, tokenId);
        await tx4.wait();

        const newOwner = user2Address;

        const tx5 = await nftMintingFactory
            .connect(exchange)
            .updateOwner(NFTCollection, newOwner, tokenId);
        const tx5Receipt = await tx5.wait();

        const updatedOwner = tx5Receipt.events[0].args.newOwner;

        expect(newOwner).to.equal(updatedOwner);
    });

    it("Only Admin can update Exchange Address", async () => {
        const newExAddress = exchangeAddress;
        const tx1 = await nftMintingFactory
            .connect(owner)
            .updateExchangeAddress(newExAddress);
        const tx1Receipt = await tx1.wait();

        const updatedExAddress = tx1Receipt.events[0].args.newExchange;

        assert.equal(newExAddress, updatedExAddress);
    });

    it("Should get Collection For Owner", async () => {
        const name = "Friday";
        const symbol = "FRI";
        const baseURI = "ipfs://";

        const tx1 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx1Receipt = await tx1.wait();

        const NFTCollection = tx1Receipt.events[1].args.nftCollection;

        const tx2 = await nftMintingFactory
            .connect(owner)
            .getCollectionForOwner(ownerAddress);

        const ownerToCollection = tx2[0];

        expect(NFTCollection).to.equal(ownerToCollection);
    });
});
