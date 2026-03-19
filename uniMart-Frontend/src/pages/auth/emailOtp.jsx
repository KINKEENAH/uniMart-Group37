import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmailOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // user_id and email passed from signup page
  const { user_id, email } = location.state || {};

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

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");

    if (code.length < 6) {
      return setError("Please enter the full 6-digit code");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Verification failed");
      }

      // Verified — go to login
      navigate("/login");
    } catch (err) {
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
        body: JSON.stringify({ user_id, type: "verify" }),
      });
      const data = await res.json();
      if (res.ok) setResendMsg("A new code has been sent");
      else setError(data.message || "Failed to resend");
    } catch {
      setError("Network error");
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          <div className="flex justify-end mb-10">
            <span className="font-nico text-xl text-[#1A1A1A]">UniMart</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-semibold text-2xl text-[#1A1A1A] mb-3">Email Verification</h1>
            <p className="text-sm text-[#736E6E]">
              Check your email for a 6-digit code and enter it
              <br /> below to verify your account.
            </p>
            {email && <p className="text-sm text-[#1A1A1A] font-medium mt-1">{email}</p>}
          </div>

          <div className="flex gap-3 justify-center mb-4">
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

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          {resendMsg && <p className="text-green-600 text-sm text-center mb-3">{resendMsg}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#1A1A1A] text-white p-3 rounded-md tracking-widest text-sm uppercase hover:bg-[#333333] transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </motion.button>

          <p className="text-center text-xs text-[#736E6E] mt-4">
            Didn't get the code?{" "}
            <span
              onClick={handleResend}
              className="text-[#1A1A1A] font-semibold cursor-pointer hover:underline"
            >
              Resend code
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
