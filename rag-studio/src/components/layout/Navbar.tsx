import { useAuth } from '../../context/AuthContext';
import { Bell, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Welcome back, {user?.name}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            {user?.role}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            onClick={() => {}}
          >
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            )}
          </button>
          
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </header>
  );
};