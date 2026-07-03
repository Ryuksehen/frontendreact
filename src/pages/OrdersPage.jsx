import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/orders?userId=${user.id}&_sort=-date`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchOrders();
  }, [user.id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Cargando pedidos...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center text-gray-600 dark:text-gray-400">
          No has realizado ningún pedido aún.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <li key={order.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500 block">Pedido #{order.id}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {new Date(order.date).toLocaleDateString()} a las {new Date(order.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Aprobado' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                    <span className="block mt-1 font-bold text-lg text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link to={`/orders/${order.id}`} className="text-primary hover:underline text-sm font-medium">
                  Ver detalle del pedido
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
