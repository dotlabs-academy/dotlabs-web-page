import { useState, useContext, Suspense } from "react";
import { RegistrationForm } from "./Form";
import { ComponentWithChildren, User } from "../../types/index";
import { ContractContext } from "@/hooks/RegistrationManagerContractContext";
import { IContractContext } from "../../hooks/RegistrationManagerContractContext";
import { ProcessLoading } from "./ProcessLoading";

const DarkerText = ({ children }: ComponentWithChildren) => (
  <span className="text-zinc-800">{children}</span>
);

interface IGuideProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsUserRegisteredOnDB: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Guide = ({ setIsUserRegisteredOnDB, setUser }: IGuideProps) => {
  const { registrationFee } = useContext(ContractContext) as IContractContext;
  const [isConditionsAccepted, setIsConditionsAccepted] = useState(false);

  const ConditionsNotAccepted = () => {
    return (
      <div className="flex flex-col font- font-mono gap-5">
        <h1 className="text-xl md:text-2xl text-zinc-400 text-center">
          - Registration fee: {registrationFee} -
        </h1>
        <p>There are some many things you need to know before.</p>
        <ul className="flex flex-col gap-2">
          <li>
            You need to pay the <DarkerText>registration fee</DarkerText> (see
            it above) to sign your participation.{" "}
            <DarkerText>
              You also need enough funds to pay the gas fee
            </DarkerText>
            .
          </li>
          <li>
            You will get back the registration fee when you proof your presence
            in the workshop{" "}
            <DarkerText>-Our team will assurance your attendance-</DarkerText>
          </li>
        </ul>
        <button
          onClick={() => setIsConditionsAccepted(true)}
          className="
            w-full mx-auto transition-all border-2 rounded-md p-1 
            border-zinc-400 text-zinc-300 shadow-sm
            hover:border-green-400 hover:text-green-400 hover:shadow-md 
        "
        >
          It&apos;s ok for me.
        </button>
      </div>
    );
  };

  return (
    <Suspense fallback={<ProcessLoading />}>
      {isConditionsAccepted ? (
        <RegistrationForm
          setUser={setUser}
          setIsUserRegisteredOnDB={setIsUserRegisteredOnDB}
        />
      ) : (
        <ConditionsNotAccepted />
      )}
    </Suspense>
  );
};
