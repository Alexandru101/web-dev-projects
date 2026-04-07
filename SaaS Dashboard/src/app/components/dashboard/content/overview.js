"use client";
import { ThemeContext, useTheme } from '@/app/context/themeContext';
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { Search, BarChart, Users, CreditCard} from 'lucide-react';

// Chart.js Utilities //
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler,
    Colors
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
);

function OverviewInner() {
    const darkMode = useTheme();
    const { data: session} = useSession();
    const [username, setUsername] = useState('');
    const [data, setData] = useState({});
    const [users, setUsers] = useState([]);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        setUsername(session?.user?.name || "");

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
    }, [session]);

    const formatNumber = (num) => {
        return Intl.NumberFormat().format(num);
    };

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        if (storedUsers && storedUsers.length > 0) {
            setUsers(storedUsers);
            return;
        }

        const minUsers = 0;
        const maxUsers = 20;
        let userCount = generateRandomNumber(minUsers, maxUsers);
        if (!userCount) userCount = 10;

        const generatedUsers = Array.from({ length: userCount }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            clicks: generateRandomNumber(0, 100),
        }));

        setUsers(generatedUsers);
    }, []);

    const getMaxApiQueries = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "10000";
        } else if (currentBillingPlan === "Pro") {
            return "25000";
        } else {
            return "Unlimited";
        }
    };

    const getMaxReports = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "25";
        } else if (currentBillingPlan === "Pro") {
            return "100";
        }  else {
            return "Unlimited";
        }
    };

    const getMaxTeamMembers = () => {
        const currentBillingPlan = data.billingPlan;
        if (currentBillingPlan === "Basic") {
            return "2";
        } else if (currentBillingPlan === "Pro") {
            return "5";
        } else {
            return "10";
        }
    };

    const calculateAPIUsage = () => {
        const maxApiQueries = getMaxApiQueries();
        if (maxApiQueries === "Unlimited") return 0;

        return (data.apiQueries / Number(maxApiQueries) * 100);
    };

    const calculateReportsUsage = () => {
        const maxReports = getMaxReports();
        if (maxReports === "Unlimited") return 0;

        return (data.reports / Number(maxReports) * 100);
    };

    const calculateTeamMembersUsage = () => {
        const maxMembers = getMaxTeamMembers();
        if (maxMembers === "Unlimited") return 10;

        return (data.teamMembers / Number(maxMembers) * 100);
    };

    const generateUpgradePlanMsg = () => {
        let str = null;

        const currentPlan = data.billingPlan;
        if (currentPlan === "Basic") {
            str = "Pro"; // Upgrade to pro
        } else if (currentPlan === "Pro") {
            str = "Enterprise"; // Upgrade to enterprise
        } else {
            return ""; // Your at the max plan so no upgrade needed
        }

        return `Upgrade To ${str} Billing Plan`;
    };

    const totalClicks = users.reduce((sum, user) => sum + (Number(user.clicks) || 0), 0);
    const clicksChartData = {
        labels: users.map(user => user.name),
        datasets: [
            {
                label: `Total Clicks: ${totalClicks}`,
                data: users.map(user => Number(user.clicks)),
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.2)",
                tension: 0.4, 
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#22c55e"
            }
        ]
    };

    const clicksChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                        weight: "bold",
                    },

                    color: darkMode ? "white" : "#1f2937",
                    boxWidth: 20,
                    boxHeight: 20,
                }
            },

            tooltip: {
                callbacks: {
                    title: (context) => {
                        const user = users[context[0].dataIndex];
                        return user.name;
                    },

                    label: (context) => {
                        const user = users[context.dataIndex];
                        return `Clicks: ${user.clicks}`;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const randomAPIChartData = users.map(() => Math.floor(Math.random() * 100));
    const apiChartData = {
        labels: users.map(user => user.name),
        datasets: [
            {
                label: `Total API Queries: ${data.apiQueries}`, // use the actual API query total
                data: randomAPIChartData,
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.2)",
                tension: 0.4, 
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#22c55e"
            }
        ]
    };

    const apiChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                        weight: "bold",
                    },
                    color: darkMode ? "white" : "#1f2937",
                    boxWidth: 20,
                    boxHeight: 20,
                }
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        return users[context[0].dataIndex].name;
                    },
                    label: (context) => {
                        return `API Request: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center pt-10 p-5 gap-5 ${darkMode ? "" : "bg-slate-100"}`}>
            <div className="w-full h-40 flex flex-col p-3">
                <span className={`text-3xl font-bold ${darkMode ? "" : "text-black"}`}>{`Welcome back, User! 👋`}</span>
                <span className={`text-lg ${darkMode ? "" : "text-black"}`}>Dashboard Overview Below:</span>
            </div>

            <div className="w-full h-80 flex flex-row justify-start items-center p-2 gap-5">
                <div className="w-full h-full flex flex-col border-2 border-gray-600 bg-gray-900 rounded-md">
                    <div className="w-full h-30 flex flex-row justify-between p-5">
                        <div className="w-full h-full flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-400">API Queries</span>
                            <span className="text-2xl font-bold">{formatNumber(data.apiQueries)}</span>
                            <span className="font-bold text-sm text-gray-400">{`of ${getMaxApiQueries()}`}</span>
                        </div>

                        <div className="h-10 flex items-center rounded-xl bg-gradient-to-r from-blue-800 to-purple-500">
                            <Search className="w-12 h-7" />
                        </div>
                    </div>

                    <div className="w-full h-full p-5">
                        <div className="w-full h-1/2">
                            <div className="w-full flex justify-between">
                                <span className="text-gray-400 text-sm">Usage</span>
                                <span className="text-gray-400 text-sm">{`${calculateAPIUsage().toFixed(0, 2)}%`}</span>
                            </div>

                            <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                                    style={{ width: `${calculateAPIUsage()}%` }}                                        
                                />
                            </div>
                        </div>

                        <div className="w-full h-1/2 flex flex-nowrap mt-10">
                            <span className="text-green-500 text-xs">↗ 12% from last month</span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col border-2 border-gray-600 bg-gray-900 rounded-md">
                    <div className="w-full h-30 flex flex-row justify-between p-5">
                        <div className="w-full h-full flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-400">Reports Generated</span>
                            <span className="text-2xl font-bold">{formatNumber(data.reports)}</span>
                            <span className="font-bold text-sm text-gray-400">{`of ${getMaxReports()}`}</span>
                        </div>

                        <div className="h-10 flex items-center rounded-xl bg-gradient-to-r from-blue-800 to-purple-500">
                            <BarChart className="w-12 h-7" />
                        </div>
                    </div>

                    <div className="w-full h-full p-5">
                        <div className="w-full h-1/2">
                            <div className="w-full flex justify-between">
                                <span className="text-gray-400 text-sm">Usage</span>
                                <span className="text-gray-400 text-sm">{`${calculateReportsUsage().toFixed(0, 2)}%`}</span>
                            </div>

                            <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                                    style={{ width: `${calculateReportsUsage()}%` }}                                        
                                />
                            </div>
                        </div>

                        <div className="w-full h-1/2 flex flex-nowrap mt-10">
                            <span className="text-green-500 text-xs">↗ 8% from last month</span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col border-2 border-gray-600 bg-gray-900 rounded-md">
                    <div className="w-full h-30 flex flex-row justify-between p-5">
                        <div className="w-full h-full flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-400">Team Members</span>
                            <span className="text-2xl font-bold">{formatNumber(data.teamMembers)}</span>
                            <span className="font-bold text-sm text-gray-400">{`of ${getMaxTeamMembers()}`}</span>
                        </div>

                        <div className="h-10 flex items-center rounded-xl bg-gradient-to-r from-blue-800 to-purple-500">
                            <Users className="w-12 h-7" />
                        </div>
                    </div>

                    <div className="w-full h-full p-5">
                        <div className="w-full h-1/2">
                            <div className="w-full flex justify-between">
                                <span className="text-gray-400 text-sm">Usage</span>
                                <span className="text-gray-400 text-sm">{`${calculateTeamMembersUsage().toFixed(0, 2)}%`}</span>
                            </div>

                            <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                                    style={{ width: `${calculateTeamMembersUsage()}%` }}                                        
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col border-2 border-gray-600 bg-gray-900 rounded-md">
                    <div className="w-full h-30 flex flex-row justify-between p-5">
                        <div className="w-full h-full flex flex-col gap-1">
                            <span className="font-bold text-sm text-gray-400">Current Plan</span>
                            <span className="text-2xl font-bold">{data.billingPlan}</span>
                            <span className="font-bold text-sm text-gray-400">{generateUpgradePlanMsg()}</span>
                        </div>

                        <div className="h-10 flex items-center rounded-xl bg-gradient-to-r from-blue-800 to-purple-500">
                            <CreditCard className="w-12 h-7" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-80 flex flex-row gap-5">
                <div className="w-full h-full bg-gray-900 border-gray-600 rounded-xl border-2">
                    <Line data={clicksChartData} options={clicksChartOptions} />
                </div>

                <div className="w-full h-full bg-gray-900 border-gray-600 rounded-xl border-2">
                    <Line data={apiChartData} options={apiChartOptions} />
                </div>
            </div>
        </div>
    );
}

export default function Overview() {
    return (
        <SessionProvider>
            <OverviewInner />
        </SessionProvider>
    );
}
