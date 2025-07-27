import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

import AddBoard from "../components/AddBord";
import DeleteBoard from "../components/DeleteBoard";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Deine Boards</h1>
      <AddBoard  onBoardAdded={fetchBoards}/>
      {/* Anzeige der Boards */}
      {loading ? (
        <p>🔄 Lade Boards...</p>
      ) : boards.length === 0 ? (
        <p>Kein Board vorhanden.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:bg-gray-100 transition"
            >
              <Link to={`/board/${board.id}`} className="flex-1">
                <h2 className="text-lg font-semibold">{board.title}</h2>
                <p className="text-sm text-gray-500 mt-1 break-all">{board.id}</p>
              </Link>
              <DeleteBoard boardId={board.id} BoardRemoved={fetchBoards}></DeleteBoard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
