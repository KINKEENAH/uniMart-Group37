import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/authContext";

const categories = ["Electronics", "Accessories", "Books", "Clothing", "Food", "Other"];

const inputClass =
  "w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-colors";

export default function EditProductModal({ product, onClose, onUpdated }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: product.title || "",
    category: product.category?.name || "",
    price: product.price || "",
    stock_quantity: product.stock_quantity || "",
    description: product.description || "",
    status: product.status || "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Update failed");
      onUpdated(data.product);
      onClose();
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg text-gray-900">Edit Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Product Title</label>
            <input name="title" value={form.title} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 block mb-1">Price (₵)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600 block mb-1">Stock</label>
              <input type="number" name="stock_quantity" value={form.stock_quantity} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-[#F5A623] text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#e09610] disabled:opacity-60 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
