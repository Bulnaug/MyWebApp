import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AddBoard({onBoardAdded}) {
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const createBoard = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);

    const { error } = await supabase.from("boards").insert([{ title: newTitle.trim() }]);

    if (error) {
      console.error("Fehler beim Erstellen des Boards:", error.message);
    } else {
      setNewTitle("");
      await onBoardAdded(); // neu laden
    }

    setCreating(false);
  };

  return (
    
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Neues Board eingeben..."
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={createBoard}
          disabled={creating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {creating ? "Erstelle..." : "➕ Erstellen"}
        </button>
      </div>
  );
}
