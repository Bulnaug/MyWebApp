import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DeleteTask({ taskId, taskRemoved }) {

  const deleteTask = async (taskId) => {
      const confirm = window.confirm("Möchtest du dieses Task wirklich löschen?");
      if (!confirm) return;
  
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  
      if (error) {
        console.error("Fehler beim Löschen:", error.message);
      } else {
        await taskRemoved(); // neu laden
      }
  };

  return (
    <button
      onClick={() => deleteTask(taskId)}
      className="mt-3 text-red-600 hover:text-red-800 text-sm self-start"
    >
      Task🗑️
    </button>
  );
}
