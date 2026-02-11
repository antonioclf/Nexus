
import React, { useState } from 'react';
import { ViewType, ViaturaTipo } from '../types';
import Layout from '../components/Layout';

interface NovaViaturaViewProps {
  onNavigate: (view: ViewType) => void;
  onSave: (v: { prefixo: string; tipo: ViaturaTipo; placa: string }) => void;
}

const NovaViaturaView: React.FC<NovaViaturaViewProps> = ({ onNavigate, onSave }) => {
  const [prefixo, setPrefixo] = useState('');
  const [tipo, setTipo] = useState<ViaturaTipo | ''>('');
  const [placa, setPlaca] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prefixo && tipo && placa) {
      onSave({ prefixo, tipo, placa });
    }
  };

  return (
    <Layout withBottomNav={false}>
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate('VIATURAS')}
          className="flex items-center text-primary font-bold active:opacity-50"
        >
          <span className="material-icons">chevron_left</span>
          <span>Voltar</span>
        </button>
        <h1 className="text-lg font-bold absolute left-1/2 -translate-x-1/2 uppercase tracking-tight">Nova Viatura</h1>
        <div className="w-16"></div>
      </header>

      <main className="flex-1 px-6 pt-10 pb-32">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 mb-4">
            <span className="material-icons text-primary text-3xl">minor_crash</span>
          </div>
          <h2 className="text-2xl font-black tracking-tighter">Cadastrar Viatura</h2>
          <p className="text-zinc-500 mt-2 text-[10px] uppercase tracking-widest font-black">Pelotão Guaxupé - CBMMG</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Prefixo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-600">
                <span className="material-icons text-xl">tag</span>
              </span>
              <input
                value={prefixo}
                onChange={(e) => setPrefixo(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base font-bold placeholder:text-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                placeholder="Ex: UR-1234"
                type="text"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Tipo de Viatura</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-600">
                <span className="material-icons text-xl">category</span>
              </span>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as ViaturaTipo)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-base font-bold appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              >
                <option disabled value="">Selecione o tipo...</option>
                {Object.values(ViaturaTipo).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-600">
                <span className="material-icons">expand_more</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Placa</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-600">
                <span className="material-icons text-xl">directions_car</span>
              </span>
              <input
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base font-bold placeholder:text-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none uppercase"
                placeholder="ABC1D23"
                type="text"
              />
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3 mt-4">
            <span className="material-icons text-primary text-xl">info</span>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium uppercase">
              Certifique-se de que os dados conferem com o CRLV da viatura antes de salvar. O prefixo deve seguir o padrão oficial do CBMMG.
            </p>
          </div>
        </form>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <button
          onClick={handleSubmit}
          className="w-full bg-primary active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/40 transition-all flex items-center justify-center gap-2 group"
        >
          <span>SALVAR VIATURA</span>
          <span className="material-icons text-xl">check_circle</span>
        </button>
        <div className="h-6"></div>
      </footer>
    </Layout>
  );
};

export default NovaViaturaView;
