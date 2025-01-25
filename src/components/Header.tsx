import type React from "react"
import { BookOpen, User } from "lucide-react"

const Header: React.FC = () => {
  return (
    <header className=" border border-gray-400 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500 mr-2" />
            <span className="font-bold text-xl text-gray-900">AI Learning Roadmap</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 font-medium text-2xl">WMAD</span>
              {/* <User className="h-8 w-8 text-gray-500 bg-gray-200 rounded-full p-1" /> */}
              <img src="Logo.png" className="h-10 w-10 text-gray-500 bg-gray-200 rounded-full p-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

