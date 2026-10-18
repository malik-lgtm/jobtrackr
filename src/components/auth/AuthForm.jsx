import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../lib/validators";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../lib/errors";
import { Input } from "../ui/Field";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
export default function AuthForm({ mode }) {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(authSchema) });
  if (user) return <Navigate to="/board" replace />;
  const isLogin = mode === "login";
  const onSubmit = async ({ email, password }) => {
    setServerError(null);
    setNotice(null);
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/board");
      } else {
        const { needsConfirmation } = await signUp(email, password);
        if (needsConfirmation) {
          setNotice("Account created. Check your email and click the confirmation link, then log in.");
        } else {
          navigate("/board");
        }
      }
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };
  const tryDemo = async () => {
    if (!demoEmail || !demoPassword) return;
    setServerError(null);
    setDemoLoading(true);
    try {
      await signIn(demoEmail, demoPassword);
      navigate("/board");
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setDemoLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-extrabold tracking-tight">
          JobTrackr
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {isLogin ? "Log in" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {isLogin ? "Pick up where you left off." : "Start tracking your applications in under a minute."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              error={errors.password?.message}
              {...register("password")}
            />

            {serverError && (
              <p
                role="alert"
                className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
              >
                {serverError}
              </p>
            )}
            {notice && (
              <p
                role="status"
                className="rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-800 dark:bg-teal-500/10 dark:text-teal-300"
              >
                {notice}
              </p>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting}>
              {isLogin ? "Log in" : "Create account"}
            </Button>
          </form>

          {isLogin && demoEmail && demoPassword && (
            <Button variant="secondary" className="mt-3 w-full" onClick={tryDemo} loading={demoLoading}>
              Try the demo account
            </Button>
          )}

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {isLogin ? "New here? " : "Already have an account? "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="font-semibold text-teal-700 hover:underline dark:text-teal-400"
            >
              {isLogin ? "Create an account" : "Log in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
