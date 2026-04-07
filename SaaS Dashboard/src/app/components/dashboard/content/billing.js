"use client";
import React, { useEffect, useState } from 'react';
import { ThemeContext, useTheme } from '@/app/context/themeContext';
import { CheckCircle, Dice1 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Billing() {
    const darkMode = useTheme();
    const [data, setData] = useState({});
    const [pricePlan, setPricePlan] = useState("monthly");

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

    const saveData = (updatedData) => {
        localStorage.setItem("data", JSON.stringify(updatedData));
    };

    const getMaxApiQueries = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "10000"; // 10k max api queries
        } else if (currentBillingPlan === "Pro") {
            return "25000"; // 25k max api queries
        } else {
            return "Unlimited" // no max apiQueries limit on Enterprise plan eg else
        }
    };

    const getMaxReports = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "25"; // 25 max reports
        } else if (currentBillingPlan === "Pro") {
            return "100"; // 100 max reports
        } else {
            return "Unlimited"; // no max reports limit for Enterprise plan eg else
        }
    };

    const getMaxTeamMembers = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "2"; // 2 max team members for basic plan
        } else if (currentBillingPlan === "Pro") {
            return "5"; // 5 max team members for pro plan
        } else {
            return "10"; // 10 max team members for enterprise plan
        }
    };

    const apiQueriesTextHandler = (element) => {
        const value = element.target.value;

        if (value === "") {
            setData((prev) => {
                const updatedData = { ...prev, apiQueries: 0};
                saveData(updatedData);
                return updatedData;
            });

            return;
        }

        if (isNaN(value)) {
            setData((prev) => {
                const updatedData = { ...prev, apiQueries: prev.apiQueries };
                saveData(updatedData);
                return updatedData;
            });

            return;
        }

        const maxApiQueries = getMaxApiQueries();
        const newApiQueries = maxApiQueries === "Unlimited" ? value : Math.min(Math.max(Number(value), 0), maxApiQueries);
        
        setData((prev) => {
            const updatedData = { ...prev, apiQueries: newApiQueries };
            saveData(updatedData);
            return updatedData;
        });
    };

    const reportsTextHandler = (element) => {
        const value = element.target.value;

        if (value === "") {
            setData((prev) => {
                const updatedData = { ...prev, reports: 0 };
                saveData(updatedData);
                return updatedData;
            });

            return;
        };

        if (isNaN(value)) {
            setData((prev) => {
                const updatedData = { ...prev, reports: prev.reports };
                saveData(updatedData);
                return updatedData;
            });

            return;
        }

        const maxReports = getMaxReports();
        const newTotalReports = maxReports === "Unlimited" ? value : Math.min(Math.max(Number(value), 0), maxReports);

        setData((prev) => {
            const updatedData = { ...prev, reports: newTotalReports };
            saveData(updatedData);
            return updatedData;
        });
    };

    const teamMembersTextHandler = (element) => {
        const value = element.target.value;

        if (value === "") {
            setData((prev) => {
                const updatedData = { ...prev, teamMembers: 0 };
                saveData(updatedData);
                return updatedData;
            });

            return;
        }

        if (isNaN(value)) {
            setData((prev) => {
                const updatedData = { ...prev, teamMembers: prev.teamMembers };
                saveData(updatedData);
                return updatedData;
            });

            return;
        }

        const maxTeamMembers = getMaxTeamMembers();
        const newTeamMembers = Math.min(Math.max(Number(value), 0), maxTeamMembers);

        setData((prev) => {
            const updatedData = { ...prev, teamMembers: newTeamMembers };
            saveData(updatedData);
            return updatedData;
        }); 
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
        <div className={`min-h-screen flex flex-col items-center justify-center pt-10 p-5 gap-5 ${darkMode ? "" : "bg-slate-100"}`}>
            <div className="w-full h-20 flex flex-col p-1 gap-1">
                <span className={`text-4xl ${darkMode ? "text-white" : "text-black"}`}>Billing</span>
                <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Manage your subscription and payment methods</span>
            </div>

            <div className="w-full h-80 flex flex-col p-7 gap-4 border-2 border-gray-600 rounded-2xl bg-gray-900">
                <span className="text-2xl text-white font-bold">Current Plan</span>

                <div className="w-full h-40 flex justify-between items-center border-2 border-blue-500 bg-gradient-to-r from-violet-600 to-violet-500 rounded-xl p-3">
                    <div className="flex flex-col p-1">
                        <span className="text-lg font-bold">{`${data.billingPlan} Plan`}</span>
                        <span>{`${data.billingPlan === "Basic" ? "£25" : data.billingPlan === "Pro" ? "£50" : "£100"} / billed monthly`}</span>
                    </div>

                    <div className="flex flex-col">
                        <span>Next billing date</span>
                        <span className="text-right font-bold">Jan 15, 2026</span>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <div className="w-full flex flex-col border-2 border-gray-800 bg-gray-900 rounded-xl p-2 gap-1">
                        <span className="text-sm text-gray-400">Api Queries Used</span>
                        <div className="flex items-baseline bg-gray-800 rounded-lg px-2 py-1">
                            <input
                                type="text"
                                value={data.apiQueries}
                                className="text-2xl font-bold bg-transparent outline-none w-full min-w-0 text-white"
                                onChange={apiQueriesTextHandler}
                            />
                            <span className="text-2xl font-bold text-gray-400 whitespace-nowrap pl-0.5">{`/ ${getMaxApiQueries()}`}</span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col border-2 border-gray-800 bg-gray-900 rounded-xl p-2 gap-1">
                        <span className="text-sm text-gray-400">Reports Generated</span>
                        <div className="flex items-baseline bg-gray-800 rounded-lg px-2 py-1">
                            <input
                                type="text"
                                value={data.reports}
                                className="text-2xl font-bold bg-transparent outline-none w-full min-w-0 text-white"
                                onChange={reportsTextHandler}
                            />
                            <span className="text-2xl font-bold text-gray-400 whitespace-nowrap pl-0.5">{`/ ${getMaxReports()}`}</span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col border-2 border-gray-800 bg-gray-900 rounded-xl p-2 gap-1">
                        <span className="text-sm text-gray-400">Team Members</span>
                        <div className="flex items-baseline bg-gray-800 rounded-lg px-2 py-1">
                            <input
                                type="text"
                                value={data.teamMembers}
                                className="text-2xl font-bold bg-transparent outline-none w-full min-w-0 text-white"
                                onChange={teamMembersTextHandler}
                            />
                            <span className="text-2xl font-bold text-gray-400 whitespace-nowrap pl-0.5">{`/ ${getMaxTeamMembers()}`}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-full flex flex-col justify-center border-2 border-gray-600 bg-gray-900 rounded-2xl p-2">
                <div className="w-full flex flex-row justify-between p-5 pl-5">
                    <span className="text-2xl font-bold">Upgrade Plan</span>

                    <div className="w-70 h-10 flex flex-row justify-between bg-gray-600 opacity-70 rounded-md p-1">
                        <button
                            onClick={() => setPricePlan("monthly")}
                            className={`w-full cursor-pointer ${pricePlan === "monthly" ? "bg-gray-500" : "bg-gray-600"} rounded-sm`}    
                        >
                                Monthly
                        </button>

                        <button
                            onClick={() => setPricePlan("yearly")}
                            className={`w-full cursor-pointer ${pricePlan === "yearly" ? "bg-gray-500" : "bg-gray-600"} rounded-sm`}
                        >    
                            Yearly
                        </button>
                    </div>
                </div>

                <div className="w-full h-full flex flex-row p-4 gap-5">
                    <div className={`w-full h-full flex flex-col border-2 ${data.billingPlan === "Basic" ? "border-blue-500 bg-blue-950" : "border-gray-600 bg-gray-800"} rounded-xl hover:border-blue-500 p-5`}>
                        {data.billingPlan === "Basic" && (
                            <div className="flex items-center gap-1">              
                                <CheckCircle className="text-blue-500" size={20} />
                                <span className='text-blue-500'>Current Plan</span>
                            </div>
                        )}

                        <div className="flex flex-col p-2 mt-3">
                            <span className="text-xl font-bold">Basic</span>

                            <div className="mt-1">
                                <span className="text-2xl font-bold">{`${pricePlan === "monthly" ? "£25" : "£299"}`}</span>
                                <span className="opacity-55 p-1">{`/${pricePlan}`}</span>
                            </div>
                        </div>

                        <div className="flex flex-col text-sm p-2 gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">10,000 API queries/month</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">25 reports/month</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">2 team members</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">Email Support</span>
                            </div>
                        </div>

                        <button
                            onClick={(element) => upgradePlanHandler(element.currentTarget, "Basic")}
                            className={`${data.billingPlan === "Basic" ? "bg-gray-600 opacity-70" : "bg-blue-500 hover:scale-101 transform transition-transform duration-100 ease-in-out"}
                                        rounded-md mt-30 p-2 cursor-pointer`}
                        >
                            {data.billingPlan === "Basic" ? "Current Plan" : "Ugrade Now"}
                        </button>
                    </div>

                    <div className={`w-full h-full flex flex-col border-2 ${data.billingPlan === "Pro" ? "border-blue-500 bg-blue-950" : "border-gray-600 bg-gray-800"} rounded-xl hover:border-blue-500 p-5`}>
                        {data.billingPlan === "Pro" && (
                            <div className="flex items-center gap-1">              
                                <CheckCircle className="text-blue-500" size={20} />
                                <span className='text-blue-500'>Current Plan</span>
                            </div>
                        )}

                        <div className="flex flex-col p-2 mt-3">
                            <span className="text-xl font-bold">Pro</span>

                            <div className="mt-1">
                                <span className="text-2xl font-bold">{`${pricePlan === "monthly" ? "£50" : "£599"}`}</span>
                                <span className="opacity-55 p-1">{`/${pricePlan}`}</span>
                            </div>
                        </div>

                        <div className="flex flex-col text-sm p-2 gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">25,000 API queries/month</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">50 reports/month</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">5 team members</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">Priority Ticket Support</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">All Features From Basic Plan</span>
                            </div>
                        </div>

                        <button
                            onClick={(element) => upgradePlanHandler(element.currentTarget, "Pro")}
                            className={`${data.billingPlan === "Pro" ? "bg-gray-600 opacity-70" : "bg-blue-500 hover:scale-101 transform transition-transform duration-100 ease-in-out"}
                                        rounded-md mt-30 p-2 cursor-pointer`}
                        >
                            {data.billingPlan === "Pro" ? "Current Plan" : "Ugrade Now"}
                        </button>
                    </div>

                    <div className={`w-full h-full flex flex-col border-2 ${data.billingPlan === "Enterprise" ? "border-blue-500 bg-blue-950" : "border-gray-600 bg-gray-800"} rounded-xl hover:border-blue-500 p-5`}>
                        {data.billingPlan === "Enterprise" && (
                            <div className="flex items-center gap-1">              
                                <CheckCircle className="text-blue-500" size={20} />
                                <span className='text-blue-500'>Current Plan</span>
                            </div>
                        )}

                        <div className="flex flex-col p-2 mt-3">
                            <span className="text-xl font-bold">Enterprise</span>

                            <div className="mt-1">
                                <span className="text-2xl font-bold">{`${pricePlan === "monthly" ? "£100" : "£1199"}`}</span>
                                <span className="opacity-55 p-1">{`/${pricePlan}`}</span>
                            </div>
                        </div>

                        <div className="flex flex-col text-sm p-2 gap-2">
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">Unlimited</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">Unlimited</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">10 team members</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">Custom Integration</span>
                            </div>
            
                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">24/7 Support</span>
                            </div>

                            <div className="flex flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="opacity-55">All Features From Pro Plan</span>
                            </div>
                        </div>

                        <button
                            onClick={(element) => upgradePlanHandler(element.currentTarget, "Enterprise")}
                            className={`${data.billingPlan === "Enterprise" ? "bg-gray-600 opacity-70" : "bg-blue-500 hover:scale-101 transform transition-transform duration-100 ease-in-out"}
                                        rounded-md mt-30 p-2 cursor-pointer`}
                        >
                            {data.billingPlan === "Enterprise" ? "Current Plan" : "Ugrade Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
