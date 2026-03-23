import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";
import loginImage from "../../assets/login.png";
import logo from "../../assets/UniMart.png";

export default function LoginOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { user_id, email } = location.state || {};

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputs.current[index - 1].focus();
  };

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");
    if (code.length < 6) return setError("Please enter the full 6-digit code");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, code }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Verification failed");
      login(data.user, data.token);
      navigate("/shop");
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    setError("");
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, type: "login" }),
      });
      const data = await res.json();
      if (res.ok) setResendMsg("A new code has been sent");
      else setError(data.message || "Failed to resend");
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — image panel */}
      <div className="hidden md:block w-1/2 bg-[#0D1B2A] relative overflow-hidden">
        <img
          src={loginImage}
          alt="UniMart app"
          className="absolute bottom-0 left-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Right — form panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col px-12 py-12">
        {/* Logo — top right */}
        <div className="flex justify-end">
          <img src={logo} alt="UniMart" className="h-7 object-contain" />
        </div>

        {/* Content — vertically centered */}
        <div className="flex flex-col justify-center flex-1">
          <div className="text-center mb-8">
            <h1 className="font-semibold text-2xl text-gray-900 mb-3">Enter your login code</h1>
            <p className="text-sm text-gray-500">
              Check your email for a 6-digit code and enter it
              <br />below to access your account.
            </p>
            {email && <p className="text-sm text-gray-700 font-medium mt-1">{email}</p>}
          </div>

          {/* OTP inputs */}
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-14 border border-[#F5A623] rounded-lg text-center text-xl outline-none focus:ring-2 focus:ring-[#F5A623]/40 transition-colors duration-200"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          {resendMsg && <p className="text-green-600 text-sm text-center mb-3">{resendMsg}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#F5A623] text-white font-semibold py-3 rounded-lg text-sm tracking-widest uppercase disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Login"}
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Didn't get the code?{" "}
            <span onClick={handleResend} className="text-[#F5A623] cursor-pointer hover:underline">
              Resend code
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
