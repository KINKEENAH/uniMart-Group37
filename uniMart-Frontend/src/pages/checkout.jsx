import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Check, Banknote, Smartphone } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

const locations = [
  { id: 1, name: "Main Library Entrance", hours: "Available: Mon-Fri 8AM-8PM" },
  { id: 2, name: "Commercial Area", hours: "Available: Mon-Fri 8AM-3PM" },
  { id: 3, name: "Engineering Gate", hours: "Available: Tue-Thur 10AM-4PM" },
];

const paymentMethods = [
  { id: "cash", label: "Cash", description: "Pay with cash at meet-up", icon: Banknote },
  { id: "mobile", label: "Mobile Money", description: "Pay via mobile money", icon: Smartphone },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, removeItem } = useCart();
  const { token } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [form, setForm] = useState({ fullname: "", email: "", phone: "" });
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + tax;

  const selectedLocationName = locations.find((l) => l.id === selectedLocation)?.name;
  const selectedPaymentLabel = paymentMethods.find((p) => p.id === selectedPayment)?.label;

  const handleConfirmOrder = async () => {
    if (!form.fullname || !form.email) { setOrderError("Please fill in your name and email."); return; }
    if (cartItems.length === 0) { setOrderError("Your cart is empty."); return; }
    setOrderError("");
    setOrdering(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: cartItems.map((i) => ({ product_id: i.id, quantity: i.quantity, unit_price: i.price })),
          subtotal,
          tax_amount: tax,
          total_amount: total,
          payment_method: selectedPayment,
          meetup_location_name: selectedLocationName,
          contact: form,
        }),
      });
      if (res.ok) {
        // Clear cart items after successful order
        cartItems.forEach((i) => removeItem(i.id));
        navigate("/buyerprofile");
      } else {
        const data = await res.json();
        setOrderError(data.message || "Order failed. Please try again.");
      }
    } catch {
      setOrderError("Network error. Is the server running?");
    } finally {
      setOrdering(false);
    }
  };

  const inputClass =
    "border border-[#F5A623] p-3 w-full rounded-lg outline-none placeholder:text-gray-300 text-sm focus:ring-2 focus:ring-[#F5A623]/30 transition-colors mt-1 bg-white";

  return (
    <section className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      {/* Breadcrumb */}
      <div className="px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/")}>Home</span>
          <span className="mx-1">{">"}</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate("/shop")}>Shop</span>
          <span className="mx-1">{">"}</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>
        <button
          onClick={() => navigate("/viewcart")}
          className="text-sm text-[#F5A623] cursor-pointer hover:underline bg-transparent border-none"
        >
          ← Back to Cart
        </button>
      </div>

      <div className="px-10">
        <h1 className="font-bold text-2xl text-gray-900 mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="font-semibold text-base text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Fullname</label>
                  <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Enter fullname"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@university.edu"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+233"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Meet-up Location */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-gray-700" />
                <h2 className="font-semibold text-base text-gray-900">Meet-up Location</h2>
              </div>
              <p className="text-xs text-gray-400 mb-4">Select a campus location for product pick-up</p>
              <div className="flex flex-col gap-3">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`flex justify-between items-center p-4 rounded-lg cursor-pointer border transition-colors ${
                      selectedLocation === loc.id
                        ? "border-[#F5A623] bg-[#FFFBF2]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{loc.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{loc.hours}</p>
                    </div>
                    {selectedLocation === loc.id && (
                      <div className="w-6 h-6 border-2 border-[#F5A623] rounded flex items-center justify-center shrink-0">
                        <Check size={13} className="text-[#F5A623]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard size={16} className="text-gray-700" />
                <h2 className="font-semibold text-base text-gray-900">Payment Method</h2>
              </div>
              <p className="text-xs text-gray-400 mb-4">Choose how you'd like to pay</p>
              <div className="flex gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex-1 flex justify-between items-start p-4 rounded-lg cursor-pointer border transition-colors ${
                        selectedPayment === method.id
                          ? "border-[#F5A623] bg-[#FFFBF2]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Icon size={16} className="text-gray-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{method.label}</p>
                          <p className="text-xs text-gray-400">{method.description}</p>
                        </div>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="w-6 h-6 border-2 border-[#F5A623] rounded flex items-center justify-center shrink-0 ml-2">
                          <Check size={13} className="text-[#F5A623]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — Order Summary */}
          <div className="lg:w-80 shrink-0 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>

            {/* Items */}
            <div className="flex flex-col gap-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-700 mt-0.5">₵{item.price}.00</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-800">₵{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax(8%)</span>
                <span className="text-gray-800">₵{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#F5A623]">₵{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Summary info */}
            <div className="mt-4 border border-gray-200 rounded-lg p-3 space-y-1 text-sm text-gray-500">
              <p>Meet-up: {selectedLocationName}</p>
              <p>Payment: {selectedPaymentLabel}</p>
            </div>

            {orderError && <p className="text-red-500 text-sm mt-2">{orderError}</p>}
            <button
              onClick={handleConfirmOrder}
              disabled={ordering}
              className="mt-4 w-full bg-[#F5A623] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#e09610] disabled:opacity-60 transition-colors"
            >
              {ordering ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
