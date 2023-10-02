"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext<{
  height: number;
  setHeight?: React.Dispatch<React.SetStateAction<number>>;
}>({
  height: 0,
});

export function useApp() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useApp must be used within a App");
  }

  return context;
}

export function App({ children }: { children: React.ReactNode }) {
  const [height, setHeight] = useState(0);

  return (
    <Context.Provider
      value={{
        height,
        setHeight,
      }}
    >
      <div>{children}</div>
    </Context.Provider>
  );
}
