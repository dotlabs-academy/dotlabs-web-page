import { Suspense, useContext } from "react";

import {
  ContractContext,
  IContractContext,
} from "../../hooks/RegistrationManagerContractContext";
import { UserIsJoined } from "./UserIsJoined";
import { ProcessLoading } from "./ProcessLoading";
import { UserIsConfirmed } from "./UserIsConfirmed";
import { ContractPaymentProcess } from "./ContractPaymentProcess";

export const UserIsRegisteredOnDb = ({
  userName,
}: {
  userName: string | undefined;
}) => {
  const { isJoined, isConfirmed } = useContext(
    ContractContext
  ) as IContractContext;

  return (
    <div className="text-xl md:text-2xl">
      <p className="text-2xl md:text-3xl font-bold">
        Hola {userName ? userName : ""} 👋
      </p>
      <div className="mt-5">
        <Suspense fallback={<ProcessLoading />}>
          {isConfirmed && <UserIsConfirmed />}
          {isJoined && <UserIsJoined />}
          {!(isConfirmed || isJoined) && <ContractPaymentProcess />}
        </Suspense>
      </div>
    </div>
  );
};
