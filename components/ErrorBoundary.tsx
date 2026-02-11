
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                        <span className="material-icons text-red-500 text-4xl">error_outline</span>
                    </div>
                    <h1 className="text-2xl font-black text-white mb-2 uppercase">Ops! Algo deu errado</h1>
                    <p className="text-zinc-400 mb-8 max-w-sm text-sm">
                        Ocorreu um erro inesperado. Tente recarregar a página ou contate o suporte.
                    </p>
                    {this.state.error && (
                        <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl mb-8 max-w-md w-full overflow-hidden text-left">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Detalhes do erro:</p>
                            <code className="text-xs text-red-400 font-mono block break-all">
                                {this.state.error.message}
                            </code>
                        </div>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-colors uppercase text-xs"
                    >
                        Recarregar Aplicação
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
