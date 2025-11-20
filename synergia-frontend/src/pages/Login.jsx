import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.senha);
      
      if (result.success) {
        navigate("/locais");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
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

      {/* Card de Login */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">LOGIN</h1>
          <p className="text-center text-gray-600 mb-8">Acesse sua conta</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors pr-12"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Esqueceu a senha */}
            <div className="text-right">
              <Link 
                to="/esqueci-senha" 
                className="text-sm text-synergia-green hover:text-synergia-dark transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-synergia-green text-white py-3 rounded-lg font-medium hover:bg-synergia-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Cadastro */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Sem{" "}
              <Link to="/cadastro" className="text-synergia-green font-semibold hover:text-synergia-dark">
                Cadastro
              </Link>
              ? Venha mudar o mundo conosco.
            </p>
            
            <Link 
              to="/cadastro" 
              className="inline-block border-2 border-synergia-green text-synergia-green px-6 py-2 rounded-lg font-medium hover:bg-synergia-green hover:text-white transition-colors"
            >
              Cadastre-se
            </Link>
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