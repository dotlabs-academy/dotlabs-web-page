import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import { useModal } from "connectkit";
import { Guide } from "./Guide";
import { ConnectedButton } from "../buttons/ConnectedButton";
import { RegistrationForm } from "@/components/registrationProcess/Form";

export const RegistrationProcess = () => {
  const { address, isDisconnected, isConnecting, isConnected, isReconnecting } =
    useAccount();
  const { setOpen } = useModal();
  const [isAcceptedConditions, setIsAcceptedConditions] = useState(false);

  useEffect(() => {}, [isDisconnected]);

  const renderIfWalletConnected = () => {
    const renderGuide = () => {
      if (!isAcceptedConditions && isConnected)
        return <Guide action={setIsAcceptedConditions} />;

      return null;
    };

    const renderForm = () => {
      if (isAcceptedConditions && isConnected) return <RegistrationForm />;
      return null;
    };

    return (
      <div className="flex flex-col gap-5">
        <ConnectedButton action={setOpen} />
        {renderGuide()}
        {renderForm()}
      </div>
    );
  };

  const renderIfWalletDisconnected = () => {
    return (
      <>
        <p className="text-2xl font-bold text-zinc-400  ">
          Please connect your wallet to start
        </p>
        <ConnectKitButton theme="retro" />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-5">
      {isDisconnected || isConnecting || isReconnecting
        ? renderIfWalletDisconnected()
        : renderIfWalletConnected()}
    </div>
  );
};
