import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ClientModal } from './components/ClientModal';
import { ToastContainer } from './components/Toast';
import { useClients } from './hooks/useClients';
import { useToast } from './hooks/useToast';
import { LandingPage } from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  const { activeClientsCount, addClient } = useClients();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleNewClientClick = () => {
    setIsClientModalOpen(true);
  };

  const handleClientSave = (clientData: any) => {
    try {
      const newClient = addClient(clientData);
      showSuccess(
        'Cliente salvo!', 
        `${newClient.name} foi cadastrado com sucesso.`
      );
      setIsClientModalOpen(false);
    } catch (error) {
      showError(
        'Erro ao salvar',
        'Não foi possível salvar o cliente. Tente novamente.'
      );
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            activeClientsCount={activeClientsCount}
            onNewClientClick={handleNewClientClick}
          />
        );
      case 'products':
        return (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Produtos</h2>
            <p className="text-gray-500">Esta funcionalidade estará disponível em breve.</p>
          </div>
        );
      case 'sales':
        return (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vendas</h2>
            <p className="text-gray-500">Esta funcionalidade estará disponível em breve.</p>
          </div>
        );
      case 'clients':
        return (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Clientes</h2>
            <p className="text-gray-500">Lista de clientes estará disponível em breve.</p>
            <button
              onClick={handleNewClientClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Novo Cliente
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-500">Configurações do sistema estará disponível em breve.</p>
          </div>
        );
      default:
        return (
          <Dashboard 
            activeClientsCount={activeClientsCount}
            onNewClientClick={handleNewClientClick}
          />
        );
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={
          <Layout 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            {renderCurrentPage()}
          </Layout>
        } />
      </Routes>

      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleClientSave}
      />

      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
      />
    </div>
  );
}

export default App;
