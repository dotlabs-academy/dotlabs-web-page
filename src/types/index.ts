import { Dispatch, SetStateAction } from "react";
import { ABI } from '../constants/registrationManager/registrationManagerMetada';
export interface ComponentWithChildren {
	children: React.ReactNode;
}

export interface ComponentWithBooleanAction {
	action: Dispatch<SetStateAction<boolean>>;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	legalID: string;
	address: string;
	eps: string;
	phone: string;
	gitHubProfile: string;
	createdAt: string;
	updatedAt: string;
}

interface AppEnvironments {
	alchemyApiKey: string | "";
}

export interface AppConfig {
	contracts: {
		registrationManager: {
			address: `0x${string}`;
			abi: ABI[];
		};
	};
	environment: AppEnvironments;
	styles: {
		backgroundGradientColor: string;
		mainGradient: string;
		yellowTextGradient: string;
	},
	branding: {
		feedbackForm: string;
	}
}