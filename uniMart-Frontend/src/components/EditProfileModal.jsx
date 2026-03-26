import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/authContext";

const inputClass =
  "w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-colors";

export default function EditProfileModal({ onClose }) {
  const { user, token, login } = useAuth();

  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    department: user?.department || "",
    level: user?.level || "",
    campus_location: user?.campus_location || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Update failed");
      // update auth context with new user data
      login(data.user, token);
      onClose();
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Full Name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+233..." className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Department / Programme</label>
            <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Computer Science" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Level</label>
            <input name="level" value={form.level} onChange={handleChange} placeholder="e.g. Lvl 200" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Campus Location</label>
            <input name="campus_location" value={form.campus_location} onChange={handleChange} placeholder="e.g. Main Campus, KNUST" className={inputClass} />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-[#F5A623] text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#e09610] disabled:opacity-60 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
