import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="  pt-40  bg-[#B9B9B9] w-full min-h-screen ">
      <div className="flex flex-col gap-10 md:flex-row md:gap-28 items-center ">
        <div className="flex justify-center">
          <img
            src=""
            alt="Shopping"
            className="md:h-130 md:w-170  rounded-full object-cover object-bottom bg-gray-300 -ml-35 -mb-30"
          />
        </div>
        <div className="">
          <h1 className="font-bold leading-1 text-[#000000] text-center text-3xl tracking-wider">
            ELEVATE YOUR EVERYDAY
          </h1>
          <h2 className="pt-10 font-bold leading-1 text-[#000000] text-center text-2xl font-Lily font-lily">
            Click. Shop. Repeat!
          </h2>
          <p className="pt-7 font-inter text-center">
            Buy and sell within your campus community.
            <br /> A trusted marketplace made exclusively for verified students.
            <br />
            Everything you need on campus, just a click away.
            <br />
            Dicover great deals from real students near you.
            <br />
            Campus shopping, simplified.
          </p>
          <div className=" flex mt-12 gap-8 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/login")}
              className="bg-[#515151] rounded-xl p-2 px-8  text-white font-inter"
            >
              Start Selling
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => navigate("/login")}
              className="bg-[#515151] rounded-xl p-2 px-10  text-white font-inter"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
