// src/pages/RegisterPage.jsx
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Registrierung fehlgeschlagen: " + error.message);
    else alert("Registrierung erfolgreich. Bestätige deine Email.");
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrieren</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border w-full p-2 mb-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" className="border w-full p-2 mb-2" />
      <button onClick={handleRegister} className="bg-green-500 text-white w-full p-2">Registrieren</button>
    </div>
  );
}