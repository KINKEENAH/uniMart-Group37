import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    lines: ["Student Union Building", "Room 205, 2nd Floor", "University Campus"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["(555) 123-4567", "Mon-Fri, 9 AM – 5 PM"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["support@campusmarket.edu", "24-48 hour response time"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Monday – Friday: 9 AM – 5 PM", "Saturday: 10 AM – 2 PM", "Sunday: Closed"],
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">ABOUT UniMart</h1>
          <p className="text-sm text-gray-500">
            Welcome to Campus Marketplace, your one-stop shop for buying and selling items on campus.
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-sm text-gray-900 mb-3 tracking-wide">WHO WE ARE</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            UniMart is a platform designed to facilitate the buying and selling of items among students,
            faculty, and staff on campus. Our mission is to provide a safe, convenient, and efficient
            marketplace that enhances the campus community.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-sm text-gray-900 mb-3 tracking-wide">HOW IT WORKS</h2>
          <div className="space-y-2 text-sm text-gray-500">
            <p><span className="font-semibold text-gray-800">1. Browse and Search:</span> Use the search bar to find items you're interested in. You can filter by category, price, and more.</p>
            <p><span className="font-semibold text-gray-800">2. Contact Sellers:</span> Once you find an item you like, you can chat with the seller to ask questions or arrange a meet-up.</p>
            <p><span className="font-semibold text-gray-800">3. Meet and Exchange:</span> Meet the seller at a designated campus location to exchange the item and complete the transaction.</p>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-sm text-gray-900 mb-3 tracking-wide">SAFETY TIPS</h2>
          <ul className="space-y-1 text-sm text-gray-500">
            <li>Always meet in public, well-lit areas on campus.</li>
            <li>Bring a friend or someone you trust with you.</li>
            <li>Check the seller's rating and reviews before meeting.</li>
            <li>Be cautious with personal information and transactions.</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-sm text-gray-900 mb-5 tracking-wide">CONTACT INFORMATION</h2>
          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, lines }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#F5A623]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  {lines.map((line, i) => (
                    <p key={i} className={`text-sm ${i === lines.length - 1 && label === "Email" ? "text-[#F5A623]" : "text-gray-500"}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
