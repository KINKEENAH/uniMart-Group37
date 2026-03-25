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
}
