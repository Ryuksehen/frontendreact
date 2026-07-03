import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetail from './pages/OrderDetail';
import AdminDashboard from './pages/AdminDashboard';
import ClientList from './pages/ClientList';
import OrderList from './pages/OrderList';
import CreateAdmin from './pages/CreateAdmin';
import AdminProducts from './pages/AdminProducts';
import AdminLayout from './components/admin/AdminLayout';

const ClientLayout = () => (
  <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
    <Navbar />
    <main className="grow flex flex-col">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Rutas de Cliente (con Navbar y Footer) */}
        <Route element={<ClientLayout />}>
          {/* Rutas Públicas */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas Compartidas / Privadas de Cliente */}
          <Route 
            path="/shop" 
            element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute requiredRole="cliente">
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders/:id" 
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<div className="text-center py-20 text-2xl">404 - Página no encontrada</div>} />
        </Route>

        {/* Rutas de Administrador (Layout independiente sin Navbar) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="create" element={<CreateAdmin />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
