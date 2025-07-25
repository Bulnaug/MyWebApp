import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AddTask from "../components/AddTask";

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
      .order("position", { ascending: true });

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
            <div className="flex flex-col gap-2 mb-2">
              {list.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-100 p-3 rounded text-sm hover:bg-gray-200"
                >
                  {task.title}
                </div>
              ))}
            </div>

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
