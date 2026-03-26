import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import loginImage from "../../assets/login.png";
import logo from "../../assets/UniMart.png";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from || "/";

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Email and password are required");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return setError(data.message || "Login failed");
      }
      await login(data.user, data.token);
      navigate(from || "/shop");
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#F5A623] placeholder-[#F5A623] text-sm outline-none focus:ring-2 focus:ring-[#F5A623]/40";

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
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none mb-2 flex items-center gap-1"
            >
              ← Back to Home
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
          </div>
          <img src={logo} alt="UniMart" className="h-7 object-contain" />
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />

          <div className="flex items-center border border-[#F5A623] rounded-lg px-4 py-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 text-sm outline-none placeholder-[#F5A623]"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 ml-2">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember me + Reset */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#F5A623]"
              />
              Remember me
            </label>
            <span
              onClick={() => navigate("/contact")}
              className="text-sm text-gray-500 cursor-pointer hover:underline"
            >
              Reset Password?
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-lg text-sm tracking-widest uppercase disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account yet?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#F5A623] cursor-pointer hover:underline"
          >
            Create your UniMart account
          </span>
        </p>
      </div>
    </div>
  );
}
