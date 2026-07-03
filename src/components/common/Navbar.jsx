import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package, Users, LayoutDashboard, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useThemeStore } from '../../store/useThemeStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { getCartCount } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user?.role === 'admin' ? '/admin' : '/shop'} className="shrink-0 flex items-center" onClick={closeMobileMenu}>
              <span className="text-2xl font-bold text-primary">TiendaOnline</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Registrarse
                </Link>
              </>
            ) : user.role === 'admin' ? (
              <>
                <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/admin/orders" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <Package size={18} /> Pedidos
                </Link>
                <Link to="/admin/clients" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <Users size={18} /> Clientes
                </Link>
                <Link to="/admin/products" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  Productos
                </Link>
                <Link to="/admin/create" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  Nuevo Admin
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <LogOut size={18} /> Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium">
                  Productos
                </Link>
                <Link to="/orders" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium">
                  Mis Pedidos
                </Link>
                <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium relative">
                  <ShoppingCart size={24} />
                  {getCartCount() > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ml-2">
                  <LogOut size={18} /> Salir
                </button>
              </>
            )}
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleTheme} className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user && user.role === 'cliente' && (
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover px-3 py-2 rounded-md text-sm font-medium relative mr-2" onClick={closeMobileMenu}>
                <ShoppingCart size={24} />
                {getCartCount() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Iniciar Sesión
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="block text-primary hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Registrarse
                </Link>
              </>
            ) : user.role === 'admin' ? (
              <>
                <Link to="/admin" onClick={closeMobileMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link to="/admin/orders" onClick={closeMobileMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  <Package size={20} /> Pedidos
                </Link>
                <Link to="/admin/clients" onClick={closeMobileMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  <Users size={20} /> Clientes
                </Link>
                <Link to="/admin/products" onClick={closeMobileMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Productos
                </Link>
                <Link to="/admin/create" onClick={closeMobileMenu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Nuevo Admin
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  <LogOut size={20} /> Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/shop" onClick={closeMobileMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Productos
                </Link>
                <Link to="/orders" onClick={closeMobileMenu} className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-hover hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                  Mis Pedidos
                </Link>
                <button onClick={handleLogout} className="w-full text-left text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                  <LogOut size={20} /> Salir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
