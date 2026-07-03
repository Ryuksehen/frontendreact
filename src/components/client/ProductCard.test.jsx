import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

// Mock del store de Zustand para evitar errores al renderizar
vi.mock('../../store/useCartStore', () => ({
  useCartStore: () => ({
    addToCart: vi.fn(),
  }),
}));

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    const product = {
      id: '1',
      name: 'MacBook Test',
      price: 1500,
      description: 'Test description for laptop',
      image: 'https://test.image.com/macbook.jpg'
    };
    
    render(<ProductCard product={product} />);
    
    // Verifica que el texto se muestre en pantalla
    expect(screen.getByText('MacBook Test')).toBeInTheDocument();
    expect(screen.getByText('Test description for laptop')).toBeInTheDocument();
    expect(screen.getByText('$1500.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });
});
