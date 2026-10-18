import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../components/ui/ThemeToggle";
const columns = [
  {
    name: "Applied",
    color: "#0284c7",
    cards: [
      ["Northwind", "Frontend Developer"],
      ["Bluepeak", "React Developer"],
    ],
  },
  { name: "Interview", color: "#d97706", cards: [["Cloudly", "UI Engineer"]] },
  { name: "Offer", color: "#059669", cards: [["Pixelhouse", "Junior Frontend"]] },
];
const features = [
  {
    title: "Move jobs as they progress",
    text: "Drag a card from Applied to Interview to Offer. On a keyboard, press Space to pick it up.",
  },
  {
    title: "Find any application fast",
    text: "Search by company, role or location, filter by stage, and sort by date.",
  },
  {
    title: "See how your search is going",
    text: "The dashboard shows your interview rate and how many jobs you applied to each week.",
  },
  {
    title: "Your data stays yours",
    text: "Every account only sees its own jobs, enforced by the database itself.",
  },
];
export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <span className="text-lg font-extrabold tracking-tight">JobTrackr</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link
              to="/board"
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Open your board
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-200/70 dark:hover:bg-slate-800"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Every application, interview and offer on one board.
            </h1>
            <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-400">
              Stop searching your inbox for the company you applied to last week. Add each job once and move
              it forward as it progresses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={user ? "/board" : "/signup"}
                className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                {user ? "Open your board" : "Start tracking"}
              </Link>
            </div>
          </div>

          {/* A small, static preview of the real board */}
          <div
            aria-hidden="true"
            className="grid grid-cols-3 gap-3 rounded-3xl bg-slate-200/60 p-3 dark:bg-slate-900"
          >
            {columns.map((col) => (
              <div key={col.name} className="rounded-2xl bg-slate-100 p-2 dark:bg-slate-800/70">
                <div className="mb-2 flex items-center gap-1.5 px-1 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                  {col.name}
                </div>
                <div className="space-y-2">
                  {col.cards.map(([company, role]) => (
                    <div
                      key={company}
                      className="rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <p className="truncate text-xs font-bold">{company}</p>
                      <p className="truncate text-xs text-slate-500">{role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-t border-slate-200 py-12 sm:grid-cols-2 dark:border-slate-800">
          {features.map((f) => (
            <div key={f.title}>
              <h2 className="font-bold">{f.title}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        Built with React, Tailwind CSS and Supabase.
      </footer>
    </div>
  );
}
