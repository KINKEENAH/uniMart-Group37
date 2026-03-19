import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Check, ChevronRight } from "lucide-react";

const locations = [
  { id: 1, name: "Main Library Entrance", hours: "Available: Mon-Fri 8AM-8PM" },
  { id: 2, name: "Commercial Area", hours: "Available: Mon-Fri 8AM-3PM" },
  { id: 3, name: "Engineering Gate", hours: "Available: Tue-Thur 10AM-4PM" },
];

const paymentMethods = [
  { id: "cash", label: "Cash", description: "Pay with cash at meet-up" },
  { id: "mobile", label: "Mobile Money", description: "Pay via mobile money" },
];

const orderItems = [
  { id: 1, name: "Apple Watch Series 10", qty: 1, price: 350.00 },
  { id: 2, name: "Economic Textbook Bundle", qty: 1, price: 150.00 },
  { id: 3, name: "Electric Kettle", qty: 1, price: 150.00 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [form, setForm] = useState({ fullname: "", email: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const selectedLocationName = locations.find(l => l.id === selectedLocation)?.name;

  return (
    <section className="min-h-screen bg-[#F5F5F5] pt-20 px-4 md:px-8 pb-10">

      {/* breadcrumb */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/")}>Home</span>
          <ChevronRight size={12} />
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/shop")}>Shop</span>
          <ChevronRight size={12} />
          <span className="text-[#1A1A1A] font-medium">Checkout</span>
        </div>
        <button
          onClick={() => navigate("/viewcart")}
          className="text-xs text-gray-500 hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
        >
          ← Back to Cart
        </button>
      </div>

      <h1 className="font-bold text-2xl text-[#1A1A1A] mb-6">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-6">

        {/* left column */}
        <div className="flex-1 flex flex-col gap-4">

          {/* contact information */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm text-[#1A1A1A] mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Fullname</label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="Enter fullname"
                  className="border border-gray-200 p-2.5 w-full rounded-md outline-none placeholder:text-gray-300 text-sm focus:border-[#1A1A1A] transition-colors mt-1 bg-[#F5F5F5]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@university.edu"
                  className="border border-gray-200 p-2.5 w-full rounded-md outline-none placeholder:text-gray-300 text-sm focus:border-[#1A1A1A] transition-colors mt-1 bg-[#F5F5F5]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+233"
                  className="border border-gray-200 p-2.5 w-full rounded-md outline-none placeholder:text-gray-300 text-sm focus:border-[#1A1A1A] transition-colors mt-1 bg-[#F5F5F5]"
                />
              </div>
            </div>
          </div>

          {/* meet-up location */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={15} className="text-[#1A1A1A]" />
              <h2 className="font-semibold text-sm text-[#1A1A1A]">Meet-up Location</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">Select a campus location for product pick-up</p>
            <div className="flex flex-col gap-2">
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer border transition-colors
                    ${selectedLocation === loc.id
                      ? "border-gray-400 bg-[#F5F5F5]"
                      : "border-gray-200 bg-[#F5F5F5] hover:border-gray-300"
                    }`}
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{loc.name}</p>
                    <p className="text-xs text-gray-400">{loc.hours}</p>
                  </div>
                  {selectedLocation === loc.id && (
                    <div className="w-5 h-5 bg-[#1A1A1A] rounded-sm flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* payment method */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={15} className="text-[#1A1A1A]" />
              <h2 className="font-semibold text-sm text-[#1A1A1A]">Payment Method</h2>
            </div>
            <p className="text-xs text-gray-400 mb-4">Choose how you'd like to pay</p>
            <div className="flex gap-3">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex-1 flex justify-between items-start p-3 rounded-md cursor-pointer border transition-colors
                    ${selectedPayment === method.id
                      ? "border-gray-400 bg-[#F5F5F5]"
                      : "border-gray-200 bg-[#F5F5F5] hover:border-gray-300"
                    }`}
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{method.label}</p>
                    <p className="text-xs text-gray-400">{method.description}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <div className="w-5 h-5 bg-[#1A1A1A] rounded-sm flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column — order summary */}
        <div className="md:w-80 shrink-0">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-sm text-[#1A1A1A] mb-4">Order Summary</h2>

            {/* items */}
            <div className="flex flex-col gap-3 mb-4">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0 text-xs text-gray-400">
                    IMG
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#1A1A1A]">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold">₵{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>₵{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tax(5%)</span>
                <span>₵{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-1 border-t border-gray-100">
                <span>Total</span>
                <span>₵{total.toFixed(2)}</span>
              </div>
            </div>

            {/* summary info */}
            <div className="mt-4 bg-[#F5F5F5] rounded-md p-3 space-y-1">
              <p className="text-xs text-gray-500">
                <span className="font-medium text-[#1A1A1A]">Meet-up:</span> {selectedLocationName}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-[#1A1A1A]">Payment:</span>{" "}
                {paymentMethods.find(p => p.id === selectedPayment)?.label}
              </p>
            </div>

            {/* confirm button */}
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[#1A1A1A] text-white p-3 rounded-md text-sm tracking-wider mt-4 hover:bg-gray-800 transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}