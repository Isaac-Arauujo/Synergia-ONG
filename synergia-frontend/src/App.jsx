import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import EsqueciSenha from './pages/EsqueciSenha';
import LandingPage from './pages/LandingPage';
import Locais from './pages/Locais';
import Ferramentas from './pages/Ferramentas';
import Inscricoes from './pages/Inscricoes';
import InscricaoDetalhe from './pages/InscricaoDetalhe';
import AddLocation from './pages/AddLocation';
import AddTool from './pages/AddTool';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Perfil from './pages/Perfil';
import Contato from './pages/Contato';

// Layout
import MainLayout from './layouts/MainLayout';

// Componente de rota protegida
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, usuario, carregando } = useAuth();
  
  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-synergia-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !usuario?.isAdmin) {
    return <Navigate to="/locais" replace />;
  }
  
  return children;
};

// Componente de rota pública (apenas para não autenticados)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, carregando } = useAuth();
  
  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synergia-green"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas públicas sem layout */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/contato" element={<Contato />} />
            
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            <Route path="/cadastro" element={
              <PublicRoute>
                <Cadastro />
              </PublicRoute>
            } />
            
            <Route path="/esqueci-senha" element={
              <PublicRoute>
                <EsqueciSenha />
              </PublicRoute>
            } />

            {/* Rotas protegidas com layout */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <SuperAdminDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/locais" element={
              <ProtectedRoute>
                <MainLayout>
                  <Locais />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/locais/novo" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <AddLocation />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/ferramentas" element={
              <ProtectedRoute>
                <MainLayout>
                  <Ferramentas />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/ferramentas/novo" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <AddTool />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/inscricoes" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <Inscricoes />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/inscricoes/detalhe/:id" element={
              <ProtectedRoute requireAdmin={true}>
                <MainLayout>
                  <InscricaoDetalhe />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/perfil" element={
              <ProtectedRoute>
                <MainLayout showSearch={false}>
                  <Perfil />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Rotas de fallback */}
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/home" element={<Navigate to="/admin" replace />} />
            
            {/* Rota 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
                  <a 
                    href="/" 
                    className="bg-synergia-green text-white px-6 py-3 rounded-lg hover:bg-synergia-dark transition-colors"
                  >
                    Voltar para o Início
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;