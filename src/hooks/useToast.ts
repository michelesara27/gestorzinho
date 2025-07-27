import { useState, useCallback } from 'react';
import { ToastMessage } from '../types';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((
    type: ToastMessage['type'],
    title: string,
    message: string,
    duration: number = 5000
  ) => {
    const id = Date.now().toString();
    const toast: ToastMessage = { id, type, title, message };
    
    setToasts(prev => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    return addToast('success', title, message);
  }, [addToast]);

  const showError = useCallback((title: string, message: string) => {
    return addToast('error', title, message);
  }, [addToast]);

  const showWarning = useCallback((title: string, message: string) => {
    return addToast('warning', title, message);
  }, [addToast]);

  const showInfo = useCallback((title: string, message: string) => {
    return addToast('info', title, message);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
