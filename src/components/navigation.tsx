import { Search, Heart, ShoppingCart, ChevronDown, User } from "lucide-react"
import { useState } from "react"
import { replace, useNavigate } from "react-router-dom";
import { useAppContext } from "~/context/appContext";
import { webRoutes } from "~/routes/web";


const Navigation: React.FC = () => {
    const { isMenuOpen, setIsMenuOpen } = useAppContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const isLogin = localStorage.getItem("token");

    const navigate = useNavigate();
    const handleNavigation = () => {
      localStorage.setItem("token", "");
      navigate(`${webRoutes.login}`, { replace: true });
    };

    return (
        <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">BuyWiz</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              {['Home', 'Shop', 'Pages', 'About', 'Blog', 'Contact'].map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium hover:text-blue-600">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  className="w-[200px] pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What are you looking for?"
                  type="search"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Profile Icon */}
              <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-6 h-6" />
              </button>
              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">My Orders</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">My Coins</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Message Center</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Payment</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Wish List</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">My Coupons</a>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Help Center</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Disputes & Reports</a>
                  <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleNavigation}
                  >Sign Out</a>
                </div>
              )}
              </div>

              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Navigation