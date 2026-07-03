import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  const fetchAdmins = async () => {
    try {
      const response = await apiClient.get('/users?role=admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error al cargar la lista de administradores:', error);
      toast.error('Error al cargar la lista de administradores');
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    setIsLoading(true);
    try {
      // Verificar si existe el email
      const check = await apiClient.get(`/users?email=${formData.email}`);
      if (check.data.length > 0) {
        toast.error('El email ya está registrado');
        setIsLoading(false);
        return;
      }

      // Crear administrador
      const newAdmin = { ...formData, role: 'admin' };
      await apiClient.post('/users', newAdmin);
      toast.success('Administrador creado exitosamente');
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch (err) {
      console.error('Error al crear administrador:', err);
      toast.error('Error al crear administrador');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">Gestión de Administradores</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Crear Nuevo Administrador</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
                 required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
                 required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
                 required />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors mt-4"
              >
                {isLoading ? 'Guardando...' : 'Crear Administrador'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Administradores Registrados</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {loadingAdmins ? (
              <div className="p-6 text-center text-gray-500">Cargando...</div>
            ) : admins.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No hay administradores registrados.</div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {admins.map((admin) => (
                  <li key={admin.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
