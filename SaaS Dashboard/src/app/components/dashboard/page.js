"use client";
import { useState, useEffect } from "react";
import { ThemeContext } from "@/app/context/themeContext";

import Overview from "./content/overview";
import Users from "./content/users";
import Billing from "./content/billing";
import Settings from "./content/settings";
import confetti from 'canvas-confetti';

const pages = {
    overview: <Overview />,
    users: <Users />,
    billing: <Billing />,
    settings: <Settings />,
};

export default function Dashboard() {
    const [activePage, setActivePage] = useState("overview");
    const [darkMode, setDarkMode] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState({});

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        const currentData = JSON.parse(localStorage.getItem("data"));
        if (currentData) {
            setData(currentData);
            return;
        }

        const dataTemplate = {
            billingPlan: "Pro",
            apiQueries: generateRandomNumber(0, 25000),
            reports: generateRandomNumber(0, 100),
            teamMembers: generateRandomNumber(1, 5),
        };

        setData(dataTemplate);
    }, []);

    const getNextBillingPlan = () => {
        const currentBillingPlan = data.billingPlan;
        return currentBillingPlan === "Basic" ? "Pro" : "Enterprise";
    };

    const getNextBillingPlanInfo = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "Unlock 25,000 API Queries & 50 Reports Per Month"
        } else {
            return "Unlock custom Integration and unlimited API queries";
        }
    };

    const saveData = (updatedData) => {
        localStorage.setItem("data", JSON.stringify(updatedData));
    };

    const upgradePlanHandler = (element, chosenPlan) => {
        if (chosenPlan != data.billingPlan) {
            const rect = element.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y, x },
            });

            setData((prev) => {
                const updatedData = { ...prev, billingPlan: chosenPlan};
                saveData(updatedData);
                return updatedData;
            });

            setTimeout(() => window.location.reload(), 300);
        }
    };

    return (
        <ThemeContext.Provider value={darkMode}>
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
                            onClick={() => setActivePage(key)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                activePage === key
                                    ? "bg-purple-900/40 text-green-400 font-medium hover:scale-101"
                                    : "bg-gradient-to-r from-blue-800 to-green-800 text-slate-300 hover:bg-white/5 hover:text-slate-200 hover:scale-101"
                            }`}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                    ))}

                    {data.billingPlan != "Enterprise" ? (
                        <div className="mt-auto pt-4">
                            <div className="border-t border-white/30 mb-4"></div>

                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
                                <h3 className="font-semibold text-sm mb-1">{`Upgrade To ${getNextBillingPlan()}`}</h3>
                                <p className="text-xs text-white/80 mb-3">{getNextBillingPlanInfo()}</p>

                                <button
                                    onClick={(element) => upgradePlanHandler(element.currentTarget, getNextBillingPlan())}
                                    className="w-full bg-white text-purple-600 text-sm font-semibold py-2 rounded-md hover:bg-gray-200 transition"
                                >
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    ) : null}
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
        </ThemeContext.Provider>
    );
}
