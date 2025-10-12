"use client";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="flex items-center gap-2">
            <Sun className={`w-5 h-5 ${darkMode ? "text-violet-600 " : "text-violet-200"}`} />
            <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="bg-gray-300 dark:bg-gray-600"
            />
            <Moon className={`w-5 h-5 ${darkMode ? " text-violet-600 " : "text-violet-200"}`} />
        </div>
    );
}
