import React, { createContext, useState } from "react";

export const HighlightedContext = createContext();

export const HighlightedProvider = ({ children }) => {
  const [highlighted, setHighlighted] = useState("");
  return (
    <HighlightedContext.Provider value={{ highlighted, setHighlighted }}>
      {children}
    </HighlightedContext.Provider>
  );
};
