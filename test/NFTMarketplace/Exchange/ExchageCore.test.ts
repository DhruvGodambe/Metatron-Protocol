import { ethers } from "hardhat";
import { assert, expect } from "chai";
import {
    WETHToken__factory,
    WETHToken,
    AdminRegistry__factory,
    AdminRegistry,
    NFTMintingFactory__factory,
    NFTMintingFactory,
    ExchangeCore__factory,
    ExchangeCore,
} from "../../../typechain-types";
import { Signer } from "ethers";
describe("ExchangeCore", () => {
    let accounts: Signer[],
        owner: Signer,
        user: Signer,
        user2: Signer,
        treasurer: Signer;

    let ownerAddress: string,
        userAddress: string,
        user2Address: string,
        treasuryAddress: string,
        mintingFactoryAddress: string,
        exchangeCoreAddress: string,
        aRegistryAddress: string,
        wETHAddress: string;

    let NFTMintingFactory: NFTMintingFactory__factory,
        nftMintingFactory: NFTMintingFactory,
        AdminRegistry: AdminRegistry__factory,
        adminRegistry: AdminRegistry,
        ExchangeCore: ExchangeCore__factory,
        exchangeCore: ExchangeCore,
        WETHToken: WETHToken__factory,
        wETHToken: WETHToken;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        owner = accounts[0];
        user = accounts[1];
        user2 = accounts[2];
        treasurer = accounts[9];

        ownerAddress = await accounts[0].getAddress();
        userAddress = await accounts[1].getAddress();
        user2Address = await accounts[2].getAddress();
        treasuryAddress = await accounts[9].getAddress();

        // WETH

        WETHToken = (await ethers.getContractFactory(
            "WETHToken"
        )) as WETHToken__factory;
        wETHToken = await WETHToken.deploy();
        await wETHToken.deployed();

        wETHAddress = wETHToken.address;

        // Admin Registry

        AdminRegistry = (await ethers.getContractFactory(
            "AdminRegistry"
        )) as AdminRegistry__factory;
        adminRegistry = await AdminRegistry.deploy(
            ownerAddress,
            treasuryAddress
        );
        await adminRegistry.deployed();

        aRegistryAddress = adminRegistry.address;

        // NFTMinting Factory

        NFTMintingFactory = (await ethers.getContractFactory(
            "NFTMintingFactory"
        )) as NFTMintingFactory__factory;
        nftMintingFactory = await NFTMintingFactory.deploy(aRegistryAddress);
        await nftMintingFactory.deployed();

        mintingFactoryAddress = nftMintingFactory.address;

        // Exchange Core

        ExchangeCore = (await ethers.getContractFactory(
            "ExchangeCore"
        )) as ExchangeCore__factory;
        exchangeCore = await ExchangeCore.deploy(
            mintingFactoryAddress,
            aRegistryAddress,
            treasuryAddress
        );
        await exchangeCore.deployed();

        exchangeCoreAddress = exchangeCore.address;

        const addExchangeAddress = await nftMintingFactory
            .connect(owner)
            .updateExchangeAddress(exchangeCoreAddress);
        await addExchangeAddress.wait();
    });

    it("Should check owner", async () => {
        const tx1 = await exchangeCore.owner();
        assert.equal(tx1, ownerAddress);
    });

    it("Should set constructor correctly", async () => {
        const tx1 = await exchangeCore.adminRegistry();
        const tx2 = await exchangeCore.treasury();

        assert.equal(tx1, aRegistryAddress);
        assert.equal(tx2, treasuryAddress);
    });

    //cannot test variables that visibility is internal
    // it("Should check auction Time Limit", async () => {});

    it("Should check trading Fee Factor Max", async () => {
        const tradingFeeFactorMax: string = "10000"; // 100%
        const tx1 = await exchangeCore.connect(owner).tradingFeeFactorMax();

        assert.strictEqual(tx1.toString(), tradingFeeFactorMax);
    });

    it("Should check trading Fee Factor", async () => {
        const tradingFeeFactor: string = "400";
        const tx1 = await exchangeCore.connect(owner).tradingFeeFactor();

        assert.equal(tx1.toString(), tradingFeeFactor);
    });

    // cannot test function that visibility is internal
    // it("Should return true for validate Seller", async () => {});

    // cannot test function that visibility is internal
    // it("Should return true for validate Buyer", async () => {});

    it("Only Admin can call fixed Price Primary Sale", async () => {
        const name: string = "Monday";
        const symbol: string = "MON";
        const baseURI: string = "ipfs://";

        const tx1 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx1Receipt = await tx1.wait();

        const NFTCollection = tx1Receipt.events![1].args!.nftCollection;
        const nftPrice: number = 1;
        const tokenId: number = 21;
        const buyer = userAddress;
        const approvedAmt: number = 5;

        const transfer = await wETHToken
            .connect(owner)
            .transfer(userAddress, approvedAmt);
        await transfer.wait();

        const allowance = await wETHToken
            .connect(user)
            .approve(exchangeCoreAddress, approvedAmt);
        await allowance.wait();

        //'Only Exchange can call this!' error

        const tx2 = await exchangeCore
            .connect(owner)
            .fixedPricePrimarySale(
                NFTCollection,
                nftPrice,
                tokenId,
                buyer,
                wETHAddress
            );
        const tx2Receipt = await tx2.wait();
        const adminAddress = ownerAddress;

        expect(adminAddress).to.equal(tx2Receipt.from);
    });

    // cannot test function that visibility is internal
    // it("Should mint And Transfer", async () => {});

    it("Should check Order is Cancelled or not", async () => {
        const name: string = "Monday";
        const symbol: string = "MON";
        const baseURI: string = "ipfs://";

        const tx1 = await nftMintingFactory
            .connect(owner)
            .createNFTCollection(name, symbol, baseURI);
        const tx1Receipt = await tx1.wait();

        const NFTCollection = tx1Receipt.events![1].args!.nftCollection;
        const tokenId: number = 21;
        const buyer = userAddress;

        const tx2 = await exchangeCore.isOrderCancelled(
            NFTCollection,
            tokenId,
            buyer
        );

        /*this should log false cause there is no cancel order listed for
        this NFTCollection */
        assert.isFalse(tx2);
    });
});
