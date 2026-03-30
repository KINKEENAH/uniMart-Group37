import { useState } from "react";
import { X, ShieldCheck, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TERMS = [
  {
    title: "Accurate Listings",
    body: "You agree to provide accurate, honest, and complete information about all products you list. Misleading descriptions, fake images, or incorrect pricing are strictly prohibited.",
  },
  {
    title: "Verified Students Only",
    body: "Only verified students of the institution may sell on UniMart. You confirm that you are currently enrolled and that your student ID is valid.",
  },
  {
    title: "Safe Meet-up Conduct",
    body: "All transactions must be completed at designated campus meet-up locations. You agree to show up on time, bring the exact item listed, and treat buyers with respect.",
  },
  {
    title: "No Prohibited Items",
    body: "You must not list illegal items, counterfeit goods, stolen property, prescription drugs, weapons, or any item that violates campus policy or applicable law.",
  },
  {
    title: "Honest Pricing",
    body: "Prices must reflect the true value of the item. Price gouging, bait-and-switch tactics, or hidden fees are not allowed.",
  },
  {
    title: "Dispute Resolution",
    body: "In the event of a dispute with a buyer, you agree to engage in good-faith resolution. UniMart reserves the right to mediate and, if necessary, suspend your seller account.",
  },
  {
    title: "Account Responsibility",
    body: "You are responsible for all activity on your seller account. Do not share your credentials. UniMart is not liable for losses resulting from unauthorised account access.",
  },
  {
    title: "Platform Rules",
    body: "UniMart may update these terms at any time. Continued use of the seller features constitutes acceptance of any updated terms.",
  },
];

export default function SellerOnboardingModal({ onClose, onAccept }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#F5A623]" />
            <h2 className="font-bold text-gray-900 text-base">Seller Terms & Conditions</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          <p className="text-sm text-gray-500">
            Before you start selling on UniMart, please read and agree to the following terms. These rules exist to keep our campus marketplace safe and fair for everyone.
          </p>
          {TERMS.map((t, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-gray-800">{i + 1}. {t.title}</p>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#F5A623] shrink-0" />
            <span className="text-sm text-gray-600">
              I have read and agree to the UniMart Seller Terms & Conditions. I understand that violating these terms may result in suspension of my seller account.
            </span>
          </label>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={onAccept} disabled={!agreed}
              className="flex-1 bg-[#F5A623] text-white py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#e09610] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
