import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Login fehlgeschlagen: " + error.message);
    else navigate("/");
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border w-full p-2 mb-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" className="border w-full p-2 mb-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white w-full p-2">Einloggen</button>
    </div>
  );
}