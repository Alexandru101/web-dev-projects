"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoadingScreen() {
    const searchParams = useSearchParams();
    const location = searchParams.get("location");

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = `/components/${location}`;
        }, 2000);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-white text-5xl font-bold flex space-x-2">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
                <span className="animate-pulse delay-450">.</span>
            </div>
        </div>
    )
}
