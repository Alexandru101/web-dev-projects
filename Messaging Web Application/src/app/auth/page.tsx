"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/db-client";

export default function AuthManager() {
    let router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [createAccount, setCreateAccount] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const signInHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!username) {
            usernameRef.current?.focus();
            setLoading(false);
            return;
        }

        if (!password) {
            passwordRef.current?.focus();
            setLoading(false);
            return;
        }

        const email = `${username}@fakegmail.com`;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            setLoading(false);
            setCreateAccount(true);
            return;
        }

        router.push('/')
    };

    const createAccountHandler = async (confirmed: boolean) => {
        setCreateAccount(false); // closing popup
        if (!confirmed) { 
            setUsername('');
            setPassword('');
            router.push('/');
            return;
        }

        setLoading(true);

        if (!username.trim()) {
            setError("Username cannot be left blank");
            setLoading(false);
            return;
        } else if (!password.trim()) {
            setError("Password cannot be left blank");
            setLoading(false);
            return;
        }

        const validatedUsernameChars = /^[a-zA-Z0-9_]+$/;
        if (!validatedUsernameChars.test(username)) {
            setError("Username can only contain letters, numbers and underscores");
            setLoading(false);
            return;
        }

        const validatedPasswordChars = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.?/`~]+$/;
        if (!validatedPasswordChars.test(password)) {
            setError("Password contains invalid characters");
            setLoading(false);
            return;
        }

        const email = `${username}@fakegmail.com`;
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false)
            return;
        }

        router.push('/');
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form
                className="
                    flex flex-col gap-6 p-6
                    w-11/12 max-w-sm
                    bg-gray-800/80 backdrop-blur-md
                    border-2 border-green-500 rounded-2xl
                    shadow-xl
                "
                onSubmit={signInHandler}
            >
                <div className="flex flex-col gap-2">
                    <label className="text-green-400 font-semibold">Username:</label>
                    <input
                        ref={usernameRef}
                        type="text"
                        className={inputStyle}
                        placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                if (!password) passwordRef.current?.focus();
                                e.currentTarget.form?.requestSubmit();
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-green-400 font-semibold">Password:</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className={inputStyle}
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="
                        w-full h-12
                        font-bold text-black
                        bg-green-500 border-2 border-green-400
                        rounded-lg cursor-pointer
                        shadow-md shadow-green-400/50
                        transform transition-transform duration-150
                        hover:bg-green-600 active:scale-98
                    "
                >
                    Submit
                </button>

                <p className="text-gray-400 text-center font-bold text-sm">{error}</p>
            </form>

            {createAccount && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div
                        className="
                            w-11/12 max-w-sm p-6
                            bg-gray-800 border-2 border-green-500
                            rounded-2xl shadow-xl
                            flex flex-col gap-4
                            animate-fadeIn
                        "
                    >
                        <h2 className="text-green-400 text-xl font-bold text-center">
                            Create Account?
                        </h2>

                        <p className="text-gray-300 text-center text-sm">
                            Account not found, do you wish to register
                            this account to the database?
                        </p>

                        <div className="flex gap-3 mt-2">
                            <button
                                className="
                                    flex-1 py-2 rounded-lg
                                    border border-gray-500 text-gray-300
                                    hover:bg-gray-700 transition
                                "
                                onClick={() => createAccountHandler(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="
                                    flex-1 py-2 rounded-lg
                                    bg-green-500 text-black font-semibold
                                    hover:bg-green-600 transition
                                "
                                onClick={() => createAccountHandler(true)}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="flex flex-col items-center gap-4 bg-gray-800 border-2 border-green-500 p-6 rounded-2xl shadow-xl">
                        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>

                        <p className="text-green-400 font-semibold">
                            Loading
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

const inputStyle = `w-full p-2 rounded-lg
                    border-2 border-green-400
                    bg-gray-700 text-white outline-none
                    placeholder:text-green-200/60
                    focus:border-green-500 focus:ring-1
                    focus:ring-green-500 transition`
