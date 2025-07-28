import { useEffect, useState } from "react";

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
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

import DeleteList from "./columns/DeleteList";
import TaskList from "./TaskList";
import AddTask from "./tasks/AddTask";
import DeleteTask from "./tasks/DeleteTask";
import EditTask from "./tasks/EditTask";
import AddList from "./columns/AddList";

import { supabase } from "../lib/supabase";

export default function ListList({fetchLists, lists, handleTaskReorder, onListReorder }) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((t) => t.id === active.id);
      const newIndex = lists.findIndex((t) => t.id === over?.id);

      const newOrder = arrayMove(lists, oldIndex, newIndex);
      onListReorder(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lists.map((t) => t.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4 overflow-x-auto">
            {lists.map((list) => (
              <SortableItem key={list.id} id={list.id}>
              <div
                key={list.id}
                className="bg-white rounded-xl shadow w-64 p-4 flex-shrink-0"
              >
                <h2 className="font-semibold text-lg mb-3">{list.title}</h2>
                <DeleteList listId={list.id} listTasks={list.tasks} listRemoved={fetchLists} />

                {/* Tasks anzeigen */}
                <TaskList
                  listId={list.id}
                  tasks={list.tasks}
                  onTaskReorder={(newOrder) => handleTaskReorder(list.id, newOrder)}
                  taskModified={fetchLists}
                />

                {/* Neue Aufgabe */}
                <AddTask listId={list.id} onTaskAdded={fetchLists} />
              </div>
              </SortableItem>
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
