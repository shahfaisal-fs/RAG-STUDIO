import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { Dashboard } from '../pages/Dashboard/dashboard.tsx';
import { RAGGenerator } from '../pages/RAGGenerator/raggenerator.tsx';
import { Chat } from '../pages/Chat/chat.tsx';
import { MyProjects } from '../pages/MyProjects/myprojects.tsx';
import { Profile } from '../pages/Profile/profile.tsx';
import { Settings } from '../pages/Settings/settings.tsx';
import { Login } from '../pages/Login/login.tsx';
import { NotFound } from '../pages/NotFound/notfound.tsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/rag-generator"
        element={
          <ProtectedRoute>
            <RAGGenerator />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <MyProjects />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};