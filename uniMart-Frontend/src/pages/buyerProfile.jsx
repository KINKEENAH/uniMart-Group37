import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail, Phone, Calendar, GraduationCap, User, MapPin,
  ShoppingBag, CreditCard, Heart, Star, Pencil, ShieldCheck, LogOut, Package
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { useWishlist } from "../context/wishlistContext";
import EditProfileModal from "../components/EditProfileModal";

const tabs = ["MY PURCHASES", "WISHLIST", "SAVED SELLERS"];
const filters = ["ALL ORDERS", "DELIVERED", "PENDING"];

export default function BuyerProfile() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const { wishlistIds, toggle: toggleWishlist } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("MY PURCHASES");
  const [activeFilter, setActiveFilter] = useState("ALL ORDERS");
  const [showEdit, setShowEdit] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    } catch {}
    finally { setLoadingOrders(false); }
  }, [token]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // Fetch wishlist items when tab is opened
  useEffect(() => {
    if (activeTab !== "WISHLIST" || !token) return;
    setLoadingWishlist(true);
    fetch("/api/wishlists", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => { if (data.wishlists) setWishlistItems(data.wishlists); })
      .catch(() => {})
      .finally(() => setLoadingWishlist(false));
  }, [activeTab, token]);

  const name = user?.full_name?.toUpperCase() || "—";
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
  const totalOrders = orders.length;
  const wishlistCount = user?._count?.wishlists ?? 0;

  // Flatten orders into purchase rows (one row per order item)
  const allPurchases = orders.flatMap((order) =>
    order.order_items.map((item) => ({
      id: item.id,
      orderId: order.id,
      productId: item.product_id,
      name: item.product?.title || "Unknown Product",
      sellerId: item.product?.seller_id || null,
      sellerName: item.product?.seller?.full_name || item.seller_id || "—",
      price: parseFloat(item.unit_price),
      subtotal: parseFloat(item.subtotal),
      quantity: item.quantity,
      image: item.product?.images?.[0]?.image_url || null,
      date: new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      payment: order.payment_method || "—",
      location: order.meetup_location?.name || "—",
      status: order.status,
    }))
  );

  const filtered = allPurchases.filter((p) => {
    if (activeFilter === "DELIVERED") return p.status === "delivered";
    if (activeFilter === "PENDING") return p.status === "pending";
    return true;
  });

  const totalSpent = orders.reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
      <div className="px-6 py-6 space-y-5">

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-5 items-start">
              {/* Avatar */}
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
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-sm text-[#F5A623] font-medium">
                    <ShieldCheck size={14} /> {user?.is_verified ? "Verified Student" : "Unverified"}
                  </span>
                  <span className="text-sm text-gray-400">{totalOrders} Purchases</span>
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
                <Pencil size={13} /> EDIT PROFILE
              </button>
              <button
                onClick={() => navigate("/sellerprofile")}
                className="flex items-center gap-2 bg-[#F5A623] text-white text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#e09610] transition-colors"
              >
                Switch to Seller Profile
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
            { icon: ShoppingBag, value: String(totalOrders), label: "Total Purchases" },
            { icon: CreditCard, value: `₵ ${totalSpent.toFixed(2)}`, label: "Total Spent" },
            { icon: Heart, value: String(wishlistIds.size), label: "Wishlist Items" },
            { icon: Star, value: "0", label: "Saved Sellers" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
              <Icon size={20} className="text-[#F5A623] mb-3" />
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold cursor-pointer transition-colors border-r last:border-r-0 border-gray-200 ${
                activeTab === tab ? "bg-white text-gray-900 border-b-2 border-b-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Purchases Section */}
        {activeTab === "MY PURCHASES" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">MY PURCHASES</h2>
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                      activeFilter === f
                        ? "bg-[#F5A623] text-white border-[#F5A623]"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {loadingOrders ? (
                <p className="text-center text-sm text-gray-400 py-10">Loading purchases...</p>
              ) : filtered.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-10">No purchases found.</p>
              ) : (
                filtered.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                      <ShoppingBag size={24} className="text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Order #{item.orderId.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded border ${
                        item.status === "delivered"
                          ? "text-green-600 border-green-300 bg-green-50"
                          : "text-orange-500 border-orange-300 bg-orange-50"
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                      <span className="font-semibold text-gray-900">₵{item.price.toFixed(2)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><CreditCard size={12} /> {item.payment}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.status === "delivered" && (
                        <button onClick={() => navigate("/shop")} className="bg-[#F5A623] text-white text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#e09610]">BUY AGAIN</button>
                      )}
                      <button onClick={() => navigate("/productdetails", { state: { productId: item.productId } })} className="border border-gray-300 text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50">VIEW DETAILS</button>
                      <button onClick={() => navigate("/chatseller", { state: { sellerId: item.sellerId, sellerName: item.sellerName } })} className="border border-gray-300 text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50">CONTACT SELLER</button>
                      {item.status === "delivered" && (
                        <button onClick={() => alert("Review feature coming soon!")} className="border border-gray-300 text-xs px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50">LEAVE REVIEW</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        )}

        {activeTab === "WISHLIST" && (
          <div>
            <h2 className="font-bold text-lg text-gray-900 mb-4">WISHLIST</h2>
            {loadingWishlist ? (
              <p className="text-center text-sm text-gray-400 py-10">Loading wishlist...</p>
            ) : wishlistItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
                Your wishlist is empty. Heart items in the shop to save them here.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlistItems.map((w) => {
                  const p = w.product;
                  return (
                    <div key={w.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      {p.images?.[0]?.image_url ? (
                        <img src={p.images[0].image_url} alt={p.title} className="w-full h-36 object-cover cursor-pointer" onClick={() => navigate("/productdetails", { state: { productId: p.id } })} />
                      ) : (
                        <div className="w-full h-36 bg-gray-100 flex items-center justify-center cursor-pointer" onClick={() => navigate("/productdetails", { state: { productId: p.id } })}>
                          <Package size={28} className="text-gray-300" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                        <p className="text-sm font-semibold text-[#F5A623]">₵{parseFloat(p.price).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{p.seller?.full_name}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => navigate("/productdetails", { state: { productId: p.id } })} className="flex-1 bg-[#1A1A2E] text-white text-xs py-1.5 rounded-lg cursor-pointer hover:bg-[#2a2a4e]">View</button>
                          <button
                            onClick={() => { toggleWishlist(p.id); setWishlistItems((prev) => prev.filter((x) => x.product_id !== p.id)); }}
                            className="p-1.5 text-red-400 hover:text-red-600 border border-red-200 rounded-lg cursor-pointer"
                          >
                            <Heart size={13} className="fill-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "SAVED SELLERS" && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
            No saved sellers yet.
          </div>
        )}
      </div>
    </div>
  );
}
