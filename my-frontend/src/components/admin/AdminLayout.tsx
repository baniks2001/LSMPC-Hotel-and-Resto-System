import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuthStore } from '../store/authStore';

export default function AdminLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar: Fixed on large screens, collapsible on small screens */}
      <div className="md:w-64 w-full">
        <Sidebar />
      </div>

      {/* Main Content: Adjusts according to screen size */}
      <main className="flex-1 p-8 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
