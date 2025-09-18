
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    setApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | null>(null);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apiKey, setApiKeyState] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedKey = localStorage.getItem('geminiApiKey');
            if (storedKey) {
                setApiKeyState(storedKey);
            }
        } catch (error) {
            console.error("Failed to get API key from localStorage", error);
        }
    }, []);

    const setApiKey = useCallback((key: string) => {
        try {
            localStorage.setItem('geminiApiKey', key);
            setApiKeyState(key);
        } catch (error) {
            console.error("Failed to save API key to localStorage", error);
        }
    }, []);

    return React.createElement(ApiKeyContext.Provider, { value: { apiKey, setApiKey } }, children);
};

export const useApiKey = () => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error('useApiKey must be used within an ApiKeyProvider');
    }
    return context;
};
