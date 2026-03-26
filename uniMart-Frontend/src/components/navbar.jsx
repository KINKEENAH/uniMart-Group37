import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, BellDot, User, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import logo from "../assets/UniMart.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Contact us", path: "/contact" },
  { name: "About us", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 box-border bg-[#0D1B2A] border-b border-[rgba(245,166,35,0.15)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`bg-transparent border-none text-sm cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${
                location.pathname === link.path
                  ? "text-[#F5A623] font-semibold underline"
                  : "text-gray-300 font-normal"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="UniMart" className="h-8 object-contain" />
        </div>

        {/* Right icons + auth */}
        <div className="hidden md:flex items-center gap-5">
          <button className="cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200">
            <Search size={17} />
          </button>
          <button
            onClick={() => navigate("/chatseller")}
            className={`cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200 ${location.pathname === "/chatseller" ? "text-[#F5A623]" : ""}`}
          >
            <MessageCircle size={17} />
          </button>
          <button className="cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200" onClick={() => navigate("/buyerprofile")}>
            <Heart size={17} />
          </button>
          <button
            onClick={() => navigate("/viewcart")}
            className={`cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200 ${location.pathname === "/viewcart" ? "text-[#F5A623]" : ""}`}
          >
            <ShoppingCart size={17} />
          </button>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/notification")}
                className={`cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200 ${location.pathname === "/notification" ? "text-[#F5A623]" : ""}`}
              >
                <BellDot size={17} />
              </button>
              <button
                onClick={() => navigate("/buyerprofile")}
                className={`cursor-pointer text-gray-300 hover:text-[#F5A623] transition-colors duration-200 ${location.pathname === "/buyerprofile" ? "text-[#F5A623]" : ""}`}
              >
                <User size={17} />
              </button>
            </>
          ) : (
            <>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("/signup")}
                className={`text-sm cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${location.pathname === "/signup" ? "text-[#F5A623] font-semibold" : "text-gray-300"}`}
              >
                Sign Up
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("/login")}
                className={`text-sm cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${location.pathname === "/login" ? "text-[#F5A623] font-semibold" : "text-gray-300"}`}
              >
                Login
              </motion.a>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 text-2xl bg-transparent border-none cursor-pointer"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[rgba(245,166,35,0.2)] px-6 pb-6 bg-[#0D1B2A]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.path); setIsOpen(false); }}
              className="block w-full text-left py-3 text-gray-300 hover:text-[#F5A623] border-b border-gray-700 text-sm cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0 transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
          <a onClick={() => { navigate("/signup"); setIsOpen(false); }} className="block w-full py-3 text-sm text-gray-300 cursor-pointer border-b border-gray-700 hover:text-[#F5A623] transition-colors duration-200">
            Sign Up
          </a>
          <a onClick={() => { navigate("/login"); setIsOpen(false); }} className="block w-full py-3 text-sm text-gray-300 cursor-pointer border-b border-gray-700 hover:text-[#F5A623] transition-colors duration-200">
            Login
          </a>
          <div className="flex gap-6 pt-4">
            <button className="cursor-pointer text-gray-300 hover:text-[#F5A623]"><Search size={17} /></button>
            <button className="cursor-pointer text-gray-300 hover:text-[#F5A623]"><Heart size={17} /></button>
            <button className="cursor-pointer text-gray-300 hover:text-[#F5A623]"><ShoppingCart size={17} /></button>
          </div>
        </div>
      )}
    </nav>
  );
}
