import { BigNumber, Contract, Signer, ethers } from "ethers";
import { appConfig } from "../constants/index";

const { alchemyApiKey } = appConfig.environment;

const provider = new ethers.providers.AlchemyProvider("goerli", alchemyApiKey);

export class RegistrationManager {
  private readonly provider: any;
  private readonly contract: Contract;
  private readonly address: `0x${string}`;
  private readonly abi: any;
  constructor(_address: `0x${string}`, _abi: any) {
    this.provider = provider;
    this.address = _address;
    this.abi = _abi;
    this.contract = new ethers.Contract(this.address, this.abi, this.provider);
  }

  async getRegistrationFee(): Promise<BigNumber> {
    const req = await this.contract.registrationFee();
    return req;
  }

  async joinIn(signer: Signer): Promise<boolean> {
    const res = await this.contract
      .connect(signer)
      .joinIn({ value: await this.getRegistrationFee() });
    return res;
  }
}
