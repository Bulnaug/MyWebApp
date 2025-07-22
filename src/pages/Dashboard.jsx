import { Link } from "react-router-dom";

const boards = [
  { id: 1, title: "Marketing" },
  { id: 2, title: "Entwicklung" },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 TaskFlow Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            className="block bg-white rounded-xl shadow p-4 hover:bg-gray-100"
          >
            <h2 className="font-semibold text-lg">{board.title}</h2>
            <p className="text-sm text-gray-500">Board-ID: {board.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}