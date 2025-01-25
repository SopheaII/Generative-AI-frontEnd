import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import ChatMessage from "./components/ChatMessage";
import type { Message } from "~/types/commonType";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/chat/askQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: input, isStream: true }),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const aiMessage: Message = { role: "assistant", content: "" };
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiMessage.content += chunk;
        if (isFirstChunk) {
          isFirstChunk = false;
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-full  text-white">
      <div className="flex flex-col w-full max-w-3xl shadow-lg">
        <main className="flex-1 overflow-auto p-4 space-y-4 w-full">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </main>
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-4 border-gray-2000"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-600 p-2 rounded-r-md disabled:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
