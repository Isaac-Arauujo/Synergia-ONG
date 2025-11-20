import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Heart, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">
            <span className="logo-text text-2xl font-bold text-white">Synergia</span>
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">Sobre Nós</a>
            <Link to="/" className="nav-link">Início</Link>
            <a href="#how-it-works" className="nav-link">Como funciona</a>
            <Link to="/contato" className="nav-link">Contato</Link>
            <a href="#projects" className="nav-link">Projetos</a>
          </div>
        </nav>

        <div className="hero-content">
          <h1 className="hero-title">Como podemos mudar o mundo?</h1>
          <p className="hero-subtitle">Tudo começa com um simples passo.</p>
          <div className="hero-buttons">
            <Link to="/cadastro" className="btn-volunteer">
              Seja Voluntário
            </Link>
            <Link to="/login" className="btn-login">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="about-section container" id="about">
        <div className="about-text-content">
          <h2>A SYNERGIA: Juntos pelo Planeta, pelas Pessoas e pelos Animais</h2>
          <p>A SYNERGIA é uma ONG comprometida em transformar o mundo por meio da união de pessoas com um propósito comum: cuidar do nosso planeta e apoiar comunidades e proteger os animais e/ou ecossistemas impactados pela poluição.</p>
        </div>

        <div className="mission-highlight">
          <div className="mission-text">
            <p>Acreditamos que pequenas ações, quando somadas, geram grandes transformações.</p>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Voluntários trabalhando juntos" />
          </div>
        </div>

        <div className="mission-statement">
          <div className="mission-image-large">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Voluntários limpando praia" />
          </div>
          <div className="mission-text-content">
            <h3>Nossa Missão</h3>
            <p>Na SYNERGIA, unimos pessoas com um propósito: cuidar do planeta, apoiar comunidades e proteger animais.</p>
            <p>Trabalhamos na recuperação de áreas poluídas, revitalização de rios, apoio a comunidades e projetos pedagógicos ou de preservação ambiental para inspirar mudanças.</p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-number">500+</div>
              <div className="stat-label">Voluntários</div>
            </div>
            <div className="stat-card">
              <MapPin className="stat-icon" />
              <div className="stat-number">50+</div>
              <div className="stat-label">Locais Atendidos</div>
            </div>
            <div className="stat-card">
              <Heart className="stat-icon" />
              <div className="stat-number">1000+</div>
              <div className="stat-label">Vidas Impactadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION CARDS */}
      <section className="available-locations container">
        <h2>Locais Disponíveis</h2>
        <div className="locations-grid">
          <div className="location-card">
            <div className="card-image">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Parque" />
            </div>
            <p>Cipó-Guaçu</p>
            <Link to="/locais" className="btn-link">
              <button className="btn-details">
                Ver Detalhes <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="location-card">
            <div className="card-image">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Praia" />
            </div>
            <p>Guarujá</p>
            <Link to="/locais" className="btn-link">
              <button className="btn-details">
                Ver Detalhes <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="location-card">
            <div className="card-image">
              <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Rio" />
            </div>
            <p>Rio Tietê</p>
            <Link to="/locais" className="btn-link">
              <button className="btn-details">
                Ver Detalhes <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/locais" className="btn-primary">
            Ver Todos os Locais
          </Link>
        </div>
      </section>

      {/* HOW TO VOLUNTEER */}
      <section className="how-to-volunteer container" id="how-it-works">
        <h2>Como ser um Voluntário</h2>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Escolha um local próximo a você</h3>
              <p>Encontre uma comunidade, bairro ou área que precise de apoio e que esteja perto da sua localização.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Escolha uma ação ou projeto</h3>
              <p>Decida como quer contribuir: limpeza, revitalização, apoio a animais ou educação ambiental.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Inscreva-se e participe</h3>
              <p>Cadastre-se no site, escolha sua data preferida e participe das atividades programadas.</p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Faça a diferença e inspire outros</h3>
              <p>Colabore ativamente e compartilhe sua experiência para engajar mais pessoas na causa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACKS */}
      <section className="feedbacks-section container">
        <h2>FEEDBACKS SYNERGIES</h2>
        <div className="feedbacks-grid">
          <div className="feedback-card">
            <div className="quote-icon">"</div>
            <p>"Sou apaixonada pela causa animal e a Synergia me permitiu contribuir de forma significativa para a proteção dos nossos amigos de quatro patas."</p>
            <div className="profile">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Emanuel Boyle" />
              <div>
                <p className="role">Voluntária</p>
                <p className="name">Emanuel Boyle</p>
              </div>
            </div>
          </div>

          <div className="feedback-card">
            <div className="quote-icon">"</div>
            <p>"Participar da Synergia me mostrou o poder da ação local. Ver a transformação acontecer na minha própria comunidade é incrivelmente gratificante."</p>
            <div className="profile">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Ana Beatriz" />
              <div>
                <p className="role">Voluntária</p>
                <p className="name">Ana Beatriz</p>
              </div>
            </div>
          </div>

          <div className="feedback-card">
            <div className="quote-icon">"</div>
            <p>"No meu bairro, o projeto da Synergia fez toda a diferença. As crianças agora têm um espaço limpo e seguro para brincar."</p>
            <div className="profile">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Pietra Lima" />
              <div>
                <p className="role">Voluntária</p>
                <p className="name">Pietra Lima</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2>Pronto para fazer a diferença?</h2>
          <p>Junte-se a milhares de voluntários que estão transformando comunidades e protegendo o meio ambiente.</p>
          <div className="cta-buttons">
            <Link to="/cadastro" className="btn-primary btn-large">
              Começar Agora
            </Link>
            <Link to="/sobre" className="btn-secondary btn-large">
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-content container">
          <div className="footer-about">
            <h4>SYNERGIA</h4>
            <p>Conectando voluntários a projetos que transformam comunidades e protegem o meio ambiente através de ações locais significativas.</p>
          </div>
          
          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><a href="#about">Sobre Nós</a></li>
              <li><a href="#projects">Projetos</a></li>
              <li><a href="#how-it-works">Como Funciona</a></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contato</h4>
            <p>Email: synergia.adm@outlook.com</p>
            <p>Telefone: +55 11 99999-9999</p>
            <p>Localização: São Paulo, SP</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <p>© 2024 SYNERGIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}