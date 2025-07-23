import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("boards").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Boards:", error.message);
    } else {
      setBoards(data);
    }

    setLoading(false);
  };

  const createBoard = async () => {
    if (!newTitle.trim()) return;

    setCreating(true);

    const { error } = await supabase.from("boards").insert([{ title: newTitle.trim() }]);

    if (error) {
      console.error("Fehler beim Erstellen des Boards:", error.message);
    } else {
      setNewTitle("");
      await fetchBoards(); // neu laden
    }

    setCreating(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Deine Boards</h1>

      {/* Formular zum Erstellen */}
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

      {/* Anzeige der Boards */}
      {loading ? (
        <p>🔄 Lade Boards...</p>
      ) : boards.length === 0 ? (
        <p>Kein Board vorhanden.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              className="block bg-white rounded-xl shadow p-4 hover:bg-gray-100 transition"
            >
              <h2 className="text-lg font-semibold">{board.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{board.id}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
