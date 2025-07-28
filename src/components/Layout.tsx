import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const pageLabels = {
  dashboard: 'Dashboard',
  products: 'Produtos',
  sales: 'Vendas',
  clients: 'Clientes',
  settings: 'Configurações'
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onPageChange 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Verifica se é a landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLandingPage && (
        <Header 
          onMenuToggle={handleMenuToggle}
          isMobile={isMobile}
          currentPage={pageLabels[currentPage as keyof typeof pageLabels] || 'Dashboard'}
        />
      )}
      
      {!isLandingPage && (
        <Navigation
          currentPage={currentPage}
          onPageChange={onPageChange}
          isMobile={isMobile}
          isMenuOpen={isMenuOpen}
          onMenuClose={handleMenuClose}
        />
      )}

      <main className={`
        transition-all duration-300
        ${isLandingPage ? 'pt-0' : isMobile ? 'pt-4 pb-20 px-4' : 'lg:pl-64 pt-4 px-4 sm:px-6 lg:px-8'}
      `}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
