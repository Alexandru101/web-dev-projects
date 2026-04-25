import { useState, useRef, useEffect } from "react";
import { Profile } from "@/lib/types";

type GroqMessage = {
  role: "user" | "assistant";
  content: string
};

const MAX_HISTORY = 6;
const CACHE_KEY = "ai_chat_history";
const MAX_CACHED = 5;

const loadCache = (): GroqMessage[] => {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCache = (history: GroqMessage[]) => {
  try {
    const toSave = history.slice(-MAX_CACHED * 2);
    localStorage.setItem(CACHE_KEY, JSON.stringify(toSave));
  } catch {}
};

const AiChat = ({ profile: userProfile }: { profile: Profile }) => {
  const [aiHistory, setAiHistory] = useState<GroqMessage[]>(() => loadCache());
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(() => {
    return loadCache().map((m) => ({ role: m.role, text: m.content }));
  });
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateMessage = async (message: string): Promise<string> => {
    let updatedHistory: GroqMessage[] = [
      ...aiHistory,
      { role: "user", content: message },
    ];

    if (updatedHistory.length > MAX_HISTORY) {
      updatedHistory = updatedHistory.slice(-MAX_HISTORY);
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: updatedHistory,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err?.error?.message ?? `HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    updatedHistory = [
      ...updatedHistory,
      { role: "assistant", content: reply },
    ];

    if (updatedHistory.length > MAX_HISTORY) {
      updatedHistory = updatedHistory.slice(-MAX_HISTORY);
    }

    setAiHistory(updatedHistory);
    saveCache(updatedHistory);
    return reply;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);
    try {
      const reply = await generateMessage(userText);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setAiHistory([]);
    localStorage.removeItem(CACHE_KEY);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-950 p-6">
      <div className="w-full max-w-2xl flex flex-col h-[80vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">

        <div className="px-5 py-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-semibold text-sm tracking-wide">AI Assistant</span>
          </div>
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-white text-xs transition"
          >
            Clear history
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              Send a message to get started
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-700 text-gray-100 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-400 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm flex gap-1 items-center">
                <span className="animate-bounce [animation-delay:0ms]">•</span>
                <span className="animate-bounce [animation-delay:150ms]">•</span>
                <span className="animate-bounce [animation-delay:300ms]">•</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-4 py-3 border-t border-gray-700 bg-gray-800 flex gap-3 items-center">
          <input
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default AiChat;
