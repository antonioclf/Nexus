import React, { createContext, useContext, useState } from 'react';

// Simplified type to avoid dependency issues if types change
interface AuthContextType {
    session: any;
    user: any;
    loading: boolean;
    signIn: (matricula: string, senha: string) => Promise<{ error: any }>;
    signOut: () => Promise<{ error: any }>;
}

const MOCK_USER = {
    id: 'free-access-user',
    email: 'acesso@nexus.com',
    user_metadata: { full_name: 'Acesso Livre' },
    role: 'authenticated'
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: MOCK_USER,
    loading: false,
    signIn: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user] = useState<any>(MOCK_USER);
    const [loading] = useState(false);

    const signIn = async (matricula: string, senha: string) => {
        console.log('SignIn bypass active:', { matricula, senha });
        return { error: null };
    };

    const signOut = async () => {
        console.log('SignOut bypass active');
        return { error: null };
    };

    return (
        <AuthContext.Provider value={{ session: { user: MOCK_USER }, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
