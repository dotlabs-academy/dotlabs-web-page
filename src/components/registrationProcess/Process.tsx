import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import { useModal } from "connectkit";
import { Guide } from "./Guide";
import { ConnectedButton } from "../buttons/ConnectedButton";
import { RegistrationForm } from "@/components/registrationProcess/Form";

export const RegistrationProcess = () => {
  const { address, isDisconnected } = useAccount();
  const { setOpen } = useModal();
  const [isConnected, setIsConnected] = useState(false);
  const [isAcceptedConditions, setIsAcceptedConditions] = useState(false);

  useEffect(() => {
    if (!isDisconnected) {
      setIsConnected(!isDisconnected);
    }
  }, [isDisconnected]);

  const renderIfConnected = () => {
    return (
      <div className="flex flex-col gap-5">
        {isConnected && <ConnectedButton action={setOpen} />}
        {!isAcceptedConditions && isConnected && (
          <Guide action={setIsAcceptedConditions} />
        )}
        {isAcceptedConditions && <RegistrationForm />}
      </div>
    );
  };

  const renderIfDisconnected = () => {
    return (
      <>
        <p className="text-2xl font-bold text-zinc-300 font-mono ">
          Please connect your wallet to start
        </p>
        <ConnectKitButton theme="soft" />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-5">
      {isDisconnected ? renderIfDisconnected() : renderIfConnected()}
    </div>
  );
};
