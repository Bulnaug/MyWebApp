import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative"
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        className="absolute top-1 left-1 text-gray-400 cursor-grab"
        title="Ziehen"
      >
        ☰
      </div>

      <div className="pl-6">{children}</div>
    </div>
  );
}
