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
import Checkout from "./pages/checkout";
import EmailOtp from "./pages/auth/emailOtp";
import LoginOtp from "./pages/auth/loginotp";
import SellerDash from "./pages/sellerDashboard";
import SellerProfile from "./pages/sellerProfile";
import AddProduct from "./pages/addProduct";
function App() {
  const location = useLocation();
  const hideNavbar = ["/signup", "/login", "/emailotp", "/loginotp"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <NavBar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/buyerprofile" element={<BuyerProfile />}></Route>
          <Route path="/viewcart" element={<ViewCart />}></Route>
          <Route path="/productdetails" element={<ProductDetails />}></Route>
          <Route path="/chatseller" element={<ChatSeller />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/emailotp" element={<EmailOtp />}></Route>
           <Route path="/loginotp" element={<LoginOtp />}></Route>
           <Route path="/sellerdashboard" element={<SellerDash/>}></Route>
           <Route path="/sellerprofile" element={<SellerProfile/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
