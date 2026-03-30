import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/navbar";
import RequireAuth from "./components/RequireAuth";
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
import Checkout from "./pages/checkout";
import EmailOtp from "./pages/auth/emailOtp";
import LoginOtp from "./pages/auth/loginotp";
import SellerDash from "./pages/sellerDashboard";
import SellerProfile from "./pages/sellerProfile";
import AddProduct from "./pages/addProduct";
import SellerPublicProfile from "./pages/sellerPublicProfile";

function App() {
  const location = useLocation();
  const hideNavbar = ["/signup", "/login"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <NavBar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailotp" element={<EmailOtp />} />
          <Route path="/loginotp" element={<LoginOtp />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/productdetails" element={<ProductDetails />} />

          {/* Protected */}
          <Route path="/buyerprofile" element={<RequireAuth><BuyerProfile /></RequireAuth>} />
          <Route path="/sellerprofile" element={<RequireAuth><SellerProfile /></RequireAuth>} />
          <Route path="/addproduct" element={<RequireAuth><AddProduct /></RequireAuth>} />
          <Route path="/viewcart" element={<RequireAuth><ViewCart /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/notification" element={<RequireAuth><Notification /></RequireAuth>} />
          <Route path="/chatseller" element={<RequireAuth><ChatSeller /></RequireAuth>} />
          <Route path="/sellerdashboard" element={<RequireAuth><SellerDash /></RequireAuth>} />
          <Route path="/seller/:id" element={<SellerPublicProfile />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
