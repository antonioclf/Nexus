
import React, { useEffect, useState } from 'react';
import { ViewType, Viatura } from '../types';
import { getViaturas } from '../services/viaturaService';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

interface ViaturasViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const ViaturasView: React.FC<ViaturasViewProps> = ({ onNavigate }) => {
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViaturas = async () => {
      const data = await getViaturas();
      setViaturas(data);
      setLoading(false);
    };
    fetchViaturas();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operacional': return 'text-green-500';
      case 'Empenhada': return 'text-yellow-500';
      case 'Manutenção': return 'text-red-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Operacional': return 'bg-green-500/10 border-green-500/20';
      case 'Empenhada': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'Manutenção': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Frota"
        subtitle="2º Pelotão"
        rightAction={
          <button
            onClick={() => onNavigate('NOVA_VIATURA')}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-transform"
          >
            <span className="material-icons text-white">add</span>
          </button>
        }
        bottomContent={
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button className="px-4 py-2 bg-white text-zinc-950 rounded-xl text-xs font-black uppercase whitespace-nowrap">Todas</button>
            <button className="px-4 py-2 bg-zinc-800 border border-white/5 text-zinc-400 rounded-xl text-xs font-bold uppercase whitespace-nowrap">Operacionais</button>
            <button className="px-4 py-2 bg-zinc-800 border border-white/5 text-zinc-400 rounded-xl text-xs font-bold uppercase whitespace-nowrap">Manutenção</button>
          </div>
        }
      />

      <main className="px-4 space-y-3 pb-32">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 text-xs font-bold uppercase animate-pulse">Carregando frota...</div>
        ) : viaturas.length === 0 ? (
          <div className="text-center py-10 text-zinc-600 text-xs font-bold uppercase">Nenhuma viatura encontrada</div>
        ) : (
          viaturas.map(viatura => (
            <div
              key={viatura.id}
              onClick={() => onNavigate('DETALHE_VIATURA', viatura.id)}
              className="bg-zinc-900 border border-white/5 p-4 rounded-3xl active:scale-[0.98] transition-transform relative overflow-hidden group"
            >
              <div className="flex items-start gap-4 z-10 relative">
                <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center border border-white/5 shrink-0">
                  <span className="material-icons text-3xl text-zinc-600">local_shipping</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black text-white">{viatura.prefixo}</h3>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${getStatusBg(viatura.status)} ${getStatusColor(viatura.status)}`}>
                      {viatura.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-zinc-500 mb-3">{viatura.modelo}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons text-sm text-zinc-600">speed</span>
                      <span className="text-[10px] font-bold text-zinc-400">{viatura.odometro.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons text-sm text-zinc-600">local_gas_station</span>
                      <span className="text-[10px] font-bold text-zinc-400">{viatura.combustivel}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </Layout>
  );
};

export default ViaturasView;
