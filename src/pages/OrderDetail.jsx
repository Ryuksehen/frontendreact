import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';
const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Cargando detalle...</div>;
  if (!order) return <div className="text-center py-20 text-red-500">Pedido no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Detalle del Pedido #{order.id}</h2>
        <Link to={user?.role === 'admin' ? '/admin/orders' : '/orders'} className="text-primary hover:underline">Volver a los pedidos</Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden p-6 mb-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <p className="text-gray-500 text-sm">Fecha</p>
            <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Estado</p>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full mt-1
              ${order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                order.status === 'Aprobado' ? 'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'}`}>
              {order.status}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Productos</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {order.items.map((item) => (
            <li key={item.id} className="py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t flex justify-end">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Total: ${order.total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
