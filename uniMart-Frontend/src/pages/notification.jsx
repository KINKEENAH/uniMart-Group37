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
    <section className="min-h-screen bg-[#F5F5F5] pt-20 px-4 md:px-8 pb-10">

      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-lg tracking-widest text-[#1A1A1A]">NOTIFICATIONS</h1>
          {unreadCount > 0 && (
            <span className="border border-gray-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={13} /> Filter
          </button>
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xs tracking-widest font-medium transition-colors duration-200
              ${activeTab === tab
                ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                : "text-gray-400 hover:text-[#1A1A1A]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* notification list */}
      <div className="flex flex-col gap-3">
        {filtered.map(notif => (
          <div
            key={notif.id}
            className={`bg-white rounded-lg p-4 border border-gray-200 transition-all
              ${notif.read ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex gap-3">
              {/* icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                ${!notif.read ? "bg-gray-100 text-gray-600" : "bg-gray-100 text-gray-400"}`}>
                {iconMap[notif.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`text-sm font-semibold ${!notif.read ? "text-[#1A1A1A]" : "text-gray-400"}`}>
                      {notif.title}
                    </h3>
                    {notif.isNew && (
                      <span className="border border-gray-300 text-gray-600 text-xs px-1.5 py-0.5 rounded-sm">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => markRead(notif.id)}
                      className="text-gray-300 hover:text-green-500 transition-colors"
                    >
                      <Check size={15} />
                    </button>
                    <button
                      onClick={() => deleteNotif(notif.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <p className={`text-xs mt-1 ${!notif.read ? "text-gray-600" : "text-gray-400"}`}>
                  {notif.message}
                </p>

                {notif.extra && (
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-1">{notif.extra}</p>
                )}

                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>

                {/* action buttons */}
                {notif.actions.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {notif.actions.map(action => (
                      <button
                        key={action}
                        onClick={() => action === "Reply" ? handleReply(notif.id) : handleAction(action)}
                        className={`px-3 py-1.5 text-xs rounded-md transition-colors
                          ${action === "View Order" || action === "Reply"
                            ? "bg-[#1A1A1A] text-white hover:bg-gray-800"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* reply box */}
                {replyingTo === notif.id && (
                  <div className="mt-3 border border-gray-200 rounded-md p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500 font-medium">Reply to message</p>
                      <button onClick={() => setReplyingTo(null)}>
                        <X size={14} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-md p-2 text-xs outline-none resize-none placeholder:text-gray-300 focus:border-[#1A1A1A] transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={sendReply}
                        className="flex items-center gap-1 bg-[#1A1A1A] text-white px-4 py-1.5 rounded-md text-xs hover:bg-gray-800 transition-colors"
                      >
                        <Send size={12} /> Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        {[1, 2, 3].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-xs rounded-md transition-colors
              ${currentPage === page
                ? "bg-[#1A1A1A] text-white"
                : "border border-gray-300 hover:bg-gray-50"
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(3, p + 1))}
          className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}