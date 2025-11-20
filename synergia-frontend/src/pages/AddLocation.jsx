import React, { useState } from 'react';
import { Image, Calendar, X, Loader, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { localService } from '../services/localService';
import { ferramentaService } from '../services/ferramentaService';

export default function AddLocation() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    imagemUrl: '',
    rua: '',
    numero: '',
    cep: '',
    dataInicio: '',
    dataFinal: '',
    ferramentas: []
  });
  
  const [ferramentasDisponiveis, setFerramentasDisponiveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carregandoFerramentas, setCarregandoFerramentas] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { usuario } = useAuth();

  // Carregar ferramentas disponíveis
  React.useEffect(() => {
    carregarFerramentas();
  }, []);

  const carregarFerramentas = async () => {
    try {
      setCarregandoFerramentas(true);
      const ferramentas = await ferramentaService.listarDisponiveis();
      setFerramentasDisponiveis(ferramentas);
    } catch (err) {
      console.error('Erro ao carregar ferramentas:', err);
    } finally {
      setCarregandoFerramentas(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleFerramentaToggle = (ferramentaId) => {
    setForm(prev => ({
      ...prev,
      ferramentas: prev.ferramentas.includes(ferramentaId)
        ? prev.ferramentas.filter(id => id !== ferramentaId)
        : [...prev.ferramentas, ferramentaId]
    }));
  };

  const handleRemoveFerramenta = (ferramentaId) => {
    setForm(prev => ({
      ...prev,
      ferramentas: prev.ferramentas.filter(id => id !== ferramentaId)
    }));
  };

  const validateForm = () => {
    if (!form.nome.trim()) {
      setError('Nome do local é obrigatório');
      return false;
    }
    if (!form.descricao.trim()) {
      setError('Descrição é obrigatória');
      return false;
    }
    if (!form.rua.trim()) {
      setError('Rua é obrigatória');
      return false;
    }
    if (!form.numero.trim()) {
      setError('Número é obrigatório');
      return false;
    }
    if (!form.cep.trim()) {
      setError('CEP é obrigatório');
      return false;
    }
    if (!form.dataInicio) {
      setError('Data de início é obrigatória');
      return false;
    }
    if (!form.dataFinal) {
      setError('Data final é obrigatória');
      return false;
    }
    if (new Date(form.dataInicio) >= new Date(form.dataFinal)) {
      setError('Data final deve ser posterior à data de início');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Preparar dados para envio
      const localData = {
        ...form,
        ferramentas: form.ferramentas.map(ferramentaId => ({
          ferramentaId: ferramentaId,
          quantidade: 1 // Quantidade padrão, pode ser ajustada conforme necessidade
        }))
      };

      await localService.criar(localData);
      
      setSuccess('Local cadastrado com sucesso!');
      setTimeout(() => {
        navigate('/locais');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar local');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setForm({
      nome: '',
      descricao: '',
      imagemUrl: '',
      rua: '',
      numero: '',
      cep: '',
      dataInicio: '',
      dataFinal: '',
      ferramentas: []
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gray-100">
        <h3 className="text-lg font-bold text-synergia-green">Adicionar novo Local</h3>
        
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">
              {usuario?.nomeCompleto || 'Usuário'}
            </p>
            <p className="text-xs text-gray-400">
              {usuario?.isAdmin ? 'Administrador' : 'Voluntário'}
            </p>
          </div>
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
            {usuario?.nomeCompleto?.substring(0, 2).toUpperCase() || 'US'}
          </div>
        </div>
      </header>

      <main className="p-8 bg-gray-100 flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome do Local */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Nome do Local *</span>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: Parque Central"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                required
              />
            </label>

            {/* Descrição */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Descrição *</span>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Breve descrição sobre o local e o que será feito"
                className="mt-2 w-full h-28 p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                required
              />
            </label>

            {/* Imagem URL */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">URL da Imagem</span>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center px-3 py-2 border border-gray-300 rounded-full text-sm text-gray-600 bg-white">
                  <Image className="w-4 h-4 mr-2 text-synergia-green" />
                  URL da imagem
                </div>
                <input
                  type="url"
                  name="imagemUrl"
                  value={form.imagemUrl}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                />
              </div>
            </label>

            {/* Endereço */}
            <div className="grid grid-cols-12 gap-4">
              <label className="col-span-8">
                <span className="text-sm font-medium text-gray-700">Rua *</span>
                <input
                  name="rua"
                  value={form.rua}
                  onChange={handleChange}
                  placeholder="Rua Roberto Azevedo"
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                  required
                />
              </label>

              <label className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Número *</span>
                <input
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="108"
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                  required
                />
              </label>

              <label className="col-span-2">
                <span className="text-sm font-medium text-gray-700">CEP *</span>
                <input
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-synergia-green focus:border-synergia-green"
                  required
                />
              </label>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <label>
                <span className="text-sm font-medium text-gray-700">Data Início *</span>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    name="dataInicio"
                    value={form.dataInicio}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-synergia-green focus:border-synergia-green"
                    required
                  />
                  <Calendar className="absolute right-3 top-2 w-4 h-4 text-synergia-green" />
                </div>
              </label>

              <label>
                <span className="text-sm font-medium text-gray-700">Data Final *</span>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    name="dataFinal"
                    value={form.dataFinal}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-synergia-green focus:border-synergia-green"
                    required
                  />
                  <Calendar className="absolute right-3 top-2 w-4 h-4 text-synergia-green" />
                </div>
              </label>
            </div>

            {/* Ferramentas */}
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Ferramentas ({form.ferramentas.length} selecionadas)
              </span>
              
              {carregandoFerramentas ? (
                <div className="mt-2 p-4 border border-gray-300 rounded-lg text-center">
                  <Loader size={20} className="animate-spin mx-auto text-synergia-green" />
                  <p className="text-sm text-gray-600 mt-2">Carregando ferramentas...</p>
                </div>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {/* Ferramentas Disponíveis */}
                  <div className="border border-gray-300 rounded-lg p-3 h-48 overflow-y-auto bg-white custom-scroll">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Disponíveis</p>
                    {ferramentasDisponiveis.map((ferramenta) => (
                      <label key={ferramenta.id} className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={form.ferramentas.includes(ferramenta.id)}
                          onChange={() => handleFerramentaToggle(ferramenta.id)}
                          className="w-3 h-3"
                          style={{ accentColor: '#00715D' }}
                        />
                        <span className="text-sm text-gray-700">{ferramenta.nome}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          ({ferramenta.quantidadeDisponivel} disp.)
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Ferramentas Selecionadas */}
                  <div className="border border-gray-300 rounded-lg p-3 h-48 overflow-y-auto bg-white custom-scroll">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Selecionadas</p>
                    {form.ferramentas.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-8">Nenhuma ferramenta selecionada</p>
                    ) : (
                      form.ferramentas.map((ferramentaId) => {
                        const ferramenta = ferramentasDisponiveis.find(f => f.id === ferramentaId);
                        return (
                          <div key={ferramentaId} className="flex items-center justify-between gap-2 py-1 px-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded mb-1">
                            <span>{ferramenta?.nome || 'Ferramenta'}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFerramenta(ferramentaId)}
                              className="p-1 bg-transparent border-0 flex items-center justify-center hover:bg-red-50 rounded"
                              aria-label={`Remover ${ferramenta?.nome}`}
                            >
                              <X size={16} strokeWidth={2} className="text-red-500" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </label>

            {/* Ações */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-synergia-green text-white px-8 py-3 rounded-lg font-medium hover:bg-synergia-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin mr-2" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar Local
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={loading}
                className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}