import { useAccount,  } from "wagmi";
import { useEffect, useState, useRef, useContext } from "react";
import { useModal } from "connectkit";
import { Guide } from "./Guide";
import { ConnectedButton } from "../buttons/ConnectedButton";
import { RegistrationForm } from "@/components/registrationProcess/Form";
import { IsRegistered } from "./IsRegistered";
import { IsWalletDisconnected } from "./IsWalletDisconnected";
import { IsPaused } from "./IsPaused";
import { IContractContext } from "../../hooks/RegistrationManagerContractContext";
import { ContractContext } from "../../hooks/RegistrationManagerContractContext";

export const RegistrationProcess = () => {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();
  const { isPaused, isRegistered, registrationFee } = useContext(
    ContractContext
  ) as IContractContext;
  const [isAcceptedConditions, setIsAcceptedConditions] = useState(false);

  const RenderIfWalletConnectedAndConditionsAccepted = () => {
    const renderGuide = () => <Guide action={setIsAcceptedConditions} />;

    const renderForm = () => <RegistrationForm />;

    return (
      <div className="flex flex-col gap-5">
        <ConnectedButton action={setOpen} />
        {!isAcceptedConditions && isConnected ? renderGuide() : null}
        {isAcceptedConditions && isConnected ? renderForm() : null}
      </div>
    );
  };

  const RenderIfNotRegistered = () => {
    return (
      <>
        <div className="flex flex-col items-center text-zinc-500">
          <p>- Registration fee -</p>
          <p className="text-2xl">{registrationFee} Goerli ETH</p>
        </div>
        {(() => {
          if (isPaused) return <IsPaused />;
          if (isConnected)
            return <RenderIfWalletConnectedAndConditionsAccepted />;
          return <IsWalletDisconnected />;
        })()}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-5">
      {isRegistered ? <IsRegistered /> : <RenderIfNotRegistered />}
    </div>
  );
};
