import { PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <PaletteIcon className="size-5 text-base" />
        <span className="hidden sm:inline text-xs ">Theme</span>
      </div>

      <ul
        tabIndex={-1}
        className=" dropdown-content menu bg-base-200/60 backdrop-blur-lg rounded-sm z-50 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
      >
        {THEMES.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`flex justify-between ${theme === t ? "bg-primary/30 text-primary-content" : ""}`}
            >
              <span className={`capitalize text-xs ${theme === t && 'font-semibold'}`}>{t}</span>
              <div className="flex gap-0.5 p-1 bg rounded-full bg-content/60" data-theme={t}>
                <span className="w-4 h-4 rounded-full bg-primary" />
                <span className="w-4 h-4 rounded-full  bg-secondary" />
                <span className="w-4 h-4 rounded-full  bg-accent" />
                <span className="w-4 h-4 rounded-full  bg-neutral" />

              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
