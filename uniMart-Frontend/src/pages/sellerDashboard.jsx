import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  BarChart2,
  Edit,
  Eye,
  Trash2,
  Plus,
  RotateCcw,
  Star,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics • Headphones",
    price: 199.99,
    stock: 12,
    views: 342,
    sales: 87,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Laptop Stand Aluminum",
    category: "Accessories • Desk",
    price: 499.99,
    stock: 10,
    views: 142,
    sales: 87,
    status: "LOW STOCK",
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    category: "Electronics • Adapters",
    price: 19.99,
    stock: 0,
    views: 843,
    sales: 87,
    status: "SOLD OUT",
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    category: "Electronics • Keyboards",
    price: 899.99,
    stock: 8,
    views: 242,
    sales: 87,
    status: "ACTIVE",
  },
];

const statusStyle = {
  ACTIVE: "bg-black text-white",
  "LOW STOCK": "bg-gray-400 text-white",
  "SOLD OUT": "bg-gray-600 text-white",
};

export default function SellerDash() {
  const [activeTab, setActiveTab] = useState("MY PRODUCTS");
  const [filter, setFilter] = useState("ALL PRODUCTS");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const filters = ["ALL PRODUCTS", "ACTIVE", "SOLD OUT"];
  const tabs = ["MY PRODUCTS", "ORDER HISTORY", "ANALYTICS"];

  const filtered =
    filter === "ALL PRODUCTS"
      ? products
      : products.filter((p) => p.status === filter);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/sellerprofile");
    } else {
      navigate("/login", { state: { from: "/sellerprofile" } });
    }
  };

  const handleAddProduct = () => {
    if (isLoggedIn) {
      navigate("/addproduct");
    } else {
      navigate("/login", { state: { from: "/addproduct" } });
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F5F5] pt-18">
      <div>
        {/* profile header */}
        <div className="bg-white rounded-xl p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                onClick={handleProfileClick}
                className="relative shrink-0 cursor-pointer"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-200 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <span className="text-2xl text-gray-400">👤</span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2
                  onClick={handleProfileClick}
                  className="text-lg md:text-xl font-bold text-[#1A1A1A] cursor-pointer hover:underline"
                >
                  Prince Owusu
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 mt-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>4.8 • 47 sales •</span>
                  <Shield size={14} className="text-blue-500" />
                  <span>Verified Student</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> powusu@gmail.com
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> +233 (555) 123-4567
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> Student since 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap size={12} /> Computer Science
                  </span>
                  <span className="flex items-center gap-1">⚡ Lvl 200</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Main Campus, Brunei
                  </span>
                </div>
              </div>
            </div>

            {/* top right buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-1 bg-[#1A1A1A] text-white px-3 md:px-4 py-2 rounded-md text-xs tracking-wider hover:bg-gray-800 transition-colors"
              >
                <Plus size={14} /> Add Product
              </button>
              <button
                onClick={() => navigate("/editprofile")}
                className="flex items-center gap-1 border border-gray-300 text-[#1A1A1A] px-3 md:px-4 py-2 rounded-md text-xs tracking-wider hover:bg-gray-50 transition-colors"
              >
                <Edit size={14} /> Edit
              </button>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            {[
              {
                icon: <Package size={20} />,
                value: "4",
                label: "Total Products",
              },
              {
                icon: <ShoppingBag size={20} />,
                value: "47",
                label: "Total Sales",
              },
              {
                icon: <span className="text-lg font-bold">₵</span>,
                value: "₵4,000",
                label: "Total Revenue",
              },
              {
                icon: <TrendingUp size={20} />,
                value: "2",
                label: "Active Listings",
              },
            ].map((stat, i) => (
              <div key={i} className="bg-[#F5F5F5] rounded-lg p-3 md:p-4">
                <div className="text-gray-400 mb-2">{stat.icon}</div>
                <div className="text-lg md:text-xl font-bold text-[#1A1A1A]">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div className="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 md:py-4 text-xs tracking-widest font-medium transition-colors duration-200
                ${
                  activeTab === tab
                    ? "bg-[#1A1A1A] text-white"
                    : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* products section */}
        <div className="bg-white rounded-b-xl p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="font-bold text-lg tracking-wider text-[#1A1A1A]">
              MY PRODUCTS
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs tracking-wider border rounded-sm transition-colors duration-200
                    ${
                      filter === f
                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                        : "border-gray-300 text-gray-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                    }`}
                >
                  {f}
                </button>
              ))}
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-1 px-3 py-1 text-xs tracking-wider bg-[#1A1A1A] text-white rounded-sm hover:bg-gray-800 transition-colors"
              >
                <Plus size={12} /> ADD NEW
              </button>
            </div>
          </div>

          {/* product list */}
          <div className="flex flex-col gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-3 md:p-4"
              >
                <div className="flex gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400 shrink-0">
                    IMAGE
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#1A1A1A] text-sm truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {product.category}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-sm shrink-0 ${statusStyle[product.status]}`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-6 mt-3">
                      <div>
                        <p className="text-xs text-gray-400 tracking-wider">
                          PRICE
                        </p>
                        <p className="text-sm font-semibold">
                          ₵{product.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 tracking-wider">
                          STOCK
                        </p>
                        <p className="text-sm font-semibold">{product.stock}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 tracking-wider">
                          VIEWS
                        </p>
                        <p className="text-sm font-semibold flex items-center gap-1">
                          <Eye size={12} /> {product.views}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 tracking-wider">
                          SALES
                        </p>
                        <p className="text-sm font-semibold">{product.sales}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.status === "SOLD OUT" ? (
                        <button
                          onClick={() => navigate(`/restock/${product.id}`)}
                          className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                        >
                          <RotateCcw size={12} /> RESTOCK
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/editproduct/${product.id}`)}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-[#1A1A1A] text-white rounded-sm hover:bg-gray-800 transition-colors"
                        >
                          <Edit size={12} /> EDIT
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                      >
                        <Eye size={12} /> VIEW LISTING
                      </button>
                      <button
                        onClick={() => navigate(`/analytics/${product.id}`)}
                        className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                      >
                        <BarChart2 size={12} /> ANALYTICS
                      </button>
                      {product.status !== "SOLD OUT" && (
                        <button
                          onClick={() =>
                            navigate(`/deleteproduct/${product.id}`)
                          }
                          className="flex items-center gap-1 px-3 py-1 text-xs border border-red-200 text-red-500 rounded-sm hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} /> DELETE
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
