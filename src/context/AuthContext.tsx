"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    role: string;
    avatar: string|null;
};

const AuthContext = createContext<{
    user: User | null;
    loading: boolean;
    setUser: (u: User | null) => void;
}>({
    user: null,
    loading: false,
    setUser: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: "Dev Admin",
        role: "admin",
        avatar: null,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);