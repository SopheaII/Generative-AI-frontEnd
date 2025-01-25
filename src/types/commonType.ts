export interface Message {
    role: "user" | "assistant"
    content: string
  }
  
  


  export interface RoadmapItem {
    id: number
    title: string
    children?: RoadmapItem[]
    detail?: string
  }