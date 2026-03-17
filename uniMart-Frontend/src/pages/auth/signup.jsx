import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <section className=" min-h-screen bg-white pt-20 pr-5">
      <div className="flex flex-row min-h-screen">
        {/*image section*/}

        <div className="hidden md:flex bg-[#D9D9D9] w-1/2 items-center justify-center">
          <img src="" alt="" className="h-full w-full object-cover" />
        </div>

        {/*inputs section */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          {/*sign up and text section */}
          <div className="flex justify-between">
            <h1 className="font-inter font-semibold text-2xl">Sign Up</h1>
            <h1 className="flex justify-center font-nico text-xl">uniMart</h1>
          </div>

          <div className="space-y-4 mt-5 p-7">
            {/*full name */}
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="border   p-2 w-full rounded-xl placeholder:text-[#B9B9B9] "
              ></input>
            </div>
            {/*student id */}
            <div>
              <input
                type="text"
                placeholder="Student ID"
                className="border   p-2 w-full rounded-xl placeholder:text-[#B9B9B9] "
              ></input>
            </div>
            {/*email */}
            <div>
              <input
                type="email"
                placeholder="Student email"
                className="border   p-2 w-full rounded-xl placeholder:text-[#B9B9B9] "
              ></input>
              <h3 className="text-[#515151] font-inter font-medium text-sm pt-2">
                Use your personal or student email
              </h3>
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

            {/*confirm password */}
            <div className="border   p-2 w-full flex justify-between rounded-lg">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="outline-none border-none w-full placeholder:text-[#B9B9B9] "
              ></input>
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {" "}
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className=" ">
              <input
                type="checkbox"
                id="terms"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="cursor-pointer checked:bg-black"
              />
              <label
                htmlFor="terms"
                className="pl-5 text-[#736E6E] font-inter font-normal text-sm"
              >
                I agree to all Terms, Privacy Policy and Fees
              </label>
            </div>
          </div>
          <div className="flex justify-center border bg-black rounded-xl  mt-5 ml-9">
            <button
              onClick={() => navigate("/emailotp")}
              className="text-white p-3.5 cursor-pointer hover:hover:text-gray-500 "
            >
              Create Account
            </button>
          </div>
          <div className="flex flex-row justify-center pt-3">
            <h5 className="text-[Dark Grey 600] font-inter">
              Already have an account?{" "}
            </h5>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/login")}
              className="pl-1 cursor-pointer hover:text-blue-600 text-[Dark Grey 600] font-inter"
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
