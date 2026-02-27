import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';

const Login: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    interface LocationState {
        from?: {
            pathname: string;
        };
    }

    // Get the previous page from location state, or default to /mylibrary
    const from = (location.state as LocationState)?.from?.pathname || '/mylibrary';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const endpoint = isRegister ? '/api/register' : '/api/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('admin_token', result.token);
                localStorage.setItem('user_name', result.user.username);
                localStorage.setItem('user_role', result.user.role);
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Authentication failed');
                setTimeout(() => setError(null), 3000);
            }
        } catch {
            setError('Connection failed. Are you running npm run dev?');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[var(--bg-primary)]">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-6 border border-blue-100 dark:border-blue-800">
                        {isRegister ? <UserPlus className="w-8 h-8 text-blue-600" /> : <Lock className="w-8 h-8 text-blue-600" />}
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-gray-100 mb-2 italic">
                        {isRegister ? 'Create Account' : 'Sign In'}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-widest px-4">
                        {isRegister ? 'Pick a username to join us' : 'Enter details to join the community'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl outline-none transition-all focus:border-blue-600 font-medium"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-12 pr-16 py-4 bg-white dark:bg-gray-900 border-2 rounded-2xl outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-gray-100 dark:border-gray-800 focus:border-blue-600'
                                }`}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {error && (
                        <p className="text-center text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">{error}</p>
                    )}
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline"
                    >
                        {isRegister ? 'Already have an account? Sign In' : 'New here? Create an account'}
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        <ShieldCheck className="w-3 h-3" />
                        SECURE COMMUNITY ACCESS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
