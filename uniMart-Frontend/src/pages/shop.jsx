import { useNavigate } from "react-router-dom";
export default function Shop() {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      <h1>Shopping Page</h1>
      <button
        onClick={() => navigate("/productdetails")}
        className="hover:text-gray-300 cursor-pointer"
      >
        Smart watch
      </button>
    </div>
  );
}
