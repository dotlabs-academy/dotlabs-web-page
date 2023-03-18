import { Dispatch, SetStateAction } from "react";
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
