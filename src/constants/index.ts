import {
	registrationManagerMetadata,
	ABI,
} from "./registrationManager/registrationManagerMetada";

export const appConfig: AppConfig = {
	contracts: {
		registrationManager: {
			address: registrationManagerMetadata.address,
			abi: registrationManagerMetadata.abi,
		},
	},
	environment: {
		alchemyApiKey: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_ALCHEMY_API_KEY || "",
	},
};

interface AppEnvironments {
	alchemyApiKey: string | "";
}

interface AppConfig {
	contracts: {
		registrationManager: {
			address: `0x${string}`;
			abi: ABI[];
		};
	};
	environment: AppEnvironments;
}
