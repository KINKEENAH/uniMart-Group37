import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/Frame 8.png";
import logo from "../../assets/unimart_bnw.png";
import { useAuth } from "../../context/authContext";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async () => {
    setError("");
    if (!fullName || !studentId || !email || !password)
      return setError("All fields are required");
    if (password !== confirmPassword)
      return setError("Passwords do not match");
    if (!checked)
      return setError("You must agree to the terms");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, student_id: studentId, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Signup failed");
      await login(data.user, data.token);
      navigate("/shop");
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
          src={heroImage}
          alt="Shopping"
          className="absolute bottom-0 left-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Right — form panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Sign Up</h1>
          <img src={logo} alt="UniMart" className="h-7 object-contain" />
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className={inputClass}
          />
          <div>
            <input
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <p className="text-xs text-gray-400 mt-1 pl-1">Use your personal or student email</p>
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="flex items-center border border-[#F5A623] rounded-lg px-4 py-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 text-sm outline-none placeholder-[#F5A623]"
            />
            <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 ml-2">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 accent-[#F5A623] cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to all{" "}
              <span className="text-[#F5A623] cursor-pointer">Terms, Privacy Policy and Fees</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-lg text-sm disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#F5A623] cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
