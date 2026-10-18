import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { isSupabaseConfigured } from "./lib/supabase";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";
import Spinner from "./components/ui/Spinner";
import NotFound from "./pages/NotFound";
// Loaded only when opened, so the charts library stays out of the first download
const Dashboard = lazy(() => import("./pages/Dashboard"));
function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
        <h1 className="text-lg font-bold">Connect Supabase to start</h1>
        <p className="mt-2 text-sm">
          Copy <code className="font-mono">.env.example</code> to <code className="font-mono">.env</code>, add
          your Supabase URL and anon key, then restart <code className="font-mono">npm run dev</code>.
        </p>
      </div>
    </div>
  );
}
export default function App() {
  if (!isSupabaseConfigured) return <SetupNotice />;
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/board" element={<Board />} />
          <Route
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center py-24 text-teal-700 dark:text-teal-400">
                    <Spinner className="h-6 w-6" />
                  </div>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
