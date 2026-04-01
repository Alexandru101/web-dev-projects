"use client";
import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from "next-auth/react";

function SettingsInner() {
    const { data: session} = useSession();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setUserName(session?.user?.name || "");
        setEmail(session?.user?.email || "");
    }, [session])

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 w-1/2 h-1/2">
                <h3 className="text-lg text-white font-bold text-center border-b-2 p-1 mb-4">
                    Account Information
                </h3>

                <div className="flex flex-row bg-black/30 font-medium text-green-400 rounded-md gap-1 p-2">
                    <h4>Username:</h4>

                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        className="w-full outline-none"
                    />
                </div>

                <div className="flex flex-row bg-black/30 font-medium text-green-400 rounded-md gap-1 p-2">
                    <h4>Email:</h4>

                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full outline-none"
                    />
                </div>

                <div className="w-full h-50 flex flex-col justify-center items-center gap-4 font-bold">
                    <img 
                        src={session?.user?.image || "@/../public/github_icon.PNG"}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full"
                    />

                    User Profile
                </div>
            </div>
        </div>
    );
}

export default function Settings() {
    return (
        <SessionProvider>
            <SettingsInner />
        </SessionProvider>
    );
}