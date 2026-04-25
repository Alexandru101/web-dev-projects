import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { SectionContext } from "@/lib/page-context";
import { Profile } from "@/lib/types";
import { supabase } from "@/lib/db-client";

const ProfileSection = ({ profile: userProfile }: { profile: Profile }) => {
    const [profile, setProfile] = useState(userProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({ username: `${profile?.username}`, password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false); 

    const sectionContext = useContext(SectionContext);
    const { darkMode } = sectionContext ?? {};

    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [showError]);

    const clickHandler = () => {
        fileInputRef.current?.click();
    };

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !profile.id) return;

        const filePath = `public/${profile.id}.png`;
        
        const { error } = await supabase.storage
        .from("profile_images")
        .upload(filePath, file, {
            upsert: true,
        });
        
        if (error) {
            alert("Error uploading image file:" + error.message);
            return;
        }

        const { data } = supabase.storage
        .from("profile_images")
        .getPublicUrl(filePath);

        const imageUrl = `${data.publicUrl}?t=${Date.now()}`;
        await supabase.from("profiles").update({ image: imageUrl }).eq("id", profile.id);
        
        setProfile(prev => ({
            ...prev,
            image: imageUrl
        }));

        fileInputRef.current!.value = "";
    };

    const deleteImageHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!profile?.id) return;

        const filePath = `public/${profile.id}.png`;

        const { error } = await supabase.storage
        .from("profile_images")
        .remove([filePath]);

        if (error) {
            alert('Error removing image from storage:' + error.message);
            return;
        }

        const { error: dbError } = await supabase
        .from("profiles")
        .update({ image: null })
        .eq("id", profile.id);
        
        if (dbError) {
            alert('Error updating profiles database table:' + dbError.message);
            return;
        }

        setProfile(prev => ({
            ...prev,
            image: null
        }));
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyChangesHandler = async () => {
        if (!formData.username.trim()) {
            setError("Username cannot be left blank");
            setShowError(true);
            return;
        } else if (!formData.password.trim()) {
            setError("Password cannot be left blank");
            setShowError(true);
            return;
        } else if (formData.password.length < 6) {
            setError("Password must be atleast 6 characters long");
            setShowError(true);
            return;
        }

        const validatedUsernameChars = /^[a-zA-Z0-9_]+$/;
        if (!validatedUsernameChars.test(formData.username)) {
            setError("Username can only contain letters, numbers and underscores");
            setShowError(true);
            return;
        }

        const validatedPasswordChars = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.?/`~]+$/;
        if (!validatedPasswordChars.test(formData.password)) {
            setError("Password contains invalid characters");
            setShowError(true);
            return;
        }

        setLoading(true);

        try {
            const { error: authError } = await supabase.auth.updateUser({
                email: `${formData.username}@fakegmail.com`,
                password: formData.password
            });

            if (authError) {
                setError(authError.message);
                setShowError(true);
                setLoading(false);
                return;
            }

            const { error: dbError } = await supabase
            .from("profiles")
            .update({ username: formData.username })
            .eq("id", profile.id);

            if (dbError) { 
                setError(`Error updating username: ${dbError.message}`);
                setShowError(true);
                setLoading(false);
                return;
            }

            setProfile(prev => ({
                ...prev,
                username: formData.username
            }));

            setFormData(prev => ({
                ...prev,
                password: ''
            }));

            setError('');
        } catch (error) {
            setError(`Unexpected error: ${error}`);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center py-10 pl-20 pr-40 gap-15">
            <div className="w-40 flex flex-col items-center gap-4">
                <div
                    onClick={clickHandler}
                    className="w-40 h-40 flex justify-center items-center rounded-full overflow-hidden
                               border-2 border-gray-500 bg-gray-700 cursor-pointer hover:scale-101
                               hover:border-green-600 active:scale-100"
                >
                    {profile?.image ? (
                        <img
                            src={profile.image}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaUser className="text-7xl text-gray-300" />
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={fileChangeHandler}
                    accept="image/*"
                    className="hidden"
                />

                <div className="flex flex-row items-center gap-2">
                    <h1 className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700" } font-bold`}>{`@${profile?.username}`}</h1>
                    
                    {profile?.image && (
                        <button
                            onClick={deleteImageHandler}
                        >
                            <FaTrash className="text-lg text-red-500 font-bold cursor-pointer" />
                        </button>
                    )}
                </div>
            </div>

            <div className="w-full h-full bg-slate-700 border-2 border-gray-500 rounded-xl p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 font-bold">Username {"(does not change email)"}</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={inputChangeHandler}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 rounded-lg bg-slate-600 border-2 border-gray-500 
                                     text-gray-300 placeholder-gray-400 focus:outline-none
                                     focus:border-green-600 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 font-bold">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={inputChangeHandler}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg bg-slate-600 border-2 border-gray-500
                                text-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-600
                                transition-colors"
                        />
                    </div>

                    <button
                        onClick={applyChangesHandler}
                        disabled={loading}
                        className="w-full mt-4 px-6 py-3 rounded-lg border-2 border-green-500
                        bg-green-600 hover:border-green-500 hover:bg-green-700 text-white
                        font-bold transition-colors active:scale-99 hover:scale-101"
                    >
                        Apply Changes
                    </button>

                    {showError && (
                        <p className="text-red-400 text-center font-bold rounded p-2">
                            {error}
                        </p>
                    )}
                </div>
            </div>

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
};

export default ProfileSection;
