import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkmoodToggler = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const handleTheme = () => {
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  };

  return (
    <button
      onClick={handleTheme}
      className="p-2 rounded-md text-theme hover:bg-theme-accent hover:text-theme-neutral transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default DarkmoodToggler;
