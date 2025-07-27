import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function BoardPage() {
  const { id } = useParams(); // UUID aus URL
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  // Boards + Listen laden
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Board ID aus URL:", id);

      // 🎯 1. Board laden
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("id", id)
        .maybeSingle(); // gibt `null` zurück statt Fehler bei "kein Treffer"

      if (error) {
        console.error("❌ Fehler beim Laden des Boards:", error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        console.warn("⚠️ Kein Board gefunden mit dieser ID.");
        setBoard(null);
        setLoading(false);
        return;
      }

      setBoard(data);

      // 🎯 2. Listen laden
      await fetchLists();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Listen + zugehörige Tasks laden
  const fetchLists = async () => {
    const { data, error } = await supabase
      .from("lists")
      .select("*, tasks(*)")
      .eq("board_id", id)
      .order("order", { ascending: true });

    if (error) {
      console.error("❌ Fehler beim Laden der Listen:", error.message);
    } else {
      setLists(data);
    }
  };

  useEffect(() => {
    const testBoards = async () => {
      const { data, error } = await supabase.from("boards").select("*");
      console.log("Alle Boards:", data);
    };

    testBoards();
  }, []);

  const createList = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);

    const { error } = await supabase.from("lists").insert([{ title: newTitle.trim(), board_id: id }]);

    if (error) {
      console.error("Fehler beim Erstellen des Lists:", error.message);
    } else {
      setNewTitle("");
      await fetchLists(); // neu laden
    }

    setCreating(false);
  };

  const handleTaskReorder = async (listId, newOrder) => {
  const updates = newOrder.map((task, index) => ({
    id: task.id,
    order: index,
  }));

  // Optional: Update Supabase
  for (const update of updates) {
    await supabase.from("tasks").update({ order: update.order }).eq("id", update.id);
  }

  // Danach: State aktualisieren, damit UI stimmt
  setLists((prev) =>
    prev.map((list) =>
      list.id === listId ? { ...list, tasks: newOrder } : list
    )
  );
};

  if (loading) return <p className="p-6">🔄 Lade Board...</p>;
  if (!board) return <p className="p-6 text-red-500">❌ Board nicht gefunden.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📌 {board.title}</h1>

      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white rounded-xl shadow w-64 p-4 flex-shrink-0"
          >
            <h2 className="font-semibold text-lg mb-3">{list.title}</h2>

            {/* Tasks anzeigen */}
            <TaskList
              listId={list.id}
              tasks={list.tasks}
              onReorder={(newOrder) => handleTaskReorder(list.id, newOrder)}
            />

            {/* Neue Aufgabe */}
            <AddTask listId={list.id} onTaskAdded={fetchLists} />
          </div>
        ))}
        <div className="bg-white rounded-xl shadow w-64 p-4 flex-shrink-0">
          <h2 className="font-semibold text-lg mb-3">Neue Liste</h2>
          {/* Formular zum Erstellen */}
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
        </div>
      </div>
    </div>
  );
}
