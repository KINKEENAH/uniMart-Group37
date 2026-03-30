import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, MapPin, ShoppingCart, MessageCircle, Package, Heart } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useWishlist } from "../context/wishlistContext";

export default function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { wishlistIds, toggle: toggleWishlist } = useWishlist();

  const productId = location.state?.productId;
  // Optimistic data passed from the shop card
  const preview = location.state?.preview || null;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) { setError("No product selected."); setLoading(false); return; }
    fetch(`/api/products/${productId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.product) setProduct(data.product);
        else setError(data.message || "Product not found");
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) { navigate("/login"); return; }
    addToCart({
      id: product.id,
      name: product.title,
      price: parseFloat(product.price),
      image: product.images?.[0]?.image_url || null,
      category: product.category?.name || "",
      seller: { id: product.seller?.id || null, name: product.seller?.full_name || "—" },
    });
    navigate("/viewcart");
  };

  if (!loading && (error || !product)) return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-sm">{error || "Product not found."}</p>
      <button onClick={() => navigate("/shop")} className="text-[#F5A623] underline text-sm cursor-pointer">
        Back to Shop
      </button>
    </div>
  );

  // Use full product if loaded, otherwise fall back to preview data
  const display = product || preview;

  if (!display) return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 flex items-center justify-center text-gray-400 text-sm">
      Loading product...
    </div>
  );

  const price = parseFloat(display.price);
  const originalPrice = (product || display).original_price ? parseFloat((product || display).original_price) : null;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;
  const sellerJoined = product?.seller?.student_since
    ? new Date(product.seller.student_since).getFullYear()
    : product?.seller?.created_at
    ? new Date(product.seller.created_at).getFullYear()
    : "—";

  const coverImage = product?.images?.[0]?.image_url || display?.image || null;
  const title = display?.title || display?.name || "—";

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-6">
      {/* Breadcrumb + View Cart */}
      <div className="px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>{">"}</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>{`> ${title}`}</span>
        </div>
        <button
          onClick={() => navigate("/viewcart")}
          className="flex items-center gap-2 bg-[#1A1A2E] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a4e] transition-colors"
        >
          <ShoppingCart size={15} /> View Cart
        </button>
      </div>

      <div className="px-10 pb-16 flex flex-col md:flex-row gap-10">
        {/* Product image — shows immediately from preview */}
        <div className="w-full md:w-[42%] bg-white rounded-xl overflow-hidden flex items-center justify-center h-72 md:h-120 shrink-0">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Package size={64} className="text-gray-200" />
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Name + price show immediately */}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#F5A623]">₵{price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">₵{originalPrice.toFixed(2)}</span>
                <span className="text-xs border border-[#F5A623] text-[#F5A623] px-2 py-0.5 rounded">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Rest shows after fetch or as skeleton */}
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/6" />
              <div className="h-20 bg-gray-200 rounded w-full mt-2" />
            </div>
          ) : (
            <>
              {/* Rating + stock */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <Star size={15} className="fill-[#F5A623] text-[#F5A623]" />
                  {product.seller?.rating?.toFixed(1) || "0.0"}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${product.stock_quantity > 0 ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-500"}`}>
                  {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Key Features */}
              {product.key_features?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {product.key_features.map((f) => (
                      <li key={f.id} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Seller card */}
              <div className="border border-gray-200 rounded-xl p-4 flex items-start justify-between bg-white">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-gray-800">{product.seller?.full_name || "—"}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
                    {product.seller?.rating?.toFixed(1) || "0.0"} rating • {product.seller?.total_sales || 0} sales
                  </div>
                  {product.seller?.campus_location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} /> {product.seller.campus_location}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-400">Joined since {sellerJoined}</span>
              </div>
            </>
          )}

          {/* Action buttons — always visible */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={loading || (product && product.stock_quantity === 0)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A2E] text-white py-3 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2a2a4e] disabled:opacity-50 transition-colors"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) { navigate("/login"); return; }
                toggleWishlist(display.id);
              }}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#F5A623] transition-colors"
            >
              <Heart size={18} className={wishlistIds.has(display?.id) ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-400"} />
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) { navigate("/login"); return; }
                navigate("/chatseller", { state: { sellerId: product?.seller?.id, sellerName: product?.seller?.full_name, productId: display.id, productTitle: title } });
              }}
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
