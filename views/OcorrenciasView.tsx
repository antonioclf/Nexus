
import React, { useState } from 'react';
import { ViewType, Ocorrencia, OcorrenciaStatus } from '../types';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

interface OcorrenciasViewProps {
  onNavigate: (view: ViewType) => void;
  ocorrencias: Ocorrencia[];
}

const OcorrenciasView: React.FC<OcorrenciasViewProps> = ({ onNavigate, ocorrencias }) => {
  const [filter, setFilter] = useState('Todos');

  return (
    <Layout>
      <PageHeader
        title="Ocorrências"
        action={
          <button className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform">
            <span className="material-icons">search</span>
          </button>
        }
      >
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Ano 2024', 'Este Mês', 'Salvamento', 'Incêndio'].map((tag) => (
            <button
              key={tag}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${tag === 'Ano 2024' ? 'bg-primary text-white' : 'bg-zinc-900 text-zinc-400 border border-white/5'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </PageHeader>

      <main className="px-6 space-y-4">
        {ocorrencias.map((oc, index) => (
          <div key={oc.id} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1 bg-primary h-full opacity-50"></div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight uppercase">{oc.natureza}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
                    <span className="material-icons text-[12px]">calendar_today</span>
                    {oc.data}
                  </div>
                </div>
              </div>
              <div className="bg-zinc-800 px-2 py-1 rounded text-[9px] font-mono text-zinc-400 border border-white/5">
                REDS: {oc.redsId}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-[9px] uppercase font-bold text-zinc-500 mb-1">Horário</p>
                <div className="flex items-center gap-2 font-mono text-sm">
                  {oc.horarioInicio} <span className="text-primary text-[10px]">→</span> {oc.horarioFim}
                </div>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-zinc-500 mb-1">Comandante de Guarnição</p>
                <p className="text-sm font-bold">{oc.comandante}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4 bg-zinc-950/50 p-3 rounded-xl border border-white/5">
              <span className="material-icons text-primary text-sm">location_on</span>
              <span className="truncate">{oc.local}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${oc.siadStatus === OcorrenciaStatus.CONCLUIDO ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className="text-[10px] uppercase font-bold text-zinc-500">SIAD: {oc.siadStatus}</span>
              </div>
              <button className="text-[10px] font-bold text-primary uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Detalhes <span className="material-icons text-[12px]">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform z-40">
        <span className="material-icons text-3xl">add</span>
      </button>
    </Layout>
  );
};

export default OcorrenciasView;
