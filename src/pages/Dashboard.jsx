import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { computeStats, weeklyCounts } from "../lib/stats";
import { getErrorMessage } from "../lib/errors";
import StatsCards from "../components/dashboard/StatsCards";
import StatusChart from "../components/dashboard/StatusChart";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import Button from "../components/ui/Button";
export default function Dashboard() {
  const { data: jobs = [], isLoading, isError, error, refetch } = useJobs();
  const stats = useMemo(() => computeStats(jobs), [jobs]);
  const weekly = useMemo(() => weeklyCounts(jobs), [jobs]);
  if (isLoading) {
    return (
      <div className="flex justify-center py-24 text-teal-700 dark:text-teal-400">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }
  if (isError) {
    return (
      <EmptyState
        title="Couldn't load your stats"
        description={getErrorMessage(error)}
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }
  if (jobs.length === 0) {
    return (
      <EmptyState
        title="Nothing to show yet"
        description="Your stats appear here once you add your first job."
        action={
          <Link
            to="/board"
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Go to your board
          </Link>
        }
      />
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <StatsCards stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusChart stats={stats} />
        <WeeklyChart data={weekly} />
      </div>
    </div>
  );
}
