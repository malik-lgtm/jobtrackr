export default function StatsCards({ stats }) {
  const items = [
    { label: "Applications", value: stats.total },
    { label: "Interviews", value: stats.interview },
    { label: "Offers", value: stats.offer },
    { label: "Interview rate", value: `${stats.interviewRate}%` },
  ];
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <dt className="text-sm text-slate-500 dark:text-slate-400">{item.label}</dt>
          <dd className="mt-1 text-3xl font-extrabold tracking-tight">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
