import { forwardRef, useId } from "react";
export const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500";
function FieldShell({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
export const Input = forwardRef(({ label, error, ...rest }, ref) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
        {...rest}
      />
    </FieldShell>
  );
});
Input.displayName = "Input";
export const TextArea = forwardRef(({ label, error, ...rest }, ref) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
        {...rest}
      />
    </FieldShell>
  );
});
TextArea.displayName = "TextArea";
export const Select = forwardRef(({ label, error, children, ...rest }, ref) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
});
Select.displayName = "Select";
