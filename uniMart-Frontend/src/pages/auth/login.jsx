import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const from = location.state?.from||"/";
  const handleLogin =()=>{
    login();
    navigate(from);
  }

  

  return (
    <section className="pt-20 pr-5 min-h-screen bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="md:w-1/2 bg-white flex flex-col justify-center px-10 py-12 ">
          <div className="flex justify-between">
            <h1 className="font-inter font-semibold text-2xl">Login</h1>
            <h1 className="flex justify-center font-nico text-xl">uniMart</h1>
          </div>
          {/*email */}
          <div className="space-y-4 mt-5 p-7">
            <div>
              <input
                type="email"
                placeholder="Student email"
                className="border mb-4  p-2 w-full rounded-xl placeholder:text-[#B9B9B9] "
              ></input>
            </div>

            {/*password */}
            <div className="border   p-2 w-full flex justify-between rounded-lg ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border-none w-full placeholder:text-[#B9B9B9] "
              ></input>
              <button onClick={() => setShowPassword(!showPassword)}>
                {" "}
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex flex-row justify-between mt-6.5">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="cursor-pointer checked:bg-black"
                />
                <label
                  htmlFor="terms"
                  className="pl-3 text-[#736E6E] font-inter font-normal text-sm"
                >
                  Remember me
                </label>
              </div>
              <h3 className="cursor-pointer hover:text-blue-600 text-[#736E6E] font-inter font-normal text-sm">
                Reset Password?
              </h3>
            </div>
          </div>
          <div className="flex justify-center border bg-black rounded-xl  mt-5 ml-9">
            <button
              onClick={() => navigate("/loginotp", {state:{from}})}
              className="text-white p-3.5 cursor-pointer hover:hover:text-gray-500 "
            >
              LOGIN
            </button>
          </div>
          <div className="flex flex-row justify-center pt-3">
            <h5 className="text-[Dark Grey 600] font-inter font-normal text-sm">
              Don't have an account yet?{" "}
            </h5>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/signup")}
              className="pl-1 cursor-pointer hover:text-blue-600 text-[Dark Grey 600] font-inter font-normal text-sm"
            >
              Create your UniMart account
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
