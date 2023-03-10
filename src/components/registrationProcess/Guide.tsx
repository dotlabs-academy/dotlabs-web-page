import { ComponentWithBooleanAction } from "../../types/index";

export const Guide = ({ action }: ComponentWithBooleanAction) => {
  const darkerText = (text: string) => (
    <span className="text-zinc-500">{text}</span>
  );
  return (
    <div className="flex flex-col font-bold text-zinc-400 font-mono gap-5">
      <p>There are some many things you need to know before.</p>
      <ul className="flex flex-col gap-2">
        <li>
          You need at least {darkerText(" 0.15 Goerli ETH")} to register your
          participation.
          {darkerText(" 0.1 Goerli ETH")} to pay the registration fee and{" "}
          {darkerText(" 0.05 Goerli ETH")} to pay the gas fee without problems.
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
