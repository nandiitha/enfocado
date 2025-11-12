// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { Target, BarChart2, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({rewards=0}) => {
  const location = useLocation();

  const tabs = [
    { name: "Focus", icon: <Target size={20} />, path: "/" },
    { name: "Stats", icon: <BarChart2 size={20} />, path: "/stats" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-blue-600 dark:bg-gray-900
                 text-white shadow-md flex items-center justify-between 
                 px-4 sm:px-8 py-3 transition-colors duration-300"
    >
      {/* LEFT — Navigation Tabs */}
      <ul className="flex items-center gap-6 sm:gap-8">
        {tabs.map(({ name, icon, path }) => (
          <motion.li key={name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={path}
              className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all ${
                location.pathname === path
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-100 hover:text-white"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* RIGHT — Theme Toggle */}
       <div className="flex items-center gap-4">
        {/* Reward Indicator */}
        <div className="flex items-center gap-1 text-white-300">
          <span className="text-2xl"> 🌿</span>
          <span className="text-sm font-semibold">{rewards}</span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
