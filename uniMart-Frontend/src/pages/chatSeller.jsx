import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Search, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Send, Bot, User } from "lucide-react";
import { useAuth } from "../context/authContext";

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString();
}

function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  for (const msg of messages) {
    const d = formatDate(msg.sent_at);
    if (d !== lastDate) { groups.push({ divider: d, id: `div-${msg.id}` }); lastDate = d; }
    groups.push(msg);
  }
  return groups;
}

export default function ChatSeller() {
  const { user, token } = useAuth();
  const location = useLocation();
  const { sellerId, sellerName, productId } = location.state || {};

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/conversations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setConversations(data.conversations);
    } catch {}
  }, [token]);

  // Fetch messages for active conversation
  const fetchMessages = useCallback(async (convId) => {
    if (!convId || !token) return;
    try {
      const res = await fetch(`/api/conversations/${convId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMessages(data.messages);
    } catch {}
  }, [token]);

  // On mount: start or find conversation if coming from product details
  useEffect(() => {
    if (!token) return;
    const init = async () => {
      await fetchConversations();
      if (sellerId) {
        try {
          const res = await fetch("/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ seller_id: sellerId, product_id: productId }),
          });
          const data = await res.json();
          if (res.ok) {
            setActiveConvId(data.conversation.id);
            // Refresh conversation list so the new one appears in sidebar
            fetchConversations();
          }
        } catch {}
      }
    };
    init();
  }, [token, sellerId, productId, fetchConversations]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConvId) return;
    setLoadingMsgs(true);
    fetchMessages(activeConvId).finally(() => setLoadingMsgs(false));

    // Poll every 3 seconds for new messages
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => fetchMessages(activeConvId), 3000);
    return () => clearInterval(pollRef.current);
  }, [activeConvId, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !activeConvId) return;
    const text = input.trim();
    setInput("");
    try {
      const res = await fetch(`/api/conversations/${activeConvId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (res.ok) setMessages((prev) => [...prev, data.message]);
    } catch {}
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const otherPerson = activeConv
    ? activeConv.buyer_id === user?.id
      ? activeConv.seller
      : activeConv.buyer
    : sellerName ? { full_name: sellerName } : null;

  const filtered = conversations.filter((c) => {
    const other = c.buyer_id === user?.id ? c.seller : c.buyer;
    return other?.full_name?.toLowerCase().includes(search.toLowerCase());
  });

  const grouped = groupByDate(messages);

  const [mobileView, setMobileView] = useState(activeConvId ? "chat" : "list");

  // When a conversation is selected on mobile, switch to chat view
  const handleSelectConv = (id) => {
    setActiveConvId(id);
    setMobileView("chat");
  };

  return (
    <div className="flex h-screen bg-[#F5F0E8] pt-16">
      {/* Sidebar — full screen on mobile when showing list */}
      <div className={`bg-white border-r border-gray-200 flex flex-col
        ${mobileView === "list" ? "flex w-full md:w-80 md:shrink-0" : "hidden md:flex md:w-80 md:shrink-0"}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Conversations..."
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* AI Assistant entry */}
          <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center shrink-0">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-gray-900">Campus AI Assistant</p>
                <span className="text-xs text-gray-400">Now</span>
              </div>
              <p className="text-xs text-gray-500 truncate">How can I help you today</p>
              <span className="inline-flex items-center gap-1 mt-1 bg-[#F5A623] text-white text-xs px-2 py-0.5 rounded-full">
                <Bot size={10} /> AI Assistant
              </span>
            </div>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-xs text-gray-400 py-8">No conversations yet.</p>
          )}

          {filtered.map((conv) => {
            const other = conv.buyer_id === user?.id ? conv.seller : conv.buyer;
            const role = conv.buyer_id === user?.id ? "Seller" : "Buyer";
            const lastMsg = conv.messages?.[0];
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors ${
                  activeConvId === conv.id ? "bg-[#F5F0E8]" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
                  {other?.full_name?.[0] || <User size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-900 truncate">{other?.full_name || "—"}</p>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">
                      {lastMsg ? formatTime(lastMsg.sent_at) : ""}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{lastMsg?.content || conv.product?.title || "—"}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-[#F5A623] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
                    {conv.unread}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat area — full screen on mobile when showing chat */}
      <div className={`flex-1 flex-col min-w-0
        ${mobileView === "chat" ? "flex w-full" : "hidden md:flex"}`}>
        {activeConvId || otherPerson ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Back button — mobile only */}
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden text-gray-500 hover:text-gray-800 cursor-pointer bg-transparent border-none text-lg leading-none"
                >
                  ←
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-sm">
                  {otherPerson?.full_name?.[0] || "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{otherPerson?.full_name || sellerName || "—"}</p>
                  <p className="text-xs text-[#F5A623]">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <button className="cursor-pointer hover:text-gray-600"><Phone size={18} /></button>
                <button className="cursor-pointer hover:text-gray-600"><Video size={18} /></button>
                <button className="cursor-pointer hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {loadingMsgs ? (
                <p className="text-center text-xs text-gray-400 py-10">Loading messages...</p>
              ) : grouped.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-10">No messages yet. Say hello!</p>
              ) : (
                grouped.map((item) => {
                  if (item.divider) return (
                    <div key={item.id} className="flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400">{item.divider}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  );

                  const isMe = item.sender_id === user?.id;
                  if (!isMe) return (
                    <div key={item.id} className="flex items-start gap-3 max-w-lg">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold shrink-0">
                        {item.sender?.full_name?.[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-700">{item.sender?.full_name}</span>
                          <span className="text-xs text-gray-400">{formatTime(item.sent_at)}</span>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-gray-700 leading-relaxed">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <div key={item.id} className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 mb-1">{formatTime(item.sent_at)}</span>
                      <div className="bg-[#1A1A2E] text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-sm leading-relaxed max-w-lg">
                        {item.content}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 px-3 md:px-6 py-3">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
                <button className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"><Paperclip size={18} /></button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type Here...."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                />
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <button className="hover:text-gray-600 cursor-pointer"><Smile size={18} /></button>
                  <button className="hover:text-gray-600 cursor-pointer"><Mic size={18} /></button>
                  <button onClick={sendMessage} className="text-[#F5A623] hover:text-[#e09610] cursor-pointer">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
