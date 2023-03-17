import { RegistrationForm } from "./Form";
import { Guide } from "./Guide";
import { useState } from "react";
export interface IRegistrationProcessProps {
  isUserRegisteredOnDB: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsUserRegisteredOnDB: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsWalletConnected = ({
  isUserRegisteredOnDB,
  user,
  setUser,
  setIsUserRegisteredOnDB,
}: IRegistrationProcessProps) => {
  const [isConditionsAccepted, setIsConditionsAccepted] = useState(false);

  if (isConditionsAccepted) {
    return (
      <RegistrationForm
        setUser={setUser}
        setIsUserRegisteredOnDB={setIsUserRegisteredOnDB}
      />
    );
  }

  if (!isUserRegisteredOnDB) {
    return <Guide action={setIsConditionsAccepted} />;
  }

  return <div>User registered on DB. Pay fee.</div>;
};
