"use client";

import React from "react";
import { initialState, ActionType, GlobalReducer } from "./reducer";

export const GlobalContext = React.createContext<
  | {
      state: typeof initialState;
      dispatch: React.Dispatch<ActionType>;
    }
  | undefined
>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch: dispatch as unknown as React.Dispatch<ActionType>,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
