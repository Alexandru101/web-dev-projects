"use client";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { FaUser, FaComments, FaRobot, FaSun, FaMoon } from "react-icons/fa";
import { SectionContext } from "@/lib/page-context";
import { supabase, createUserProfile } from "@/lib/db-client";
import { Profile, SupabaseUser } from "@/lib/types";

const Navbar = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [validPage, setValidPage] = useState<boolean | null>(null);
    const pathName = usePathname();

    const sectionContext = useContext(SectionContext);
    const { setActiveSection, darkMode, setDarkMode } = sectionContext ?? {};

    useEffect(() => {
        const validatePage = async () => {
            try {
                const response = await fetch(pathName, { method: "HEAD" });
                setValidPage(response.status !== 404)
            } catch(error) {
                setValidPage(false);
            }
        };

        validatePage();
    }, [pathName])

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return;
            }

            const { data: profile } = await supabase.from("profiles").select('*').eq('id', user.id).single();
            if (!profile) {
                const newProfile = await createUserProfile(user as SupabaseUser);
                setProfile(newProfile);
                setDarkMode?.(newProfile?.darkTheme || false);
                return;
            }

            setProfile(profile);
            setDarkMode?.(profile?.darkTheme || false);
        };

        fetchUser();
    }, []);

    if (!sectionContext) return null;
    if (pathName === "/auth" || !validPage) return null;

    const toggleTheme = async () => {
        const newDarkMode = !darkMode;
        setDarkMode?.(newDarkMode);

        if (profile) {
            const { error } = await supabase
            .from("profiles")
            .update({ darkTheme: newDarkMode })
            .eq("id", profile.id);

            if (error) {
                alert("Error updating theme: " + error.message);
            }
        }
    };

    return (
        <nav className="fixed top-0 left-0 h-full w-15 bg-gray-900
                        flex flex-col items-center space-y-8"
            >
                <div className="mt-8">
                    <button
                        onClick={toggleTheme}
                        className="text-white cursor-pointer hover:text-green-500 hover:scale-101 active:scale-100"
                    >
                        {darkMode ? (
                            <FaMoon className="w-8 h-8" />
                        ) : (
                            <FaSun className="w-8 h-8" />
                        )}
                    </button>
                </div>

                <button
                    title="profile"
                    aria-label="profile"
                    className="text-white cursor-pointer
                        hover:text-green-500 hover:scale-105
                        active:scale-100"
                    onClick={() => setActiveSection?.("profile")}
                >
                    <FaUser className="w-9 h-9" />
                </button>
                
                <button
                    title="chat"
                    aria-label="chat"
                    className="text-white cursor-pointer
                        hover:text-green-500 hover:scale-105
                        active:scale-100"
                    onClick={() => setActiveSection?.("chat")}
                >
                    <FaComments className="w-9 h-9" />
                </button>

                <button
                    title="Ai-Chat"
                    aria-label="Ai-Chat"
                    className="text-white cursor-pointer
                        hover:text-green-500 hover:scale-105
                        active:scale-100"
                    onClick={() => setActiveSection?.("ai-chat")}
                >
                    <FaRobot className="w-9 h-9" />
                </button>
        </nav>
    );
};

export default Navbar;

