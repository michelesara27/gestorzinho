import React from 'react';
import { Home, Package, ShoppingCart, Users, Settings, X, Wrench } from 'lucide-react';
import { NavigationItem } from '../types';

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'Home', path: '/' },
  { id: 'products', label: 'Produtos', icon: 'Package', path: '/products' },
  { id: 'services', label: 'Serviços', icon: 'Wrench', path: '/services' },
  { id: 'sales', label: 'Vendas', icon: 'ShoppingCart', path: '/sales' },
  { id: 'clients', label: 'Clientes', icon: 'Users', path: '/clients' },
  { id: 'settings', label: 'Mais', icon: 'Settings', path: '/settings' }
];

const iconMap = {
  Home,
  Package,
  Wrench,
  ShoppingCart,
  Users,
  Settings
};

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobile: boolean;
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  isMobile,
  isMenuOpen,
  onMenuClose
}) => {
  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    if (isMobile) {
      onMenuClose();
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onMenuClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <nav className={`
          fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Gestorzinho</span>
            </div>
            <button
              onClick={onMenuClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 lg:hidden">
          <div className="grid grid-cols-5 h-16">
            {navigationItems.filter(item => ['dashboard', 'products', 'sales', 'clients', 'settings'].includes(item.id)).map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex flex-col items-center justify-center space-y-1 transition-colors
                    ${isActive ? 'text-blue-600' : 'text-gray-600'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200 lg:pt-16">
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
