import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkmoodToggler = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md text-neutral-900 dark:text-neutral-100 hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-neutral-100 dark:hover:text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default DarkmoodToggler;
