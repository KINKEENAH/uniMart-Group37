import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, MapPin, GraduationCap, ShieldCheck, Package, ArrowLeft, MessageCircle } from "lucide-react";

export default function SellerPublicProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const sellerId = location.state?.sellerId;

  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sellerId) { setError("No seller specified."); setLoading(false); return; }
    fetch(`/api/users/${sellerId}/public`)
      .then((r) => r.json())
      .then((data) => {
        if (data.seller) setSeller(data.seller);
        else setError(data.message || "Seller not found");
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, [sellerId]);

  if (loading) return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 flex items-center justify-center text-gray-400 text-sm">
      Loading seller profile...
    </div>
  );

  if (error || !seller) return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-sm">{error || "Seller not found."}</p>
      <button onClick={() => navigate(-1)} className="text-[#F5A623] underline text-sm cursor-pointer">Go Back</button>
    </div>
  );

  const joined = seller.student_since
    ? new Date(seller.student_since).getFullYear()
    : new Date(seller.created_at).getFullYear();

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-16 pb-16">
      <div className="px-4 md:px-10 py-6 space-y-5">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 cursor-pointer bg-transparent border-none">
          <ArrowLeft size={15} /> Back
        </button>

        {/* Seller card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-2xl font-bold text-gray-400">
              {seller.full_name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold text-gray-900">{seller.full_name}</h1>
                {seller.is_verified && (
                  <span className="flex items-center gap-1 text-xs text-[#F5A623]">
                    <ShieldCheck size={13} /> Verified Student
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14}
                    className={s <= Math.round(seller.rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-300"} />
                ))}
                <span className="text-sm text-gray-600 ml-1">{parseFloat(seller.rating).toFixed(1)}</span>
                <span className="text-xs text-gray-400 ml-2">· {seller.total_sales} sales</span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs text-gray-500">
                {seller.department && <span className="flex items-center gap-1"><GraduationCap size={12} /> {seller.department}</span>}
                {seller.campus_location && <span className="flex items-center gap-1"><MapPin size={12} /> {seller.campus_location}</span>}
                <span>Joined {joined}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/chatseller", { state: { sellerId: seller.id, sellerName: seller.full_name } })}
              className="flex items-center gap-2 bg-[#1A1A2E] text-white text-xs md:text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a4e] transition-colors shrink-0"
            >
              <MessageCircle size={14} /> Chat
            </button>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="font-bold text-base md:text-lg text-gray-900 mb-4">
            Products by {seller.full_name} ({seller.products?.length || 0})
          </h2>

          {seller.products?.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
              This seller has no active listings.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {seller.products.map((product) => {
                const img = product.images?.[0]?.image_url || null;
                return (
                  <div key={product.id}
                    onClick={() => navigate("/productdetails", { state: { productId: product.id, preview: { id: product.id, title: product.title, price: product.price, image: img } } })}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {img ? (
                      <img src={img} alt={product.title} className="w-full h-32 md:h-40 object-cover" />
                    ) : (
                      <div className="w-full h-32 md:h-40 bg-gray-100 flex items-center justify-center">
                        <Package size={32} className="text-gray-300" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">{product.title}</p>
                      <p className="text-xs md:text-sm font-bold text-[#F5A623] mt-0.5">
                        GHS {parseFloat(product.price).toFixed(0)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{product.category?.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
