import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export default function ListColumn({ list, boardId }) {
  const { setNodeRef } = useDroppable({ id: `list:${list.id}` });

  return (
    <div ref={setNodeRef} className="bg-white rounded-xl shadow w-64 p-4 flex-shrink-0">
      <h2 className="font-semibold text-lg mb-2">{list.title}</h2>
      <div className="flex flex-col gap-2">
        {list.tasks.map((task) => (
          <TaskCard key={task.id} task={task} listId={list.id} />
        ))}
      </div>
    </div>
  );
}
