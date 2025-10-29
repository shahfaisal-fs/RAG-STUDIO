import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  MessageSquare,
  FolderGit2,
  User,
  Settings
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rag-generator', label: 'RAG Generator', icon: GitBranch },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/projects', label: 'My Projects', icon: FolderGit2 },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-slate-800 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">RAG Studio</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};