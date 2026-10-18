export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
      <h3 className="text-base font-bold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-slate-600 dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
