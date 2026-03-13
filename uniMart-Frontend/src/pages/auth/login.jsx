import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = ()=>{
    login();
    navigate("/buyerprofile");
  };

  return (
    <div className="pt-24">
    <button onClick={handleLogin} >Login</button>
  </div>
  );
}
