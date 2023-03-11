import { useContractRead } from "wagmi";
import { ComponentWithBooleanAction } from "../../types/index";
import { appConfig } from "../../constants/index";
import { BigNumber, ethers } from "ethers";
import { useRef, useEffect } from "react";

export const Guide = ({ action }: ComponentWithBooleanAction) => {
  const darkerText = (text: string) => (
    <span className="text-zinc-500">{text}</span>
  );
  return (
    <div className="flex flex-col font-bold text-zinc-400 font-mono gap-5">
      <p>There are some many things you need to know before.</p>
      <ul className="flex flex-col gap-2">
        <li>
          You need to pay the {darkerText(" registration fee ")} (see it above)
          to sign your participation.{" "}
          {darkerText(" You also need enough funds to pay the gas fee")}.
        </li>
        <li>
          You will get back the registration fee when you proof your presence in
          the workshop{" "}
          {darkerText(" -Our team will assurance your attendance-")}
        </li>
      </ul>
      <button
        onClick={() => action(true)}
        className="
            w-full mx-auto transition-all border-2 rounded-md p-1 
            border-zinc-300 text-zinc-300 shadow-sm
            hover:border-green-400 hover:text-green-400 hover:shadow-md 
        "
      >
        It&apos;s ok for me.
      </button>
    </div>
  );
};
