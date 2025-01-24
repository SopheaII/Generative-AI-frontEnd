import React from "react";
import type { Message } from "~/types/messageType";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Or choose another theme

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`flex items-start space-x-2 max-w-3/4 ${
          isUser ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        {/* Icon Container */}
        <div
          className={`p-2 rounded-full text-white ${
            isUser ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Message Content */}
        <div
          className={`p-3 rounded-lg text-white ${
            isUser ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          <ReactMarkdown
            components={{
              // Customize code block rendering
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={`bg-gray-700 rounded p-1 text-sm ${
                      isUser ? "bg-blue-400" : "bg-gray-800"
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
