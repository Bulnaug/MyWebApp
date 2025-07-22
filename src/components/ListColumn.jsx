import { useState } from "react";
import { useBoardStore } from "../store/boardStore";

export default function ListColumn({ list, boardId }) {
  const addTask = useBoardStore((state) => state.addTask);
  const [taskInput, setTaskInput] = useState("");

  const handleAdd = () => {
    if (taskInput.trim()) {
      addTask(boardId, list.id, taskInput);
      setTaskInput("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow w-64 p-4 flex-shrink-0">
      <h2 className="font-semibold text-lg mb-2">{list.title}</h2>
      <div className="flex flex-col gap-2 mb-2">
        {list.tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-100 p-3 rounded text-sm hover:bg-gray-200"
          >
            {task.title}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Neue Aufgabe"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="border px-2 py-1 rounded text-sm w-full"
      />
      <button
        onClick={handleAdd}
        className="mt-2 w-full bg-blue-500 text-white rounded py-1 text-sm hover:bg-blue-600"
      >
        Hinzufügen
      </button>
    </div>
  );
}
