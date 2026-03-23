import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/cartContext";
import OrderSummary from "../components/OrderSummary";
import { getItemCount } from "../utils/cartUtils";

export default function ViewCart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const itemCount = getItemCount(cartItems);
  const isEmpty = cartItems.length === 0;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return setPromoError("Please enter a promo code");
    setPromoError("Invalid promo code");
  };

  return (
    <section className="min-h-screen bg-[#F5F0E8] pt-20 px-4 md:px-10 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Shop
        </button>
        <h1 className="font-bold text-lg tracking-widest text-gray-900">SHOPPING CART</h1>
        {!isEmpty && (
          <span className="border border-gray-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {isEmpty ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
          </div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mb-6">Add some products from the shop.</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1A1A2E] text-white px-6 py-3 rounded-lg text-sm hover:bg-[#2a2a4e] transition-colors inline-flex items-center gap-2"
          >
            Start Shopping <ShoppingBag size={16} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items */}
          <div className="flex-1 bg-white rounded-xl p-5 border border-gray-200">
            <h2 className="font-semibold text-sm text-gray-900 mb-4">Cart Items ({itemCount})</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shrink-0 cursor-pointer"
                    onClick={() => navigate("/productdetails", { state: { productId: item.id } })}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm font-semibold text-[#F5A623]">GHS {item.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end mt-1 text-xs text-gray-500">
                      Subtotal: <span className="font-semibold text-gray-800 ml-1">GHS {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                  placeholder="Enter code"
                  className="flex-1 border border-gray-200 p-2.5 rounded-lg outline-none text-sm focus:border-[#F5A623] bg-[#F5F0E8]"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-80 shrink-0">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      )}
    </section>
  );
}
