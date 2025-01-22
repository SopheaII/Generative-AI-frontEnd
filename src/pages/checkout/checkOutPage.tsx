import React, { useEffect, useState } from "react";
import { CreditCard, Package, Store, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
  discount: number;
}

interface PaymentWithCardResponse {
  message: string
  redirectURL: string
}

interface TokenizePaymentResponse {
    message: string
    data?: string,
    redirectUrl: string
}

interface SavedCard {
  id: string;
  last4: string;
  brand: "visa" | "mastercard";
}

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<"new" | "saved">("new");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [product, setProduct] = useState<Product>({
    id: "1",
    name: "3D™ wireless headset",
    price: 20.0,
    quantity: 1,
    color: "bg-gray-500",
    discount: 20,
    image: "/headPhone1.jpg",
  })

  const savedCards: SavedCard[] = [
    { id: "1", last4: "4242", brand: "visa" },
    { id: "2", last4: "5555", brand: "mastercard" },
  ];

  const [subtotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  let shipping = 5.0;

  useEffect(() => {
    const productString = localStorage.getItem("productCheckout");

    productString ? setProduct(JSON.parse(productString)) : null;
    if (product) {
      setSubTotal(product.price * product.quantity)
      setTotal(subtotal + shipping + product.discount)
    }
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    
    if(paymentMethod == "new"){
      const payload = {
          "quantity": product.quantity,
          "productId": ""
      }
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const result: PaymentWithCardResponse = await response.json();
      window.location.href = result.redirectURL; 

    }else if(paymentMethod == "saved"){

      const payload = {
        "quantity": product.quantity,
        "productId": "",
        "tokenId": ""
      }
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/tokenize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
  
      const result: TokenizePaymentResponse = await response.json();
      window.location.href = result.redirectUrl; 
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-blue-600">
              BuyWiz
            </a>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  ✓
                </div>
                <span className="text-sm">Cart</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  ✓
                </div>
                <span className="text-sm">Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  3
                </div>
                <span className="text-sm font-medium">Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Shipping & Payment */}
          <div>
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Brandon Johnson"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="brandonjohnson@gmail.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="092 987 656"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="No G08, str 271, St Gold, Phnom Penh"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "new"}
                    onChange={() => setPaymentMethod("new")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pay with new card</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "saved"}
                    onChange={() => setPaymentMethod("saved")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pay with saved card</span>
                </label>

                {paymentMethod === "saved" && (
                  <div className="space-y-3 mt-4">
                    {savedCards.map((card) => (
                      <label
                        key={card.id}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="savedCard"
                          value={card.id}
                          checked={selectedCard === card.id}
                          onChange={() => setSelectedCard(card.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 flex items-center">
                          {card.brand === "visa" ? (
                            <svg
                              className="h-8 w-8 mr-2"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <rect
                                width="32"
                                height="32"
                                rx="4"
                                fill="#1A1F71"
                              />
                              <path
                                d="M13.3233 20.2051H10.5097L8.41406 12.7793C8.34056 12.5374 8.19608 12.3244 7.99609 12.1875C7.46761 11.8506 6.88729 11.5904 6.26953 11.4102V11.0957H10.7266C11.2324 11.0957 11.6058 11.4476 11.6709 11.9531L12.7363 17.9238L15.3613 11.0957H18.0742L13.3233 20.2051Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-8 w-8 mr-2"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <rect
                                width="32"
                                height="32"
                                rx="4"
                                fill="#FF5F00"
                              />
                              <circle cx="11" cy="16" r="7" fill="#EB001B" />
                              <circle cx="21" cy="16" r="7" fill="#F79E1B" />
                            </svg>
                          )}
                          <span>
                            {card.brand.charAt(0).toUpperCase() +
                              card.brand.slice(1)}{" "}
                            ending in {card.last4}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Review your cart</h2>

              <div className="space-y-4 mb-6">
                <div key={product.id} className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-500">Color:</p>
                      <div
                        className={`w-4 h-4 rounded-full ${product.color} ring-offset-1 ring-1 ring-blue-500`}
                      />
                    </div>
                    <p className="text-sm text-gray-500">{product.quantity}x</p>
                  </div>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button className="px-4 py-2 text-blue-600 font-medium">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">${product.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handlePayment}
              >
                Pay Now
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <CreditCard className="h-4 w-4" />
                <span>Secure Checkout - SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
