import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, ArrowLeft, Tag, Package, FileText, DollarSign } from "lucide-react";
import { useAuth } from "../context/authContext";

const categories = ["Electronics", "Accessories", "Books", "Clothing", "Food", "Other"];

const inputClass =
  "w-full border border-gray-200 rounded-lg p-3 text-sm outline-none placeholder:text-gray-300 focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-colors bg-white";

export default function AddProduct() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const fileRef = useRef(null);

  const [product, setProduct] = useState({
    name: "", category: "", price: "", stock: "", description: "",
  });
  const [images, setImages] = useState([]); // array of { file, preview }
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFiles = (files) => {
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 4 - images.length) // max 4 images
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Convert a File to base64 data URL
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async () => {
    if (!product.name || !product.category || !product.price) return;
    setSubmitted(true);
    try {
      // Convert all selected images to base64
      const base64Images = await Promise.all(images.map((i) => toBase64(i.file)));

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.name,
          category: product.category,
          price: product.price,
          stock_quantity: product.stock || 1,
          description: product.description,
          images: base64Images,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitted(false);
        alert(data.message || "Failed to add product");
        return;
      }

      setTimeout(() => {
        setSubmitted(false);
        navigate("/sellerprofile");
      }, 1000);
    } catch {
      setSubmitted(false);
      alert("Network error. Is the server running?");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/sellerprofile")}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
        </div>

        <div className="flex flex-col gap-5">

          {/* Image Upload */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-sm text-gray-900 mb-1 flex items-center gap-2">
              <ImagePlus size={16} className="text-[#F5A623]" /> Product Images
            </h2>
            <p className="text-xs text-gray-400 mb-4">Upload up to 4 images. First image will be the cover.</p>

            {/* Drop zone */}
            <div
              onClick={() => fileRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-[#F5A623]/50 rounded-xl p-8 text-center cursor-pointer hover:border-[#F5A623] hover:bg-orange-50/30 transition-colors"
            >
              <ImagePlus size={32} className="text-[#F5A623] mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drag & drop images here, or <span className="text-[#F5A623] font-semibold">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB each</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#F5A623] text-white text-xs px-1.5 py-0.5 rounded">Cover</span>
                    )}
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <div
                    onClick={() => fileRef.current.click()}
                    className="border-2 border-dashed border-gray-200 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-[#F5A623] transition-colors"
                  >
                    <ImagePlus size={20} className="text-gray-300" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-sm text-gray-900 mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#F5A623]" /> Product Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="e.g. Wireless Headphones"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1">
                  <Tag size={12} /> Category *
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block flex items-center gap-1">
                    <DollarSign size={12} /> Price (₵) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="1"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-sm text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#F5A623]" /> Description
            </h2>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe your product — condition, features, why you're selling it..."
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!product.name || !product.category || !product.price}
            className="w-full bg-[#F5A623] text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-[#e09610] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {submitted ? "✅ Product Added!" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
