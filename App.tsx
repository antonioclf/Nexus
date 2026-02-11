
import React, { useState } from 'react';
import { ViewType } from './types';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import OcorrenciasView from './views/OcorrenciasView';
import ViaturasView from './views/ViaturasView';
import EstatisticasView from './views/EstatisticasView';
import DetalheViaturaView from './views/DetalheViaturaView';
import NovaViaturaView from './views/NovaViaturaView';
import HistoricoAbastecimentoView from './views/HistoricoAbastecimentoView';
import LancarAbastecimentoView from './views/LancarAbastecimentoView';
import LoginView from './views/LoginView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { INITIAL_VIATURAS, INITIAL_ABASTECIMENTOS } from './constants';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleNavigate = (view: ViewType, id?: string) => {
    setCurrentView(view);
    if (id) setSelectedId(id);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <span className="material-icons animate-spin text-primary text-4xl">refresh</span>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  const renderView = () => {
    // Fallback for props until views are refactored
    const viatura = INITIAL_VIATURAS.find(v => v.id === selectedId) || INITIAL_VIATURAS[0];

    switch (currentView) {
      case 'HOME':
        return <HomeView onNavigate={handleNavigate} />;
      case 'OCORRENCIAS':
        // Passing props for now, will remove later
        return <OcorrenciasView onNavigate={handleNavigate} />;
      case 'VIATURAS':
        return <ViaturasView onNavigate={handleNavigate} />;
      case 'ESTATISTICAS':
        return <EstatisticasView onNavigate={handleNavigate} />;
      case 'DETALHE_VIATURA':
        return <DetalheViaturaView onNavigate={handleNavigate} viaturaId={selectedId} />;
      case 'NOVA_VIATURA':
        return <NovaViaturaView onNavigate={handleNavigate} />;
      case 'HISTORICO_ABASTECIMENTO':
        return <HistoricoAbastecimentoView onNavigate={handleNavigate} viatura={viatura} abastecimentos={INITIAL_ABASTECIMENTOS.filter(a => a.viaturaId === viatura.id)} />;
      case 'NOVO_ABASTECIMENTO':
        return <LancarAbastecimentoView onNavigate={handleNavigate} viatura={viatura} onSave={() => handleNavigate('HISTORICO_ABASTECIMENTO', viatura.id)} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-background-dark overflow-hidden shadow-2xl">
      {renderView()}
      {(currentView === 'HOME' || currentView === 'OCORRENCIAS' || currentView === 'VIATURAS' || currentView === 'ESTATISTICAS' || currentView === 'PERFIL') && (
        <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
