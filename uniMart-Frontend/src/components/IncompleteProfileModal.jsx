import { X, AlertCircle } from "lucide-react";

export default function IncompleteProfileModal({ missing, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-400" />
            <h2 className="font-bold text-gray-900 text-base">Complete Your Profile</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={18} /></button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Before switching to a seller account, please complete the following missing details:
        </p>

        <ul className="space-y-2 mb-5">
          {missing.map((field) => (
            <li key={field} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] shrink-0" />
              {field}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            Later
          </button>
          <button onClick={onEdit} className="flex-1 bg-[#1A1A2E] text-white py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#2a2a4e] transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
