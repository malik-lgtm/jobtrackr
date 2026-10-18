import { useDroppable } from "@dnd-kit/core";
import { STATUS_COLORS, STATUS_LABELS } from "../../constants/job";
import JobCard from "./JobCard";
export default function Column({ status, jobs, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <section
      aria-label={`${STATUS_LABELS[status]} column`}
      className="flex min-w-[260px] flex-1 flex-col rounded-2xl bg-slate-100 p-3 dark:bg-slate-900/70"
    >
      <header className="flex items-center gap-2 px-1">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: STATUS_COLORS[status] }}
          aria-hidden="true"
        />
        <h2 className="text-sm font-bold">{STATUS_LABELS[status]}</h2>
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {jobs.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={`mt-3 flex min-h-[140px] flex-1 flex-col gap-3 rounded-xl p-1 transition ${isOver ? "bg-teal-100/70 ring-2 ring-teal-500 dark:bg-teal-500/10" : ""}`}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {jobs.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-slate-500 dark:text-slate-500">Drop a job here</p>
        )}
      </div>
    </section>
  );
}
