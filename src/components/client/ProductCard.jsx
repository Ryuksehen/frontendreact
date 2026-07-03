import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAdd}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
