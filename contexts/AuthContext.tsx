
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signIn: (matricula: string, senha: string) => Promise<{ error: any }>;
    signOut: () => Promise<{ error: any }>;
}

// Mock user for free access
const MOCK_USER: User = {
    id: 'free-access-user',
    email: 'acesso@nexus.com',
    app_metadata: {},
    user_metadata: { full_name: 'Acesso Livre' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
} as User;

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: MOCK_USER,
    loading: false,
    signIn: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Start with the mock user immediately
    const [user] = useState<User | null>(MOCK_USER);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // No longer needed to check Supabase session
        setLoading(false);
    }, []);

    const signIn = async () => {
        // No-op for free access
        return { error: null };
    };

    const signOut = async () => {
        // No-op for free access
        return { error: null };
    };

    return (
        <AuthContext.Provider value={{ session: null, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
