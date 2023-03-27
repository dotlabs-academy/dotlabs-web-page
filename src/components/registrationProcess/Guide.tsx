import { useState, useContext, Suspense } from "react";
import { RegistrationForm } from "./Form";
import { ComponentWithChildren, User } from "../../types/index";
import { ContractContext } from "@/hooks/RegistrationManagerContractContext";
import { IContractContext } from "../../hooks/RegistrationManagerContractContext";
import { ProcessLoading } from "./ProcessLoading";
import styles from "@/styles/components/registration/guide.module.scss";

const DarkerText = ({ children }: ComponentWithChildren) => (
  <span className="text-main">{children}</span>
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
      <div className="flex flex-col  gap-5">
        <h1 className="text-xl md:text-2xl font-bold text-black text-center">
          - <span className="italic">Fee</span> de registro: {registrationFee} -
        </h1>
        <p>Hay algunas cosas que queremos contarte.</p>
        <ul className="flex flex-col gap-2">
          <li>
            Para participar en el workshop, debes pagar el{" "}
            <DarkerText>fee de registro</DarkerText> (ver arriba).{" "}
            <DarkerText>
              También necesitas tener suficientes fondos para pagar el gas que
              consuma la transacción
            </DarkerText>
            .
          </li>
          <li>
            Te devolveremos el <DarkerText>fee de registro</DarkerText> cuando
            pruebes tu asistencia en el taller{" "}
            <DarkerText>-Nuestro equipo se asegurará tu asistencia-</DarkerText>
          </li>
        </ul>
        <button
          onClick={() => setIsConditionsAccepted(true)}
          className={`${styles.guide__button} ${styles.commonButton}`}
        >
          Está bien, quiero participar.
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
