
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginView: React.FC = () => {
    const { signIn } = useAuth();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await signIn(matricula, senha);

        if (error) {
            setError('Falha ao entrar. Verifique suas credenciais.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-primary/30 shadow-lg shadow-primary/20">
                        <span className="material-icons text-4xl text-primary">local_fire_department</span>
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-wide">Nexus CBMMG</h1>
                    <p className="text-zinc-500 text-sm font-medium">Sistema Integrado de Gestão</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Matrícula / Login</label>
                            <div className="relative group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">badge</span>
                                <input
                                    type="text"
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                    placeholder="Ex: 1822527"
                                    className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Senha</label>
                            <div className="relative group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors">lock</span>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                            <span className="material-icons text-red-500 text-sm">error</span>
                            <p className="text-red-400 text-xs font-bold">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-red-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="material-icons animate-spin">refresh</span>
                        ) : (
                            <>
                                <span className="uppercase tracking-wider">Entrar no Sistema</span>
                                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-zinc-600 font-medium">
                        Problemas com acesso? <button className="text-primary hover:underline">Contate o administrador</button>
                    </p>
                </div>
            </div>

            <div className="fixed bottom-4 text-center w-full pointer-events-none">
                <p className="text-[10px] text-zinc-700 font-bold opacity-50">CBMMG • 2º Pelotão de Bombeiros Militar • Guaxupé-MG</p>
            </div>
        </div>
    );
};

export default LoginView;
