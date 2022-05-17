import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import "./index.css";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.body.classList.add("theme-" + mode);

    return () => {
      document.body.classList.remove("theme-" + mode);
    };
  }, [mode]);

  const cV = { mode, setMode, random: Math.random() };
  console.log(cV);
  return (
    <DarkModeContext.Provider value={cV}>{children}</DarkModeContext.Provider>
  );
}
