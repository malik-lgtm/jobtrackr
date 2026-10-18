import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export default function WeeklyChart({ data }) {
  const hasData = data.some((d) => d.count > 0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-2 text-sm font-bold">Applications per week</h2>
      <div className="h-64">
        {!hasData ? (
          <p className="flex h-full items-center justify-center text-sm text-slate-500">
            No applications in the last 8 weeks.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.3} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={28} />
              <Tooltip cursor={{ fill: "rgba(148,163,184,0.15)" }} />
              <Bar dataKey="count" name="Applications" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
