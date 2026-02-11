
import React from 'react';
import { ViewType } from '../types';
import Layout from '../components/Layout';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <Layout>
      {/* Header */}
      <header className="pt-12 pb-6 px-6 flex flex-col items-center">
        <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/5 rounded-full border-2 border-primary p-2 overflow-hidden">
          <img
            alt="CBMMG Brasão"
            className="w-full h-full object-contain brightness-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3UUWWM_5wxIfz1fHFdvd-jpoSBKhC9IfPq0sLDyDyuR-tI3YhyGkEKbx5l4yL2TXlwaorqRe0POwtQVRhVaeHsRPZV_cxyCn0XAncxLECORX0IQoENF-9chB58OUbKDmrmXiySV5Bg_u8ob_ITH7vCeGVBfl2b9OOzx30p3xGIo-GKaR4N1e5pTOBDHvdWnkv2jXzNqxQ_MYFYS3UnHPmTQwbqQRfha9GHSOwMRiE-5L6qA_iZ5_2D_oG9l9uQBWl1vTJkidNkhI"
          />
        </div>
        <div className="text-center">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Corpo de Bombeiros Militar</h1>
          <h2 className="text-xl font-bold text-white uppercase">Pelotão Guaxupé</h2>
          <div className="mt-2 inline-flex items-center bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-400 uppercase">Turno Ativo: Alfa</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="px-6 flex flex-col gap-4">
        {/* Ocorrências (Priority Action) */}
        <button
          onClick={() => onNavigate('OCORRENCIAS')}
          className="relative w-full h-40 bg-primary rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 flex flex-col items-center justify-center active:scale-[0.98] transition-transform group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-icons text-8xl">emergency</span>
          </div>
          <span className="material-icons text-5xl mb-2 text-white">campaign</span>
          <span className="text-2xl font-black tracking-tighter">OCORRÊNCIAS</span>
          <span className="text-xs font-medium text-white/70 uppercase">Gestão e Despacho</span>
        </button>

        <div className="grid grid-cols-2 gap-4">
          {/* Viaturas */}
          <button
            onClick={() => onNavigate('VIATURAS')}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl py-6 flex flex-col items-center justify-center active:scale-[0.95] transition-transform"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
              <span className="material-icons text-primary text-3xl">local_shipping</span>
            </div>
            <span className="text-lg font-bold">VIATURAS</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Prontidão</span>
          </button>

          {/* Estatísticas */}
          <button
            onClick={() => onNavigate('ESTATISTICAS')}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl py-6 flex flex-col items-center justify-center active:scale-[0.95] transition-transform"
          >
            <div className="w-12 h-12 bg-accent-yellow/20 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-accent-yellow text-3xl">leaderboard</span>
            </div>
            <span className="text-lg font-bold">ESTATÍSTICAS</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Relatórios</span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-zinc-900 border border-white/5 py-4 rounded-xl flex flex-col items-center gap-1 active:bg-zinc-800 transition-colors">
            <span className="material-icons text-zinc-400 text-xl">map</span>
            <span className="text-[10px] font-bold text-zinc-300">MAPA</span>
          </button>
          <button className="bg-zinc-900 border border-white/5 py-4 rounded-xl flex flex-col items-center gap-1 active:bg-zinc-800 transition-colors">
            <span className="material-icons text-zinc-400 text-xl">contact_phone</span>
            <span className="text-[10px] font-bold text-zinc-300">CONTATOS</span>
          </button>
          <button className="bg-zinc-900 border border-white/5 py-4 rounded-xl flex flex-col items-center gap-1 active:bg-zinc-800 transition-colors">
            <span className="material-icons text-zinc-400 text-xl">settings</span>
            <span className="text-[10px] font-bold text-zinc-300">SISTEMA</span>
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-auto px-6 pt-8">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <span className="material-icons text-primary">account_circle</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Sgt. Rodrigues</p>
              <p className="text-[9px] text-zinc-500 uppercase font-bold">Comandante de Guarnição</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-primary">v2.4.0-PRO</p>
            <p className="text-[9px] text-zinc-600 uppercase font-bold">Pel. Guaxupé</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default HomeView;
