import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Trash2, Check, Bell, MessageSquare, ShoppingBag, Tag, Send, X } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "Order Confirmed",
    isNew: true,
    message: "Your order #12345 for Premium Wireless Headphones has been confirmed. The seller will contact you shortly to arrange meet-up at Student Union.",
    extra: "Order Total: ₵199.99",
    time: "2 minutes ago",
    read: false,
    actions: ["View Order", "Contact Seller"],
  },
  {
    id: 2,
    type: "message",
    title: "New Message from AudioTech Store",
    isNew: true,
    message: '"Hi! I can meet you tomorrow at 3 PM at the Student Union. I\'ll bring the headphones and the original packaging. See you then!"',
    time: "15 minutes ago",
    read: false,
    actions: ["Reply", "View Chat"],
  },
  {
    id: 3,
    type: "order",
    title: "Payment Reminder",
    isNew: true,
    message: "Please complete payment for order #12345 when you meet the seller. Remember to bring exact cash or have your Mobile Money ready.",
    time: "1 hour ago",
    read: false,
    actions: [],
  },
  {
    id: 4,
    type: "order",
    title: "Order Delivered",
    isNew: false,
    message: "Your order #12340 for Laptop Stand Aluminum has been successfully delivered. Thank you for shopping with us!",
    time: "Yesterday, 6:30 PM",
    read: true,
    actions: [],
  },
  {
    id: 5,
    type: "message",
    title: "New Message from TechGear Campus",
    isNew: false,
    message: '"Thanks for your purchase! Hope you enjoy the laptop stand."',
    time: "March 5, 2:15 PM",
    read: true,
    actions: [],
  },
  {
    id: 6,
    type: "promo",
    title: "Spring Sale - 20% Off Electronics",
    isNew: false,
    message: "Limited time offer! Get 20% off all electronics this week. Browse our latest collection of laptops, headphones, and accessories.",
    time: "March 3, 9:00 AM",
    read: true,
    actions: ["Shop Now"],
  },
];

const tabs = ["ALL", "ORDERS", "MESSAGES", "SYSTEM"];

const iconMap = {
  order: <ShoppingBag size={18} />,
  message: <MessageSquare size={18} />,
  promo: <Tag size={18} />,
};

export default function Notification() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [notifs, setNotifs] = useState(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const navigate = useNavigate();

  const filtered = activeTab === "ALL"
    ? notifs
    : notifs.filter(n => {
        if (activeTab === "ORDERS") return n.type === "order";
        if (activeTab === "MESSAGES") return n.type === "message";
        if (activeTab === "SYSTEM") return n.type === "promo";
        return true;
      });

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true, isNew: false })));
  };

  const deleteNotif = (id) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const markRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true, isNew: false } : n));
  };

  const handleReply = (notifId) => {
    setReplyingTo(notifId);
    setReplyText("");
  };

  const sendReply = () => {
    if (!replyText.trim()) return;
    console.log("Reply sent:", replyText);
    setReplyingTo(null);
    setReplyText("");
    navigate("/chatseller");
  };

  const handleAction = (action) => {
    if (action === "View Order") navigate("/viewcart");
    if (action === "Contact Seller") navigate("/chatseller");
    if (action === "View Chat") navigate("/chatseller");
    if (action === "Shop Now") navigate("/shop");
  };

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
            <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
              <Filter size={14} /> Filter
            </button>
            <button
              onClick={markAllRead}
              className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Mark All Read
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-5">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold cursor-pointer transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="flex flex-col gap-3">
          {filtered.map(notif => (
            <div
              key={notif.id}
              className={`rounded-xl border p-4 flex gap-4 transition-all ${
                notif.read ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-gray-200"
              }`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                notif.read ? "bg-gray-200 text-gray-400" : "bg-gray-100 text-gray-600"
              }`}>
                {iconMap[notif.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm font-semibold ${notif.read ? "text-gray-400" : "text-gray-900"}`}>
                      {notif.title}
                    </h3>
                    {notif.isNew && (
                      <span className="bg-[#F5A623] text-white text-xs font-semibold px-2 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  {/* Mark read / delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => markRead(notif.id)}
                      className={`w-7 h-7 flex items-center justify-center rounded cursor-pointer transition-colors ${
                        notif.read ? "bg-gray-200 text-gray-400" : "bg-green-500 text-white hover:bg-green-600"
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

                <p className={`text-sm mt-1 leading-relaxed ${notif.read ? "text-gray-400" : "text-gray-600"}`}>
                  {notif.message}
                </p>

                {notif.extra && (
                  <p className="text-xs font-semibold text-gray-700 mt-1">{notif.extra}</p>
                )}

                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>

                {/* Action buttons */}
                {notif.actions.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {notif.actions.map(action => (
                      <button
                        key={action}
                        onClick={() => action === "Reply" ? handleReply(notif.id) : handleAction(action)}
                        className={`px-4 py-1.5 text-xs rounded-lg cursor-pointer transition-colors font-medium ${
                          action === "View Order" || action === "Reply" || action === "Shop Now"
                            ? "bg-[#1A1A2E] text-white hover:bg-[#2a2a4e]"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* Reply box */}
                {replyingTo === notif.id && (
                  <div className="mt-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500 font-medium">Reply to message</p>
                      <button onClick={() => setReplyingTo(null)} className="cursor-pointer">
                        <X size={14} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none resize-none placeholder:text-gray-300 focus:border-[#F5A623] transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={sendReply}
                        className="flex items-center gap-1 bg-[#1A1A2E] text-white px-4 py-1.5 rounded-lg text-xs hover:bg-[#2a2a4e] cursor-pointer transition-colors"
                      >
                        <Send size={12} /> Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 text-sm bg-[#1A1A2E] text-white rounded-lg hover:bg-[#2a2a4e] cursor-pointer transition-colors"
          >
            Previous
          </button>
          {[1, 2, 3].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 text-sm rounded-lg cursor-pointer transition-colors font-semibold ${
                currentPage === page
                  ? "bg-[#F5A623] text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(3, p + 1))}
            className="px-4 py-2 text-sm bg-[#1A1A2E] text-white rounded-lg hover:bg-[#2a2a4e] cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}