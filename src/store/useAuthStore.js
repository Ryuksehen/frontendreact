import { create } from 'zustand';
import apiClient from '../api/apiClient';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Obtenemos todos los usuarios y filtramos localmente para evitar problemas de sintaxis con json-server v1
      const response = await apiClient.get('/users');
      const users = response.data;
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const fakeToken = `fake-jwt-token-${user.id}`;
        
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        set({ user, token: fakeToken, isLoading: false });
        return true;
      } else {
        set({ error: 'Credenciales incorrectas', isLoading: false });
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      set({ error: err.message === 'Network Error' ? 'Error de conexión con el servidor' : 'Error al iniciar sesión', isLoading: false });
      return false;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // Verificamos si ya existe
      const checkRes = await apiClient.get('/users');
      const emailExists = checkRes.data.some(u => u.email === userData.email);
      
      if (emailExists) {
        set({ error: 'El email ya está registrado', isLoading: false });
        return false;
      }

      // Creamos el cliente
      const newUser = { ...userData, role: 'cliente' };
      const response = await apiClient.post('/users', newUser);
      
      if (response.data) {
        set({ isLoading: false });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al registrar:', err);
      set({ error: 'Error al registrar', isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  }
}));
