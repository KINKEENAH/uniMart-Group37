import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, BellDot, User, MessageCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import logoDark from "../assets/UniMart.png";
import logoBnw from "../assets/unimart_bnw.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Contact us", path: "/contact" },
  { name: "About us", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Theme based on auth state
  const bg = isLoggedIn ? "bg-[#E0D8CC]" : "bg-[#0D1B2A]";
  const border = isLoggedIn ? "border-[rgba(0,0,0,0.08)]" : "border-[rgba(245,166,35,0.15)]";
  const textDefault = isLoggedIn ? "text-gray-800" : "text-gray-300";
  const textActive = "text-[#F5A623]";
  const logo = isLoggedIn ? logoBnw : logoDark;
  const mobileBg = isLoggedIn ? "bg-[#E0D8CC]" : "bg-[#0D1B2A]";
  const mobileBorder = isLoggedIn ? "border-gray-300" : "border-gray-700";
  const hamburgerColor = isLoggedIn ? "text-gray-800" : "text-gray-300";

  const handleLogout = () => { logout(); navigate("/login"); };

  const linkClass = (path) =>
    `bg-transparent border-none text-sm cursor-pointer transition-colors duration-200 hover:${textActive} ${
      location.pathname === path ? `${textActive} font-semibold underline` : `${textDefault} font-normal`
    }`;

  const iconClass = (path) =>
    `cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${
      location.pathname === path ? "text-[#F5A623]" : textDefault
    }`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 box-border ${bg} border-b ${border}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => navigate(link.path)} className={linkClass(link.path)}>
              {link.name}
            </button>
          ))}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="UniMart" className="h-8 object-contain" />
        </div>

        {/* Right icons */}
        <div className="hidden md:flex items-center gap-5">
          <button onClick={() => navigate("/chatseller")} className={iconClass("/chatseller")}>
            <MessageCircle size={17} />
          </button>
          <button onClick={() => navigate("/buyerprofile")} className={iconClass("/buyerprofile")}>
            <Heart size={17} />
          </button>
          <button onClick={() => navigate("/viewcart")} className={iconClass("/viewcart")}>
            <ShoppingCart size={17} />
          </button>

          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/notification")} className={iconClass("/notification")}>
                <BellDot size={17} />
              </button>
              <button onClick={() => navigate("/buyerprofile")} className={iconClass("/buyerprofile")}>
                <User size={17} />
              </button>
              <button onClick={() => setShowLogoutModal(true)} className={`cursor-pointer hover:text-red-500 transition-colors duration-200 ${textDefault}`} title="Logout">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
                onClick={() => navigate("/signup")}
                className={`text-sm cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${location.pathname === "/signup" ? "text-[#F5A623] font-semibold" : textDefault}`}>
                Sign Up
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
                onClick={() => navigate("/login")}
                className={`text-sm cursor-pointer transition-colors duration-200 hover:text-[#F5A623] ${location.pathname === "/login" ? "text-[#F5A623] font-semibold" : textDefault}`}>
                Login
              </motion.a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${hamburgerColor} text-2xl bg-transparent border-none cursor-pointer`}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden border-t ${mobileBorder} px-6 pb-6 ${mobileBg}`}>
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => { navigate(link.path); setIsOpen(false); }}
              className={`block w-full text-left py-3 border-b ${mobileBorder} text-sm cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0 transition-colors duration-200 hover:text-[#F5A623] ${
                location.pathname === link.path ? "text-[#F5A623] font-semibold" : textDefault
              }`}>
              {link.name}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate("/notification"); setIsOpen(false); }}
                className={`block w-full text-left py-3 text-sm cursor-pointer border-b ${mobileBorder} hover:text-[#F5A623] transition-colors ${textDefault}`}>
                Notifications
              </button>
              <button onClick={() => { navigate("/buyerprofile"); setIsOpen(false); }}
                className={`block w-full text-left py-3 text-sm cursor-pointer border-b ${mobileBorder} hover:text-[#F5A623] transition-colors ${textDefault}`}>
                My Profile
              </button>
              <button onClick={() => { setIsOpen(false); setShowLogoutModal(true); }}
                className={`block w-full text-left py-3 text-sm text-red-500 cursor-pointer border-b ${mobileBorder} hover:text-red-400 transition-colors`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a onClick={() => { navigate("/signup"); setIsOpen(false); }}
                className={`block w-full py-3 text-sm cursor-pointer border-b ${mobileBorder} hover:text-[#F5A623] transition-colors ${textDefault}`}>
                Sign Up
              </a>
              <a onClick={() => { navigate("/login"); setIsOpen(false); }}
                className={`block w-full py-3 text-sm cursor-pointer border-b ${mobileBorder} hover:text-[#F5A623] transition-colors ${textDefault}`}>
                Login
              </a>
            </>
          )}
          <div className="flex gap-6 pt-4">
            <button onClick={() => { navigate("/buyerprofile"); setIsOpen(false); }} className={`cursor-pointer hover:text-[#F5A623] ${textDefault}`}><Heart size={17} /></button>
            <button onClick={() => { navigate("/viewcart"); setIsOpen(false); }} className={`cursor-pointer hover:text-[#F5A623] ${textDefault}`}><ShoppingCart size={17} /></button>
            {isLoggedIn && (
              <button onClick={() => { navigate("/chatseller"); setIsOpen(false); }} className={`cursor-pointer hover:text-[#F5A623] ${textDefault}`}><MessageCircle size={17} /></button>
            )}
          </div>
        </div>
      )}

      {/* Logout modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <LogOut size={22} className="text-red-500" />
            </div>
            <h2 className="text-center font-bold text-gray-900 text-lg mb-1">Log out?</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Are you sure you want to log out of your UniMart account?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleLogout}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-red-600 transition-colors">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
