import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      <h1>Sign Up Page</h1>
      <button onClick={() => navigate("/login")}>Go to login</button>
    </div>
  );
}
