import React, { useState } from 'react';
// Removido o Link do react-router-dom para evitar o erro de contexto do Router
// import { Link } from 'react-router-dom';
 
// Dados simulados para o local, que seriam carregados de uma API
const localData = {
  nome: "Guarujá",
  // Usando uma imagem mais representativa para o Guarujá
  imagemUrl: "https://images.unsplash.com/photo-1587884177196-f94d3f3f7215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80%22"
  ,problematica: [
    "A poluição nas praias do Guarujá é resultado direto do despejo de esgoto doméstico e de resíduos urbanos sem tratamento adequado.",
    "Em várias regiões, canais e tubulações levam a água suja até a faixa de areia, contaminando o mar. Isso ocorre principalmente por causa de ligações clandestinas de esgotos às redes de drenagem de chuva.",
    "O impacto ambiental é grave: a poluição altera o equilíbrio do ecossistema marinho e prejudica o turismo, uma das principais fontes de renda da região."
  ],
  ajuda: [
    "A ONG Synergia pode desempenhar um papel essencial na limpeza e recuperação das áreas poluídas do Guarujá, especialmente nos pontos onde o esgoto e o lixo urbano chegam até a areia e o mar.",
    "O primeiro passo é organizar mutirões de limpeza comunitária, reunindo voluntários, moradores e parceiros locais.",
    "A Synergia pode definir datas regulares — por exemplo, uma vez por mês — para realizar ações em praias, margens de canais e pontos de acúmulo de resíduos."
  ],
};
 
// Componente de Navegação com Responsividade (CSS via Tailwind)
const DetailsNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const TEAL_TEXT = 'text-[#008080]'; // Cor de destaque Synergia (Teal)
    const HOVER_TEAL = 'hover:text-teal-600';
 
    // Lista de links de navegação
    const navLinks = [
        { name: "Sobre Nós", href: "#about" },
        { name: "Início", href: "/" },
        { name: "Como funciona", href: "#how-it-works" },
        { name: "Contato", href: "/contato" },
        { name: "Projetos", href: "#projects" },
    ];
 
    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className={`text-3xl font-extrabold ${TEAL_TEXT} rounded-lg hover:opacity-90 transition duration-150`}>
                            Synergia
                        </a>
                    </div>
                   
                    {/* Links de Navegação (Desktop) */}
                    <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-gray-600 font-medium ${HOVER_TEAL} transition duration-150 p-2 rounded-lg`}
                            >
                                {link.name}
                            </a>
                        ))}
                        {/* Botão Voltar/Ação Principal */}
                        <a
                            href="/locais"
                            className={`px-4 py-2 font-bold text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition duration-150 ml-6`}
                        >
                            Voltar aos Locais
                        </a>
                    </div>
 
                    {/* Menu Hamburger (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            {/* Icone Hamburger (aberto/fechado) */}
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
 
            {/* Menu Mobile */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 ${HOVER_TEAL} hover:bg-gray-100 transition duration-150`}
                            onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="/locais"
                        className={`block w-full text-center px-3 py-2 mt-2 font-bold text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 transition duration-150`}
                        onClick={() => setIsOpen(false)}
                    >
                        Voltar aos Locais
                    </a>
                </div>
            </div>
        </nav>
    );
};
 
// Componente Principal
const DetalhesLocal = () => {
  // Cores personalizadas baseadas na imagem (Teal para Synergia)
  const TEAL_COLOR = 'bg-[#008080]'; // Verde-água escuro (Cor da moldura da imagem)
  const TEAL_TEXT_COLOR = 'text-[#008080]'; // Cor de destaque do texto
  const BUTTON_BG = 'bg-[#4CAF50]'; // Um verde mais padrão para o botão de ação
  const BUTTON_HOVER = 'hover:bg-green-700';
 
 
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <DetailsNavbar /> {/* Usando a nova Navbar responsiva */}
 
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
       
        {/* Título Principal */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 pt-4">
          Local: {localData.nome}
        </h1>
 
        {/* Seção da Imagem com o Recorte Estilizado */}
        <div className={`shadow-2xl rounded-xl overflow-hidden mb-10 p-4 ${TEAL_COLOR} transition duration-500 hover:shadow-3xl`}>
          <div className="relative w-full h-auto">
            <img
              src={localData.imagemUrl}
              alt={`Vista de ${localData.nome}`}
              className="w-full h-full object-cover rounded-lg transform duration-500 hover:scale-[1.01]"
              // Cria a forma geométrica com o recorte superior (simulando a borda verde em curva)
              style={{ clipPath: 'polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)', aspectRatio: '16/9' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/800x400/10B981/FFFFFF?text=Imagem+Indisponível";
              }}
            />
          </div>
        </div>
 
        {/* Descrição da Problemática */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-8 border-teal-500" id="about">
          <h2 className={`text-2xl font-bold ${TEAL_TEXT_COLOR} mb-4 border-b-2 border-teal-100 pb-3`}>Detalhes da Problemática</h2>
          {localData.problematica.map((p, index) => (
            <p key={index} className="text-gray-700 mb-4 text-justify leading-relaxed">
              <span className="font-semibold text-teal-600">{index + 1}.</span> {p}
            </p>
          ))}
        </section>
 
        {/* Seção "Como podemos ajudar?" */}
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Como podemos ajudar?</h2>
         
          <ul className="space-y-4">
            {localData.ajuda.map((p, index) => (
              <li key={index} className="text-gray-700 text-justify leading-relaxed flex items-start">
                <span className={`text-xl font-extrabold mr-3 ${TEAL_TEXT_COLOR}`}>
                    {index + 1}
                </span>
                <p>{p}</p>
              </li>
            ))}
          </ul>
 
          {/* Frase de Ação Estilizada */}
          <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 italic font-semibold rounded-lg shadow-inner">
            Cuidar do {localData.nome} é cuidar da vida — cada gesto de limpeza é um passo para um futuro mais azul e mais verde.
          </div>
 
          {/* Botão de Ação */}
          <div className="text-center mt-10">
            <a
              href="/cadastro-voluntario"
              className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-xl text-white ${BUTTON_BG} ${BUTTON_HOVER} focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105`}
              title="Clique para se juntar à causa"
            >
              Quero me voluntariar Agora!
            </a>
          </div>
        </section>
 
      </main>
 
      {/* FOOTER Simples */}
      <footer className="mt-12 bg-gray-800 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm">© 2024 SYNERGIA. Juntos, transformamos.</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="/contato" className="text-gray-400 hover:text-white text-sm">Contato</a>
                <a href="/privacidade" className="text-gray-400 hover:text-white text-sm">Privacidade</a>
            </div>
        </div>
      </footer>
    </div>
  );
};
 
export default DetalhesLocal;