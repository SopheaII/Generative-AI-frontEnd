import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ProductDetailProps } from "~/pages/productDetail/productDetail";
import { webRoutes } from "~/routes/web";

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListingResponse {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  colors: string[];
  features: string[]
}

const ProductCard: FC = () => {
  const navigate = useNavigate();
  // const [products, setProducts] = useState<ProductListingResponse[]>()

  const products = [
    {
      id: "1",
      name: "3D™ wireless headset",
      price: 400,
      originalPrice: 500,
      image: "headPhone1.jpg",
      discount: 20,
      colors: ["bg-white", "bg-black", "bg-gray-500"],
    },
    {
      id: "2",
      name: "PS2 DualShock 2 Wireless Controller",
      price: 29.99,
      originalPrice: 49.99,
      image: "headPhone1.jpg",
      discount: 40,
      colors: ["bg-blue-900", "bg-black", "bg-white"],
    },
    {
      id: "3",
      name: "Wired Keyboard & Mouse Combo Pack",
      price: 32.99,
      originalPrice: 55.99,
      image: "headPhone1.jpg",
      discount: 41,
      colors: ["bg-black", "bg-gray-500", "bg-white"],
    },
    {
      id: "4",
      name: "Logitech Streamcam",
      price: 199,
      originalPrice: 299,
      image: "headPhone1.jpg",
      discount: 33,
      colors: ["bg-white", "bg-black", "bg-gray-500"],
    },
    {
      id: "5",
      name: "3D™ wireless headset",
      price: 387,
      originalPrice: 419,
      image: "headPhone1.jpg",
      discount: 35,
      colors: ["bg-black", "bg-gray-500", "bg-white"],
    },
    {
      id: "6",
      name: "Bass Meets Clarity",
      price: 233,
      originalPrice: 400,
      image: "headPhone1.jpg",
      discount: 42,
      colors: ["bg-red-500", "bg-black", "bg-white"],
    },
  ];

  const handleProductListing = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/product/all`,
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
    const result: ProductListingResponse[] = await response.json();
    // setProducts(result)
  };

  useEffect(() => {
    async () => {
      await handleProductListing()
    }
  }, [])

  const handleNavigation = (id: string) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden group"
            onClick={() => handleNavigation(product.id)}
          >
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {product.discount && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex space-x-1">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
