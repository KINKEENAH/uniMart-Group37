import { useState, useRef, useEffect } from "react";
import { Search, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Send, Bot } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Campus AI Assistant",
    lastMessage: "How can I help you today",
    time: "Now",
    unread: 0,
    role: "AI Assistant",
    isAI: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 2,
    role: "Buyer",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 0,
    role: "Buyer",
  },
  {
    id: 4,
    name: "Jonah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 0,
    role: "Seller",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 0,
    role: "Buyer",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 1,
    role: "Buyer",
  },
  {
    id: 7,
    name: "Jonah Johnson",
    lastMessage: "Is the laptop available",
    time: "2 min ago",
    unread: 0,
    role: "Seller",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere neque. Nulla laoreet nulla at posuere lobortis. Etiam nec nisi semper",
    time: "Yesterday at 9:54 AM",
    isMine: false,
  },
  {
    id: 2,
    sender: "me",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere neque. Nulla laoreet nulla at posuere lobortis. Etiam nec nisi semper",
    time: "Yesterday at 9:54 AM",
    isMine: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere neque. Nulla laoreet nulla at posuere lobortis. Etiam nec nisi semper",
    time: "Yesterday at 9:54 AM",
    isMine: false,
  },
  {
    id: 4,
    sender: "me",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere neque. Nulla laoreet nulla at posuere lobortis. Etiam nec nisi semper",
    time: "Yesterday at 9:54 AM",
    isMine: true,
  },
  { id: 5, isDivider: true, label: "Today" },
  {
    id: 6,
    sender: "Sarah Johnson",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut posuere neque. Nulla laoreet nulla at posuere lobortis. Etiam nec nisi semper",
    time: "Yesterday at 9:54 AM",
    isMine: false,
  },
];

export default function ChatSeller() {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        text: input,
        time: "Just now",
        isMine: true,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredConvos = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen pt-16 bg-[#F5F5F5]">

      {/* left sidebar */}
      <div className="w-72 shrink-0 bg-white border-r border-gray-100 flex flex-col">

        {/* search */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-md px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search Conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-xs w-full placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(convo => (
            <div
              key={convo.id}
              onClick={() => setActiveConvo(convo)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50
                ${activeConvo.id === convo.id ? "bg-[#F5F5F5]" : "hover:bg-gray-50"}`}
            >
              {/* avatar */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs
                ${convo.isAI ? "bg-gray-700" : "bg-gray-300"}`}>
                {convo.isAI ? <Bot size={16} /> : <span className="text-gray-500">👤</span>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-semibold text-[#1A1A1A] truncate">{convo.name}</p>
                  <span className="text-xs text-gray-400 shrink-0 ml-1">{convo.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5">{convo.lastMessage}</p>
                <div className="flex items-center justify-between mt-1">
                  {convo.isAI ? (
                    <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Bot size={10} /> AI Assistant
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">{convo.role}</span>
                  )}
                  {convo.unread > 0 && (
                    <span className="bg-gray-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right chat area */}
      <div className="flex-1 flex flex-col">

        {/* chat header */}
        <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">{activeConvo.name}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-[#1A1A1A] transition-colors"><Phone size={17} /></button>
            <button className="hover:text-[#1A1A1A] transition-colors"><Video size={17} /></button>
            <button className="hover:text-[#1A1A1A] transition-colors"><MoreVertical size={17} /></button>
          </div>
        </div>

        {/* messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {messages.map(msg => {
            if (msg.isDivider) {
              return (
                <div key={msg.id} className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">{msg.label}</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              );
            }
            return (
              <div key={msg.id} className={`flex flex-col ${msg.isMine ? "items-end" : "items-start"}`}>
                {!msg.isMine && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">👤</span>
                    </div>
                    <span className="text-xs font-medium text-[#1A1A1A]">{msg.sender}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                )}
                {msg.isMine && (
                  <span className="text-xs text-gray-400 mb-1">{msg.time}</span>
                )}
                <div className={`max-w-sm px-4 py-2.5 rounded-xl text-xs leading-relaxed
                  ${msg.isMine
                    ? "bg-gray-700 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-700 rounded-tl-none"
                  }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* input area */}
        <div className="bg-white border-t border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2.5 bg-white">
            <button className="text-gray-400 hover:text-[#1A1A1A] transition-colors shrink-0">
              <Paperclip size={16} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type Here...."
              className="flex-1 outline-none text-sm placeholder:text-gray-300 bg-transparent"
            />
            <div className="flex items-center gap-2 text-gray-400 shrink-0">
              <button className="hover:text-[#1A1A1A] transition-colors"><Smile size={16} /></button>
              <button className="hover:text-[#1A1A1A] transition-colors"><Mic size={16} /></button>
              <button
                onClick={sendMessage}
                className="hover:text-[#1A1A1A] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}