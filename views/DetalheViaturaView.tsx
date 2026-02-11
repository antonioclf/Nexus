
import React, { useEffect, useState } from 'react';
import { ViewType, Viatura, Ocorrencia } from '../types';
import { getViaturaById, updateViaturaStatus } from '../services/viaturaService';
import { getOcorrencias } from '../services/ocorrenciaService'; // Assuming we want related ocurrences? Or just fetch all and filter? Ideally backend filter. 
// For now, let's fetch all ocorrencias and filter client side or add a service method.
// Let's add simple client side filtering for now as ocorrencias table might not be huge yet.
import Layout from '../components/Layout';

interface DetalheViaturaViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  viaturaId?: string;
  // Removed viatura prop as we fetch by ID
}

const DetalheViaturaView: React.FC<DetalheViaturaViewProps> = ({ onNavigate, viaturaId }) => {
  const [viatura, setViatura] = useState<Viatura | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!viaturaId) return;
      setLoading(true);
      const data = await getViaturaById(viaturaId);
      setViatura(data);
      setLoading(false);
    };
    fetchData();
  }, [viaturaId]);

  const handleStatusChange = async (newStatus: 'Operacional' | 'Manutenção' | 'Empenhada') => {
    if (viatura) {
      const success = await updateViaturaStatus(viatura.id, newStatus);
      if (success) {
        setViatura({ ...viatura, status: newStatus });
      }
    }
  };

  if (loading) {
    return (
      <Layout withBottomNav={false}>
        <div className="flex items-center justify-center h-screen">
          <span className="material-icons animate-spin text-primary text-4xl">refresh</span>
        </div>
      </Layout>
    );
  }

  if (!viatura) {
    return (
      <Layout withBottomNav={false}>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <span className="material-icons text-zinc-500 text-4xl">error_outline</span>
          <p className="text-zinc-500 font-bold">Viatura não encontrada</p>
          <button onClick={() => onNavigate('VIATURAS')} className="text-primary font-bold uppercase">Voltar</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout withBottomNav={false}>
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => onNavigate('VIATURAS')} className="flex items-center text-primary font-bold">
            <span className="material-icons">chevron_left</span>
            Voltar
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-white border border-white/5">
              <span className="material-icons text-sm">edit</span>
            </button>
            <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-red-500 border border-white/5">
              <span className="material-icons text-sm">delete</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-0 space-y-6 pb-32">
        <div className="relative h-64 bg-zinc-900 flex items-center justify-center border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
          <span className="material-icons text-9xl text-zinc-800">local_shipping</span>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="inline-block px-3 py-1 bg-primary rounded-lg text-xs font-black uppercase text-white mb-2 shadow-lg shadow-primary/20">{viatura.tipo}</span>
                <h1 className="text-4xl font-black text-white tracking-tight mb-1">{viatura.prefixo}</h1>
                <p className="text-sm font-bold text-zinc-400 uppercase">{viatura.modelo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 grid grid-cols-2 gap-4 -mt-10 relative z-10">
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-3xl shadow-xl">
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-1">Odômetro</p>
            <p className="text-2xl font-black text-white">{viatura.odometro.toLocaleString()} <span className="text-xs text-zinc-500">km</span></p>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-3xl shadow-xl">
            <p className="text-[10px] font-black text-zinc-500 uppercase mb-1">Combustível</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-black text-white">{viatura.combustivel}%</p>
              <div className="w-full h-2 bg-zinc-800 rounded-full mb-2 overflow-hidden">
                <div className={`h-full rounded-full ${viatura.combustivel < 25 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${viatura.combustivel}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-2">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest px-2">Status Operacional</h3>
          <div className="bg-zinc-900 border border-white/5 p-2 rounded-3xl flex gap-1">
            {(['Operacional', 'Empenhada', 'Manutenção'] as const).map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase transition-all ${viatura.status === status
                    ? status === 'Operacional' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                      : status === 'Empenhada' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20'
                        : 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                    : 'bg-transparent text-zinc-500 hover:bg-zinc-800'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('HISTORICO_ABASTECIMENTO', viatura.id)}
            className="bg-zinc-800 border border-white/5 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-xs active:scale-[0.98] transition-transform"
          >
            <span className="material-icons">local_gas_station</span>
            Abastecer
          </button>
          <button className="bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-xs shadow-xl active:scale-[0.98] transition-transform">
            <span className="material-icons">assignment</span>
            Despachar
          </button>
        </div>
        <div className="mt-6 w-32 h-1 bg-white/10 mx-auto rounded-full"></div>
      </footer>
    </Layout>
  );
};

export default DetalheViaturaView;
