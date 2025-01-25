import type React from "react"
import type { RoadmapItem } from "~/types/commonType"
import { ChevronRight } from "lucide-react"

interface RoadmapProps {
  items: RoadmapItem[]
  onItemClick: (item: RoadmapItem) => void
}

const Roadmap: React.FC<RoadmapProps> = ({ items, onItemClick }) => {
  const renderItem = (item: RoadmapItem) => (
    <div key={item.id} className="mb-4">
      <div
        className="flex items-center p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
        onClick={() => onItemClick(item)}
      >
        <ChevronRight size={20} className="mr-2 text-gray-400" />
        <span>{item.title}</span>
      </div>
      {item.children.length > 0 && (
        <div className="ml-6 mt-2 border-l-2 border-gray-200 pl-4">{item.children.map(renderItem)}</div>
      )}
    </div>
  )

  return <div className="p-6">{items.map(renderItem)}</div>
}

export default Roadmap

