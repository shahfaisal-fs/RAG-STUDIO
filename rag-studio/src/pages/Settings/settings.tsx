import { useState } from 'react';
import { Moon, Sun, Bell, Database } from 'lucide-react';

export const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    tokenThreshold: 1000000,
    notifications: {
      email: true,
      push: false,
      weekly: true
    },
    retention: 30
  });

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings(prev => ({ ...prev, theme }));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Theme Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Theme</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              settings.theme === 'light'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="h-5 w-5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              settings.theme === 'dark'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="h-5 w-5" />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* Token Usage Alert */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Token Usage Alert</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Alert Threshold (tokens)
            </label>
            <input
              type="number"
              value={settings.tokenThreshold}
              onChange={(e) =>
                setSettings(prev => ({
                  ...prev,
                  tokenThreshold: parseInt(e.target.value)
                }))
              }
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">
            Notification Preferences
          </h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300 capitalize">
                {key} Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [key]: e.target.checked
                      }
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Retention */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">
            Data Retention Policy
          </h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Retain Data For
          </label>
          <select
            value={settings.retention}
            onChange={(e) =>
              setSettings(prev => ({
                ...prev,
                retention: parseInt(e.target.value)
              }))
            }
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
            <option value={180}>180 days</option>
            <option value={365}>1 year</option>
          </select>
        </div>
      </div>
    </div>
  );
};