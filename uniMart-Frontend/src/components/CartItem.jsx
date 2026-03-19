import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../utils/cartUtils";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const itemSubtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      {/* Image placeholder - matches checkout style */}
      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400 shrink-0">
        IMG
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-[#1A1A1A] text-sm">
              {item.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-300 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Price and quantity controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm font-semibold text-[#1A1A1A]">
            {formatPrice(item.price)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, 'decrease')}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>

            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, 'increase')}
              className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Item subtotal */}
        <div className="flex justify-end mt-2 text-xs">
          <span className="text-gray-500">Subtotal: </span>
          <span className="font-semibold text-[#1A1A1A] ml-1">
            {formatPrice(itemSubtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}