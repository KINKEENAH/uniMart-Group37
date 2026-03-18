import { useNavigate } from "react-router-dom"
export default function Notification(){
  const navigate = useNavigate();
  return(
    <div className="pt-24">
     
      Notification Page
       <button onClick={()=>navigate("/whatsappchat")}> Go to the chat page </button>
    </div>
  )
}