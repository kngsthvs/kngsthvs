"use client";

import { createContext, useEffect, useState, type Context } from "react";
import { type GetThemeReturn, type PrefersColorScheme } from "../../types";

const Context = createContext<GetThemeReturn>({
  className: "light",
  name: "theme",
  value: "dark",
});

function Provider({
  children,
  theme,
}: React.PropsWithChildren<{
  theme?: GetThemeReturn;
}>) {
  const [className, setClassName] = useState<PrefersColorScheme>("light");

  useEffect(() => {
    document.body.classList.contains("dark") && setClassName("dark");
    document.body.classList.contains("light") && setClassName("light");
  }, []);

  return (
    <Context.Provider
      value={{
        ...theme,
        className: theme?.className ?? className,
        name: "theme",
        value: theme?.value ?? "system",
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const Theme = {
  Context,
  Provider,
};
