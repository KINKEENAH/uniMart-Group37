import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, SlidersHorizontal, User, ChevronLeft, ChevronRight, ShoppingCart, Check, Package } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

const categories = ["All", "Electronics", "Clothing", "Food", "Books", "Accessories", "Other"];
const PER_PAGE = 8;

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn, token } = useAuth();

  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState({});
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeCategory !== "All" ? `?category=${encodeURIComponent(activeCategory)}` : "";
      const res = await fetch(`/api/products${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) setProducts(data.products);
    } catch {}
    finally { setLoading(false); }
  }, [activeCategory, token]);

  useEffect(() => {
    fetchProducts();
    setPage(1);
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    addToCart({
      id: product.id,
      name: product.title,
      price: parseFloat(product.price),
      image: product.images?.[0]?.image_url || null,
      category: product.category?.name || "",
      seller: { name: product.seller?.full_name || "—" },
    });
    setToast(product.title);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleLike = (id) => {
    if (!isLoggedIn) { navigate("/login"); return; }
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPages = Math.ceil(products.length / PER_PAGE);
  const paginated = products.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-[#1A1A2E] text-white text-sm px-5 py-3 rounded-xl shadow-lg">
          <div className="w-5 h-5 bg-[#F5A623] rounded-full flex items-center justify-center shrink-0">
            <Check size={12} />
          </div>
          <span><span className="font-semibold">{toast}</span> added to cart</span>
          <button onClick={() => navigate("/viewcart")} className="ml-2 text-[#F5A623] underline text-xs cursor-pointer">
            View Cart
          </button>
        </div>
      )}

      {/* Category bar */}
      <div className="bg-white border-b border-gray-200 px-10 py-4 flex items-center justify-between">
        <div className="flex gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm cursor-pointer bg-transparent border-none pb-1 whitespace-nowrap transition-colors duration-200 ${
                activeCategory === cat
                  ? "text-gray-900 font-semibold underline underline-offset-4"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer bg-transparent border-none hover:text-gray-900 shrink-0 ml-4">
          <SlidersHorizontal size={16} /> Filter
        </button>
      </div>

      {/* Product grid */}
      <div className="px-10 py-10">
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-20">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {paginated.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="relative">
                  {product.images?.[0]?.image_url ? (
                    <img
                      src={product.images[0].image_url}
                      alt={product.title}
                      onClick={() => navigate("/productdetails", { state: { productId: product.id } })}
                      className="w-full h-40 object-cover cursor-pointer"
                    />
                  ) : (
                    <div
                      onClick={() => navigate("/productdetails", { state: { productId: product.id } })}
                      className="w-full h-40 bg-gray-100 flex items-center justify-center cursor-pointer"
                    >
                      <Package size={32} className="text-gray-300" />
                    </div>
                  )}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                  >
                    <Heart size={16} className={liked[product.id] ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-400"} />
                  </button>
                </div>

                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                  <p className="text-sm font-semibold text-[#F5A623]">GHS {parseFloat(product.price).toFixed(2)}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User size={13} />
                    {product.seller?.full_name || "—"}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-full bg-[#F5A623] text-white text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#e09610] transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={12} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
