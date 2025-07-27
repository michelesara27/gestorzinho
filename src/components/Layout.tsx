import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={handleMenuToggle}
        isMobile={isMobile}
        currentPage={pageLabels[currentPage as keyof typeof pageLabels] || 'Dashboard'}
      />
      
      <Navigation
        currentPage={currentPage}
        onPageChange={onPageChange}
        isMobile={isMobile}
        isMenuOpen={isMenuOpen}
        onMenuClose={handleMenuClose}
      />

      <main className={`
        transition-all duration-300
        ${isMobile ? 'pt-4 pb-20 px-4' : 'lg:pl-64 pt-4 px-4 sm:px-6 lg:px-8'}
      `}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
