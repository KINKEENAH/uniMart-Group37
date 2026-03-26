import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { updateQuantity, removeItem, getItemCount, formatPrice } from "../utils/cartUtils";

// Mock data - sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics • Audio",
    price: 199.99,
    quantity: 1,
    image: null // Will use placeholder
  },
  {
    id: 2,
    name: "Laptop Stand Aluminum",
    category: "Accessories • Desk",
    price: 49.99,
    quantity: 2,
    image: null
  },
  {
    id: 3,
    name: "Economics Textbook Bundle",
    category: "Books • Business",
    price: 85.00,
    quantity: 1,
    image: null
  },
  {
    id: 4,
    name: "USB-C Hub 7-in-1",
    category: "Electronics • Adapters",
    price: 29.99,
    quantity: 1,
    image: null
  }
];

export default function ViewCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleUpdateQuantity = (itemId, action) => {
    setCartItems(prev => updateQuantity(prev, itemId, action));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => removeItem(prev, itemId));
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    // This would connect to backend later
    setPromoError("Invalid promo code");
  };

  const itemCount = getItemCount(cartItems);
  const isEmpty = cartItems.length === 0;

  return (
    <section className="min-h-screen bg-[#F5F5F5] pt-20 px-4 md:px-8 pb-10">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </button>
          <h1 className="font-bold text-lg tracking-widest text-[#1A1A1A]">
            SHOPPING CART
          </h1>
          {!isEmpty && (
            <span className="border border-gray-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
      </div>

      {isEmpty ? (
        /* Empty Cart State */
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
          </div>
          <h2 className="font-semibold text-lg text-[#1A1A1A] mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-md text-sm tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Start Shopping <ShoppingBag size={16} />
          </button>
        </div>
      ) : (
        /* Cart with Items */
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h2 className="font-semibold text-sm text-[#1A1A1A] mb-4">
                Cart Items ({itemCount})
              </h2>
              
              <div className="space-y-3">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="text-xs text-gray-500 tracking-wider uppercase block mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-200 p-2.5 rounded-md outline-none placeholder:text-gray-300 text-sm focus:border-[#1A1A1A] transition-colors bg-[#F5F5F5]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 border border-gray-300 text-sm rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-500 mt-1">{promoError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Order Summary */}
          <div className="lg:w-80 shrink-0">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      )}
    </section>
  );
}