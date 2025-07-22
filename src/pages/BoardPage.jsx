import { useParams } from "react-router-dom";
import ListColumn from "../components/ListColumn";
import { useBoardStore } from "../store/boardStore";

export default function BoardPage() {
  const { id } = useParams();
  const board = useBoardStore((state) => state.getBoardById(id));

  if (!board) return <p className="p-6">Board nicht gefunden.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📌 {board.title}</h1>
      <div className="flex gap-4 overflow-x-auto">
        {board.lists.map((list) => (
          <ListColumn key={list.id} list={list} boardId={board.id} />
        ))}
      </div>
    </div>
  );
}