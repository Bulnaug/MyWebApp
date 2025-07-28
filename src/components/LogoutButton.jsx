import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>;
}