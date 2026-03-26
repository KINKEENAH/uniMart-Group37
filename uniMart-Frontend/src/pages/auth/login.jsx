import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      return setError("Email and password are required");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requires_verification) {
          return navigate("/emailotp", { state: { user_id: data.user_id, email } });
        }
        return setError(data.message || "Login failed");
      }

      navigate("/loginotp", { state: { user_id: data.user_id, email } });
    } catch (err) {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20 pr-5 min-h-screen bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          <div className="flex justify-between">
            <h1 className="font-inter font-semibold text-2xl">Login</h1>
            <h1 className="flex justify-center font-nico text-xl">uniMart</h1>
          </div>

          <div className="space-y-4 mt-5 p-7">
            <div>
              <input
                type="email"
                placeholder="Student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded-xl placeholder:text-[#B9B9B9]"
              />
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

            <div className="flex flex-row justify-between">
              <h3 className="cursor-pointer hover:text-blue-600 text-[#736E6E] font-inter font-normal text-sm">
                Reset Password?
              </h3>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex justify-center border bg-black rounded-xl mt-5 ml-9">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="text-white p-3.5 cursor-pointer hover:text-gray-400 disabled:opacity-60 w-full"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>

          <div className="flex flex-row justify-center pt-3">
            <h5 className="font-inter font-normal text-sm">Don't have an account yet? </h5>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/signup")}
              className="pl-1 cursor-pointer hover:text-blue-600 font-inter font-normal text-sm"
            >
              Create your UniMart account
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
