import {useNavigate} from "react-router-dom";

export default function SellerProfile(){
 const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/shop")} className="pt-24 text-8xl">
      This is the seller profile page 
       
    </div>
  )
}