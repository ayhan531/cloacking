'use client';

import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
    user: any;
    isAdmin: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    loading: true,
    login: async () => { },
    logout: async () => { },
});

function AuthWrapper({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    const login = async (email: string, password: string) => {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(result.error);
        }
    };

    const logout = async () => {
        await signOut({ redirect: true, callbackUrl: '/admin/login' });
    };

    const value = {
        user: session?.user || null,
        isAdmin: (session?.user as any)?.role === 'admin' || false,
        loading: status === 'loading',
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthWrapper>{children}</AuthWrapper>
        </SessionProvider>
    );
}

export const useAuth = () => useContext(AuthContext);
