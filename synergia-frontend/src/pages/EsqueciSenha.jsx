import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulação de envio de email
    setTimeout(() => {
      setMessage("Se o email existir em nosso sistema, você receberá instruções para redefinir sua senha.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-synergia-green to-green-800 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="logo">
          <span className="text-2xl font-bold text-white">Synergia</span>
        </div>
      </header>

      {/* Card de Redefinição */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">REDEFINIR SENHA</h1>
          <p className="text-center text-gray-600 mb-8">
            Digite seu email para receber instruções de redefinição
          </p>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {message}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-synergia-green text-white py-3 rounded-lg font-medium hover:bg-synergia-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                "Enviar Instruções"
              )}
            </button>
          </form>

          {/* Voltar para Login */}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="text-synergia-green font-semibold hover:text-synergia-dark transition-colors"
            >
              ← Voltar para o Login
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