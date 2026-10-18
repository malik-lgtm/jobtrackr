export function computeStats(jobs) {
  const count = (status) => jobs.filter((j) => j.status === status).length;
  const total = jobs.length;
  const interview = count("interview");
  const offer = count("offer");
  return {
    total,
    applied: count("applied"),
    interview,
    offer,
    rejected: count("rejected"),
    interviewRate: total === 0 ? 0 : Math.round(((interview + offer) / total) * 100),
  };
}
// Monday of the week that contains `date`
function weekStart(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
export function weeklyCounts(jobs, weeks = 8, now = new Date()) {
  const current = weekStart(now);
  const buckets = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(current);
    start.setDate(start.getDate() - i * 7);
    buckets.push({ start, count: 0 });
  }
  for (const job of jobs) {
    const key = weekStart(new Date(`${job.applied_date}T00:00:00`)).getTime();
    const bucket = buckets.find((b) => b.start.getTime() === key);
    if (bucket) bucket.count += 1;
  }
  return buckets.map(({ start, count }) => ({
    label: `${start.toLocaleString("en-US", { month: "short" })} ${start.getDate()}`,
    count,
  }));
}
