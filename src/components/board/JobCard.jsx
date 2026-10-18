import { useDraggable } from "@dnd-kit/core";
import { formatDate } from "../../lib/format";
// Plain visual card (also used inside the drag overlay)
export function JobCardBody({ job }) {
  return (
    <div className="pr-6">
      <p className="truncate text-sm font-bold">{job.company}</p>
      <p className="mt-0.5 truncate text-sm text-slate-600 dark:text-slate-300">{job.role}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span>Applied {formatDate(job.applied_date)}</span>
        {job.location && <span>{job.location}</span>}
        {job.salary && <span>{job.salary}</span>}
      </div>
    </div>
  );
}
export default function JobCard({ job, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: job.id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      aria-label={`${job.role} at ${job.company}. Press Enter to edit, Space to move.`}
      onKeyDown={(e) => {
        listeners?.onKeyDown?.(e);
        if (e.key === "Enter") onEdit(job);
      }}
      onClick={() => onEdit(job)}
      className={`relative cursor-grab rounded-xl border border-slate-200 bg-white p-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900 ${isDragging ? "opacity-40" : ""}`}
    >
      <JobCardBody job={job} />
      <button
        type="button"
        aria-label={`Delete ${job.role} at ${job.company}`}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(job);
        }}
        className="absolute right-2 top-2 rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-rose-500/10"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
