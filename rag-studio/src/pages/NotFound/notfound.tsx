import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
        Page not found
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  );
};