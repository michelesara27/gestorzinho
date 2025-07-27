import { ValidationError } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBrazilianPhone = (phone: string): boolean => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Brazilian phone formats: 
  // Mobile: (11) 91234-5678 or 11912345678 (11 digits)
  // Landline: (11) 1234-5678 or 1112345678 (10 digits)
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

export const validateClientForm = (client: {
  name: string;
  phone: string;
  email?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!client.name.trim()) {
    errors.push({ field: 'name', message: 'Nome é obrigatório' });
  }

  if (!client.phone.trim()) {
    errors.push({ field: 'phone', message: 'Telefone é obrigatório' });
  } else if (!validateBrazilianPhone(client.phone)) {
    errors.push({ field: 'phone', message: 'Telefone deve ter formato brasileiro válido' });
  }

  if (client.email && client.email.trim() && !validateEmail(client.email)) {
    errors.push({ field: 'email', message: 'Email deve ter formato válido' });
  }

  return errors;
};
