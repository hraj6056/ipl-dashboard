import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === "dark";
    setEnabled(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.theme = newValue ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newValue);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 border rounded bg-white text-gray-800 dark:bg-gray-700 dark:text-white transition"
    >
      {enabled ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};
