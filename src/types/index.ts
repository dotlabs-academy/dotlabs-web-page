import { Dispatch, SetStateAction } from "react";
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithBooleanAction {
  action: Dispatch<SetStateAction<boolean>>;
}
