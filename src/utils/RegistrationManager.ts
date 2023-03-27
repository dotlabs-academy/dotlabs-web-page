import { appConfig } from "../constants/index";
import { ContractInterface, ethers } from "ethers";

const { environment } = appConfig;
const { alchemyApiKey } = environment;

export class RegistrationContract {
	private readonly provider = new ethers.providers.AlchemyProvider(
		"maticmum",
		alchemyApiKey,
	);
	private readonly contract: ethers.Contract;
	private readonly address: `0x${string}` | undefined;

	constructor(address: `0x${string}`, abi: ContractInterface) {
		this.contract = new ethers.Contract(address, abi, this.provider);
		this.address = address;
	}

	async isJoined(address: `0x${string}`): Promise<boolean | undefined> {
		try {
			const isJoined = await this.contract.isJoined(address);
			return isJoined;
		} catch (error) {
			console.error({ isConfirmedError: error });
			return false;
		}
	}

	async isConfirmed(
		address: `0x${string}` | undefined,
	): Promise<boolean | undefined> {
		try {
			const isConfirmed = await this.contract.isConfirmed(address);

			return isConfirmed;
		} catch (error) {
			console.error({ isConfirmedError: error });
			return false;
		}
	}

	async registrationFee() {
		try {
			const registrationFee = await this.contract.registrationFee();
			const registrationFeeInEth = ethers.utils.formatEther(registrationFee);

			return registrationFeeInEth;
		} catch (error) {
			console.error("registrationFeeError: ", error);
		}
	}

	async updatedRegistrationFee(
		signer: ethers.Signer,
		newFee: string,
	): Promise<boolean | undefined> {
		try {
			const tx = await this.contract.updateRegistrationFee(
				ethers.utils.parseEther(newFee),
				{ signer },
			);
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("updatedRegistrationFeeError: ", error);
		}
	}

	async joinIn(signer: ethers.Signer): Promise<boolean | undefined> {
		try {
			const currentFee = (await this.registrationFee()) as string;
			if (!currentFee) return false;
			const tx = await this.contract.connect(signer).joinIn({
				value: ethers.utils.parseEther(currentFee),
			});
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("joinInError: ", error);
		}
	}

	async confirmUserQuota(address: `0x${string}`) {
		try {
			const tx = await this.contract.confirmUserQuota(address);
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("confirmUserQuotaError", error);
		}
	}

	async confirmUserQuotaBatch(addresses: `0x${string}`[]) {
		try {
			const tx = await this.contract.confirmUserQuota(addresses);
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("confirmUserQuotaBatchError", error);
		}
	}

	async reset() {
		try {
			const tx = await this.contract.reset();
			await tx.wait();
		} catch (error) {
			console.error("resetError", error);
		}
	}

	async refundFee(address: `0x${string}`) {
		try {
			const tx = await this.contract.refundFee(address);
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("refundFeeError", error);
		}
	}

	async refundFeeBatch(addresses: `0x${string}`[]) {
		try {
			const tx = await this.contract.refundFeeBatch(addresses);
			const success = await tx.wait();
			return success;
		} catch (error) {
			console.error("refundFeeBatchError", error);
		}
	}

	async getJoinedUsers(): Promise<`0x${string}`[] | undefined> {
		try {
			const users = await this.contract.getJoinedUsers();
			return users;
		} catch (error) {
			console.error("getAllUsersError", error);
		}
	}

	async pause(signer: ethers.Signer) {
		try {
			const tx = await this.contract.connect(signer).pause();
			await tx.wait();
		} catch (error) {
			console.error("pauseError", error);
		}
	}

	async unpause(signer: ethers.Signer) {
		try {
			const tx = await this.contract.connect(signer).unpause();
			await tx.wait();
		} catch (error) {
			console.error("unpauseError", error);
		}
	}

	async isPaused() {
		try {
			const isPaused = await this.contract.paused();

			return isPaused;
		} catch (error) {
			console.error("isPausedError", error);
		}
	}

	async getContractAddress() {
		return this.address;
	}
}
