import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { IsWalletConnected } from "./IsWalletConnected";
import { IsWalletDisconnected } from "./IsWalletDisconnected";
import { UserIsRegisteredOnDb } from "./UserIsRegisteredOnDb";

export const RegistrationProcess = () => {
  const { isConnected, address } = useAccount();
  const [user, setUser] = useState<any>(undefined);
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
  }, [isConnected, address, user]);

  if (!isConnected) {
    return <IsWalletDisconnected />;
  }

  if (user) {
    return <UserIsRegisteredOnDb userName={user.name} />;
  }

  return (
    <IsWalletConnected
      isUserRegisteredOnDB={isUserRegisteredOnDB}
      setIsUserRegisteredOnDB={setIsUserRegisteredOnDB}
      user={user}
      setUser={setUser}
    />
  );
};
