import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Product added:", product);
    navigate("/sellerdashboard"); // go back to dashboard after adding
  };

  return (
    <section className="min-h-screen bg-[#F5F5F5] pt-18 pb-10">
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl text-[#1A1A1A]">Add New Product</h1>
          <button
            onClick={() => navigate("/sellerdashboard")}
            className="text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            ← Back
          </button>
        </div>

        <div className="space-y-4">
          {/* product name */}
          <div>
            <label className="text-xs text-gray-500 tracking-wider uppercase">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="border border-[#E5E7EB] p-3 w-full rounded-md outline-none placeholder:text-[#B9B9B9] focus:border-[#1A1A1A] transition-colors mt-1"
            />
          </div>

          {/* category */}
          <div>
            <label className="text-xs text-gray-500 tracking-wider uppercase">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border border-[#E5E7EB] p-3 w-full rounded-md outline-none focus:border-[#1A1A1A] transition-colors mt-1 text-sm"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* price and stock */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 tracking-wider uppercase">Price (₵)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                className="border border-[#E5E7EB] p-3 w-full rounded-md outline-none placeholder:text-[#B9B9B9] focus:border-[#1A1A1A] transition-colors mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 tracking-wider uppercase">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="0"
                className="border border-[#E5E7EB] p-3 w-full rounded-md outline-none placeholder:text-[#B9B9B9] focus:border-[#1A1A1A] transition-colors mt-1"
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="text-xs text-gray-500 tracking-wider uppercase">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows={4}
              className="border border-[#E5E7EB] p-3 w-full rounded-md outline-none placeholder:text-[#B9B9B9] focus:border-[#1A1A1A] transition-colors mt-1 resize-none"
            />
          </div>

          {/* image upload */}
          <div>
            <label className="text-xs text-gray-500 tracking-wider uppercase">Product Image</label>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-md p-8 text-center mt-1 cursor-pointer hover:border-[#1A1A1A] transition-colors">
              <p className="text-sm text-gray-400">Click to upload image</p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          {/* submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#1A1A1A] text-white p-3 rounded-md tracking-wider text-sm hover:bg-gray-800 transition-colors mt-2"
          >
            Add Product
          </button>
        </div>
      </div>
    </section>
  );
}