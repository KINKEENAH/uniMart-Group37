import { useNavigate } from "react-router-dom";
import { calculateSubtotal, calculateTax, calculateTotal, formatPrice } from "../utils/cartUtils";

export default function OrderSummary({ items }) {
  const navigate = useNavigate();
  
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <h2 className="font-semibold text-sm text-[#1A1A1A] mb-4">Order Summary</h2>

      {/* Item count */}
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>Items ({itemCount})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Tax (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Delivery</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-3 border-t border-gray-100">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Checkout button */}
      <button
        onClick={() => navigate("/checkout")}
        disabled={items.length === 0}
        className="w-full bg-[#1A1A1A] text-white p-3 rounded-md text-sm tracking-wider mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>

      {/* Continue shopping link */}
      <button
        onClick={() => navigate("/")}
        className="w-full text-center text-xs text-gray-400 hover:text-[#1A1A1A] transition-colors mt-3"
      >
        Continue Shopping
      </button>
    </div>
  );
}