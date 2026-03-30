import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Trash2, Check, Bell, MessageSquare, ShoppingBag, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/authContext";

const tabs = ["ALL", "ORDERS", "MESSAGES", "SYSTEM"];
const PER_PAGE = 6;

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const iconMap = {
  order: <ShoppingBag size={18} />,
  message: <MessageSquare size={18} />,
  promo: <Tag size={18} />,
  system: <Bell size={18} />,
};

export default function Notification() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("ALL");
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotifs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setNotifs(data.notifications);
    } catch {}
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchNotifs(); }, [fetchNotifs]);

  const markRead = async (id) => {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
    await fetch(`/api/notifications/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  };

  const deleteNotif = async (id) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  };

  const markAllRead = async () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await fetch("/api/notifications/read-all", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  };

  const handleAction = (action) => {
    if (action === "View Order") navigate("/buyerprofile");
    if (action === "Contact Seller" || action === "View Chat" || action === "Reply") navigate("/chatseller");
    if (action === "Shop Now") navigate("/shop");
  };

  const filtered = notifs.filter((n) => {
    if (activeTab === "ORDERS") return n.type === "order";
    if (activeTab === "MESSAGES") return n.type === "message";
    if (activeTab === "SYSTEM") return n.type === "system" || n.type === "promo";
    return true;
  });

  const unreadCount = notifs.filter((n) => !n.is_read).length;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <section className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-xl text-gray-900 tracking-widest">NOTIFICATIONS</h1>
            {unreadCount > 0 && (
              <span className="bg-[#F5A623] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 border border-gray-300 bg-white px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-50 cursor-pointer" onClick={() => setActiveTab("ALL")}>
              <Filter size={13} /> <span className="hidden sm:inline">Filter</span>
            </button>
            <button onClick={markAllRead} className="border border-gray-300 bg-white px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Read All</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`pb-3 text-sm font-semibold cursor-pointer transition-colors ${
                activeTab === tab ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-20">Loading notifications...</p>
        ) : paginated.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
            No notifications yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {paginated.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-xl border p-4 flex gap-4 transition-all ${
                  notif.is_read ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-gray-200"
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  notif.is_read ? "bg-gray-200 text-gray-400" : "bg-gray-100 text-gray-600"
                }`}>
                  {iconMap[notif.type] || <Bell size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-sm font-semibold ${notif.is_read ? "text-gray-400" : "text-gray-900"}`}>
                        {notif.title}
                      </h3>
                      {!notif.is_read && (
                        <span className="bg-[#F5A623] text-white text-xs font-semibold px-2 py-0.5 rounded">NEW</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => markRead(notif.id)}
                        className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${
                          notif.is_read ? "bg-gray-200 text-gray-400" : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        <Check size={13} />
                      </button>
                      <button
                        onClick={() => deleteNotif(notif.id)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p className={`text-sm mt-1 leading-relaxed ${notif.is_read ? "text-gray-400" : "text-gray-600"}`}>
                    {notif.body}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.created_at)}</p>

                  {/* Action URL button */}
                  {notif.action_url && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleAction(notif.action_url)}
                        className="px-4 py-1.5 text-xs rounded-lg cursor-pointer bg-[#1A1A2E] text-white hover:bg-[#2a2a4e] transition-colors font-medium"
                      >
                        View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-[#1A1A2E] text-white rounded-lg disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-9 h-9 text-sm rounded-lg cursor-pointer font-semibold ${
                  currentPage === n ? "bg-[#F5A623] text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-[#1A1A2E] text-white rounded-lg disabled:opacity-40 cursor-pointer"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
