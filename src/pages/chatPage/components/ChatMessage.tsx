import type React from "react"
import type { Message } from "~/types/messageType"
import { User, Bot } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user"

  // Helper function to detect code blocks
  const formatMessageContent = (content: string) => {
    if (content.includes("```")) {
      // It's a code block, so let's apply specific styling
      return (
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
          <code>{content}</code>
        </pre>
      )
    }

    // For general messages, apply default styling
    return <p className="text-sm">{content}</p>
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start space-x-2 max-w-3/4 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div className={`p-2 rounded-full ${isUser ? "bg-blue-600" : "bg-gray-700"}`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        <div className={`p-3 rounded-lg ${isUser ? "bg-blue-600" : "bg-gray-700"}`}>
          {/* Apply content formatting */}
          {formatMessageContent(message.content)}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
