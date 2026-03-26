import { useNavigate, useLocation } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { state: product } = useLocation();

  if (!product) {
    return <p className="text-center mt-10">No product found</p>;
  }

  return (
    <div className="pt-24 px-6 md:px-16">
      {/* Top Breadcrumb & Cart */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          &gt;{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/shop")}
          >
            Shop
          </span>{" "}
          &gt; {product.name}
        </p>

        <button
          onClick={() => navigate("/viewcart")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          View Cart
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: IMAGE */}
        <div className="bg-gray-200 p-6 rounded-lg flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-400px object-cover rounded-lg"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col">
          {/* Product Name */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating & Stock */}
          <p className="text-sm text-gray-600 mb-4">
            ⭐ {product.rating || "4.5"} ({product.reviews || 100} reviews) • In
            Stock
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">₵{product.price}</span>

            {product.oldPrice && (
              <>
                <span className="line-through text-gray-400">
                  ₵{product.oldPrice}
                </span>

                {/* Discount percentage */}
                <span className="bg-gray-300 text-sm px-2 py-1 rounded">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600 text-sm">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {(
                product.features || [
                  "High performance",
                  "Durable design",
                  "User friendly",
                ]
              ).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="font-semibold">
              {product.seller?.name || "John Doe"}
            </p>
            <p className="text-sm text-gray-600">
              📍 {product.seller?.location || "KNUST Campus"}
            </p>
            <p className="text-sm text-gray-600">
              ⭐ {product.seller?.rating || 4.7} •{" "}
              {product.seller?.sales || 500} sales
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/viewcart")}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/chatseller")}
              className="border border-black px-6 py-3 rounded hover:bg-gray-100"
            >
              Chat Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const price = parseFloat(product.price);
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;
  const sellerJoined = product.seller?.student_since
    ? new Date(product.seller.student_since).getFullYear()
    : new Date(product.seller?.created_at).getFullYear();

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      {/* Breadcrumb + View Cart */}
      <div className="px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>{">"}</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>{`> ${product.title}`}</span>
        </div>
        <button
          onClick={() => navigate("/viewcart")}
          className="flex items-center gap-2 bg-[#1A1A2E] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a4e] transition-colors"
        >
          <ShoppingCart size={15} /> View Cart
        </button>
      </div>

      <div className="px-10 pb-16 flex flex-col md:flex-row gap-10">
        {/* Product image */}
        <div className="w-full md:w-1/2 bg-white rounded-xl overflow-hidden flex items-center justify-center min-h-[420px]">
          {product.images?.[0]?.image_url ? (
            <img src={product.images[0].image_url} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <Package size={64} className="text-gray-200" />
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

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

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#F5A623]">₵{price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">₵{originalPrice.toFixed(2)}</span>
                <span className="text-xs border border-[#F5A623] text-[#F5A623] px-2 py-0.5 rounded">{discount}% OFF</span>
              </>
            )}
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

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A2E] text-white py-3 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2a2a4e] disabled:opacity-50 transition-colors"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              onClick={() => { if (!isLoggedIn) { navigate("/login"); return; } navigate("/chatseller", { state: { sellerId: product.seller?.id, sellerName: product.seller?.full_name, productId: product.id, productTitle: product.title } }); }}
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
