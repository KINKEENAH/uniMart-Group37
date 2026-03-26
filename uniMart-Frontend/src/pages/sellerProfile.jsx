import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail, Phone, Calendar, GraduationCap, User, MapPin,
  ShoppingBag, Package, TrendingUp, LayoutGrid, History,
  Pencil, ShieldCheck, Star, Eye, Trash2, Plus, LogOut
} from "lucide-react";
import { useAuth } from "../context/authContext";
import EditProfileModal from "../components/EditProfileModal";
import EditProductModal from "../components/EditProductModal";

export default function SellerProfile() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [showEdit, setShowEdit] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMyProducts(data.products);
    } catch {}
    finally { setLoadingProducts(false); }
  }, [token]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setMyProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  };

  const name = user?.full_name || "—";
  const email = user?.email || "—";
  const phone = user?.phone || "—";
  const department = user?.department || "—";
  const level = user?.level || "—";
  const location = user?.campus_location || "—";
  const studentSince = user?.student_since
    ? new Date(user.student_since).getFullYear()
    : user?.created_at
    ? new Date(user.created_at).getFullYear()
    : "—";
  const totalProducts = user?._count?.products ?? 0;
  const totalSales = user?.total_sales ?? 0;
  const rating = user?.rating ?? 0;

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={(updated) => {
            setMyProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
            setEditingProduct(null);
          }}
        />
      )}
      <div className="px-6 py-6 space-y-5">

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-5 items-start">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User size={40} className="text-gray-400" />
                </div>
                <button className="absolute top-0 right-0 bg-white border border-gray-200 rounded-full p-1 cursor-pointer">
                  <Pencil size={11} className="text-gray-500" />
                </button>
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <ShieldCheck size={11} className="text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-sm text-[#F5A623]">
                    <Star size={13} className="fill-[#F5A623]" /> {rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400">{totalSales} sales</span>
                  <span className="flex items-center gap-1 text-sm text-[#F5A623]">
                    <ShieldCheck size={13} /> {user?.is_verified ? "Verified Student" : "Unverified"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-2"><Mail size={13} /> {email}</span>
                  <span className="flex items-center gap-2"><Phone size={13} /> {phone}</span>
                  <span className="flex items-center gap-2"><Calendar size={13} /> Student since {studentSince}</span>
                  <span className="flex items-center gap-2"><GraduationCap size={13} /> {department}</span>
                  <span className="flex items-center gap-2"><User size={13} /> {level}</span>
                  <span className="flex items-center gap-2"><MapPin size={13} /> {location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end shrink-0">
              <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 bg-[#1A1A2E] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a4e] transition-colors">
                <Pencil size={13} /> Edit
              </button>
              <button
                onClick={() => navigate("/buyerprofile")}
                className="flex items-center gap-2 bg-[#F5A623] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e09610] transition-colors"
              >
                Switch to Buyer Profile
              </button>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="flex items-center gap-2 border border-red-300 text-red-500 text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
              >
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShoppingBag, value: String(myProducts.length), label: "Total Products" },
            { icon: Package, value: String(totalSales), label: "Total Sales" },
            { icon: TrendingUp, value: "₵ 0", label: "Total Revenue" },
            { icon: LayoutGrid, value: String(myProducts.filter(p => p.status === "active").length), label: "Active Listings" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
              <Icon size={20} className="text-[#F5A623] mb-3" />
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold cursor-pointer border-r border-gray-200 transition-colors ${
              activeTab === "products" ? "text-gray-900 border-b-2 border-b-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Package size={15} /> My Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-semibold cursor-pointer transition-colors ${
              activeTab === "orders" ? "text-gray-900 border-b-2 border-b-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <History size={15} /> Order History
          </button>
        </div>

        {/* My Products */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">My Products</h2>
              <button
                onClick={() => navigate("/addproduct")}
                className="flex items-center gap-2 bg-[#F5A623] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e09610] transition-colors"
              >
                <Plus size={14} /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {loadingProducts ? (
                <p className="col-span-4 text-center text-sm text-gray-400 py-10">Loading products...</p>
              ) : myProducts.length === 0 ? (
                <p className="col-span-4 text-center text-sm text-gray-400 py-10">No products yet. Add your first product!</p>
              ) : (
                myProducts.map((product) => {
                  const coverImage = product.images?.[0]?.image_url || null;
                  const date = new Date(product.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                  return (
                    <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      {coverImage ? (
                        <img src={coverImage} alt={product.title} className="w-full h-36 object-cover" />
                      ) : (
                        <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-300">
                          <Package size={32} />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                        <p className="text-sm font-semibold text-[#F5A623] mt-0.5">₵{parseFloat(product.price).toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Eye size={11} /> {product.views}</span>
                          <span className="flex items-center gap-1"><Star size={11} /> {product.sales_count}</span>
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="flex-1 flex items-center justify-center gap-1 bg-[#1A1A2E] text-white text-xs py-1.5 rounded-lg cursor-pointer hover:bg-[#2a2a4e]">
                            <Pencil size={11} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer border border-red-200 rounded-lg"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
            No order history yet.
          </div>
        )}
      </div>
    </div>
  );
}
