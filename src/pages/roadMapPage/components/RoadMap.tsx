import React, { useState } from "react";
import type { RoadmapItem } from "~/types/commonType";
import { ChevronRight, ChevronDown } from "lucide-react";

interface RoadmapProps {
  items: RoadmapItem[];
  onItemClick: (item: RoadmapItem) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ items, onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  // Toggle expanded state for a specific item
  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderItem = (item: RoadmapItem) => {
    const isExpanded = expandedItems[item.id] || false;

    return (
      <div key={item.id} className="mb-4">
        <div
          className="flex items-center p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
          onClick={() => {
            if (item.children.length > 0) {
              toggleExpand(item.id);
            } else {
              onItemClick(item);
            }
          }}
        >
          {item.children.length > 0 ? (
            isExpanded ? (
              <ChevronDown size={20} className="mr-2 text-gray-400" />
            ) : (
              <ChevronRight size={20} className="mr-2 text-gray-400" />
            )
          ) : (
            <ChevronRight size={20} className="mr-2 text-transparent" />
          )}
          <span>{item.title}</span>
        </div>
        {isExpanded && item.children.length > 0 && (
          <div className="ml-6 mt-2 border-l-2 border-gray-200 pl-4">
            {item.children.map(renderItem)}
          </div>
        )}
      </div>
    );
  };

  return <div className="p-6">{items.map(renderItem)}</div>;
};

export default Roadmap;
