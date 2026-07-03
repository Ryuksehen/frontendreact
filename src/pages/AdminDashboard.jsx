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
    <div className="w-full">
      <h2 className="text-3xl font-extrabold mb-8 text-slate-800 dark:text-slate-100 tracking-tight">Panel de Administración</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center">
          <div className="p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-5">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Clientes</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">{stats.clients}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center">
          <div className="p-4 rounded-xl bg-green-100/50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-5">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Pedidos</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">{stats.orders}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center">
          <div className="p-4 rounded-xl bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mr-5">
            <ShoppingBag size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Productos</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">{stats.products}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 mt-12">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/orders" className="block p-6 glass rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-center card-hover group">
          <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-slate-500">
            <Package size={24} />
          </div>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Gestionar Pedidos</h5>
          <p className="font-normal text-sm text-slate-500 dark:text-slate-400">Actualizar estado de pedidos.</p>
        </Link>
        <Link to="/admin/clients" className="block p-6 glass rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-center card-hover group">
          <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-slate-500">
            <Users size={24} />
          </div>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Ver Clientes</h5>
          <p className="font-normal text-sm text-slate-500 dark:text-slate-400">Listado de usuarios.</p>
        </Link>
        <Link to="/admin/products" className="block p-6 glass rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-center card-hover group">
          <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-slate-500">
            <ShoppingBag size={24} />
          </div>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Inventario</h5>
          <p className="font-normal text-sm text-slate-500 dark:text-slate-400">Crear, editar o eliminar.</p>
        </Link>
        <Link to="/admin/create" className="block p-6 glass rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-center card-hover group">
           <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-slate-500">
            <Users size={24} />
          </div>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">Nuevo Admin</h5>
          <p className="font-normal text-sm text-slate-500 dark:text-slate-400">Registrar administradores.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
