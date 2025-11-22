import "../style/landingpage.css";
import "../style/contato.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Send } from "lucide-react";

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

    // Simulação de envio do formulário — mantemos o mesmo comportamento JS
    setTimeout(() => {
      setSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ nome: '', email: '', mensagem: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <header className="hero-section">
        <div className="navbar">
          <div className="logo"></div>
          <nav>
            <a href="#about">Sobre Nós</a>
            <Link to="/">Início</Link>
            <a href="#how-it-works">Voluntário</a>
            <Link to="/contato">Contato</Link>
            <a href="#projects">Projetos</a>
          </nav>
        </div>
      </header>

      <main className="contact-section">
        <div className="contact-container container">

          <div className="contact-info">
            <h1>ENTRE EM CONTATO</h1>

            <div className="info-item">
              <i className="fas fa-envelope" />
              <p>synergia.adm@outlook.com</p>
            </div>

            <div className="info-item">
              <i className="fas fa-phone" />
              <p>+55 11 99999-9999</p>
            </div>

            <div className="info-item">
              <i className="fas fa-map-marker-alt" />
              <p>São Paulo, SP</p>
            </div>

            <div className="info-item instagram-icon">
              <i className="fab fa-instagram" />
            </div>
          </div>

          <div className="contact-form-card">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="contact-form">
                <label className="interesed-in-label">Estou interessado em:</label>
                <select
                  id="interesse"
                  name="interesse"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-synergia-green focus:border-transparent mb-4"
                >
                  <option>Voluntariado</option>
                  <option>Parceria</option>
                  <option>Doação</option>
                  <option>Outro</option>
                </select>

                <label htmlFor="name">Seu Nome</label>
                <input
                  type="text"
                  id="name"
                  name="nome"
                  placeholder="João Pedro"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />

                <label htmlFor="email">Seu Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />

                <label htmlFor="message">Sua Mensagem</label>
                <textarea
                  id="message"
                  name="mensagem"
                  rows="5"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />

                <button
                  type="submit"
                  className="btn-send w-full bg-synergia-green text-white py-3 rounded-lg font-medium hover:bg-synergia-dark transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Envie sua Mensagem
                    </>
                  )}
                </button>

                {success && (
                  <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-600">© 2024 SYNERGIA. Todos os direitos reservados.</footer>
    </div>
  );
}