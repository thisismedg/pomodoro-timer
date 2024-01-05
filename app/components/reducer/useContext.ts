import React from "react";
import { GlobalContext } from "./context";
export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }
  return context;
};
