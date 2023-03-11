import { appConfig } from "../constants/index";
import { ethers } from "ethers";

const { contracts, environment } = appConfig;
const { alchemyApiKey } = environment;

export class RegistrationContract {
  private readonly provider = new ethers.providers.AlchemyProvider(
    "goerli",
    alchemyApiKey
  );
  private readonly contract: ethers.Contract;
  private readonly address: `0x${string}` | undefined;

  constructor(address: `0x${string}`, abi: any) {
    this.contract = new ethers.Contract(address, abi, this.provider);
    this.address = address;
  }

  async isRegistered(address: `0x${string}` | undefined) {
    try {
      if (!address) {
        throw new Error("Wallet not connected");
      } else {
        const isRegistered = await this.contract.isRegistered(address);
        console.log({
          isRegistered,
        });
        return isRegistered;
      }
    } catch (error) {
      console.log({ isRegisteredError: error });
    }
  }

  async registrationFee() {
    try {
      const registrationFee = await this.contract.registrationFee();
      const registrationFeeInEth = ethers.utils.formatEther(registrationFee);
      console.log({
        registrationFeeInEth,
      });
      return registrationFeeInEth;
    } catch (error) {
      console.log({ registrationFeeError: error });
    }
  }

  async isPaused() {
    try {
      const isPaused = await this.contract.paused();
      console.log({
        isPaused,
      });
      return isPaused;
    } catch (error) {
      console.log({ isPausedError: error });
    }
  }

  async joinIn(signer: ethers.Signer) {
    try {
      const parsedEth = ethers.utils.parseEther(
        (await this.registrationFee()) || "0"
      );
      const success = await this.contract.connect(signer).joinIn({
        value: parsedEth,
      });
      console.log({
        success,
      });
      return success;
    } catch (error) {
      console.log({ joinInError: error });
    }
  }

  async getContractAddress() {
    return this.address;
  }
}
