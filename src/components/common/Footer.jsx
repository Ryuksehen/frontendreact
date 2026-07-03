import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register'];

  if (hideFooterRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} TiendaOnline. Todos los derechos reservados.</p>
        <p className="text-sm text-gray-400 mt-2">Omar X React Final Project </p>
      </div>
    </footer>
  );
};

export default Footer;
