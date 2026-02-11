
import React, { useState, useEffect } from 'react';
import { ViewType, Ocorrencia, Viatura } from '../types';
import { getAiInsights } from '../geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

interface EstatisticasViewProps {
  onNavigate: (view: ViewType) => void;
  ocorrencias: Ocorrencia[];
  viaturas: Viatura[];
}

const EstatisticasView: React.FC<EstatisticasViewProps> = ({ onNavigate, ocorrencias, viaturas }) => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    async function fetchInsights() {
      setLoadingAi(true);
      const res = await getAiInsights(ocorrencias, viaturas);
      setAiInsights(res || "Insights não disponíveis.");
      setLoadingAi(false);
    }
    fetchInsights();
  }, [ocorrencias, viaturas]);

  const naturezas = ocorrencias.reduce((acc: any, oc) => {
    const key = oc.natureza;
    if (!acc[key]) acc[key] = 0;
    acc[key]++;
    return acc;
  }, {});

  const data = Object.keys(naturezas).map(name => ({
    name: name.split(' ')[0],
    fullName: name,
    value: naturezas[name]
  }));

  const COLORS = ['#ee2b2b', '#FFD700', '#3B82F6', '#8B5CF6'];

  return (
    <Layout>
      <PageHeader
        title="Estatísticas"
        subtitle="CBMMG - Guaxupé"
        action={
          <button className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
            <span className="material-icons">notifications</span>
          </button>
        }
      >
        <div className="bg-zinc-900 rounded-2xl p-1 flex border border-white/5">
          {['2024', 'Trimestre', 'Mês'].map((t) => (
            <button key={t} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${t === '2024' ? 'bg-primary shadow-lg shadow-primary/20' : 'text-zinc-500'}`}>
              {t}
            </button>
          ))}
          <button className="px-4 text-zinc-500">
            <span className="material-icons text-xl">tune</span>
          </button>
        </div>
      </PageHeader>

      <main className="px-6 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-zinc-500 uppercase">Ocorrências</p>
              <span className="material-icons text-zinc-700">assignment</span>
            </div>
            <h3 className="text-3xl font-black">1.248</h3>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold">
              <span className="material-icons text-xs">trending_up</span>
              12% vs 2023
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-zinc-500 uppercase">Média Diária</p>
              <span className="material-symbols-outlined text-zinc-700">speed</span>
            </div>
            <h3 className="text-3xl font-black">4.2</h3>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold">
              <span className="material-icons text-xs">remove</span>
              Estável
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-icons text-6xl">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons text-primary text-sm">auto_awesome</span>
            <h2 className="text-xs font-black text-primary uppercase tracking-widest">Insights do Gemini (AI)</h2>
          </div>
          {loadingAi ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-full space-y-2">
                <div className="h-2 bg-primary/20 rounded w-full"></div>
                <div className="h-2 bg-primary/20 rounded w-3/4"></div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-bold text-zinc-300 leading-relaxed italic">
              "{aiInsights}"
            </p>
          )}
        </div>

        {/* Chart Card */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold">Distribuição por Natureza</h2>
              <p className="text-[10px] text-zinc-500 uppercase font-black">Classificação Operacional</p>
            </div>
            <span className="material-icons text-zinc-700">info</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={12}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resources Summary */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Recursos Ativos</h2>
          <div className="space-y-3">
            {viaturas.slice(0, 2).map(v => (
              <div key={v.id} className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${v.status === 'Operacional' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                    <span className="material-icons">{v.status === 'Operacional' ? 'check_circle' : 'medical_services'}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase">{v.prefixo}</h4>
                    <p className="text-[9px] text-zinc-500 font-black uppercase">Prontidão • Pelotão Guaxupé</p>
                  </div>
                </div>
                <div className={`text-[9px] font-black px-2 py-1 rounded-lg border ${v.status === 'Operacional' ? 'text-green-500 border-green-500/20' : 'text-primary border-primary/20'}`}>
                  {v.status === 'Operacional' ? 'LIVRE' : 'EMPENHADA'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-[8px] text-zinc-700 text-center font-black uppercase py-4">
          <span className="material-icons text-[10px] mr-1">sync</span>
          Atualizado em: {new Date().toLocaleString('pt-BR')}
        </p>
      </main>
    </Layout>
  );
};

export default EstatisticasView;
