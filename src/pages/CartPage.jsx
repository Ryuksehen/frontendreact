import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar del carrito?',
      text: "Se quitará este producto de tu orden.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      removeFromCart(id);
      toast.success('Producto removido');
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      const order = {
        userId: user.id,
        date: new Date().toISOString(),
        items: cart,
        total: getCartTotal(),
        status: 'Pendiente'
      };

      await apiClient.post('/orders', order);
      clearCart();
      toast.success('Pedido realizado con éxito');
      navigate('/orders');
    } catch (error) {
      console.error('Hubo un error al procesar el pedido:', error);
      toast.error('Hubo un error al procesar el pedido');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate('/shop')} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md transition-colors">
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Carrito de Compras</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item) => (
            <li key={item.id} className="p-4 flex items-center justify-between sm:flex-row flex-col gap-4">
              <div className="flex items-center space-x-4 w-full sm:w-1/2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)} c/u</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full sm:w-1/2">
                <div className="flex items-center border rounded">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center w-12">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right font-semibold w-24">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 dark:bg-gray-700 flex flex-col items-end">
          <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">Subtotal: ${getCartTotal().toFixed(2)}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Total: ${getCartTotal().toFixed(2)}</div>
          <button onClick={handlePlaceOrder} className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md text-lg font-medium transition-colors w-full sm:w-auto">
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
