import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/navbar";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import Shop from "./pages/shop";
import Notification from "./pages/notification";
import BuyerProfile from "./pages/buyerProfile";
import ViewCart from "./pages/viewCart";
import ProductDetails from "./pages/productDetails";
import ChatSeller from "./pages/chatSeller";
import Checkout from "./pages/checkout"
function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/notification" element={<Notification/>}></Route>
        <Route path="/buyerprofile" element={<BuyerProfile/>}></Route>
        <Route path="/viewcart" element={< ViewCart/>}></Route>
        <Route path="/productdetails" element={< ProductDetails/>}></Route>
        <Route path='/chatseller' element={<ChatSeller/>}></Route>
      <Route path = "/checkout" element={<Checkout/>}></Route>
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
