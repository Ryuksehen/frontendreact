import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Users, Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    orders: 0,
    products: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, ordersRes, productsRes] = await Promise.all([
          apiClient.get('/users?role=cliente'),
          apiClient.get('/orders'),
          apiClient.get('/products')
        ]);
        
        setStats({
          clients: clientsRes.data.length,
          orders: ordersRes.data.length,
          products: productsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Panel de Administración</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Clientes Registrados</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.clients}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pedidos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.orders}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Productos Activos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.products}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/orders" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Gestionar Pedidos</h5>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-300">Actualizar estado de pedidos.</p>
        </Link>
        <Link to="/admin/clients" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Ver Clientes</h5>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-300">Listado de usuarios registrados.</p>
        </Link>
        <Link to="/admin/products" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">CRUD Productos</h5>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-300">Crear, editar o eliminar.</p>
        </Link>
        <Link to="/admin/create" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Nuevo Admin</h5>
          <p className="font-normal text-sm text-gray-700 dark:text-gray-300">Registrar administradores.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
