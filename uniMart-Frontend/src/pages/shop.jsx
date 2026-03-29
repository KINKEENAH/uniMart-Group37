import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, SlidersHorizontal, User, ChevronLeft, ChevronRight, ShoppingCart, Check, Package, Search, X } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useWishlist } from "../context/wishlistContext";

const categories = ["All", "Electronics", "Clothing", "Food", "Books", "Accessories", "Other"];
const PER_PAGE = 8;

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn, token } = useAuth();
  const { wishlistIds, toggle: toggleWishlist } = useWishlist();

  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.set("category", activeCategory);
      if (searchQuery) params.set("search", searchQuery);
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/products${query}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) setProducts(data.products);
    } catch {}
    finally { setLoading(false); }
  }, [activeCategory, searchQuery, token]);

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
    toggleWishlist(id);
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
      <div className="bg-white border-b border-gray-200 px-4 md:px-10 py-3 flex flex-col gap-2">
        {/* Mobile: search row only */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); setPage(1); }}
          className="flex items-center gap-2 md:hidden"
        >
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
            {searchInput && (
              <button type="button" onClick={() => { setSearchInput(""); setSearchQuery(""); setPage(1); }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>
          <button type="submit" className="bg-[#F5A623] text-white text-sm px-4 py-2 rounded-xl cursor-pointer hover:bg-[#e09610] transition-colors shrink-0">
            Search
          </button>
        </form>

        {/* Categories row — on desktop includes search on the right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`text-sm cursor-pointer bg-transparent border-none pb-0.5 whitespace-nowrap transition-colors duration-200 shrink-0 ${
                  activeCategory === cat
                    ? "text-gray-900 font-semibold underline underline-offset-4 decoration-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop: search + filter on the right */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); setPage(1); }}
            className="hidden md:flex items-center gap-2 shrink-0"
          >
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400 w-full"
              />
              {searchInput && (
                <button type="button" onClick={() => { setSearchInput(""); setSearchQuery(""); setPage(1); }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X size={13} />
                </button>
              )}
            </div>
            <button type="submit" className="bg-[#F5A623] text-white text-sm px-4 py-2 rounded-xl cursor-pointer hover:bg-[#e09610] transition-colors">
              Search
            </button>
            <button type="button" className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer bg-transparent border-none hover:text-gray-900">
              <SlidersHorizontal size={16} /> Filter
            </button>
          </form>
        </div>
      </div>

      {/* Product grid */}
      <div className="px-2 md:px-10 py-6 md:py-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="w-full h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-9 bg-gray-200 rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
            {paginated.map((product) => {
              const isWishlisted = wishlistIds.has(product.id);
              const coverImage = product.images?.[0]?.image_url || null;
              return (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">

                  {/* Image area */}
                  <div className="relative">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={product.title}
                        onClick={() => navigate("/productdetails", {
                          state: {
                            productId: product.id,
                            preview: { id: product.id, title: product.title, price: product.price, image: coverImage }
                          }
                        })}
                        className="w-full h-32 md:h-44 object-cover cursor-pointer"
                      />
                    ) : (
                      <div
                        onClick={() => navigate("/productdetails", {
                          state: {
                            productId: product.id,
                            preview: { id: product.id, title: product.title, price: product.price, image: null }
                          }
                        })}
                        className="w-full h-32 md:h-44 bg-gray-100 flex items-center justify-center cursor-pointer"
                      >
                        <Package size={36} className="text-gray-300" />
                      </div>
                    )}

                    {/* Heart button */}
                    <button
                      onClick={() => toggleLike(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={15}
                        className={isWishlisted ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-400"}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-2.5 md:p-4 flex flex-col gap-1 md:gap-1.5 flex-1">
                    <p
                      className="text-xs md:text-sm font-semibold text-gray-900 truncate cursor-pointer hover:text-[#F5A623] transition-colors"
                      onClick={() => navigate("/productdetails", {
                        state: {
                          productId: product.id,
                          preview: { id: product.id, title: product.title, price: product.price, image: coverImage }
                        }
                      })}
                    >
                      {product.title}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-[#F5A623]">
                      GHS {parseFloat(product.price).toFixed(0)}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <User size={13} className="shrink-0" />
                      <span className="truncate">{product.seller?.full_name || "—"}</span>
                    </div>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 w-full bg-[#F5A623] text-white text-xs md:text-sm font-semibold py-2 md:py-2.5 rounded-xl cursor-pointer hover:bg-[#e09610] active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-5 py-2.5 bg-[#1A1A2E] text-white text-sm rounded-xl disabled:opacity-40 cursor-pointer hover:bg-[#2a2a4e] transition-colors"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                  page === n ? "bg-[#F5A623] text-white" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-5 py-2.5 bg-[#1A1A2E] text-white text-sm rounded-xl disabled:opacity-40 cursor-pointer hover:bg-[#2a2a4e] transition-colors"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
