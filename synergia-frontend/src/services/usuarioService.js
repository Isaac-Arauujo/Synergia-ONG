import api from './api';

export const usuarioService = {
  // Login
  login: async (email, senha) => {
    const response = await api.post('/usuarios/login', { email, senha });
    return response.data;
  },

  // Cadastro
  cadastrar: async (usuarioData) => {
    const response = await api.post('/usuarios/cadastro', usuarioData);
    return response.data;
  },

  // Buscar todos os usuários (admin)
  listarTodos: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Buscar usuário por ID
  buscarPorId: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Atualizar usuário
  atualizar: async (id, usuarioData) => {
    const response = await api.put(`/usuarios/${id}`, usuarioData);
    return response.data;
  },

  // Excluir usuário
  excluir: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },

  // Verificar email
  verificarEmail: async (email) => {
    const response = await api.get(`/usuarios/verificar-email/${email}`);
    return response.data;
  },

  // Verificar CPF
  verificarCpf: async (cpf) => {
    const response = await api.get(`/usuarios/verificar-cpf/${cpf}`);
    return response.data;
  },

  // Alterar senha
  alterarSenha: async (id, senhaData) => {
    const response = await api.put(`/usuarios/${id}/senha`, senhaData);
    return response.data;
  }
};