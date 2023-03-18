import { useAccount } from "wagmi";
import { useState, useEffect, Suspense } from "react";
import { IsWalletConnected } from "./IsWalletConnected";
import { IsWalletDisconnected } from "./IsWalletDisconnected";
import { User } from "../../types/index";
import { ProcessLoading } from "./ProcessLoading";

export const RegistrationProcess = () => {
	const { isConnected, address } = useAccount();
	const [user, setUser] = useState<User | undefined>(undefined);
	const [isUserRegisteredOnDB, setIsUserRegisteredOnDB] = useState(false);

	useEffect(() => {
		if (user) return;
		if (!isConnected) return;
		if (address) {
			fetch(`api/user?address=${address}`)
				.then((data) => data.json())
				.then((data) => {
					if (data.message === "USER_NOT_FOUND") {
						setIsUserRegisteredOnDB(false);
						return data;
					}

					setIsUserRegisteredOnDB(true);
					setUser(data.user);
				});
		}
	});

	return (
		<Suspense fallback={<ProcessLoading />}>
			{isConnected ? (
				<IsWalletConnected
					isUserRegisteredOnDB={isUserRegisteredOnDB}
					setIsUserRegisteredOnDB={setIsUserRegisteredOnDB}
					user={user}
					setUser={setUser}
				/>
			) : (
				<IsWalletDisconnected />
			)}
		</Suspense>
	);
};
