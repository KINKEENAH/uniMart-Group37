import { useNavigate } from "react-router-dom"
import { useState } from "react";



const notificationsData = [
  {
    id: 1,
    type: "order",
    title: "Order Confirmed",
    isNew: true,
    message: "Your order #12345 for ",
    boldText: "Premium Wireless Headphones",
    messageEnd: " has been confirmed. The seller will contact you shortly to arrange meet-up at Student Union.",
    meta: "Order Total: $199.99  •  2 minutes ago",
    actions: ["View Order", "Contact Seller"],
    read: false,
  },
  {
    id: 2,
    type: "message",
    title: "New Message from AudioTech Store",
    isNew: true,
    message: "",
    boldText: "",
    messageEnd: '"Hi! I can meet you tomorrow at 3 PM at the Student Union. I\'ll bring the headphones and the original packaging. See you then!"',
    meta: "15 minutes ago",
    actions: ["Reply", "View Chat"],
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Payment Reminder",
    isNew: true,
    message: "Please complete payment for order #12345 when you meet the seller. Remember to bring exact cash or have your Mobile Money ready.",
    boldText: "",
    messageEnd: "",
    meta: "1 hour ago",
    actions: [],
    read: false,
  },
  {
    id: 4,
    type: "order",
    title: "Order Delivered",
    isNew: false,
    message: "Your order #12340 for ",
    boldText: "Laptop Stand Aluminum",
    messageEnd: " has been successfully delivered. Thank you for shopping with us!",
    meta: "Yesterday, 4:30 PM",
    actions: [],
    read: true,
  },
  {
    id: 5,
    type: "message",
    title: "New Message from TechGear Campus",
    isNew: false,
    message: "",
    boldText: "",
    messageEnd: '"Thanks for your purchase! Hope you enjoy the laptop stand."',
    meta: "March 3, 2:15 PM",
    actions: [],
    read: true,
  },
  {
    id: 6,
    type: "promo",
    title: "Spring Sale - 20% Off Electronics",
    isNew: false,
    message: "Limited time offer! Get 20% off all electronics this week. Browse our latest collection of laptops, headphones, and accessories.",
    boldText: "",
    messageEnd: "",
    meta: "March 2, 9:00 AM",
    actions: ["Shop Now"],
    read: true,
  },
];

const TABS = ["ALL", "ORDERS", "MESSAGES", "SYSTEM"];
const ITEMS_PER_PAGE = 6;

function getIcon(type) {
  if (type === "order") return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
  if (type === "message") return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  );
  if (type === "reminder") return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

export default function Notification() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ALL");
  const [notifications, setNotifications] = useState(notificationsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState("");

  const handleAction = (action, title) => {
    if (action === "View Order") navigate("/checkout");
    if (action === "Contact Seller") navigate("/chat");
    if (action === "Reply") { setReplyTarget(title); setReplyOpen(true); }
    if (action === "View Chat") navigate("/chat");
    if (action === "Shop Now") navigate("/shop");
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "ORDERS") return n.type === "order";
    if (activeTab === "MESSAGES") return n.type === "message";
    if (activeTab === "SYSTEM") return n.type === "reminder" || n.type === "promo";
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const newCount = notifications.filter((n) => n.isNew).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false, read: true })));
  };

  const dismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, isNew: false } : n))
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold tracking-widest uppercase text-gray-900">
              Notifications
            </h1>
            {newCount > 0 && (
              <span className="bg-gray-800 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                {newCount} New
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              Filter
            </button>
            <button
              onClick={markAllRead}
              className="text-xs border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition"
            >
              Mark All Read
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`text-xs pb-2 font-medium transition border-b-2 ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="flex flex-col gap-2">
          {paginated.map((n) => (
            <div
              key={n.id}
              className={`border rounded p-4 ${
                !n.read ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">

                {/* Icon */}
                <div className={`mt-0.5 p-2 rounded-full border shrink-0 ${
                  !n.read ? "border-gray-400 text-gray-700 bg-white" : "border-gray-200 text-gray-400 bg-white"
                }`}>
                  {getIcon(n.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-500"}`}>
                      {n.title}
                    </span>
                    {n.isNew && (
                      <span className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded font-medium">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Message with optional bold */}
                  <p className={`text-xs mb-1 ${!n.read ? "text-gray-600" : "text-gray-400"}`}>
                    {n.message}
                    {n.boldText && <strong className="font-semibold text-gray-800">{n.boldText}</strong>}
                    {n.messageEnd}
                  </p>

                  {/* Meta */}
                  <p className={`text-xs ${!n.read ? "font-medium text-gray-500" : "text-gray-400"}`}>
                    {n.meta}
                  </p>

                  {/* Action buttons */}
                  {n.actions.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {n.actions.map((action) => (
                        <button
                          key={action}
                          onClick={() => handleAction(action, n.title)}
                          className="text-xs border border-gray-400 px-3 py-1.5 rounded hover:bg-gray-100 transition font-medium text-gray-700"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-2 ml-1 shrink-0">
                  <button
                    onClick={() => markRead(n.id)}
                    className="text-gray-300 hover:text-gray-600 transition"
                    title="Mark as read"
                  >
                    {!n.read ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => dismiss(n.id)}
                    className="text-gray-300 hover:text-red-400 transition"
                    title="Dismiss"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="text-xs border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100 transition disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-xs w-7 h-7 rounded transition border ${
                  currentPage === page
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-xs border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100 transition disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Reply Popup */}
      {replyOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-5 mx-4 border border-gray-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Reply to {replyTarget}</h3>
              <button
                onClick={() => { setReplyOpen(false); setReplyText(""); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your message..."
              rows={4}
              className="w-full text-sm border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => { setReplyOpen(false); setReplyText(""); }}
                className="text-sm border border-gray-300 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (replyText.trim()) {
                    setReplyOpen(false);
                    setReplyText("");
                  }
                }}
                className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}