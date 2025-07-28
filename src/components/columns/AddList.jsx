import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AddList({onListAdded}) {
  const { id } = useParams(); // UUID aus URL
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const createList = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);

    const { error } = await supabase.from("lists").insert([{ title: newTitle.trim(), board_id: id }]);

    if (error) {
      console.error("Fehler beim Erstellen des Lists:", error.message);
    } else {
      setNewTitle("");
      await onListAdded(); // neu laden
    }

    setCreating(false);
  };

  
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Neues List eingeben..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        onClick={createList}
        disabled={creating}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {creating ? "Erstelle..." : "➕ Erstellen"}
      </button>
    </div> 
  );
}
