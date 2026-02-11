
import React from 'react';
import { ViewType, Viatura, ViaturaTipo } from '../types';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

interface ViaturasViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  viaturas: Viatura[];
}

const ViaturasView: React.FC<ViaturasViewProps> = ({ onNavigate, viaturas }) => {
  const types = [
    { type: ViaturaTipo.ADMINISTRATIVA, icon: 'business', color: 'primary', count: viaturas.filter(v => v.tipo === ViaturaTipo.ADMINISTRATIVA).length },
    { type: ViaturaTipo.SALVAMENTO, icon: 'construction', color: 'accent-yellow', count: viaturas.filter(v => v.tipo === ViaturaTipo.SALVAMENTO).length },
    { type: ViaturaTipo.RESGATE, icon: 'medical_services', color: 'primary', count: viaturas.filter(v => v.tipo === ViaturaTipo.RESGATE).length },
    { type: ViaturaTipo.SOCORRO, icon: 'local_fire_department', color: 'primary', count: viaturas.filter(v => v.tipo === ViaturaTipo.SOCORRO).length },
  ];

  return (
    <Layout>
      <PageHeader
        title="Viaturas"
        subtitle="2º Pelotão - Guaxupé"
        action={
          <button
            onClick={() => onNavigate('NOVA_VIATURA')}
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <span className="material-icons text-3xl">add</span>
          </button>
        }
      >
        <div className="bg-zinc-900 rounded-2xl p-1 flex border border-white/5">
          {['Mês Atual', 'Semestre', 'Ano 2024'].map((t) => (
            <button key={t} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${t === 'Mês Atual' ? 'bg-primary shadow-lg shadow-primary/20' : 'text-zinc-500'}`}>
              {t}
            </button>
          ))}
        </div>
      </PageHeader>

      <main className="px-6">
        <div className="grid grid-cols-2 gap-4 mb-10">
          {types.map((t) => (
            <div key={t.type} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex flex-col gap-3">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center">
                <span className={`material-icons text-2xl text-${t.color}`}>{t.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{t.type}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{t.count} Unidades</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Últimas Movimentações</h2>
            <button className="text-[10px] font-bold text-primary uppercase">Ver Tudo</button>
          </div>

          <div className="space-y-3">
            {viaturas.map((v) => (
              <button
                key={v.id}
                onClick={() => onNavigate('DETALHE_VIATURA', v.id)}
                className="w-full bg-zinc-900/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between active:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden grayscale">
                      <span className="material-icons text-zinc-600 text-3xl">local_shipping</span>
                    </div>
                    <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${v.status === 'Operacional' ? 'bg-green-500' : v.status === 'Empenhada' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold uppercase">{v.prefixo}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-0.5">
                      {v.status === 'Empenhada' ? 'Saída para Ocorrência' : v.status === 'Manutenção' ? 'Em reparo técnico' : 'Disponível em QAP'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-500 mb-1">09:12</p>
                  <span className={`text-[9px] font-black px-2 py-1 rounded border ${v.status === 'Empenhada' ? 'text-primary border-primary/30' : 'text-green-500 border-green-500/30'}`}>
                    {v.status === 'Empenhada' ? 'URGENTE' : 'DISPONÍVEL'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ViaturasView;
