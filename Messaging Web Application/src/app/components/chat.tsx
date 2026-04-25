import { useState, useEffect } from "react";
import { Profile } from "@/lib/types";
import { supabase } from "@/lib/db-client";

import { FaTrash } from "react-icons/fa";

const ChatSection = ({ profile: userProfile }: { profile: Profile }) => {
    const [chats, setChats] = useState<any[]>([]);
    const [showChatForm, setShowChatForm] = useState<boolean>(false);
    const [newChatName, setNewChatName] = useState('');
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    
    useEffect(() => {
        // LOading Initial Chats //
        const fetchChats = async () => {
            const { data, error } = await supabase
            .from("chats")
            .select('*');
            
            if (error) {
                console.log("Error, fetching global chat: ", error.message);
                return;
            }

            setChats(data || []);

            if (data && data.length > 0) {
                setSelectedChatId(data[0].id);
            }
        };
        
        fetchChats();
        
        const chatSubscription = supabase
        .channel("chats")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "chats" },
            (payload: any) => setChats(prev => [...prev, payload.new])
        ).subscribe();

        return () => {
            supabase.removeChannel(chatSubscription);
        };
    }, []);

    useEffect(() => {
        if (!selectedChatId) return;

        const fetchMessages = async () => {
            const { data, error } = await supabase
            .from("messages")
            .select("id, user_id, username, chat_id, content, attachments, created_at, is_edited")
            .eq("chat_id", selectedChatId)
            .order("created_at", { ascending: true });

            if (error) {
                console.log(`Error fetching messages data: ${error.message}`);
                return;
            }

            setMessages(data || []);
        };

        fetchMessages();

        const messagesSubscription = supabase
        .channel(`messages-${selectedChatId}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" },
            (payload: any) => {
                if (payload.new.chat_id === selectedChatId) {
                    setMessages(prev => [...prev, payload.new]);
                }
            }
        )
        .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages" },
            (payload: any) => setMessages(prev => prev.filter(mes => mes.id !== payload.old.id))
        ).subscribe();

        return () => {
            supabase.removeChannel(messagesSubscription);
        }
    }, [selectedChatId]);

    const newChatEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            newChatHandler();
        }
    };

    const newChatHandler = async () => {
        if (!newChatName.trim()) return;

        try {
            const { data: newChat, error: chatError } = await supabase
            .from("chats")
            .insert({
                name: newChatName,
                created_by: userProfile.id
            }).select().single();

            if (chatError) throw chatError;

            const { error: membError } = await supabase
            .from("chat_members")
            .insert({
                chat_id: newChat.id,
                user_id: userProfile.id,
                role: "Admin"
            });

            if (membError) throw membError;

            setChats(prev => [
                ...prev,
                newChat
            ]);

            setNewChatName('');
            setShowChatForm(false);
        } catch (error) {
            alert(`Failed to create chat: ${error}`);
        }
    };

    const sumbitEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessageHandler();
        }
    };

    const sendMessageHandler = async () => {
        if (!currentMessage) return;

        try {
            const { error } = await supabase
            .from("messages")
            .insert({
                user_id: userProfile.id,
                chat_id: selectedChatId,
                content: currentMessage,
                is_edited: false,
                username: userProfile.username
            }).select().single();

            if (error) { 
                console.log(`Error sending message to supabase: ${error.message}`);
                return;
            }

            setCurrentMessage('');
        } catch (error) {
            console.log(`Error sending message: ${error}`)
        }
    };

    const userOwnsMessage = (message: any) => {
        return message.user_id === userProfile.id;
    };

    const deleteMessageHandler = async (messageId: string) => {
        try {
            const { error } = await supabase
            .from("messages")
            .delete()
            .eq("id", messageId)
            .eq("user_id", userProfile.id);

            if (error) throw error;
        } catch (error) {
            console.log(`Error deleting message: ${error}`);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-15 pr-30">
            <div className="w-full h-full flex flex-row border-2 border-black bg-black rounded-xl shadow-2xl p-1">
                {/* Left Container */}
                <div className="w-1/2 h-full flex flex-col items-center border-2 border-black bg-gray-900 p-1 gap-5">
                    <div className="w-full border-b-2 border-white pb-2">
                        <h2 className="text-2xl text-white text-center font-bold">Conversations</h2>
                    </div>

                    <div className="w-full h-full flex flex-col p-1 gap-5">
                        {chats.map((chat) => (
                            <button
                                key={chat.id}
                                className="w-full h-15 text-xl font-bold text-green-400 bg-green-800 border-2 border-green-900 rounded-lg 
                                    hover:bg-green-700 hover:text-white hover:border-green-600 transition duration-300 
                                    ease-in-out focus:outline-none hover:scale-101 active:scale-99 cursor-pointer"
                                onClick={() => setSelectedChatId(chat.id)}
                                
                            >
                                {chat.name}
                            </button>
                        ))}

                        <button
                            onClick={() => setShowChatForm(true)}
                            className="w-full h-15 text-xl font-bold text-green-500 bg-green-900 border-2 border-green-900 rounded-lg 
                                    hover:bg-green-800 hover:text-green-400 hover:border-green-700 transition duration-300 
                                    ease-in-out focus:outline-none cursor-pointer"
                        >
                            New Chat
                        </button>

                        {showChatForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                                <div className="bg-gray-900 p-6 rounded-xl border-2 border-green-500 flex flex-col gap-4 w-96 
                                                shadow-2xl shadow-green-700/50"
                                >
                                    <h3 className="text-white text-xl font-bold">Enter Chat Name</h3>
                                    <input
                                        type="text"
                                        value={newChatName}
                                        className="p-2 rounded border border-gray-600 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Chat Name"
                                        onChange={e => setNewChatName(e.target.value)}
                                        onKeyDown={newChatEventHandler}
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowChatForm(false)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 shadow-md"
                                        >
                                            Cancel
                                        </button>
                                        
                                        <button
                                            onClick={newChatHandler}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 shadow-md"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIght Container */}
                <div className="w-full h-full border-2 border-black bg-gray-800">
                    <div className="flex h-full flex-col gap-3">
                        <div className="flex-1 p-2">
                            {messages.map((message) => (
                                <div key={message.id} className="flex flex-row overflow-x-auto mb-3 rounded bg-gray-700 p-3">
                                    {userOwnsMessage(message) && !showChatForm && (
                                        <FaTrash
                                            className="self-end text-2xl text-red-600 cursor-pointer transform
                                                scale-100 hover:scale-110 transition-all duration-200"
                                            onClick={() => deleteMessageHandler(message.id)}
                                        />
                                    )}

                                    <div className="flex-1 overflow-y-auto">
                                        <p className={`text-sm text-green-400 ${userProfile.id === message.user_id && "text-right"}`}>
                                            {message.username || "Unknown user"}
                                        </p>

                                        <p className={`text-white ${userProfile.id === message.user_id && "text-right"}`}>
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full h-13 flex flex-row border-2 border-black bg-white">
                            <input
                                value={currentMessage}
                                placeholder="Input Text . . ."
                                className="w-full outline-none p-2"
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={sumbitEventHandler}
                            />

                            <button 
                                className="w-1/3 h-full font-bold bg-green-500 border-l-2
                                    hover:bg-green-600 transition duration-100 active:bg-green-500"
                                onClick={sendMessageHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
