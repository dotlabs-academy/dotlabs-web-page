import fs from "fs";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-preprocessor";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";
import "solidity-coverage";

import dotenv from "dotenv";
dotenv.config();

const mumbaiApiKey = process.env.MUMBAI_RPC_URL;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
const privKey = process.env.PRIVATE_KEY || "";

function getRemappings() {
	return fs
		.readFileSync("remappings.txt", "utf8")
		.split("\n")
		.filter(Boolean)
		.map((line) => line.trim().split("="));
}

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
	preprocess: {
		eachLine: (hre) => ({
			transform: (line: string) => {
				if (line.match(/^\s*import /i)) {
					for (const [from, to] of getRemappings()) {
						if (line.includes(from)) {
							line = line.replace(from, to);
							break;
						}
					}
				}
				return line;
			},
		}),
	},
	paths: {
		sources: "./src",
		cache: "./cache_hardhat",
	},
};

export default config;
