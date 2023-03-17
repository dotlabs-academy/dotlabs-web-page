import { ComponentWithChildren } from "@/types";

export const InputErrorStd = ({ children }: ComponentWithChildren) => {
  return <p className="text-red-400 text-sm max-w-[250px]">{children}</p>;
};
