"use client";
import { useState, useEffect } from 'react';
import { ThemeContext, useTheme } from '@/app/context/themeContext';

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

export default function Users() {
    const darkMode = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        if (storedUsers && storedUsers.length > 0) {
            setUsers(storedUsers);
            return;
        }

        const minUsers = 0;
        const maxUsers = 20;
        let userCount = getRandomNumber(minUsers, maxUsers);
        if (!userCount) userCount = 10;

        const generatedUsers = Array.from({ length: userCount }, (_, index) => ({
            id: index + 1,
            name: `User ${index + 1}`,
            clicks: getRandomNumber(0, 100),
        }));

        setUsers(generatedUsers);
    }, []);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    const saveData = (updatedUsers) => {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const handleEdit = (id, field, value) => {
        const updatedUsers = users.map(u => 
            u.id === id ? { ...u, [field]: value } : u
        );

        setUsers(updatedUsers);
        saveData(updatedUsers);
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        saveData(updatedUsers);
    };

    const addUserHandler = () => {
        const newUser = {
            id: Date.now(),
            name: `User ${users.length + 1}`,
            clicks: getRandomNumber(0, 100)
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveData(updatedUsers);
    };

    const totalClicks = users.reduce((sum, user) => sum + (Number(user.clicks) || 0), 0);
    const chartData = {
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

    const chartOptions = {
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

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-5 gap-5 ${darkMode ? "" : "bg-slate-100"}`}>
            <div className="w-full flex justify-center">
                <input
                    type="text"
                    placeholder="Search by Username"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className={`w-full text-center font-bold border-2 rounded-md outline-none p-2 ${
                        darkMode ? "border-gray-600" : "border-gray-300 bg-white text-gray-800 placeholder-gray-400"
                    }`}
                />
            </div>

            <div className={`w-full h-140 overflow-y-auto space-y-3 border-2 ${
                darkMode ? "border-gray-600" : "border-gray-300 bg-white"
            }`}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`w-full h-10 flex justify-between items-center border-b-2 p-2 rounded-sm ${
                                darkMode ? "border-gray-600" : "border-gray-200"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <p className="text-green-500 font-bold">Username:</p>

                                <input
                                    value={user.name}
                                    onChange={(event) =>
                                        handleEdit(user.id, "name", event.target.value)
                                    }
                                    className={`outline-none p-1 ${
                                        darkMode ? "" : "text-gray-800 bg-transparent"
                                    }`}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-green-500 font-bold">Clicks:</p>

                                <input
                                    value={user.clicks}
                                    onChange={(event) =>
                                        handleEdit(user.id, "clicks", event.target.value)
                                    }
                                    className={`w-10 text-center outline-none p-1 rounded ${
                                        darkMode ? "" : "text-gray-800 bg-gray-100"
                                    }`}
                                />

                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-white bg-red-400 rounded hover:scale-105 hover:bg-red-500 p-1"
                                >❌</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`p-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No users found</p>
                )}

                <div className="w-full flex justify-center">
                    <button
                        onClick={addUserHandler}
                        className="w-full py-1.5 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="w-full h-70 flex flex-row gap-5">
                <div className={`w-1/2 h-full border-2 ${darkMode ? "border-gray-600" : "border-gray-300 bg-white"}`}>
                    <Line data={chartData} options={chartOptions} />
                </div>

                <div className={`w-1/2 h-full flex flex-col overflow-y-auto space-y-3 border-2 ${
                    darkMode ? "border-gray-600" : "border-gray-300 bg-white"
                }`}>
                    {users
                        .slice()
                        .sort((a, b) => b.clicks - a.clicks)
                        .map((user, index) => (
                        <div
                            key={user.id}
                            className={`w-full h-10 flex justify-between items-center border-b-2 p-2 rounded-md ${
                                darkMode ? "border-gray-600" : "border-gray-200"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="relative w-7 h-7">
                                    <img
                                        src="/globe.svg"
                                        className="w-7 h-7 rounded-full object-cover"
                                    />

                                    <span className={`absolute inset-0 flex items-center justify-center ${darkMode ? "text-white" : "text-black"} font-bold text-xs`}>
                                        {index + 1}
                                    </span>
                                </div>

                                <span className={`font-bold ${darkMode ? "" : "text-gray-800"}`}>
                                    {user.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-green-500 font-bold">Clicks:</p>
                                <input
                                    value={user.clicks}
                                    onChange={(event) =>
                                        handleEdit(user.id, "clicks", event.target.value)
                                    }
                                    className={`w-10 text-center outline-none p-1 rounded ${
                                        darkMode ? "" : "text-gray-800 bg-gray-100"
                                    }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
