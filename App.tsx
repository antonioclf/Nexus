
import React, { useState, useEffect, useMemo } from 'react';
import { ViewType, Viatura, Ocorrencia, Abastecimento, ViaturaTipo } from './types';
import { INITIAL_VIATURAS, INITIAL_OCORRENCIAS, INITIAL_ABASTECIMENTOS } from './constants';
import HomeView from './views/HomeView';
import OcorrenciasView from './views/OcorrenciasView';
import ViaturasView from './views/ViaturasView';
import NovaViaturaView from './views/NovaViaturaView';
import DetalheViaturaView from './views/DetalheViaturaView';
import HistoricoAbastecimentoView from './views/HistoricoAbastecimentoView';
import LancarAbastecimentoView from './views/LancarAbastecimentoView';
import EstatisticasView from './views/EstatisticasView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const [viaturas, setViaturas] = useState<Viatura[]>(INITIAL_VIATURAS);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(INITIAL_OCORRENCIAS);
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>(INITIAL_ABASTECIMENTOS);
  const [selectedViaturaId, setSelectedViaturaId] = useState<string | null>(null);

  // Sync state with local storage or simply keep in memory for this demo
  
  const selectedViatura = useMemo(() => 
    viaturas.find(v => v.id === selectedViaturaId), 
    [viaturas, selectedViaturaId]
  );

  const navigateTo = (view: ViewType, id?: string) => {
    if (id) setSelectedViaturaId(id);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const addViatura = (v: Omit<Viatura, 'id' | 'odometro' | 'combustivel' | 'status' | 'modelo'>) => {
    const newV: Viatura = {
      ...v,
      id: Math.random().toString(36).substr(2, 9),
      odometro: 0,
      combustivel: 100,
      status: 'Operacional',
      modelo: 'Não especificado'
    };
    setViaturas([...viaturas, newV]);
    setCurrentView('VIATURAS');
  };

  const addAbastecimento = (a: Omit<Abastecimento, 'id'>) => {
    const newA: Abastecimento = {
      ...a,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAbastecimentos([newA, ...abastecimentos]);
    
    // Update vehicle odometer
    setViaturas(prev => prev.map(v => v.id === a.viaturaId ? { ...v, odometro: a.odometro } : v));
    
    setCurrentView('HISTORICO_ABASTECIMENTO');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView onNavigate={navigateTo} />;
      case 'OCORRENCIAS':
        return <OcorrenciasView onNavigate={navigateTo} ocorrencias={ocorrencias} />;
      case 'VIATURAS':
        return <ViaturasView onNavigate={navigateTo} viaturas={viaturas} />;
      case 'NOVA_VIATURA':
        return <NovaViaturaView onNavigate={navigateTo} onSave={addViatura} />;
      case 'DETALHE_VIATURA':
        return selectedViatura ? <DetalheViaturaView onNavigate={navigateTo} viatura={selectedViatura} ocorrencias={ocorrencias} /> : <HomeView onNavigate={navigateTo} />;
      case 'HISTORICO_ABASTECIMENTO':
        return selectedViatura ? <HistoricoAbastecimentoView onNavigate={navigateTo} viatura={selectedViatura} abastecimentos={abastecimentos.filter(a => a.viaturaId === selectedViatura.id)} /> : <HomeView onNavigate={navigateTo} />;
      case 'NOVO_ABASTECIMENTO':
        return selectedViatura ? <LancarAbastecimentoView onNavigate={navigateTo} viatura={selectedViatura} onSave={addAbastecimento} /> : <HomeView onNavigate={navigateTo} />;
      case 'ESTATISTICAS':
        return <EstatisticasView onNavigate={navigateTo} ocorrencias={ocorrencias} viaturas={viaturas} />;
      default:
        return <HomeView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-background-dark overflow-hidden shadow-2xl">
      {renderView()}
      
      {['HOME', 'OCORRENCIAS', 'VIATURAS', 'ESTATISTICAS'].includes(currentView) && (
        <BottomNav currentView={currentView} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
