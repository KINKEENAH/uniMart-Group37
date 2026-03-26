import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-24 font-inter">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">ABOUT UniMart</h1>
        <p className="text-gray-700 text-sm md:text-base">
          Welcome to Campus Marketplace, your one-stop shop for buying and selling items on campus.
        </p>
      </div>

      {/* Who We Are */}
      <div className="border border-black p-5 mb-6 bg-white">
        <h2 className="font-semibold mb-3">WHO WE ARE</h2>
        <p className="text-sm text-gray-700">
          UniMart is a platform designed to facilitate the buying and selling of items among students,
          faculty, and staff on campus. Our mission is to provide a safe, convenient, and efficient
          marketplace that enhances the campus community.
        </p>
      </div>

      {/* How It Works */}
      <div className="border border-black p-5 mb-6 bg-white">
        <h2 className="font-semibold mb-3">HOW IT WORKS</h2>

        <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
          <li>
            <span className="font-semibold">Browse and Search:</span> Use the search bar to find
            items you're interested in. You can filter by category, price, and more.
          </li>

          <li>
            <span className="font-semibold">Contact Sellers:</span> Once you find an item you like,
            you can chat with the seller to ask questions or arrange a meet-up.
          </li>

          <li>
            <span className="font-semibold">Meet and Exchange:</span> Meet the seller at a designated
            campus location to exchange the item and complete the transaction.
          </li>
        </ol>
      </div>

      {/* Safety Tips */}
      <div className="border border-black p-5 mb-6 bg-white">
        <h2 className="font-semibold mb-3">SAFETY TIPS</h2>

        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
          <li>Always meet in public, well-lit areas on campus.</li>
          <li>Bring a friend or someone you trust with you.</li>
          <li>Check the seller's rating and reviews before meeting.</li>
          <li>Be cautious with personal information and transactions.</li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="border border-black p-5 bg-white">

        <h2 className="font-semibold mb-4">CONTACT INFORMATION</h2>

        <div className="grid md:grid-cols-1 gap-6 text-sm text-gray-700">

          {/* Location */}
          <div className="flex gap-3 items-start">
            <div className="bg-gray-200 p-2">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="font-semibold">Location</p>
              <p>Student Union Building</p>
              <p>Room 205, 2nd Floor</p>
              <p>University Campus</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-3 items-start">
            <div className="bg-gray-200 p-2">
              <FaPhone />
            </div>

            <div>
              <p className="font-semibold">Phone</p>
              <p>(555) 123-4567</p>
              <p>Mon–Fri, 9 AM – 5 PM</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-3 items-start">
            <div className="bg-gray-200 p-2">
              <FaEnvelope />
            </div>

            <div>
              <p className="font-semibold">Email</p>
              <p>support@campusmarket.edu</p>
              <p>24–48 hrs response time</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex gap-3 items-start">
            <div className="bg-gray-200 p-2">
              <FaClock />
            </div>

            <div>
              <p className="font-semibold">Office Hours</p>
              <p>Monday – Friday: 9 AM – 5 PM</p>
              <p>Saturday: 10 AM – 2 PM</p>
              <p>Sunday: Closed</p>

             
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}