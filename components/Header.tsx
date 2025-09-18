
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOutIcon, TrendingUpIcon } from './icons';

const Header: React.FC = () => {
    const { currentUser, logout } = useAuth();

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <TrendingUpIcon className="w-8 h-8 text-emerald-400" />
                    <h1 className="text-xl font-bold text-white">ژورنال معاملاتی هوشمند</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-gray-300 hidden sm:block">
                        خوش آمدید، <span className="font-semibold text-emerald-400">{currentUser?.username}</span>
                    </span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 hover:bg-red-600/50 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="خروج"
                    >
                        <LogOutIcon className="w-5 h-5" />
                        <span className="hidden md:inline">خروج</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
