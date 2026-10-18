import { useMemo, useState } from "react";
import { useAddJob, useDeleteJob, useJobs, useUpdateJob, toPayload } from "../hooks/useJobs";
import { applyFilters, defaultFilters } from "../lib/filters";
import { getErrorMessage } from "../lib/errors";
import { JOB_STATUSES } from "../constants/job";
import KanbanBoard from "../components/board/KanbanBoard";
import JobFilters from "../components/jobs/JobFilters";
import JobModal from "../components/jobs/JobModal";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
export default function Board() {
  const { data: jobs = [], isLoading, isError, error, refetch } = useJobs();
  const addJob = useAddJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const [filters, setFilters] = useState(defaultFilters);
  const [modal, setModal] = useState({ open: false });
  const [actionError, setActionError] = useState(null);
  const visibleJobs = useMemo(() => applyFilters(jobs, filters), [jobs, filters]);
  const visibleStatuses = filters.status === "all" ? JOB_STATUSES : [filters.status];
  const closeModal = () => setModal({ open: false });
  const handleSave = async (values) => {
    const payload = toPayload(values);
    if (modal.job) {
      await updateJob.mutateAsync({ id: modal.job.id, changes: payload });
    } else {
      await addJob.mutateAsync(payload);
    }
    closeModal();
  };
  const handleMove = (id, status) => {
    setActionError(null);
    updateJob.mutate({ id, changes: { status } }, { onError: (e) => setActionError(getErrorMessage(e)) });
  };
  const handleDelete = (job) => {
    if (!window.confirm(`Delete "${job.role}" at ${job.company}? This can't be undone.`)) return;
    setActionError(null);
    deleteJob.mutate(job.id, { onError: (e) => setActionError(getErrorMessage(e)) });
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight">Your board</h1>
        <Button onClick={() => setModal({ open: true })}>Add job</Button>
      </div>

      {jobs.length > 0 && <JobFilters filters={filters} onChange={setFilters} />}

      {actionError && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
        >
          {actionError}
        </p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-3 py-24 text-teal-700 dark:text-teal-400">
          <Spinner className="h-6 w-6" />
          <span className="text-sm">Loading your jobs</span>
        </div>
      )}

      {isError && (
        <EmptyState
          title="Couldn't load your jobs"
          description={getErrorMessage(error)}
          action={<Button onClick={() => refetch()}>Try again</Button>}
        />
      )}

      {!isLoading && !isError && jobs.length === 0 && (
        <EmptyState
          title="No jobs yet"
          description="Add the first job you applied to. You can drag it to a new column whenever its status changes."
          action={<Button onClick={() => setModal({ open: true })}>Add your first job</Button>}
        />
      )}

      {!isLoading && !isError && jobs.length > 0 && (
        <>
          {visibleJobs.length === 0 && (
            <p className="text-sm text-slate-600 dark:text-slate-400">No jobs match your search.</p>
          )}
          <KanbanBoard
            jobs={visibleJobs}
            visibleStatuses={visibleStatuses}
            onMove={handleMove}
            onEdit={(job) => setModal({ open: true, job })}
            onDelete={handleDelete}
          />
        </>
      )}

      <JobModal open={modal.open} job={modal.job} onClose={closeModal} onSave={handleSave} />
    </div>
  );
}
