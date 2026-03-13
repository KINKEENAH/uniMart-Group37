import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, BellDot, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";

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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 box-border bg-white backdrop-blur-md border-b border-[rgba(200,170,100,0.15)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-18 ">
        {/* Desktop Links */}
        <div className="hidden md:flex gap-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`bg-transparent border-none text-sm  tracking-widest  cursor-pointer  transition-colors duration-200 hover:text-gray-500 text-[#515151] ${location.pathname === link.path ? " font-bold underline" : "font-normal"}`}
            >
              {link.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center font-nico text-2xl">uniMart</div>

        <div className="hidden md:flex items-center gap-5 justify-end ">
          <button className="cursor-pointer  duration-200 hover:text-gray-500 ">
            <Search size={17} />
          </button>

          <button className="cursor-pointer hover:text-gray-500">
            <Heart size={17} />
          </button>
          <button 
          onClick ={()=> navigate("/viewcart")}
          className={`cursor-pointer hover:text-gray-500 ${location.pathname === "/viewcart"?"underline":""}`}>
            <ShoppingCart size={17} />
          </button>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/notification")}
                className={`coursor-pointer hover:text-gray-500 ${location.pathname === "/notification" ? "underline" : ""}`}
              >
                <BellDot size={17} />
              </button>

              <button
                onClick={() => navigate("/buyerprofile")}
                className={`coursor-pointer hover:text-gray-500 ${location.pathname === "/buyerprofile" ? "underline" : ""}`}
              >
                <User size={17} />
              </button>
            </>
          ) : (
            <>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => navigate("/signup")}
                className={`tracking-widest text-sm cursor-pointer hover:text-gray-500  font-inter ${location.pathname === "/signup" ? " font-bold underline" : "font-normal"}`}
              >
                Sign Up
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => navigate("/login")}
                className={`tracking-widest text-sm cursor-pointer hover:text-gray-500  font-inter ${location.pathname === "/login" ? "font-semibold underline" : "font-normal"}`}
              >
                Login
              </motion.a>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gold text-2xl bg-transparent border-none cursor-pointer"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  border-t border-[rgba(200,170,100,0.2)] px-6 pb-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className="block w-full text-left py-3 hover:text-gold border-b  text-sm tracking-widest uppercase cursor-pointer font-serif bg-transparent border-l-0 border-r-0 border-t-0 transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}

          <a
            onClick={() => {
              navigate("/signup");
              setIsOpen(false);
            }}
            className="block w-full py-3 text-sm tracking-widest uppercase cursor-pointer border-b hover:text-gray-500 transition-colors duration-200"
          >
            Signup
          </a>
          <a
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="block w-full py-3 text-sm tracking-widest uppercase cursor-pointer border-b hover:text-gray-500 transition-colors duration-200"
          >
            Login
          </a>

          <div className="flex gap-6 pt-4">
            <button className="cursor-pointer  duration-200 hover:text-gray-500 ">
              <Search size={17} />
            </button>

            <button className="cursor-pointer hover:text-gray-500">
              <Heart size={17} />
            </button>
            <button className="cursor-pointer hover:text-gray-500">
              <ShoppingCart size={17} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
