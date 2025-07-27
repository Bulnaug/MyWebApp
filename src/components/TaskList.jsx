import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

import DeleteTask from "./DeleteTask";

export default function TaskList({ listId, tasks, onReorder, taskRemoved }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over?.id);

      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id}>
                <div className="bg-white p-3 rounded shadow">{task.title}</div>
                <DeleteTask taskId={task.id} taskRemoved={taskRemoved} /> 
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
