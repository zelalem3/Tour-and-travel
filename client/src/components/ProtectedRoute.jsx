import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // Check for a local "pass" you've set for yourself
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  if (!isAdmin) {
    // If not you, send them back to the Home page
    return <Navigate to="/" replace />;
  }

  return children;
};