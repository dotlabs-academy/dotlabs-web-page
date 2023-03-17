import { useAccount } from "wagmi";
import { useState, useContext, useEffect, Suspense } from "react";
import { useModal, ConnectKitButton } from "connectkit";
import { Guide } from "./Guide";
import { RegistrationForm } from "@/components/registrationProcess/Form";
import { IsWalletDisconnected } from "./IsWalletDisconnected";
import { IContractContext } from "../../hooks/RegistrationManagerContractContext";
import { ContractContext } from "../../hooks/RegistrationManagerContractContext";
import { IsWalletConnected } from "./IsWalletConnected";

export const RegistrationProcess = () => {
  const { isConnected, address } = useAccount();
  const [user, setUser] = useState<any>(undefined);
  const [isUserRegisteredOnDB, setIsUserRegisteredOnDB] = useState(false);

  const getUserData = async () => {
    if (address) {
      const user = await fetch(`api/user?address=${address}`);
      const userData = await user.json();
      console.log({ userData });

      if (userData.message === "USER_NOT_FOUND") {
        setIsUserRegisteredOnDB(false);
        return;
      }

      console.log({ userData });
    }
  };

  useEffect(() => {
    if (address) {
      getUserData();
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return <IsWalletDisconnected />;
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
