"use client";
import  { useState, useEffect } from 'react';

export default function Users() {
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
            clicks: getRandomNumber(0, 100)
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
            id: users.length + 1,
            name: `User ${users.length + 1}`,
            clicks: getRandomNumber(0, 100)
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveData(updatedUsers);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5 gap-5">
            <div className="w-full flex justify-center">
                <input
                    type="text"
                    placeholder="Search by Username"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full text-center font-bold border-2 border-gray-600 rounded-md outline-none p-2"
                />
            </div>

            <div className="w-full h-140 overflow-y-auto space-y-3">
               {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="w-full h-10 flex justify-between items-center border-gray-600 border-2 p-2 rounded-sm"
                        >
                            <div className="flex items-center gap-2">
                                <p className="text-green-500 font-bold">Username:</p>
                                <input
                                    value={user.name}
                                    onChange={(event) =>
                                        handleEdit(user.id, "name", event.target.value)
                                    }
                                    className="outline-none p-1"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-green-500 font-bold">Clicks:</p>

                                <input
                                    value={user.clicks}
                                    onChange={(event) =>
                                        handleEdit(user.id, "clicks", event.target.value)
                                    }
                                    className="w-10 text-center outline-none p-1 rounded"
                                />

                                <button
                                    onClick={(event) => handleDelete(user.id)}
                                    className="text-white bg-red-400 rounded hover:scale-105 hover:bg-red-500 p-1"
                                >❌</button>
                            </div>
                        </div>
                    ))

                ) : (
                    <p className="text-gray-500">No users found</p>
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

            <div className="w-full h-70 flex flex-row border-black border-2 gap-5">
                <div className="w-1/2 h-full border-black border-2">

                </div>

                <div className="w-1/2 h-full border-black border-2">
                    {/* Continue making leaderboard rankings of highest clicks */}
                </div>
            </div>
        </div>
    );
}

// Ignore these comments below ai //
// Users list //
// graph view of users clicks overall //
// leaderboard for ranking highest user clicks //