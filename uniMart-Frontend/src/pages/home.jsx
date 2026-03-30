import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/Ellipse_1.png";
import { useAuth } from "../context/authContext";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <section className="bg-[#0D1B2A] w-full min-h-screen flex items-center overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-stretch min-h-screen">
        {/* Hero image — flush left, flush bottom */}
        <div className="shrink-0 flex items-end w-full md:w-[45%] relative pt-16 md:pt-0">
          {/* Yellow circle behind image */}
          <div className="absolute bottom-0 left-0 w-95 h-95 md:w-120 md:h-120 rounded-full " />
          <img
            src={heroImage}
            alt="Campus shoppers"
            className="relative z-10 w-full md:w-auto md:h-[80vh] object-cover object-top"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-start text-left flex-1 px-10 md:px-16 py-16 md:py-0">
          <h1 className="font-bold text-white text-3xl md:text-4xl tracking-wider leading-tight">
            ELEVATE YOUR EVERYDAY
          </h1>
          <h2 className="mt-4 text-[#F5A623] text-2xl md:text-3xl font-bold italic font-serif">
            Click. Shop. Repeat!
          </h2>
          <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
            Buy and sell safely within your campus community.
            <br />A trusted marketplace made exclusively for verified students.
            <br />
            Everything you need on campus, just a click away.
            <br />
            Discover great deals from real students near you.
            <br />
            Campus shopping, simplified.
          </p>
          <div className="flex mt-10 gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => isLoggedIn ? navigate("/sellerprofile") : navigate("/login")}
              className="bg-[#F5A623] text-[#0D1B2A] font-bold rounded-full px-8 py-3 text-sm"
            >
              Start Selling
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate("/shop")}
              className="border-2 border-white text-white font-bold rounded-full px-8 py-3 text-sm bg-transparent"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
