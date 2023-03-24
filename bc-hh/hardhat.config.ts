import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";
import "solidity-coverage";

import dotenv from "dotenv";
dotenv.config();

const mumbaiApiKey = process.env.MUMBAI_RPC_URL;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const privKey = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
	solidity: "0.8.16",
	defaultNetwork: "localhost",
	networks: {
		polygonMumbai: {
			url: mumbaiApiKey,
			accounts: [privKey],
		},
	},
	etherscan: {
		apiKey: etherscanApiKey,
	},
	abiExporter: {
		path: "../src/constants/contracts",
		pretty: true,
		clear: true,
		only: ["RegistrationManager"],
		runOnCompile: true,
	},
};

export default config;
