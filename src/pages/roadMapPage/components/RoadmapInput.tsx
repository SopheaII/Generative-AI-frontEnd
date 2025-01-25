import type React from "react"
import { useState } from "react"
import { Plus } from "lucide-react"

interface RoadmapInputProps {
  onAddItem: (topic: string) => void
}

const RoadmapInput: React.FC<RoadmapInputProps> = ({ onAddItem }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAddItem(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a learning topic..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  )
}

export default RoadmapInput

