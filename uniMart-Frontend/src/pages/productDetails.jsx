import { useNavigate, useLocation } from "react-router-dom";
import { Star, MapPin, ShoppingCart, MessageCircle } from "lucide-react";
import products from "../data/products";
import { useCart } from "../context/cartContext";

export default function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const productId = location.state?.productId;
  const product = products.find((p) => p.id === productId) || products[0];

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16">
      {/* Breadcrumb + View Cart */}
      <div className="px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span
            className="cursor-pointer hover:text-gray-800"
            onClick={() => navigate("/shop")}
          >
            &gt;
          </span>
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>
            &gt; {product.name}
          </span>
        </div>
        <button
          onClick={() => navigate("/viewcart")}
          className="flex items-center gap-2 bg-[#1A1A2E] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a4e] transition-colors"
        >
          <ShoppingCart size={15} /> View Cart
        </button>
      </div>

      {/* Main content */}
      <div className="px-10 pb-16 flex flex-col md:flex-row gap-10">
        {/* Product image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl overflow-hidden flex items-center justify-center min-h-[420px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating + stock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Star size={15} className="fill-[#F5A623] text-[#F5A623]" />
              {product.rating}
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${product.inStock ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-500"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#F5A623]">₵{product.price}.00</span>
            <span className="text-sm text-gray-400 line-through">₵{product.originalPrice}.00</span>
            <span className="text-xs border border-[#F5A623] text-[#F5A623] px-2 py-0.5 rounded">
              {product.discount}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
            <ul className="space-y-1">
              {product.features.map((f, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Seller card */}
          <div className="border border-gray-200 rounded-xl p-4 flex items-start justify-between bg-white">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                {product.seller.name}
                <span className="w-4 h-4 rounded-full border border-gray-400 inline-block" />
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
                {product.seller.rating} rating • {product.seller.sales.toLocaleString()} sales
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                {product.seller.location}
              </div>
            </div>
            <span className="text-xs text-gray-400">Joined since {product.seller.joined}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => { addToCart(product); navigate("/viewcart"); }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A2E] text-white py-3 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2a2a4e] transition-colors"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              onClick={() => navigate("/chatseller")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A2E] text-white py-3 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2a2a4e] transition-colors"
            >
              <MessageCircle size={16} /> Chat Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
