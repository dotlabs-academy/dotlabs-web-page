import { AppConfig } from "@/types";
import RegistrationManager from "./contracts/RegistrationManager.sol/RegistrationManager.json";

export const appConfig: AppConfig = {
	contracts: {
		registrationManager: {
			address: "0x8cF3Aa7fA8e5bF2C8cC9B9B9B9B9B9B9B9B9B9B9",
			abi: RegistrationManager.abi,
		},
	},
	environment: {
		alchemyApiKey: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_ALCHEMY_API_KEY || "",
	},
	styles: {
		backgroundGradientColor: "bg-gradient-to-tr from-amber-50 to-blue-50",
		mainGradient: "bg-gradient-to-tr from-main via-main to-orange-dimmed",
		yellowTextGradient:
			"text-transparent bg-clip-text bg-gradient-to-b from-yellow-custom to-orange-dimmed",
	},
	branding: {
		feedbackForm: "https://forms.gle/2f5TVG5wPuSHwAKU6",
	},
};
