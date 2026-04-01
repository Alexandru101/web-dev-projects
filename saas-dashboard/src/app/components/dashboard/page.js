"use client";
import { useState } from "react";
import Overview from "./content/overview";
import Users from "./content/users";
import Settings from "./content/settings";

const pages = {
    overview: <Overview />,
    users: <Users />,
    settings: <Settings />,
};

export default function Dashboard() {
    const [activePage, setActivePage] = useState("overview");
    const [darkMode, setDarkMode] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <aside className={`fixed md:static top-0 left-0 h-full z-50 w-64 p-3 flex flex-col 
                            bg-gradient-to-r from-[#0f517e] to-green-900 gap-1
                            transform transition-transform duration-300
                            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >

                <div className="flex items-center justify-between border-b-2 border-white/30 mb-4 pb-2">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-white text-xl"
                    >
                        ✕
                    </button>

                    <h2 className="text-lg font-semibold text-white text-center">Navigation</h2>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-white/60 hover:text-white text-sm transition-colors w-6"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>
                {Object.keys(pages).map((key) => (
                    <button
                        key={key}
                        onClick={() =>setActivePage(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activePage === key
                                ? "bg-purple-900/40 text-green-400 font-medium hover:scale-101"
                                : "bg-gradient-to-r from-blue-800 to-green-800 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:scale-101"
                        }`}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </aside>

            <main className={`flex-1 p-1 overflow-auto transition-colors duration-200 ${
                darkMode ? "bg-slate-800" : "bg-slate-100"
            }`}>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden px-3 py-2 bg-blue-900 text-white rounded"
                >
                    ☰
                </button>

                {pages[activePage]}
            </main>
        </div>
    );
}