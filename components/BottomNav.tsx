
import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'HOME' as ViewType, icon: 'home', label: 'Início' },
    { id: 'OCORRENCIAS' as ViewType, icon: 'emergency', label: 'Ocorrências' },
    { id: 'VIATURAS' as ViewType, icon: 'local_shipping', label: 'Viaturas' },
    { id: 'ESTATISTICAS' as ViewType, icon: 'bar_chart', label: 'Estatíst.' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex justify-between items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            currentView === item.id ? 'text-primary' : 'text-zinc-500'
          }`}
        >
          <span className={`material-icons text-2xl ${currentView === item.id ? 'scale-110' : ''}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            {item.label}
          </span>
        </button>
      ))}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full"></div>
    </nav>
  );
};

export default BottomNav;
