export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  notes?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
};
