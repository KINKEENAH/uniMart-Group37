import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirects to the new seller profile page
export default function SellerDash() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/sellerprofile", { replace: true }); }, [navigate]);
  return null;
}
