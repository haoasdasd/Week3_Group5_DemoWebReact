import { useThemeStore } from "../store/themeStore";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-4 right-6 p-2 bg-white/40 dark:bg-gray-700/60 rounded-full shadow-md backdrop-blur-lg transition"
    >
      {darkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-800" />}
      <span className="ml-2 text-sm font-medium">{darkMode ? "Light" : "Dark"}</span>
    </motion.button>
  );
}
