import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import apiClient from '../api/apiClient';
import ProductCard from '../components/client/ProductCard';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'Todos', min: 0, max: Infinity });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate dynamic price ranges based on store average
  const priceCategories = useMemo(() => {
    if (products.length === 0) return [{ label: 'Todos', min: 0, max: Infinity }];
    
    const sum = products.reduce((acc, p) => acc + parseFloat(p.price), 0);
    const avg = sum / products.length;
    
    // Create logical brackets around the average. Round to nearest 10 for cleaner look.
    const lowEnd = Math.max(10, Math.round((avg * 0.5) / 10) * 10);
    const highEnd = Math.round((avg * 1.5) / 10) * 10;
    
    return [
      { label: 'Todos', min: 0, max: Infinity },
      { label: `Hasta $${lowEnd}`, min: 0, max: lowEnd },
      { label: `$${lowEnd} - $${highEnd}`, min: lowEnd, max: highEnd },
      { label: `Más de $${highEnd}`, min: highEnd, max: Infinity }
    ];
  }, [products]);

  // Deferred values for smoother UI when typing
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Compute filtered and paginated products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase());
      const price = parseFloat(product.price);
      const matchesPrice = price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      return matchesSearch && matchesPrice;
    });
  }, [products, deferredSearchTerm, selectedPriceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPriceRange]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">Nuestros Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-slate-200 dark:bg-slate-700 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Header & Horizontal Filters */}
      <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
              Catálogo
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Encuentra los mejores productos
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto flex-grow justify-end">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Ej. Sillon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-700 dark:text-white transition-all bg-white/50"
              />
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto px-1 py-1">
              {priceCategories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => setSelectedPriceRange(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedPriceRange.label === category.label
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Products */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-6 glass rounded-2xl border-dashed border-2 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 min-h-[400px] flex flex-col items-center justify-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No se encontraron productos con esos filtros.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-slate-700 dark:text-slate-300 font-medium px-4 py-2 glass rounded-xl">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
