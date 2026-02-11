
import React, { useState } from 'react';
import { ViewType, ViaturaTipo } from '../types';
import { createViatura } from '../services/viaturaService';
import Layout from '../components/Layout';

interface NovaViaturaViewProps {
  onNavigate: (view: ViewType) => void;
  // Removed onSave prop
}

const NovaViaturaView: React.FC<NovaViaturaViewProps> = ({ onNavigate }) => {
  const [prefixo, setPrefixo] = useState('');
  const [tipo, setTipo] = useState<ViaturaTipo>(ViaturaTipo.ADMINISTRATIVA);
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState(''); // New field
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (prefixo && placa && modelo) {
      setLoading(true);
      await createViatura({
        prefixo,
        tipo,
        placa,
        odometro: 0,
        combustivel: 100,
        status: 'Operacional',
        modelo
      });
      setLoading(false);
      onNavigate('VIATURAS');
    }
  };

  return (
    <Layout withBottomNav={false}>
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <button onClick={() => onNavigate('VIATURAS')} className="text-primary font-bold flex items-center">
          <span className="material-icons">chevron_left</span>
          Cancelar
        </button>
        <h1 className="text-lg font-bold">Nova Viatura</h1>
        <div className="w-16"></div>
      </header>

      <main className="px-6 py-8 space-y-6">
        <div>
          <label className="block text-xs font-black uppercase text-zinc-500 mb-2 ml-2">Prefixo</label>
          <input
            value={prefixo}
            onChange={e => setPrefixo(e.target.value)}
            placeholder="Ex: USB-1234"
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-zinc-500 mb-2 ml-2">Modelo</label>
          <input
            value={modelo}
            onChange={e => setModelo(e.target.value)}
            placeholder="Ex: Fiat Ducato"
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-zinc-500 mb-2 ml-2">Placa</label>
          <input
            value={placa}
            onChange={e => setPlaca(e.target.value)}
            placeholder="Ex: BRA-2E19"
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-zinc-500 mb-2 ml-2">Tipo de Viatura</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(ViaturaTipo).map(t => (
              <button
                key={t}
                onClick={() => setTipo(t)}
                className={`p-4 rounded-2xl border text-left transition-all ${tipo === t
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800'
                  }`}
              >
                <span className="block text-[10px] font-black uppercase mb-1">Classe</span>
                <span className="block font-bold text-sm">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl shadow-white/10 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50"
        >
          {loading ? <span className="material-icons animate-spin">refresh</span> : 'Cadastrar Viatura'}
        </button>
        <div className="mt-6 w-32 h-1 bg-white/10 mx-auto rounded-full"></div>
      </footer>
    </Layout>
  );
};

export default NovaViaturaView;
