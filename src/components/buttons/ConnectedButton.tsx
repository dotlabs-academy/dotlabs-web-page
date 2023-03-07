import { GoPrimitiveDot } from "react-icons/go";
import { ComponentWithBooleanAction } from "../../types/index";

interface Props {
  action: (show: boolean) => void;
}

export const ConnectedButton = ({ action }: Props) => {
  return (
    <button
      onClick={() => action(true)}
      className="
          flex items-center justify-center gap-2 max-w-[200px] border-2 border-zinc-300 text-zinc-400 rounded-md px-3 py-0.5
          hover:shadow-md transition-all mx-auto
          "
    >
      <GoPrimitiveDot className="text-green-300 animate-pulse" />
      Connected
    </button>
  );
};
