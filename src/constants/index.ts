import { registrationManagerAbi } from "./registrationManagerAbi";

export const appConfig: AppConfig = {
  contracts: {
    registrationManager: {
      address: "0x04E478e076A5dFb43515071e15dCe21b9c9C2e13",
      abi: registrationManagerAbi,
    },
  },
  environment: {
    alchemyApiKey: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_API_KEY || "",
  },
};

interface AppEnvironments {
  alchemyApiKey: string | "";
}

interface AppConfig {
  contracts: {
    registrationManager: {
      address: `0x${string}`;
      abi: any;
    };
  };
  environment: AppEnvironments;
}
