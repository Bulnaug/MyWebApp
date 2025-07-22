import { DndContext, closestCenter } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '../store/boardStore';
import ListColumn from '../components/ListColumn';

export default function BoardPage() {
  const { id } = useParams();
  const board = useBoardStore((state) => state.getBoardById(id));
  const moveTask = useBoardStore((state) => state.moveTask);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const [taskId, fromListId] = active.id.split(':');
    const [, toListId] = over.id.split(':');

    moveTask(id, fromListId, toListId, taskId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📌 {board?.title}</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {board?.lists.map((list) => (
            <ListColumn key={list.id} list={list} boardId={board.id} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
