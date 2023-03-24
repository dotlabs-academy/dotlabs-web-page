import { ethers, upgrades } from "hardhat";

async function main() {
	// Deploying
	const RegistrationManager = await ethers.getContractFactory(
		"RegistrationManager",
	);
	const proxy = await upgrades.deployProxy(RegistrationManager);
	await proxy.deployed();

	const implementationAddress = await upgrades.erc1967.getImplementationAddress(
		proxy.address,
	);

	console.log(`Proxy contract address: ${proxy.address}`);
	console.log(`Implementation contract address: ${implementationAddress}`);
}

main();
