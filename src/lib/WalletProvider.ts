import { createClient } from "wagmi";
import { appConfig } from "../constants";
import { getDefaultClient } from "connectkit";
import { polygonMumbai } from "wagmi/chains";

const { alchemyApiKey } = appConfig.environment;

const chains = [polygonMumbai];

export const client = createClient(
	getDefaultClient({
		appName: "dotlabs()",
		alchemyId: alchemyApiKey,
		chains,
	}),
);
