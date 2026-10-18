import { useEffect, useState } from "react";
function getInitialDark() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
  } catch {
    /* storage unavailable: fall through */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}
export function useTheme() {
  const [dark, setDark] = useState(getInitialDark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}
