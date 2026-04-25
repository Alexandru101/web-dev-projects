"use client";
import { createContext, useState, ReactNode } from "react";

export const SectionContext = createContext<{
    activeSection: string;
    setActiveSection: (section: string) => void;

    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
}>(null);

export function SectionProvider({ children }: { children: ReactNode }) {    
    const [activeSection, setActiveSection] = useState("profile");
    const [darkMode, setDarkMode] = useState(true);

    return (
        <SectionContext.Provider value={{ activeSection, setActiveSection, darkMode, setDarkMode }}>
            {children}
        </SectionContext.Provider>
    );
}
