import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

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

  const handleSignup = async () => {
    setError("");

    if (!fullName || !studentId || !email || !password) {
      return setError("All fields are required");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!checked) {
      return setError("You must agree to the terms");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          student_id: studentId,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Signup failed");
      }

      // Pass user_id to OTP page via navigation state
      navigate("/emailotp", { state: { user_id: data.user_id, email } });
    } catch (err) {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white pt-20 pr-5">
      <div className="flex flex-row min-h-screen">
        {/* image section */}
        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        {/* inputs section */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          <div className="flex justify-between">
            <h1 className="font-inter font-semibold text-2xl">Sign Up</h1>
            <h1 className="flex justify-center font-nico text-xl">uniMart</h1>
          </div>

          <div className="space-y-4 mt-5 p-7">
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border p-2 w-full rounded-xl placeholder:text-[#B9B9B9]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border p-2 w-full rounded-xl placeholder:text-[#B9B9B9]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded-xl placeholder:text-[#B9B9B9]"
              />
              <h3 className="text-[#515151] font-inter font-medium text-sm pt-2">
                Use your personal or student email
              </h3>
            </div>
            <div className="border p-2 w-full flex justify-between rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border-none w-full placeholder:text-[#B9B9B9]"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="border p-2 w-full flex justify-between rounded-lg">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="outline-none border-none w-full placeholder:text-[#B9B9B9]"
              />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div>
              <input
                type="checkbox"
                id="terms"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="cursor-pointer"
              />
              <label htmlFor="terms" className="pl-5 text-[#736E6E] font-inter font-normal text-sm">
                I agree to all Terms, Privacy Policy and Fees
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex justify-center border bg-black rounded-xl mt-5 ml-9">
            <button
              onClick={handleSignup}
              disabled={loading}
              className="text-white p-3.5 cursor-pointer hover:text-gray-400 disabled:opacity-60 w-full"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <div className="flex flex-row justify-center pt-3">
            <h5 className="font-inter">Already have an account? </h5>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/login")}
              className="pl-1 cursor-pointer hover:text-blue-600 font-inter"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
