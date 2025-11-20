import React, { createContext, useState, useContext, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage ao carregar a aplicação
    const carregarUsuarioSalvo = async () => {
      try {
        const usuarioSalvo = localStorage.getItem('usuario');
        const token = localStorage.getItem('authToken');
        
        if (usuarioSalvo && token) {
          const usuarioData = JSON.parse(usuarioSalvo);
          
          // Verificar se o token ainda é válido (opcional - pode fazer uma chamada à API)
          setUsuario(usuarioData);
        }
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        logout();
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarioSalvo();
  }, []);

  const login = async (email, senha) => {
    try {
      setError('');
      const result = await usuarioService.login(email, senha);
      
      if (result && result.id) {
        // Simular token JWT (em produção viria do backend)
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(result))}.signature`;
        
        setUsuario(result);
        localStorage.setItem('usuario', JSON.stringify(result));
        localStorage.setItem('authToken', token);
        
        return { success: true, data: result };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao fazer login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUsuario(null);
    setError('');
    localStorage.removeItem('usuario');
    localStorage.removeItem('authToken');
  };

  const cadastrar = async (usuarioData) => {
    try {
      setError('');
      const novoUsuario = await usuarioService.cadastrar(usuarioData);
      return { success: true, data: novoUsuario };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const atualizarUsuario = (dadosAtualizados) => {
    setUsuario(prev => ({ ...prev, ...dadosAtualizados }));
    localStorage.setItem('usuario', JSON.stringify({ ...usuario, ...dadosAtualizados }));
  };

  const value = {
    usuario,
    carregando,
    error,
    login,
    logout,
    cadastrar,
    atualizarUsuario,
    isAuthenticated: !!usuario,
    isAdmin: usuario?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};