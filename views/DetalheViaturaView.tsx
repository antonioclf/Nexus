
import React from 'react';
import { ViewType, Viatura, Ocorrencia } from '../types';
import Layout from '../components/Layout';

interface DetalheViaturaViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  viatura: Viatura;
  ocorrencias: Ocorrencia[];
}

const DetalheViaturaView: React.FC<DetalheViaturaViewProps> = ({ onNavigate, viatura, ocorrencias }) => {
  return (
    <Layout withBottomNav={false}>
      <header className="px-6 pt-12 pb-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => onNavigate('VIATURAS')} className="text-primary flex items-center font-bold">
            <span className="material-icons">chevron_left</span>
            Voltar
          </button>
          <div className="flex gap-2">
            <button onClick={() => onNavigate('HISTORICO_ABASTECIMENTO')} className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-primary border border-white/5">
              <span className="material-icons text-xl">local_gas_station</span>
            </button>
            <button className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-primary border border-white/5">
              <span className="material-icons text-xl">notifications</span>
            </button>
          </div>
        </div>

        <div className="bg-primary rounded-3xl p-6 shadow-2xl shadow-primary/30 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-icons text-9xl">local_shipping</span>
          </div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Viatura Selecionada</p>
              <h1 className="text-4xl font-black text-white">{viatura.prefixo}</h1>
              <p className="text-xs font-bold text-white/80 mt-1">{viatura.modelo}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/30 text-center">
              <p className="text-[9px] font-black text-white uppercase mb-1">KM Atual</p>
              <p className="text-lg font-black text-white">{viatura.odometro.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-white uppercase">
              <span className="material-icons text-sm">check_circle</span>
              {viatura.status}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-white uppercase">
              <span className="material-icons text-sm">local_gas_station</span>
              {viatura.combustivel}% Combustível
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 pb-24">
        <h2 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-6">Histórico de Ocorrências</h2>

        <div className="space-y-4">
          {ocorrencias.map(oc => (
            <div key={oc.id} className="bg-zinc-900/60 border border-white/5 rounded-3xl p-5 relative">
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary font-bold text-sm">#{oc.redsId.split('-')[0]}-{oc.id}</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{oc.data}, {oc.horarioInicio}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[9px] uppercase font-bold text-zinc-500 mb-1">Natureza</p>
                  <p className="text-sm font-bold leading-tight uppercase">{oc.natureza}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-zinc-500 mb-1">Condutor</p>
                  <p className="text-sm font-bold">{oc.condutor}</p>
                </div>
              </div>

              <div className="bg-zinc-950/50 rounded-2xl p-4 mb-4 flex items-center justify-between border border-white/5">
                <div className="text-center">
                  <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Odom. Inicial</p>
                  <p className="text-xs font-bold">{oc.odometroInicial.toLocaleString()} km</p>
                </div>
                <span className="material-icons text-primary text-sm">arrow_forward</span>
                <div className="text-center">
                  <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Odom. Final</p>
                  <p className="text-xs font-bold">{oc.odometroFinal.toLocaleString()} km</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500">SIAD: {oc.siadStatus}</span>
                </div>
                <button className="text-[10px] font-bold text-primary uppercase flex items-center gap-1">
                  DETALHES <span className="material-icons text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent flex gap-3">
        <button
          onClick={() => onNavigate('NOVO_ABASTECIMENTO', viatura.id)}
          className="flex-[2] bg-primary active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-2"
        >
          <span className="material-icons">local_gas_station</span>
          <span>Abastecer</span>
        </button>
        <button className="flex-1 bg-zinc-900 border border-white/10 text-white font-black py-4 rounded-2xl flex items-center justify-center">
          <span className="material-icons">more_horiz</span>
        </button>
      </footer>
    </Layout>
  );
};

export default DetalheViaturaView;
