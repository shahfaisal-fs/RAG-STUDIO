import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar />
        <Navbar />
        <main className="pl-64 pt-16">
          <div className="container mx-auto p-6">
            <AppRoutes />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
