import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        The page you opened doesn't exist or was moved.
      </p>
      <Link to="/" className="mt-6 font-semibold text-teal-700 hover:underline dark:text-teal-400">
        Go to the home page
      </Link>
    </div>
  );
}
