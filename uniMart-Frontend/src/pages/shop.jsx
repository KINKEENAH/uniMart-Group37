import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, SlidersHorizontal, User, ChevronLeft, ChevronRight } from "lucide-react";
import products from "../data/products";
import { useCart } from "../context/cartContext";

const categories = ["Electronics", "Clothing", "Food", "Books"];

const allProducts = products;

const PER_PAGE = 8;

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [liked, setLiked] = useState({});
  const [page, setPage] = useState(1);

  const filtered = allProducts.filter((p) => p.category === activeCategory);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16">
      {/* Category bar */}
      <div className="bg-white border-b border-gray-200 px-10 py-4 flex items-center justify-between">
        <div className="flex gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`text-sm cursor-pointer bg-transparent border-none pb-1 transition-colors duration-200 ${
                activeCategory === cat
                  ? "text-gray-900 font-semibold underline underline-offset-4 decoration-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer bg-transparent border-none hover:text-gray-900">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </div>

      {/* Product grid */}
      <div className="px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {paginated.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => navigate("/productdetails", { state: { productId: product.id } })}
                  className="w-full h-40 object-cover cursor-pointer"
                />
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                >
                  <Heart
                    size={16}
                    className={liked[product.id] ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1 flex-1">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm font-semibold text-[#F5A623]">GHS {product.price}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User size={13} />
                  {product.seller.name}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full bg-[#F5A623] text-white text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#e09610] transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 bg-[#1A1A2E] text-white text-sm rounded-lg disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold cursor-pointer ${
                  page === n ? "bg-[#F5A623] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 bg-[#1A1A2E] text-white text-sm rounded-lg disabled:opacity-40 cursor-pointer"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
