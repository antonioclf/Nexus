
import React from 'react';
import { ViewType, Viatura, Abastecimento } from '../types';
import Layout from '../components/Layout';

interface HistoricoAbastecimentoViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  viatura: Viatura;
  abastecimentos: Abastecimento[];
}

const HistoricoAbastecimentoView: React.FC<HistoricoAbastecimentoViewProps> = ({ onNavigate, viatura, abastecimentos }) => {
  const totalMensal = abastecimentos.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <Layout withBottomNav={false}>
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => onNavigate('DETALHE_VIATURA', viatura.id)} className="flex items-center text-primary font-bold">
            <span className="material-icons">chevron_left</span>
            Voltar
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold">Abastecimentos</h1>
            <span className="text-[10px] text-primary font-black tracking-widest uppercase">{viatura.prefixo}</span>
          </div>
          <button className="text-primary">
            <span className="material-icons">filter_list</span>
          </button>
        </div>
      </header>

      <main className="p-4 space-y-4 pb-32">
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] uppercase font-black text-zinc-500 mb-1">Última Odometria</p>
              <h2 className="text-3xl font-black">{viatura.odometro.toLocaleString()} <span className="text-sm font-bold text-zinc-600">km</span></h2>
            </div>
            <div className="bg-primary/10 p-3 rounded-2xl text-primary border border-primary/20">
              <span className="material-icons text-2xl">ev_station</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Gasto Mensal</p>
              <p className="font-bold text-lg text-primary">R$ {totalMensal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Média Consumo</p>
              <p className="font-bold text-lg">8,4 <span className="text-[10px] text-zinc-600">km/L</span></p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Histórico Recente</h3>
          <span className="text-[9px] bg-zinc-800 px-2 py-1 rounded-md text-zinc-400 font-bold">{abastecimentos.length} Registros</span>
        </div>

        <div className="space-y-3">
          {abastecimentos.map(a => (
            <div key={a.id} className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden group">
              <div className="flex justify-between items-center p-4 bg-zinc-800/30 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-primary text-sm">calendar_today</span>
                  <span className="text-[10px] font-black uppercase tracking-tight">{a.data} • {a.horario}</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded-lg border border-white/5">NF: #{a.notaFiscal}</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Total</p>
                    <p className="text-sm font-black text-primary">R$ {a.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Quantidade</p>
                    <p className="text-sm font-black">{a.quantidade} L</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-zinc-500 uppercase font-black mb-1">Preço/L</p>
                    <p className="text-sm font-bold text-zinc-500">R$ {a.precoPorLitro.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-[14px] text-zinc-600">speed</span>
                    <span className="text-[10px] font-bold text-zinc-400">{a.odometro.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons text-[14px] text-zinc-600">person</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{a.motorista}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <button
        onClick={() => onNavigate('NOVO_ABASTECIMENTO', viatura.id)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform"
      >
        <span className="material-icons text-3xl">add</span>
      </button>
    </Layout>
  );
};

export default HistoricoAbastecimentoView;
