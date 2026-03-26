import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaHeart,
  FaStar
} from "react-icons/fa";

import { MdPayments } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";

export default function BuyerProfile() {
  return (
    <div className="w-full bg-gray-100 min-h-screen p-4 pt-24 font-inter">

      {/* PROFILE HEADER */}
      <div className="bg-white border">

        <div className="flex flex-col md:flex-row justify-between p-6">

          <div className="flex gap-4">

            <FaUserCircle className="text-7xl text-gray-400"/>

            <div>
              <h2 className="font-bold text-xl">JORDAN WILLIAMS</h2>

              <p className="text-sm text-gray-500">
                Verified Student • 23 Purchases
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 mt-3 text-sm text-gray-600">

                <span className="flex items-center gap-2">
                  <FaEnvelope/> jordan.williams@st.knust.edu.gh
                </span>

                <span className="flex items-center gap-2">
                  <FaPhone/> +1 (555) 987-6543
                </span>

                <span className="flex items-center gap-2">
                  <IoCalendarOutline/> Student since 2026
                </span>

                <span className="flex items-center gap-2">
                  <FaGraduationCap/> Business Administration
                </span>

                <span className="flex items-center gap-2">
                  <FaStar/> Lvl 100
                </span>

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt/> Main Campus, Brunei
                </span>

              </div>
            </div>

          </div>

          <button className="border px-4 h-10 text-sm hover:bg-gray-900 cursor-pointer bg-black text-white">
            EDIT PROFILE
          </button>

        </div>
      </div>


      {/* STATISTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 text-center mt-4 border bg-white">

        <div className="p-6 border-r border-b md:border-b-0">
          <FaBox className="mx-auto text-gray-400 mb-2"/>
          <h3 className="text-2xl font-bold">23</h3>
          <p className="text-xs text-gray-500">TOTAL PURCHASES</p>
        </div>

        <div className="p-6 border-r border-b md:border-b-0">
          <MdPayments className="mx-auto text-gray-400 mb-2"/>
          <h3 className="text-2xl font-bold">$1,845</h3>
          <p className="text-xs text-gray-500">TOTAL SPENT</p>
        </div>

        <div className="p-6 border-r">
          <FaHeart className="mx-auto text-gray-400 mb-2"/>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-xs text-gray-500">WISHLIST ITEMS</p>
        </div>

        <div className="p-6">
          <FaStar className="mx-auto text-gray-400 mb-2"/>
          <h3 className="text-2xl font-bold">8</h3>
          <p className="text-xs text-gray-500">SAVED SELLERS</p>
        </div>

      </div>


      {/* TABS */}
      <div className="flex border mt-4 bg-white text-sm font-semibold">

        <button className="flex-1 p-3 border-r bg-black text-white cursor-pointer hover:bg-gray-900">
          MY PURCHASES
        </button>

        <button className="flex-1 p-3 border-r hover:bg-gray-100 cursor-pointer">
          WISHLIST
        </button>

        <button className="flex-1 p-3 hover:bg-gray-100 cursor-pointer">
          SAVED SELLERS
        </button>

      </div>


      {/* PURCHASE SECTION */}
      <div className="bg-white border p-6 mt-4">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">

          <h2 className="font-bold text-lg">MY PURCHASES</h2>

          <div className="flex gap-2 mt-3 md:mt-0">

            <button className="border px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">
              ALL ORDERS
            </button>

            <button className="border px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">
              DELIVERED
            </button>

            <button className="border px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">
              PENDING
            </button>

          </div>

        </div>


        {/* PURCHASE CARD */}
        <div className="border p-4 mb-4 flex gap-4">

          <div className="w-20 h-20 bg-gray-200"></div>

          <div className="flex-1">

            <h3 className="font-semibold">
              Premium Wireless Headphones
            </h3>

            <p className="text-xs text-gray-500">
              Seller: AudioTech Store
            </p>

            <p className="font-bold mt-1">$199.99</p>

            <p className="text-xs text-gray-500">
              Mar 5, 2026 • MTN Mobile Money • Student Union
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">

              <button className="bg-black text-white px-3 py-1 hover:bg-gray-800 cursor-pointer">
                BUY AGAIN
              </button>

              <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
                VIEW DETAILS
              </button>

              <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
                CONTACT SELLER
              </button>

              <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
               ⭐ LEAVE REVIEW
              </button>

            </div>

          </div>

          <span className="text-xs font-bold bg-black text-white px-2 py-1 h-fit">
            DELIVERED
          </span>

        </div>


        {/* SECOND CARD */}
        <div className="border p-4 flex gap-4">

          <div className="w-20 h-20 bg-gray-200"></div>

          <div className="flex-1">

            <h3 className="font-semibold">
              Economics Textbook Bundle
            </h3>

            <p className="text-xs text-gray-500">
              Seller: Sarah Johnson
            </p>

            <p className="font-bold mt-1">$85.00</p>

            <p className="text-xs text-gray-500">
              Mar 6, 2026 • Vodafone Cash • Main Gate
            </p>

            <div className="flex gap-2 mt-3 text-xs">

              <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
                VIEW DETAILS
              </button>

              <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
                CONTACT SELLER
              </button>

            </div>

          </div>

          <span className="text-xs font-bold border px-2 py-1 h-fit">
            PENDING
          </span>

        </div>
{/* THIRD PURCHASE */}
<div className="border p-4 mt-4 flex gap-4">

  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
    <FaBox className="text-gray-400"/>
  </div>

  <div className="flex-1">

    <h3 className="font-semibold">
      Laptop Stand Aluminum
    </h3>

    <p className="text-xs text-gray-500">
      Seller: TechGear Campus
    </p>

    <p className="font-bold mt-1">
      $49.99
      <span className="text-xs text-gray-500 ml-2">
        • Mar 3, 2026 • Cash • Library Entrance
      </span>
    </p>

    <div className="flex flex-wrap gap-2 mt-3 text-xs">

      <button className="bg-black text-white px-3 py-1 hover:bg-gray-800 cursor-pointer">
        BUY AGAIN
      </button>

      <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
        VIEW DETAILS
      </button>

      <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
        CONTACT SELLER
      </button>

      <button className="border px-3 py-1 hover:bg-gray-100 cursor-pointer">
        ⭐ LEAVE REVIEW
      </button>

    </div>

  </div>

  <span className="text-xs font-bold bg-black text-white px-2 py-1 h-fit">
    DELIVERED
  </span>

</div>
      </div>

    </div>
  );
}