import { useState, useCallback } from 'react';
import { Client } from '../types';

// Mock data for demonstration
const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'joao@email.com',
    address: {
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    notes: 'Cliente preferencial',
    createdAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(11) 88888-8888',
    email: 'maria@email.com',
    createdAt: new Date('2024-02-20'),
    isActive: true
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    phone: '(11) 77777-7777',
    createdAt: new Date('2024-03-10'),
    isActive: false
  }
];

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const addClient = useCallback((clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    setClients(prev => [...prev, newClient]);
    return newClient;
  }, []);

  const updateClient = useCallback((id: string, updates: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    );
  }, []);

  const deleteClient = useCallback((id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  }, []);

  const getActiveClients = useCallback(() => {
    return clients.filter(client => client.isActive);
  }, [clients]);

  const getClientById = useCallback((id: string) => {
    return clients.find(client => client.id === id);
  }, [clients]);

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
    getActiveClients,
    getClientById,
    activeClientsCount: getActiveClients().length,
    totalClients: clients.length
  };
};
