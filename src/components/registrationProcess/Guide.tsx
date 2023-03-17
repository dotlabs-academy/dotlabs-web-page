import {
  ComponentWithBooleanAction,
  ComponentWithChildren,
} from "../../types/index";

const DarkerText = ({ children }: ComponentWithChildren) => (
  <span className="text-zinc-800">{children}</span>
);

export const Guide = ({ action }: ComponentWithBooleanAction) => {
  return (
    <div className="flex flex-col font- font-mono gap-5">
      <p>There are some many things you need to know before.</p>
      <ul className="flex flex-col gap-2">
        <li>
          You need to pay the <DarkerText>registration fee</DarkerText> (see it
          above) to sign your participation.{" "}
          <DarkerText>You also need enough funds to pay the gas fee</DarkerText>
          .
        </li>
        <li>
          You will get back the registration fee when you proof your presence in
          the workshop{" "}
          <DarkerText>-Our team will assurance your attendance-</DarkerText>
        </li>
      </ul>
      <button
        onClick={() => action(true)}
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
