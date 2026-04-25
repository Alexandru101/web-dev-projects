"use client";
import { createContext, useState, ReactNode } from "react";

export const SectionContext = createContext({
  activeSection: "profile",
  setActiveSection: (_: string) => {},
  darkMode: true,
  setDarkMode: (_: boolean) => {},
});

export function SectionProvider({ children }: { children: ReactNode }) {    
    const [activeSection, setActiveSection] = useState("profile");
    const [darkMode, setDarkMode] = useState(true);

    return (
        <SectionContext.Provider value={{ activeSection, setActiveSection, darkMode, setDarkMode }}>
            {children}
        </SectionContext.Provider>
    );
}
