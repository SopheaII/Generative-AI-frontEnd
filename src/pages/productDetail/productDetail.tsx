import React, { useState } from 'react'
import { ShoppingCart, Heart, Search, ChevronDown, ChevronLeft, Star, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react'
import Footer from '~/components/footer'
import Navigation from '~/components/navigation'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { webRoutes } from '~/routes/web'

export interface ProductDetailProps {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    discount: number
    colors: string[]
    description?: string
    features?: string[]
}

const ProductDetail: React.FC = () => {
  // const product = 
  //   {
  //     id: 1,
  //     name: "3D™ wireless headset",
  //     price: 400,
  //     originalPrice: 500,
  //     image: "/headPhone1.jpg",
  //     discount: 20,
  //     description: "Headset from Cambodia",
  //     colors: ['bg-white', 'bg-black', 'bg-gray-500'],
  //     features: ["3D™ wireless headset", "PS2 DualShock 2 Wireless Controller", "Wired Keyboard & Mouse Combo Pack"] 
  //   }
  
  const [product, setProduct] = useState<ProductDetailProps>(
    {
      id: 1,
      name: "3D™ wireless headset",
      price: 400,
      originalPrice: 500,
      image: "/headPhone1.jpg",
      discount: 20,
      description: "Headset from Cambodia",
      colors: ['bg-white', 'bg-black', 'bg-gray-500'],
      features: ["3D™ wireless headset", "PS2 DualShock 2 Wireless Controller", "Wired Keyboard & Mouse Combo Pack"] 
    }
  )
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const { productId } = useParams(); // Retrieve productId from the URL
  console.log("Product ID:", product.image);

  const navigate = useNavigate();
  const handleNavigation = () => {
    const checkOutProduct = {
      ... product,
      color: selectedColor,
      quantity: quantity
    }
    localStorage.setItem("productCheckout", JSON.stringify(checkOutProduct));

    navigate(`${webRoutes.checkOut}`);
  };

  const handleProductDetail = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/product/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const result: ProductDetailProps = await response.json();
    setProduct(result)
    handleNavigation()
  };

  useEffect(() => {
    async () => {
      await handleProductDetail(productId)
    }
  }, [])



  return (
    <div className="min-h-screen bg-white">
      {/* Header (same as in App.tsx) */}
      <Navigation/>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href="/shop" className="text-gray-600 hover:text-blue-600">Shop</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
            {product.discount && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(64 reviews)</span>
            </div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="flex space-x-4 mb-8">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleNavigation}
              >
                Add to Cart
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-300">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">30 Days Return</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer (same as in App.tsx) */}
      <Footer/>
    </div>
  )
}

export default ProductDetail

function useEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error('Function not implemented.')
}

