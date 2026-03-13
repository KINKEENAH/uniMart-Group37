import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      <h1>Smart watch details</h1>

      <button
        onClick={() => navigate("/viewcart")}
        className="cursor-pointer hover:text-amber-100"
      >
        View Cart
      </button>
      <button
        onClick={() => navigate("/viewcart")}
        className="cursor-pointer hover:text-amber-100"
      >
        Add to Cart
      </button>
      <button
        onClick={() => navigate("/chatseller")}
        className="cursor-pointer hover:text-amber-100"
      >
        Chat Seller
      </button>
    </div>
  );
}
