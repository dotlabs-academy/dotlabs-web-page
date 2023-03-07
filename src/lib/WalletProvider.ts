import { createClient } from "wagmi";
import { appConfig } from "../constants/index";
import { getDefaultClient } from "connectkit";
import { goerli } from "wagmi/chains";

const { alchemyApiKey } = appConfig.environment;

const chains = [goerli];

export const client = createClient(
  getDefaultClient({
    appName: "dotlabs()",
    alchemyId: alchemyApiKey,
    chains,
  })
);
