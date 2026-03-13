import { useNavigate } from "react-router-dom";
export default function ViewCart(){
  const navigate = useNavigate();
  return(
    <div className="pt-24">
      <h1>View Cart page</h1>
      <button onClick={()=>navigate("/checkout")}>Go to checkout</button>
    </div>
  )
}