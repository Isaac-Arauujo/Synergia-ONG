import React from "react";
import "../style/meuperfil.css";

export default function Perfil() {
  return (
    <>
      <header className="navbar-contato">
        <div className="navbar">
          <div className="logo"></div>
          <nav>
            <a href="#about">Sobre Nós</a>
            <a href="/">Início</a>
            <a href="#how-it-works">Como funciona</a>
            <a href="/contato">Contato</a>
            <a href="#projects">Projetos</a>
          </nav>
        </div>
      </header>

      <main className="perfil-container">
        <h2 className="titulo-perfil">Meu Perfil</h2>

        <section className="info-usuario">
          <div className="foto-usuario">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Foto de perfil"
            />
            <i className="fas fa-pen editar-foto"></i>
          </div>

          <div className="dados-usuario">
            <h3 className="nome-usuario">Arelly linda</h3>
            <p className="local-usuario">Local: São Paulo, SP</p>

            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" defaultValue="Arelly Pinto Da Silva" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" defaultValue="Pintodasilva@gmail.com" />
          </div>
        </section>

        <section className="meus-locais">
          <h3>Meus Locais:</h3>
          <p>
            Estes são os locais onde você decidiu agir e colocar a mão na massa para
            transformar o mundo! Sua participação mostra que pequenas atitudes podem
            gerar grandes mudanças e inspirar outras pessoas a fazer o mesmo.
          </p>

            <section className="available-locations container">
          <h2>Meus Locais</h2>
          <div className="locations-grid">
            <div className="location-card">
              <div className="card-image">
                <img src="src/img/Captura de tela 2025-11-11 204408.png" alt="Voluntário em Cipó-Guaçu" />
              </div>
              <p>Cipó-Guaçu</p>
              <a href="/cipo" className="btn-link">
  <button className="btn-details">Ver Detalhes</button>
</a>
            </div>

            <div className="location-card">
              <div className="card-image">
                <img src="https://cj.estrategia.com/portal/wp-content/uploads/2025/01/11193245/173601144167796eb18406f_1736011441_3x2_md.jpg" alt="Voluntário no Guarujá" />
              </div>
              <p>Guarujá</p>
              <a href="/guaruja" className="btn-link">
  <button className="btn-details">Ver Detalhes</button>
</a>
            </div>

          </div>
        </section>

        </section>
      </main>
    </>
  );
}