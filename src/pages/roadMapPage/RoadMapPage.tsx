import type React from "react";
import { useState } from "react";
import { RoadmapItem } from "~/types/commonType";
import Roadmap from "./components/RoadMap";
import RoadmapDetail from "./components/RoadmapDetail";
import RoadmapInput from "./components/RoadmapInput";
import ChatPage from "../chatPage/ChatPage";
import Header from "~/components/Header";

const RoadMap: React.FC = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);

  const handleAddRoadmapItem = (topic: string) => {
    // In a real application, this would call an AI service to generate the roadmap
    const newItem: RoadmapItem = {
      id: Date.now(),
      title: topic,
      children: [
        { id: Date.now() + 1, title: "Subtopic 1", children: [] },
        { id: Date.now() + 2, title: "Subtopic 2", children: [] },
      ],
    };
    setRoadmapItems([...roadmapItems, newItem]);
  };

  return (
    <div className="flex flex-col h-screen shadow-lg">
      {/* <header className="bg-gray-700 p-4 text-xl font-bold">
        Skility Chat
      </header> */}
      <Header/>
      <div className="flex h-full bg-gray-100">
        <div className="w-1/2 bg-white border-r border-gray-200">
          <ChatPage />
        </div>
        <div className="w-2/3 flex flex-col">
          <RoadmapInput onAddItem={handleAddRoadmapItem} />
          <div className="flex-1 overflow-auto">
            {selectedItem ? (
              <RoadmapDetail
                item={selectedItem}
                onBack={() => setSelectedItem(null)}
              />
            ) : (
              <Roadmap items={roadmapItems} onItemClick={setSelectedItem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
