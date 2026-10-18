import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-teal-700/10 text-teal-800 dark:bg-teal-400/10 dark:text-teal-300"
      : "text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;
export default function Navbar() {
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    queryClient.clear(); // never show the previous user's jobs
    navigate("/");
  };
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-6">
          <span className="text-lg font-extrabold tracking-tight">JobTrackr</span>
          <nav aria-label="Main" className="flex gap-1">
            <NavLink to="/board" className={linkClass}>
              Board
            </NavLink>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden max-w-[200px] truncate text-sm text-slate-500 md:inline dark:text-slate-400">
            {user?.email}
          </span>
          <ThemeToggle />
          <Button variant="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
