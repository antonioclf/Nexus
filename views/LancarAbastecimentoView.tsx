
import React, { useState, useEffect } from 'react';
import { ViewType, Viatura, Abastecimento } from '../types';
import Layout from '../components/Layout';

interface LancarAbastecimentoViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  viatura: Viatura;
  onSave: (a: Omit<Abastecimento, 'id'>) => void;
}

const LancarAbastecimentoView: React.FC<LancarAbastecimentoViewProps> = ({ onNavigate, viatura, onSave }) => {
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [motorista, setMotorista] = useState('Sgt. Rodrigues');
  const [odometro, setOdometro] = useState<string>(viatura.odometro.toString());
  const [notaFiscal, setNotaFiscal] = useState('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [precoPorLitro, setPrecoPorLitro] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const q = parseFloat(quantidade) || 0;
    const p = parseFloat(precoPorLitro) || 0;
    setTotal(q * p);
  }, [quantidade, precoPorLitro]);

  const handleSave = () => {
    if (data && motorista && odometro && quantidade && precoPorLitro) {
      onSave({
        data: data.split('-').reverse().join('/'),
        horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        viaturaId: viatura.id,
        motorista,
        odometro: parseInt(odometro),
        notaFiscal,
        quantidade: parseFloat(quantidade),
        precoPorLitro: parseFloat(precoPorLitro),
        total
      });
    }
  };

  return (
    <Layout withBottomNav={false}>
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <button onClick={() => onNavigate('HISTORICO_ABASTECIMENTO', viatura.id)} className="flex items-center text-primary font-bold">
          <span className="material-icons">chevron_left</span>
          Voltar
        </button>
        <h1 className="text-lg font-bold">Lançar Registro</h1>
        <div className="w-16"></div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-8 pb-32">
        <div className="flex items-center gap-4 bg-primary/10 p-5 rounded-3xl border border-primary/20">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
            <span className="material-icons text-white">local_fire_department</span>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-primary/80 tracking-widest mb-0.5">2º Pelotão - Guaxupé</p>
            <p className="text-base font-black uppercase">Viatura: {viatura.prefixo}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Informações Gerais</h2>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1">Data do Abastecimento</label>
                <div className="relative">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">calendar_today</span>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-white/10 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all font-bold"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 ml-1">Motorista Responsável</label>
                <div className="relative">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">person</span>
                  <select
                    value={motorista}
                    onChange={(e) => setMotorista(e.target.value)}
                    className="w-full pl-12 pr-10 py-4 bg-zinc-900 border border-white/10 rounded-2xl appearance-none focus:ring-1 focus:ring-primary outline-none transition-all font-bold"
                  >
                    <option>Sgt. Rodrigues</option>
                    <option>Cb. Oliveira</option>
                    <option>Sd. Santos</option>
                    <option>Ten. Almeida</option>
                  </select>
                  <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Dados de Consumo</h2>
            <div className="bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden divide-y divide-white/5">
              <div className="p-5">
                <label className="block text-[10px] font-black text-zinc-600 mb-1 uppercase">Odômetro Atual (km)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={odometro}
                    onChange={(e) => setOdometro(e.target.value)}
                    placeholder="000.000"
                    className="w-full text-2xl font-black bg-transparent border-none p-0 focus:ring-0 placeholder:text-zinc-800"
                  />
                  <span className="text-zinc-600 font-black">KM</span>
                </div>
              </div>
              <div className="p-5">
                <label className="block text-[10px] font-black text-zinc-600 mb-1 uppercase">Nota Fiscal (Número)</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={notaFiscal}
                    onChange={(e) => setNotaFiscal(e.target.value)}
                    placeholder="Ex: 88231"
                    className="w-full text-2xl font-black bg-transparent border-none p-0 focus:ring-0 placeholder:text-zinc-800"
                  />
                  <span className="material-icons text-zinc-700">receipt_long</span>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/5">
                <div className="p-5">
                  <label className="block text-[10px] font-black text-zinc-600 mb-1 uppercase">Quantidade (L)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="0,00"
                    className="w-full text-xl font-black bg-transparent border-none p-0 focus:ring-0 placeholder:text-zinc-800"
                  />
                </div>
                <div className="p-5">
                  <label className="block text-[10px] font-black text-zinc-600 mb-1 uppercase">Preço / Litro</label>
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-700 font-black">R$</span>
                    <input
                      type="number"
                      step="0.001"
                      value={precoPorLitro}
                      onChange={(e) => setPrecoPorLitro(e.target.value)}
                      placeholder="0,000"
                      className="w-full text-xl font-black bg-transparent border-none p-0 focus:ring-0 placeholder:text-zinc-800"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-primary/5">
                <label className="block text-[10px] font-black text-primary mb-1 uppercase tracking-tighter">Valor Total Pago</label>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-black text-2xl">R$</span>
                  <div className="text-4xl font-black text-primary">
                    {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="p-5 bg-zinc-900 border border-dashed border-white/10 rounded-2xl flex items-center justify-between group active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-4">
              <span className="material-icons text-zinc-600">photo_camera</span>
              <span className="text-xs font-bold text-zinc-500 uppercase">Anexar foto do cupom</span>
            </div>
            <button className="text-primary text-xs font-black uppercase">Adicionar</button>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <button
          onClick={handleSave}
          className="w-full bg-primary active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center gap-2 transition-transform"
        >
          <span className="material-icons">save</span>
          <span>SALVAR ABASTECIMENTO</span>
        </button>
        <div className="mt-4 w-32 h-1 bg-white/10 mx-auto rounded-full"></div>
      </footer>
    </Layout>
  );
};

export default LancarAbastecimentoView;
