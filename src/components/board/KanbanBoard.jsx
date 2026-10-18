import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { JOB_STATUSES } from "../../constants/job";
import Column from "./Column";
import { JobCardBody } from "./JobCard";
export default function KanbanBoard({ jobs, visibleStatuses = JOB_STATUSES, onMove, onEdit, onDelete }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    // A small drag distance lets a plain click open the edit form
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    // A short press-and-hold on touch screens, so scrolling still works
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    // Space picks up / drops a card, so Enter stays free for "edit"
    useSensor(KeyboardSensor, {
      keyboardCodes: { start: ["Space"], cancel: ["Escape"], end: ["Space"] },
    }),
  );
  const activeJob = jobs.find((job) => job.id === activeId) ?? null;
  const handleDragStart = (event) => setActiveId(String(event.active.id));
  const handleDragEnd = (event) => {
    setActiveId(null);
    const job = jobs.find((j) => j.id === event.active.id);
    const target = event.over?.id;
    if (job && target && job.status !== target) onMove(job.id, target);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {visibleStatuses.map((status) => (
          <Column
            key={status}
            status={status}
            jobs={jobs.filter((job) => job.status === status)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="rotate-2 cursor-grabbing rounded-xl border border-teal-500 bg-white p-3 shadow-lg dark:bg-slate-900">
            <JobCardBody job={activeJob} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
