import { useAppContext } from "~/context/appContext";
import ProductCard from "./productCard"


const SideBar = ({ children }: { children: React.ReactNode }) => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

    return(
        <>
        <div className="flex items-center space-x-2 mb-8">
          <a href="/" className="text-sm text-gray-500 hover:text-blue-600">
            Home
          </a>
          <span className="text-sm text-gray-500">/</span>
          <span className="text-sm">Shop</span>
        </div>

        <h1 className="text-3xl font-bold mb-8">Explore All Products</h1>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3 hidden md:block">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">CATEGORIES</h3>
                <div className="space-y-2">
                  {['Electronics', 'NFT', 'Jewellery', 'Fashion', 'Furniture'].map((category) => (
                    <div key={category} className="flex items-center">
                      <input type="checkbox" id={category} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor={category} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h3 className="font-semibold mb-4">GENDER</h3>
                <div className="space-y-2">
                  {['Men', 'Women', 'Unisex'].map((gender) => (
                    <div key={gender} className="flex items-center">
                      <input type="checkbox" id={gender} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor={gender} className="ml-2 text-sm text-gray-700">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-4">COLORS</h3>
                <div className="flex flex-wrap gap-2">
                  {['bg-red-500', 'bg-blue-500', 'bg-gray-300', 'bg-gray-500', 'bg-yellow-500', 'bg-blue-900'].map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${color} border border-gray-200`}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-semibold mb-4">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {['XXL', 'XL', 'L', 'M', 'S', 'XS'].map((size) => (
                    <button key={size} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">PRICE</h3>
                <div className="space-y-2">
                  {['$0 - $50', '$50 - $100', '$100 - $200', '$200 - $300', '$300 - $400', '$400 - $500'].map((range) => (
                    <div key={range} className="flex items-center">
                      <input type="checkbox" id={range} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <label htmlFor={range} className="ml-2 text-sm text-gray-700">
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100">
                All Reset
              </button>
            </div>
          </div>

          {children}
          
        </div></>
    )
}

export default SideBar