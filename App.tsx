
import React from 'react';
import { useAuth, AuthProvider } from './hooks/useAuth';
import JournalDashboard from './components/JournalDashboard';
import Login from './components/Login';
import { JournalProvider } from './hooks/useJournal';

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-500">
            {currentUser ? (
                <JournalProvider>
                    <JournalDashboard />
                </JournalProvider>
            ) : (
                <Login />
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
