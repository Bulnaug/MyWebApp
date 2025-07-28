import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function EditTask({ taskId, initialTitle, taskEdited }) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

  const saveTitle = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const { error } = await supabase.from("tasks").update({ title: trimmed })
      .eq("id", taskId);

    if (error) {
      console.error("Fehler beim Speichern des Titels:", error.message);
    }

    setIsEditing(false);
    await taskEdited(); // neu laden
  };

  return (
      <div className="pl-6">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === "Enter" && saveTitle()}
            autoFocus
            className="border rounded px-2 py-1 w-full text-sm"
          />
        ) : (
          <PencilSquareIcon
            onClick={() => setIsEditing(true)}
            className="cursor-pointer hover:underline"
            title="Zum Bearbeiten klicken"
          />
        )}
      </div>
  );
}
