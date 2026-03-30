import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, HelpCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqs = [
  { q: "How do I report a problem with my order?", a: 'Go to your order history, select the order, and click "Report Issue". You can also contact the seller directly through the chat feature or reach out to our support team using the form above.' },
  { q: "What payment methods are accepted?", a: "We accept Cash on Delivery and Mobile Money payments (MTN, Vodafone, AirtelTigo, and Telecel). Payment is typically completed when you meet the seller at the designated campus location." },
  { q: "How can I verify a seller?", a: "Look for the verified shield icon next to the seller's name. Check their rating, number of sales, and student verification status. Always meet in public campus locations for safety." },
  { q: "What are the safe meet-up locations?", a: "We recommend meeting at well-lit, public campus locations such as the Student Union, Library Entrance, Main Gate, or Cafeteria during daytime hours." },
  { q: "How do refunds work?", a: "Refund policies are set by individual sellers. Contact the seller first to resolve any issues. If unresolved, our support team can mediate disputes between students." },
  { q: "Can I change my meet-up location?", a: "Yes! Contact the seller through the chat to arrange a different campus meet-up location that works for both parties. Always confirm the new location before heading out." },
];

const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors bg-white placeholder:text-gray-400";

export default function ContactUs() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", studentId: "", subject: "", orderNumber: "", message: "", agree: false });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      <div className="px-4 md:px-10 py-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">CONTACT US</h1>
        <p className="text-sm text-gray-500 mb-6">We're here to help! Reach out to us with any questions or concerns.</p>

        <div className="flex flex-col lg:flex-row gap-5">

          {/* Left — form */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-sm text-gray-900 mb-4 tracking-wide">SEND US A MESSAGE</h2>

            <div className="space-y-3">
              {/* Name row */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-600 font-medium block mb-1">FIRST NAME *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter first name" className={inputClass} />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-600 font-medium block mb-1">LAST NAME *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter last name" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">EMAIL ADDRESS *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@university.edu" className={inputClass} />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">STUDENT ID (OPTIONAL)</label>
                <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Enter your student ID" className={inputClass} />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">SUBJECT *</label>
                <input name="subject" value={form.subject} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">ORDER NUMBER (IF APPLICABLE)</label>
                <input name="orderNumber" value={form.orderNumber} onChange={handleChange} placeholder="e.g. #12345" className={inputClass} />
              </div>

              <div>
                <label className="text-xs text-gray-600 font-medium block mb-1">MESSAGE *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Please describe your issue or question in detail..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mt-0.5 w-3.5 h-3.5 accent-[#F5A623]" />
                I agree to receive follow-up emails regarding my inquiry and understand that my information will be handled according to the privacy policy.
              </label>

              {sent && <p className="text-green-600 text-xs font-medium">✅ Message sent successfully!</p>}

              <button
                onClick={handleSend}
                className="w-full bg-[#F5A623] text-white font-bold py-3 rounded text-sm tracking-widest uppercase cursor-pointer hover:bg-[#e09610] transition-colors"
              >
                SEND MESSAGE
              </button>
            </div>
          </div>

          {/* Right — info panels */}
          <div className="lg:w-64 shrink-0 flex flex-col gap-4">

            {/* Campus Office */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-bold text-xs text-gray-900 mb-3 tracking-widest">CAMPUS OFFICE</h2>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Location", lines: ["Student Union Building,", "Room 205, 2nd Floor", "University Campus"] },
                  { icon: Phone, label: "Phone", lines: ["(555) 123-4567", "Mon-Fri, 9 AM – 5 PM"] },
                  { icon: Mail, label: "Email", lines: ["unimartsupport@gmail.com", "24-48 hour response time"] },
                  { icon: Clock, label: "Office Hours", lines: ["Monday – Friday: 9 AM – 5 PM", "Saturday: 10 AM – 2 PM", "Sunday: Closed"] },
                ].map(({ icon: Icon, label, lines }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <div className="w-7 h-7 bg-[#F5F0E8] rounded-full flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-[#F5A623]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{label}</p>
                      {lines.map((l, i) => <p key={i} className="text-xs text-gray-500">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-bold text-xs text-gray-900 mb-3 tracking-widest">QUICK SUPPORT</h2>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate("/chatseller")}
                  className="flex items-center justify-center gap-2 bg-[#F5A623] text-white text-xs py-2.5 rounded cursor-pointer hover:bg-[#e09610] transition-colors font-semibold"
                >
                  <MessageCircle size={13} /> Live Chat Support
                </button>
                <button
                  onClick={() => document.getElementById("faq").scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-xs py-2.5 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle size={13} /> View FAQ
                </button>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="flex items-center gap-1 text-xs font-bold text-gray-700 mb-1">
                <AlertTriangle size={12} className="text-[#F5A623]" /> NOTICE
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                During exam periods and holidays, response times may be longer. For urgent order issues, please contact the seller directly through the chat feature.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-10">
          <h2 className="font-bold text-base text-gray-900 mb-5">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
