import { useContext } from 'react';

import { IContractContext, ContractContext } from '../../hooks/RegistrationManagerContractContext';
import { useSigner } from 'wagmi';

export const ContractPaymentProcess = () => {
    const { data } = useSigner();
    const { contract, setIsJoined, registrationFee } = useContext(ContractContext) as IContractContext;

    const handleJoin = async () => {
        if (data) {
            const res = await contract.joinIn(data)
            if (res) setIsJoined(true);
        }
    }

    return (
        <div className="flex flex-col items-center gap-10">
            <p className="text-xl font-bold text-zinc-600">
                - Current registration fee is <span>{registrationFee}</span> ETH -
            </p>
            <button onClick={handleJoin} className="transition-all text-base font-bold border-2 hover:border-green-300 rounded-md py-1 px-5 max-w-max  bg-zinc-100 hover:bg-green-200 text-zinc-600 shadow-md hover:shadow-green-100">
                Join
            </button>
        </div>
    )
}
