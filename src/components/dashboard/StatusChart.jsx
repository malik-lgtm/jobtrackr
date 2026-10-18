import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { JOB_STATUSES, STATUS_COLORS, STATUS_LABELS } from "../../constants/job";
export default function StatusChart({ stats }) {
  const data = JOB_STATUSES.map((status) => ({
    name: STATUS_LABELS[status],
    value: stats[status],
    color: STATUS_COLORS[status],
  })).filter((d) => d.value > 0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-2 text-sm font-bold">Where your applications stand</h2>
      <div className="h-64">
        {data.length === 0 ? (
          <p className="flex h-full items-center justify-center text-sm text-slate-500">
            Add a job to see this chart.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
