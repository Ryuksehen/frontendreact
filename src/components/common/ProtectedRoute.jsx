import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Si es cliente intentando acceder a admin, mandarlo a shop
    if (user.role === 'cliente') {
      return <Navigate to="/shop" replace />;
    }
    // Si es admin intentando acceder a cliente, mandarlo a dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
