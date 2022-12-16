const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Admin Registry", () => {
    let owner, user, user2, accounts;
    let ownerAddress, userAddress, user2Address, treasuryAddress;
    let AdminRegistry, adminRegistry;

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

        AdminRegistry = await ethers.getContractFactory("AdminRegistry");
        adminRegistry = await AdminRegistry.deploy(
            ownerAddress,
            treasuryAddress
        );
        await adminRegistry.deployed();
    });

    it("should set constructor addresses correctly", async () => {
        const admin = ownerAddress;
        const treasurer = treasuryAddress;

        assert.equal(admin, ownerAddress);
        assert.equal(treasurer, treasuryAddress);
    });

    it("Should Check user is a Admin", async () => {
        const tx = await adminRegistry.connect(owner).isAdmin(ownerAddress);

        expect(tx).to.be.true;
    });

    it("Should Check user is a Treasurer", async () => {
        const tx = await adminRegistry
            .connect(owner)
            .isTreasury(treasuryAddress);

        expect(tx).to.be.true;
    });

    it("Only admin can add new admin", async () => {
        const tx = await adminRegistry.connect(owner).addAdmin(user2Address);

        expect(tx).to.be.revertedWith("You are not a Admin!");
    });

    // it("User can leave their role", async () => {});
    it("Only Admin can remove other admin role", async () => {
        const tx = await adminRegistry.connect(owner).addAdmin(userAddress);

        expect(tx).to.be.revertedWith("You are not a Admin!");
    });

    it("Returns Admin Role Members", async () => {
        const numbOfAdmins = 1;
        const tx = await adminRegistry.connect(owner).getAdminRoleMembers();

        expect(tx).to.deep.equal([numbOfAdmins.toString(), [ownerAddress]]);
    });

    it("Should return Treasury Role Members", async () => {
        const numbOfTreasurer = 1;
        const tx = await adminRegistry.connect(owner).getTreasuryRoleMembers();

        expect(tx).to.deep.equal([
            numbOfTreasurer.toString(),
            [treasuryAddress],
        ]);
    });
});
