import { Guide } from "./Guide";
import { Suspense } from "react";
import { User } from "../../types/index";
import { UserIsRegisteredOnDb } from "./UserIsRegisteredOnDb";

export interface IRegistrationProcessProps {
	isUserRegisteredOnDB: boolean;
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	setIsUserRegisteredOnDB: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsWalletConnected = ({
	isUserRegisteredOnDB,
	setUser,
	setIsUserRegisteredOnDB,
	user,
}: IRegistrationProcessProps) => {
	return (
		<Suspense>
			{isUserRegisteredOnDB ? (
				<UserIsRegisteredOnDb userName={user?.name} />
			) : (
				<Guide setUser={setUser} setIsUserRegisteredOnDB={setIsUserRegisteredOnDB} />
			)}
		</Suspense>
	);
};
