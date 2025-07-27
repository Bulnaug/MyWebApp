import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DeleteList({ listId, listRemoved, listTasks }) {
  const [lists, setLists] = useState([]);

  const deleteList = async (listId) => {
      const confirm = window.confirm("Möchtest du dieses List wirklich löschen?");
      if(listTasks.length > 0) {
          alert("Du hast noch Aufgaben hier");
          return null
        }
     
      if (!confirm) return;
  
      const { error } = await supabase.from("lists").delete().eq("id", listId);
  
      if (error) {
        console.error("Fehler beim Löschen:", error.message);
      } else {
        setLists((prev) => prev.filter((list) => list.id !== listId));
        await listRemoved(); // neu laden
    }
  };

  return (
    <button
      onClick={() => deleteList(listId)}
      className="mt-3 text-red-600 hover:text-red-800 text-sm self-start"
    >
      🗑️
    </button>
  );
}
