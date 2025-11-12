import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
  if (theme === "dark") {
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.documentElement.style.colorScheme = "light";
  }
}, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
  <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-full 
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-blue-400 
                 shadow-md hover:scale-110 transition-transform duration-200"
    >
      {/* ☀️ / 🌙 Icon */}
      <span className="text-xl">
      {theme === "dark" ? (
        <Moon className="w-6 h-6  stroke-black" />
      ) : (
        <Sun className="w-6 h-6  stroke-black" />
      )}
    </span>
      {/* Text — hidden on mobile, visible on md and up */}
      <span className="hidden md:inline text-sm font-medium">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
};