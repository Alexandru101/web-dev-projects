"use client";
import { useState, useEffect, useContext } from "react";

import { Profile } from "@/lib/types";
import { SectionContext } from "@/lib/page-context";
import { supabase } from "@/lib/db-client";

import Themes from "@/lib/themes";
import ProfileSection from "./components/profile";
import ChatSection from "./components/chat";
import AiChat from "./components/aiChat";

export default function Home() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const sectionContext = useContext(SectionContext);
    const activeSection = sectionContext?.activeSection || "profile";
    const { darkMode, setDarkMode } = sectionContext ?? {};

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.log(`error user not found`);
                return;
            }

            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (!profile) {
                const username = user.email?.split("@")[0] ?? "";

                const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    darkTheme: true,
                    image: null,
                    username: username,
                })
                .select()
                .single();

                if (insertError) {
                    console.log("failed to insert/create database column:", insertError);
                    return;
                }

                setProfile(newProfile);
                setDarkMode(newProfile.darkTheme);
                return;
            }

            setProfile(profile);
            setDarkMode(profile.darkTheme);
        };

        init();
    }, []);

    return (
        <div
            className="min-h-screen w-full flex flex-row ml-15"
            style={{
                backgroundColor: darkMode ? Themes.darkTheme : Themes.whiteTheme
            }}
        >
            {activeSection === "profile" && profile && <ProfileSection profile={profile}></ProfileSection>}
            {activeSection === "chat" && profile && <ChatSection profile={profile}></ChatSection>}
            {activeSection === "ai-chat" && profile && <AiChat profile={profile}></AiChat>}
        </div>
    );
}
