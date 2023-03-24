import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { RegistrationManager } from "../typechain-types";

describe("RegistrationManager", function () {
	async function deployFixture() {
		const [owner, acc1, acc2, acc3] = await ethers.getSigners();

		const RegistrationManager = await ethers.getContractFactory(
			"RegistrationManager",
		);
		const RMInstance = await upgrades.deployProxy(RegistrationManager);
		await RMInstance.deployed();
		const registrationManager = RMInstance as RegistrationManager;

		return {
			registrationManager,
			owner,
			acc1,
			acc2,
			acc3,
		};
	}

	it("Should deploy correctly", async function () {
		const { registrationManager, owner } = await loadFixture(deployFixture);
		expect(
			await registrationManager.hasRole("0x00", owner.address),
		).to.be.equal(true);
	});
});
