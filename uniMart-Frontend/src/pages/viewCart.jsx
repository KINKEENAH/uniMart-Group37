import { useNavigate } from "react-router-dom";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function ViewCart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();

  const isEmpty = cartItems.length === 0;
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + tax;

  return (
    <section className="min-h-screen bg-[#F5F0E8] pt-16">
      {/* Breadcrumb + Continue Shopping */}
      <div className="px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/")}>{">"}</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>{"> Cart"}</span>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="text-sm text-[#F5A623] cursor-pointer hover:underline bg-transparent border-none"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="px-10 pb-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

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
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Cart items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => navigate("/productdetails", { state: { productId: item.id } })}
                    className="w-28 h-28 object-cover rounded-lg shrink-0 cursor-pointer"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                          <span className="text-xs text-gray-400">Subtotal</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">Seller: {item.seller.name}</p>
                        <p className="text-sm font-semibold text-gray-800 mt-1">₵{item.price}.00</p>
                      </div>
                      <p className="text-base font-bold text-[#F5A623] ml-4">
                        ₵{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1.5 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-4 text-sm font-medium border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none ml-auto"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-72 shrink-0 bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-800">₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (8%)</span>
                  <span className="text-gray-800">₵{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#F5A623]">₵{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#e09610] transition-colors"
              >
                Go to Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
