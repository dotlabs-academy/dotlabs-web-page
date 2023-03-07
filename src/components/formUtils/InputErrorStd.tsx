import { ComponentWithChildren } from "@/types";

export const InputErrorStd = ({ children }: ComponentWithChildren) => {
  return <p className="text-red-400">{children}</p>;
};
