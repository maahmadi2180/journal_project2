
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { TrendingUpIcon } from './icons';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    const handleLogin = () => {
        if (username.trim()) {
            login(username.trim());
        } else {
            setError('نام کاربری نمی‌تواند خالی باشد.');
        }
    };
    
    const handleRegister = () => {
        if (username.trim()) {
           if(register(username.trim())) {
             // Registration in this demo just logs the user in.
           }
        } else {
            setError('نام کاربری نمی‌تواند خالی باشد.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <TrendingUpIcon className="w-16 h-16 text-emerald-400"/>
                    </div>
                    <h1 className="text-3xl font-bold text-white">ژورنال معاملاتی هوشمند</h1>
                    <p className="mt-2 text-gray-400">به پورتال شخصی خود وارد شوید یا ثبت‌نام کنید</p>
                    <p className="mt-2 text-xs text-amber-400">توجه: اطلاعات شما در حافظه مرورگر ذخیره می‌شود.</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                            نام کاربری
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            placeholder="نام کاربری خود را وارد کنید"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleLogin}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 transition duration-300"
                        >
                            ورود
                        </button>
                        <button
                            onClick={handleRegister}
                            className="w-full flex justify-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition duration-300"
                        >
                            ثبت نام
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
