import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-teal-700 dark:text-teal-400">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
