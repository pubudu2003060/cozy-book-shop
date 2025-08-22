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
      className="p-2 rounded-md text-text dark:text-textdark hover:bg-accent dark:hover:bg-accentdark hover:text-textdark dark:hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondarydark"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default DarkmoodToggler;
