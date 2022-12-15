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
        expect(await adminRegistry.connect(owner).isAdmin(ownerAddress)).to.be
            .true;
    });

    it("Should Check user is a Treasurer", async () => {
        expect(await adminRegistry.connect(owner).isTreasury(treasuryAddress))
            .to.be.true;
    });
    it("Should only admin can add new admin", async () => {
        expect(
            await adminRegistry.connect(owner).addAdmin(user2Address)
        ).to.be.revertedWith("You are not a Admin!");
    });
    // it("User can leave their role", async () => {});
    it("Only Admin can remove other admin role", async () => {
        const tx = await adminRegistry.connect(owner).addAdmin(userAddress);
        expect(
            await adminRegistry.connect(owner).removeAdmin(userAddress)
        ).to.be.revertedWith("You are not a Admin!");
    });
    it("Returns Admin Role Members", async () => {
        const numbOfAdmins = 1;

        assert.equal(await adminRegistry.connect(owner).getAdminRoleMembers(), [
            numbOfAdmins.toString(),
            [ownerAddress],
        ]);
    });
    it("Should return Treasury Role Members", async () => {
        const numbOfTreasurer = 1;
        console.log(numbOfTreasurer)
        assert.equal(
            await adminRegistry.connect(owner).getTreasuryRoleMembers(),
            [1, [treasuryAddress]]
        );
    });
});
