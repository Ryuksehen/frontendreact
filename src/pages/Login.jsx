import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor llena todos los campos');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success('Bienvenido');
      // Redirección manejada en ProtectedRoute o aquí directamente
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } else {
      const storeError = useAuthStore.getState().error;
      toast.error(storeError || 'Credenciales incorrectas');
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full bg-white dark:bg-gray-900">
      {/* Imagen Izquierda */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop" 
          alt="Login" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Formulario Derecha */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm sm:w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
