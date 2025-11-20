import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader, Calendar } from "lucide-react";
import { usuarioService } from "../services/usuarioService";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    senha: "",
    confirmacaoSenha: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatação do CPF
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });
    setErrors({ ...errors, [name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(formData.dataNascimento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 16) {
        newErrors.dataNascimento = "Você deve ter pelo menos 16 anos";
      }
    }

    if (!formData.cpf.replace(/\D/g, '')) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = "CPF deve conter 11 dígitos";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmacaoSenha) {
      newErrors.confirmacaoSenha = "Confirmação de senha é obrigatória";
    } else if (formData.senha !== formData.confirmacaoSenha) {
      newErrors.confirmacaoSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Verificar se email já existe
      const emailDisponivel = await usuarioService.verificarEmail(formData.email);
      if (!emailDisponivel) {
        setErrors({ email: "Email já cadastrado" });
        setLoading(false);
        return;
      }

      // Verificar se CPF já existe
      const cpfDisponivel = await usuarioService.verificarCpf(formData.cpf.replace(/\D/g, ''));
      if (!cpfDisponivel) {
        setErrors({ cpf: "CPF já cadastrado" });
        setLoading(false);
        return;
      }

      // Preparar dados para envio
      const usuarioData = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, '')
      };

      const result = await cadastrar(usuarioData);
      
      if (result.success) {
        setSuccess("Cadastro realizado com sucesso! Redirecionando para login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Erro ao conectar com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-synergia-green to-green-800 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="logo">
          <span className="text-2xl font-bold text-white">Synergia</span>
        </div>
      </header>

      {/* Card de Cadastro */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">CADASTRE-SE</h1>
          <p className="text-center text-gray-600 mb-8">Junte-se à nossa comunidade</p>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {errors.submit}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="md:col-span-2">
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors ${
                  errors.nomeCompleto ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Seu nome completo"
              />
              {errors.nomeCompleto && (
                <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors ${
                    errors.dataNascimento ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {errors.dataNascimento && (
                <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                maxLength={14}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors ${
                  errors.cpf ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="000.000.000-00"
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors pr-12 ${
                    errors.senha ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmacaoSenha" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmacaoSenha"
                  name="confirmacaoSenha"
                  value={formData.confirmacaoSenha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors pr-12 ${
                    errors.confirmacaoSenha ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirme sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmacaoSenha && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmacaoSenha}</p>
              )}
            </div>

            {/* Botão Cadastrar */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-synergia-green text-white py-3 rounded-lg font-medium hover:bg-synergia-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin mr-2" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar"
                )}
              </button>
            </div>
          </form>

          {/* Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já possui conta?{" "}
              <Link to="/login" className="text-synergia-green font-semibold hover:text-synergia-dark">
                Faça Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-white text-sm">
        <p>Synergia ONG © 2024 - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}