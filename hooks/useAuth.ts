
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
    currentUser: User | null;
    login: (username: string) => void;
    register: (username: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('currentUser');
        }
    }, []);

    const login = useCallback((username: string) => {
        const newUser = { username };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
    }, []);

    const register = useCallback((username: string) => {
        // In a real app, you'd check if the user exists.
        // For this demo, we just log them in.
        const newUser = { username };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        return true; // Simulate successful registration
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    }, []);

    // FIX: Replaced JSX with React.createElement because .ts files do not support JSX syntax.
    return React.createElement(AuthContext.Provider, { value: { currentUser, login, register, logout } }, children);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
