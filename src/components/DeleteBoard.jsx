import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DeleteBoard({ boardId, BoardRemoved }) {

  const deleteBoard = async (boardId) => {
      const confirm = window.confirm("Möchtest du dieses Board wirklich löschen?");
      if (!confirm) return;
  
      const { error } = await supabase.from("boards").delete().eq("id", boardId);
  
      if (error) {
        console.error("Fehler beim Löschen:", error.message);
      } else {
        await BoardRemoved(); // neu laden
    }
  };

  return (
    <button
      onClick={() => deleteBoard(boardId)}
      className="mt-3 text-red-600 hover:text-red-800 text-sm self-start"
    >
      🗑️ Löschen
    </button>
  );
}
