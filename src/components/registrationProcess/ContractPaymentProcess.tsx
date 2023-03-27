import { useContext, useState } from "react";

import { useSigner } from "wagmi";
import { BiLoaderAlt } from "react-icons/bi";

import {
  IContractContext,
  ContractContext,
} from "../../hooks/RegistrationManagerContractContext";

export const ContractPaymentProcess = () => {
  const { data } = useSigner();
  const { contract, setIsJoined, registrationFee } = useContext(
    ContractContext
  ) as IContractContext;
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    if (data) {
      setIsLoading(true);
      const res = await contract.joinIn(data);
      setIsLoading(false);
      if (res) setIsJoined(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <p className="text-xl font-bold text-zinc-600">
        - El <span className="italic">fee</span> actual es:{" "}
        <span>{registrationFee}</span> MATIC -
      </p>
      <button
        onClick={handleJoin}
        className="transition-all text-base font-bold border-2 hover:border-green-300 rounded-md py-1 px-5 max-w-max  bg-zinc-100 hover:bg-green-200 text-zinc-600 shadow-md hover:shadow-green-100"
      >
        {isLoading ? (
          <BiLoaderAlt className="animate-spin mx-auto" />
        ) : (
          <>Unirme</>
        )}
      </button>
    </div>
  );
};
