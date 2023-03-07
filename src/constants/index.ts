export const appConfig: AppConfig = {
  contracts: [],
  environment: {
    alchemyApiKey: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_API_KEY || "",
  },
};

interface AppEnvironments {
  alchemyApiKey: string | "";
}

interface Contract {
  abi: string;
  address: `0x${string}`;
}

interface AppConfig {
  contracts: Contract[];
  environment: AppEnvironments;
}
