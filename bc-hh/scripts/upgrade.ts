import { ethers, upgrades } from "hardhat";

// TO DO: Place the address of your proxy here!
const proxyAddress = "";

async function main() {
	const RegistrationManager = await ethers.getContractFactory(
		"RegistrationManager",
	);
	const upgraded = await upgrades.upgradeProxy(
		proxyAddress,
		RegistrationManager,
	);

	const implementationAddress = await upgrades.erc1967.getImplementationAddress(
		proxyAddress,
	);

	console.log(`The current contract owner is: ${upgraded.owner()}`);
	console.log(`Implementation contract address: ${implementationAddress}`);
}

main();
