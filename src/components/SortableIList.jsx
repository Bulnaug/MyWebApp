import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid'

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
        <ArrowsUpDownIcon className="size-6 text-blue-500" />
      </div>

      <div className="pl-6">{children}</div>
    </div>
  );
}
