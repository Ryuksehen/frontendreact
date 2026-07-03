import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200 dark:border-slate-700/50 card-hover group">
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-700">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-sm font-bold text-slate-800 dark:text-slate-100">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 grow line-clamp-2 leading-relaxed">{product.description}</p>
        <button 
          onClick={handleAdd}
          className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-800 dark:text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
