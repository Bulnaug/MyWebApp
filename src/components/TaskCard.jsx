import { useDraggable } from '@dnd-kit/core';

export default function TaskCard({ task, listId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${task.id}:${listId}`,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-100 p-3 rounded text-sm cursor-grab"
    >
      {task.title}
    </div>
  );
}
