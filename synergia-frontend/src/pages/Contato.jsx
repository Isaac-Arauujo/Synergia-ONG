import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Loader } from "lucide-react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de envio do formulário
    setTimeout(() => {
      setSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ nome: '', email: '', mensagem: '' });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-synergia-green">
              Synergia
            </Link>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-synergia-green transition-colors">
                Início
              </Link>
              <a href="#about" className="text-gray-700 hover:text-synergia-green transition-colors">
                Sobre Nós
              </a>
              <Link to="/contato" className="text-synergia-green font-semibold">
                Contato
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-synergia-green transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="contact-section py-12">
        <div className="contact-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Lado esquerdo – informações */}
          <div className="contact-info">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">ENTRE EM CONTATO</h1>

            <div className="space-y-6">
              <div className="info-item flex items-center">
                <div className="info-icon bg-synergia-green rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900">synergia.adm@outlook.com</p>
                </div>
              </div>

              <div className="info-item flex items-center">
                <div className="info-icon bg-synergia-green rounded-full p-3 mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="text-lg font-semibold text-gray-900">+55 11 99999-9999</p>
                </div>
              </div>

              <div className="info-item flex items-center">
                <div className="info-icon bg-synergia-green rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Localização</p>
                  <p className="text-lg font-semibold text-gray-900">São Paulo, SP</p>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mt-12">
              <p className="text-sm text-gray-600 mb-4">Siga-nos nas redes sociais</p>
              <div className="flex space-x-4">
                <a href="#" className="social-icon">
                  <span className="fab fa-instagram"></span>
                </a>
                <a href="#" className="social-icon">
                  <span className="fab fa-facebook"></span>
                </a>
                <a href="#" className="social-icon">
                  <span className="fab fa-twitter"></span>
                </a>
              </div>
            </div>
          </div>

          {/* Lado direito – formulário */}
          <div className="contact-form-card">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envie sua mensagem</h2>
              <p className="text-gray-600 mb-8">Responderemos o mais breve possível</p>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="interesse" className="block text-sm font-medium text-gray-700 mb-2">
                    Estou interessado em:
                  </label>
                  <select 
                    id="interesse"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent"
                  >
                    <option>Voluntariado</option>
                    <option>Parceria</option>
                    <option>Doação</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent"
                    placeholder="João Pedro"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent"
                    placeholder="email@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                    Sua Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent"
                    placeholder="Conte-nos como podemos ajudar..."
                  ></textarea>
                </div>

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
                    <>
                      <Send size={20} className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© 2024 SYNERGIA. Todos os direitos reservados.</p>
            <p className="text-gray-400 mt-2">Juntos por um mundo melhor</p>
          </div>
        </div>
      </footer>
    </div>
  );
}