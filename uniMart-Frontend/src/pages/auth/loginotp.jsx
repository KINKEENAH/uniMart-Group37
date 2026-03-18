import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";
import { useLocation } from "react-router-dom";

export default function LoginOtp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = () => {
    login();
    navigate(from);
  };

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="flex flex-row min-h-screen">
        {/* left image */}
        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        {/* right form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          {/* brand name top right */}
          <div className="flex justify-end mb-10">
            <span className="font-nico text-xl text-[#1A1A1A]">UniMart</span>
          </div>

          {/* title */}
          <div className="text-center mb-8">
            <h1 className="font-semibold text-2xl text-[#1A1A1A] mb-3">
              Enter your login code
            </h1>
            <p className="text-sm text-[#736E6E]">
              Check your email for a 6-digit code and enter it
              <br /> below to access your account.
            </p>
          </div>

          {/* otp boxes */}
          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 border border-[#D9D9D9] rounded-sm text-center text-xl outline-none focus:border-[#1A1A1A] transition-colors duration-200"
              />
            ))}
          </div>

          {/* verify button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleLogin}
            //onClick={() => navigate("/buyerprofile")}
            className="w-full bg-[#1A1A1A] text-white p-3 rounded-md tracking-widest text-sm uppercase hover:bg-[#333333] transition-colors duration-200"
          >
            Login
          </motion.button>

          {/* resend */}
          <p className="text-center text-xs text-[#736E6E] mt-4">
            Didn't get the code?{" "}
            <a className="text-[#1A1A1A] font-semibold cursor-pointer hover:underline">
              Resend code
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
