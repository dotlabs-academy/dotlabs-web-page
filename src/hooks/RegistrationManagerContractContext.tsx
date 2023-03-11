import { createContext, useEffect, useReducer, useState } from "react";
import { ComponentWithChildren } from "../types/index";
import { useAccount } from "wagmi";
import { appConfig } from "../constants/index";
import { ethers } from "ethers";
import { RegistrationContract } from "../lib/RegistrationManager";

const { registrationManager } = appConfig.contracts;

export interface IContractContext {
  isRegistered: boolean;
  address: `0x${string}` | undefined;
  registrationFee: string | undefined;
  isPaused: boolean;
  contract: RegistrationContract;
}

export const ContractContext = createContext<IContractContext | null>(null);

export const RegistrationManagerContractContext = ({
  children,
}: ComponentWithChildren) => {
  const { address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationFee, setRegistrationFee] = useState<string | undefined>(
    ""
  );
  const [isPaused, setIsPaused] = useState(false);

  const registrationContract = new RegistrationContract(
    registrationManager.address,
    registrationManager.abi
  );

  useEffect(() => {
    const fetchIsRegistered = async () => {
      const isRegistered = await registrationContract.isRegistered(address);
      setIsRegistered(isRegistered);
    };
    fetchIsRegistered();
  });

  useEffect(() => {
    const fetchRegistrationFee = async () => {
      const registrationFee = await registrationContract.registrationFee();
      setRegistrationFee(registrationFee);
    };
    fetchRegistrationFee();
  });

  useEffect(() => {
    const fetchIsPaused = async () => {
      const isPaused = await registrationContract.isPaused();
      setIsPaused(isPaused);
    };
    fetchIsPaused();
  });

  const values: IContractContext = {
    isRegistered,
    address,
    registrationFee,
    isPaused,
    contract: registrationContract,
  };

  return (
    <ContractContext.Provider value={values}>
      {children}
    </ContractContext.Provider>
  );
};
