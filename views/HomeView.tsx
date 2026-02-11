
import React, { useEffect, useState } from 'react';
import { ViewType, Viatura } from '../types';
import { getViaturas } from '../services/viaturaService';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface HomeViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { signOut } = useAuth();
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getViaturas();
        setViaturas(data);
      } catch (error) {
        console.error("Failed to load viaturas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const viaturasOperacionais = viaturas.filter(v => v.status === 'Operacional');
  const viaturasEmpenhadas = viaturas.filter(v => v.status === 'Empenhada');
  const viaturasManutencao = viaturas.filter(v => v.status === 'Manutenção');

  return (
    <Layout>
      <header className="bg-gradient-to-b from-primary/20 to-transparent pt-8 pb-4 px-6 sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-icons text-white text-2xl">local_fire_department</span>
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight leading-none">Nexus</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">2º Pelotão • Guaxupé</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => signOut()} className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
              <span className="material-icons text-sm">logout</span>
            </button>
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-700">
              <span className="material-icons text-zinc-400">person</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-white/5 p-4 rounded-3xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors"></div>
          <p className="text-[10px] uppercase font-black text-zinc-500 mb-1 relative z-10">Resumo da Frota</p>
          <div className="flex justify-between items-end relative z-10">
            <div>
              <h2 className="text-3xl font-black text-white">{viaturas.length}</h2>
              <p className="text-xs font-bold text-zinc-400">Viaturas Totais</p>
            </div>
            <div className="flex gap-2">
              <div className="text-center px-3 py-2 bg-zinc-950/50 rounded-2xl border border-white/5">
                <span className="block text-lg font-black text-green-500">{viaturasOperacionais.length}</span>
                <span className="text-[8px] uppercase font-bold text-zinc-600">Disp.</span>
              </div>
              <div className="text-center px-3 py-2 bg-zinc-950/50 rounded-2xl border border-white/5">
                <span className="block text-lg font-black text-yellow-500">{viaturasEmpenhadas.length}</span>
                <span className="text-[8px] uppercase font-bold text-zinc-600">Emp.</span>
              </div>
              <div className="text-center px-3 py-2 bg-zinc-950/50 rounded-2xl border border-white/5">
                <span className="block text-lg font-black text-red-500">{viaturasManutencao.length}</span>
                <span className="text-[8px] uppercase font-bold text-zinc-600">Man.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 space-y-8 pb-32">
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Viaturas Disponíveis
            </h3>
            <button onClick={() => onNavigate('VIATURAS')} className="text-[10px] font-bold text-primary uppercase hover:underline">Ver todas</button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-10 text-zinc-500 text-xs font-bold uppercase animate-pulse">Carregando frota...</div>
            ) : viaturasOperacionais.length === 0 ? (
              <div className="text-center py-10 text-zinc-600 text-xs font-bold uppercase">Nenhuma viatura disponível</div>
            ) : (
              viaturasOperacionais.map(viatura => (
                <div
                  key={viatura.id}
                  onClick={() => onNavigate('DETALHE_VIATURA', viatura.id)}
                  className="bg-zinc-900 border border-white/5 p-4 rounded-3xl active:scale-[0.98] transition-transform relative overflow-hidden group"
                >
                  <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-icons text-5xl text-zinc-400">local_shipping</span>
                  </div>
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-800 text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-1">{viatura.tipo}</span>
                      <h4 className="text-lg font-black text-white">{viatura.prefixo}</h4>
                      <p className="text-xs font-bold text-zinc-500">{viatura.modelo}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>

                  <div className="flex gap-4 border-t border-white/5 pt-3 relative z-10">
                    <div>
                      <p className="text-[8px] font-black text-zinc-600 uppercase mb-0.5">Odômetro</p>
                      <p className="text-xs font-bold text-zinc-300">{viatura.odometro.toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-zinc-600 uppercase mb-0.5">Combustível</p>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${viatura.combustivel < 25 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${viatura.combustivel}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400">{viatura.combustivel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
              Acesso Rápido
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('NOVA_VIATURA')} className="bg-zinc-900 border border-white/5 p-4 rounded-3xl flex flex-col items-center justify-center gap-2 aspect-[4/3] active:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-icons text-zinc-400 group-hover:text-primary transition-colors">add_circle</span>
              </div>
              <span className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-white transition-colors">Nova Viatura</span>
            </button>
            <button onClick={() => onNavigate('OCORRENCIAS')} className="bg-zinc-900 border border-white/5 p-4 rounded-3xl flex flex-col items-center justify-center gap-2 aspect-[4/3] active:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="material-icons text-zinc-400 group-hover:text-primary transition-colors">list_alt</span>
              </div>
              <span className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-white transition-colors">Ocorrências</span>
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomeView;
