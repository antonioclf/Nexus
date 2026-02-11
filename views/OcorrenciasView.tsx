
import React, { useEffect, useState } from 'react';
import { ViewType, Ocorrencia } from '../types';
import { getOcorrencias } from '../services/ocorrenciaService';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

interface OcorrenciasViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const OcorrenciasView: React.FC<OcorrenciasViewProps> = ({ onNavigate }) => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      const data = await getOcorrencias();
      setOcorrencias(data);
      setLoading(false);
    };
    fetchOcorrencias();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'text-green-500';
      case 'Pendente': return 'text-yellow-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-500/10 border-green-500/20';
      case 'Pendente': return 'bg-yellow-500/10 border-yellow-500/20';
      default: return 'bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Ocorrências"
        subtitle="Registro e Controle"
        rightAction={
          <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white border border-white/5 active:scale-90 transition-transform">
            <span className="material-icons text-xl">search</span>
          </button>
        }
        bottomContent={
          <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1 rounded-2xl border border-white/5">
            <button className="py-2.5 rounded-xl bg-zinc-800 text-xs font-black uppercase text-white shadow-lg">Em Andamento</button>
            <button className="py-2.5 rounded-xl text-xs font-bold uppercase text-zinc-500 hover:bg-zinc-800/50 transition-colors">Histórico</button>
          </div>
        }
      />

      <main className="px-4 space-y-3 pb-32">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 text-xs font-bold uppercase animate-pulse">Carregando ocorrências...</div>
        ) : ocorrencias.length === 0 ? (
          <div className="text-center py-10 text-zinc-600 text-xs font-bold uppercase">Nenhuma ocorrência encontrada</div>
        ) : (
          ocorrencias.map(ocorrencia => (
            <div key={ocorrencia.id} className="bg-zinc-900 border border-white/5 p-5 rounded-3xl active:scale-[0.99] transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-zinc-950 p-3 rounded-2xl border border-white/5">
                  <span className="material-icons text-primary">emergency</span>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${getStatusBg(ocorrencia.siadStatus)} ${getStatusColor(ocorrencia.siadStatus)}`}>
                  {ocorrencia.siadStatus}
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-1">{ocorrencia.natureza}</h3>
              <p className="text-xs font-bold text-zinc-500 mb-4 flex items-center gap-1">
                <span className="material-icons text-[14px]">place</span>
                {ocorrencia.local}
              </p>

              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-0.5">REDS</p>
                  <p className="text-xs font-bold text-zinc-300">{ocorrencia.redsId}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-0.5">Data</p>
                  <p className="text-xs font-bold text-zinc-300">{ocorrencia.data}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-0.5">Horário</p>
                  <p className="text-xs font-bold text-zinc-300">{ocorrencia.horarioInicio} - {ocorrencia.horarioFim}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-0.5">Guarnição</p>
                  <p className="text-xs font-bold text-zinc-300">{ocorrencia.comandante}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </Layout>
  );
};

export default OcorrenciasView;
