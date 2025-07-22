import { useState } from 'react';

function App() {
  const [boards, setBoards] = useState([
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Entwicklung' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📋 TaskFlow Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold">{board.name}</h2>
            <p className="text-sm text-gray-500">Board-ID: {board.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;