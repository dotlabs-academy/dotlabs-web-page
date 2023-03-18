import { createContext, useEffect, useState } from "react";
import { ComponentWithChildren } from "../types/index";
import { useAccount } from "wagmi";
import { appConfig } from "../constants/index";
import { RegistrationContract } from "../utils/RegistrationManager";

const { registrationManager } = appConfig.contracts;

export interface IContractContext {
  isJoined: boolean;
  isConfirmed: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isJoined, setIsJoined] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [registrationFee, setRegistrationFee] = useState<string | undefined>(
    ""
  );
  const [isPaused, setIsPaused] = useState(false);

  const registrationContract = new RegistrationContract(
    registrationManager.address,
    registrationManager.abi
  );

  const values: IContractContext = {
    isJoined,
    isConfirmed,
    setIsJoined,
    address,
    registrationFee,
    isPaused,
    contract: registrationContract,
  };

  const fetchJoinStatus = async () => {
    if (address) {
      const _isJoined = await registrationContract.isJoined(address);
      if (_isJoined) return setIsJoined(true);
      setIsJoined(false);
    }
  };
  useEffect(() => {
    fetchJoinStatus();
  });

  const fetchConfirmStatus = async () => {
    if (address) {
      const _isConfirmed = await registrationContract.isConfirmed(address);
      if (_isConfirmed) return setIsConfirmed(true);
      setIsConfirmed(false);
    }
  };
  useEffect(() => {
    fetchConfirmStatus();
  });

  const fetchRegistrationFee = async () => {
    const _registrationFee = await registrationContract.registrationFee();
    setRegistrationFee(_registrationFee);
  };
  useEffect(() => {
    fetchRegistrationFee();
  });

  return (
    <ContractContext.Provider value={values}>
      {children}
    </ContractContext.Provider>
  );
};
