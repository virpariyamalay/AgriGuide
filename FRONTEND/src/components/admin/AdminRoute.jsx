import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;