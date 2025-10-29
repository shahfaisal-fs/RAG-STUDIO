import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Key, User } from 'lucide-react';

interface Activity {
  id: string;
  type: 'query' | 'configuration' | 'project';
  description: string;
  timestamp: Date;
}

export const Profile = () => {
  const { user } = useAuth();
  const [isRegeneratingKey, setIsRegeneratingKey] = useState(false);
  
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'query',
      description: 'Queried Customer Support RAG',
      timestamp: new Date('2025-10-28T14:00:00'),
    },
    {
      id: '2',
      type: 'configuration',
      description: 'Updated Product Documentation RAG settings',
      timestamp: new Date('2025-10-28T13:30:00'),
    },
    {
      id: '3',
      type: 'project',
      description: 'Created new Technical Specs RAG project',
      timestamp: new Date('2025-10-28T12:45:00'),
    },
  ];

  const regenerateApiKey = async () => {
    setIsRegeneratingKey(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRegeneratingKey(false);
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <User className="h-10 w-10 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h1>
            <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <h2 className="text-lg font-medium text-slate-900 dark:text-white">API Key</h2>
          </div>
          <button
            onClick={regenerateApiKey}
            disabled={isRegeneratingKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isRegeneratingKey ? 'Regenerating...' : 'Regenerate API Key'}
          </button>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
          <code className="text-sm">••••••••••••••••</code>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockActivities.map(activity => (
            <div
              key={activity.id}
              className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-md"
            >
              <div>
                <p className="text-slate-900 dark:text-white">{activity.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activity.type === 'query'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : activity.type === 'configuration'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                }`}
              >
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};