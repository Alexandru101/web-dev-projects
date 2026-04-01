"use client";

import { login } from "@/lib/auth_actions";
import { FaGithub } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function registration() {
  const handleClickEvent = () => {
    login();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <div>
        <button
          onClick={() => handleClickEvent()}
          className="flex items-center bg-gray-800 border-radius-5xl
                      p-4 rounded-md text-2xl hover:bg-gray-700 cursor-pointer
                      hover:scale-101 transition-transform duration-150"
          >
            <FaGithub className="mr-2" />
            Sign In with GitHub
        </button>
      </div>
    </div>
  )
}