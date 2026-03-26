import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Apple Watch Series 10",
      price: 350,
      oldPrice: 550,
      image: "/images/Apple-watch.jpg",
      rating: 4.8,
      reviews: 324,
      description:
        "The Apple Watch Series 10 is Apple's thinnest smartwatch yet, offering a more comfortable fit without compromising performance.",
      features: [
        "Blood Oxygen Monitoring",
        "Sleep Apnea Detection",
        "ECG App",
        "Cycle Tracking",
      ],
      seller: {
        name: "James Appiah",
        location: "Queen's Hall, KNUST",
        sales: 2543,
        rating: 4.8,
      },
    },
    {
      id: 2,
      name: "Sneakers",
      price: 200,
      oldPrice: 250,
      image: "/images/shoe.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Comfortable running sneakers for daily workouts.",
      features: ["Lightweight", "Breathable", "Durable sole"],
      seller: {
        name: "ShoeStore Ltd",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
    {
      id: 3,
      name: "Exotic Designer Shoulder bag",
      price: 350,
      oldPrice: 450,
      image: "/images/bag.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Elegant classic handbag for ladies",
      features: [
        "Lightweight",
        "Waterproof",
        "Soft",
        "Large capacity",
        "Fashionable",
      ],
      seller: {
        name: "Exotic",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
    {
      id: 4,
      name: "Designed Cotton Tshirt",
      price: 60,
      oldPrice: 70,
      image: "/images/dshirt.jpg",
      rating: 4.5,
      reviews: 410,
      description:
        "Classy and comfortable wear with elegant designs that elevate your style",
      features: [
        "Quality cotton",
        "Comfortable on the skin",
        "Heat repellant",
        "Fashionable",
        "Different colours available",
      ],
      seller: {
        name: "Nuella's Collection",
        location: "Brunei Complex",
        sales: 340,
        rating: 4.7,
      },
    },
    {
      id: 5,
      name: "Cotton Tshirt",
      price: 40,
      oldPrice: 45,
      image: "/images/shirts.jpg",
      rating: 4.5,
      reviews: 310,
      description: "Classy and comfortable wear for every outing",
      features: [
        "Quality cotton",
        "Comfortable on the skin",
        "Heat repellant",
        "Fashionable",
        "Different colours available",
      ],
      seller: {
        name: "Nuella's Collection",
        location: "Brunei Complex ",
        sales: 340,
        rating: 4.6,
      },
    },
    {
      id: 6,
      name: "Ladies Tote Bag",
      price: 350,
      oldPrice: 450,
      image: "/images/tote.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Classic handbag for Commuting and Daily Use",
      features: [
        "Lightweight",
        "Waterproof",
        "Soft",
        "Large capacity",
        "Fashionable",
      ],
      seller: {
        name: "Ammy's Bags",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
  ];

  return (
    <div className="pt-24 px-6 md:px-16 pd-16 bg-[#dcd7c4]">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition duration-200"
          >
            <div
              className="bg-gray-200 p-4 flex w-full  items-center justify-center"
              onClick={() => navigate("/productdetails", { state: product })}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded"
              />
            </div>
            <div className="p-4 bg-[#f8f7e9] ">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 font-bold mb-2">GH₵{product.price}</p>
              <p className="text-gray-700 font-bold">👤{product.seller.name}</p>
            </div>
            <div className="grid place-items-center bg-[#f8f7e9] py-3">
              <button
                onClick={() => navigate("/viewcart")}
                className="bg-[#f5ba25] text-center w-3/4 text-black px-16 py-3 rounded hover:bg-[#8d8793]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
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
    // normalise shape for cart
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
                {/* Image */}
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
                    <Heart
                      size={16}
                      className={liked[product.id] ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-400"}
                    />
                  </button>
                </div>

                {/* Info */}
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
