import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddTask({ listId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("tasks").insert({
      title,
      list_id: listId,
    });

    setLoading(false);
    setTitle("");

    if (error) {
      alert("Fehler beim Speichern: " + error.message);
    } else {
      onTaskAdded(); // Daten neu laden
    }
  };

  return (
    <div className="mt-2">
      <input
        className="border px-2 py-1 text-sm w-full rounded mb-1"
        placeholder="Neue Aufgabe..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button
        onClick={addTask}
        disabled={loading}
        className="text-xs text-blue-600 hover:underline"
      >
        {loading ? "Speichert..." : "+ Aufgabe"}
      </button>
    </div>
  );
}
