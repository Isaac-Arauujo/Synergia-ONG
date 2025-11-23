import React, { useState, useEffect } from "react";
import "../style/meuperfil.css";
import { useAuth } from "../contexts/AuthContext";

export default function Perfil() {
  const { usuario, atualizarUsuario } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [foto, setFoto] = useState("");

  // ⬇️ AQUI — RECUPERA OS DADOS SALVOS QUANDO RECARREGA A PÁGINA
  useEffect(() => {
  if (usuario) {
    setNome(usuario.nomeCompleto || "");
    setEmail(usuario.email || "");
    setLocalidade(usuario.localidade || "");
    setFoto(usuario.fotoPerfil || "");
  }
}, [usuario]);


  // Selecionar foto
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    reader.readAsDataURL(file);
  };

  // Salvar
  const salvar = () => {
    atualizarUsuario({
      nomeCompleto: nome,
      email,
      localidade,
      fotoPerfil: foto,
    });

    alert("Perfil atualizado com sucesso!");
  };

  return (
    <>
      <header className="navbar-contato">
        <div className="navbar">
          <nav>
            <a href="#about">Sobre Nós</a>
            <a href="/">Início</a>
            <a href="#how-it-works">Como funciona</a>
            <a href="/contato">Contato</a>
          </nav>
        </div>
      </header>

      <main className="perfil-container">
        <h2 className="titulo-perfil">Meu Perfil</h2>

        <section className="info-usuario">
          <div className="foto-usuario">
            <img
              src={
                foto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Foto de perfil"
            />

            <label className="editar-foto-btn">
              <input type="file" accept="image/*" onChange={handleFoto} />
              <i className="fas fa-pen"></i>
            </label>
          </div>

          <div className="dados-usuario">
            <h3 className="nome-usuario">{nome}</h3>
            <p className="local-usuario">Local: {localidade}</p>

            <label>Nome Completo:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Localidade:</label>
            <input
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
            />

            <button className="btn-salvar" onClick={salvar}>Salvar</button>
          </div>
        </section>

      <section className="meus-locais">
  <h3>Meus Locais:</h3>

  {usuario?.locaisInscritos?.length === 0 && (
    <p>Você ainda não se candidatou para nenhum local.</p>
  )}

  <div className="locations-grid">
    {usuario?.locaisInscritos?.map((local, index) => (
      <div className="location-card" key={index}>
        <div className="card-image">
          <img src={local.imagem} alt={local.titulo} />
        </div>

        <p>{local.titulo}</p>

        <a href={local.link} className="btn-link">
          <button className="btn-details">Ver Detalhes</button>
        </a>
      </div>
    ))}
  </div>
</section>

      </main>
    </>
  );
}
