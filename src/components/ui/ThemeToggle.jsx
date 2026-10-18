import { useTheme } from "../../hooks/useTheme";
export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {dark ? (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zm9.07-4.07a.75.75 0 010 1.06l-1.06 1.07a.75.75 0 11-1.07-1.07l1.07-1.06a.75.75 0 011.06 0zM7.06 12.94a.75.75 0 010 1.06l-1.06 1.07a.75.75 0 01-1.07-1.07l1.07-1.06a.75.75 0 011.06 0zm7.01 2.13a.75.75 0 01-1.06 0l-1.07-1.07a.75.75 0 111.07-1.06l1.06 1.06a.75.75 0 010 1.07zM7.06 7.06a.75.75 0 01-1.06 0L4.93 6a.75.75 0 011.07-1.07l1.06 1.07a.75.75 0 010 1.06zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M17.29 13.29A8 8 0 016.71 2.71a8 8 0 1010.58 10.58z" />
        </svg>
      )}
    </button>
  );
}
