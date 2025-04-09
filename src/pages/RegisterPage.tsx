import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type UniqueUserState = 'unique' | 'not_unique' | 'not_typed';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        email: '',
        password: ''
    });

    const [uniqueUser, setUniqueUser] = useState<UniqueUserState>('not_typed'); // This would normally come from an API check
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValidUsername = /^(?=.*[a-zA-Z])(?!.* {2})[a-zA-Z0-9_ ]+$/.test(formData.displayName);
        if (formData.displayName.length > 50 || !isValidUsername) {
            // TODO: Add red box above containing this message
            setError('Display name can only contain letters, numbers, and underscores, and must be below 50 characters.');
            return;
        }
        if (formData.username.length > 30 || !verifyName(formData.username)) {
            // TODO: Make user handles unique
            setError('User name can only contain letters, numbers, and underscores, and must be below 30 characters.');
            return;
        }
        if (formData.password.length < 8 || formData.password.length > 30 || !verifyPassword(formData.password)) {
            setError('Password must contain letters, numbers, and special characters, and must be below 30 characters and more than 8.');
            return;
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg border-4 border-blue-700 p-8 shadow-[8px_8px_0px_0px_rgba(29,78,216)]">
                {typeof(error) === 'string' ? (
                    <div className="retro-error">
                        <div className="flex items-center gap-3">
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <h2 className="retro-error-title">Error</h2>
                        </div>
                        <p className="retro-error-message">
                            {error}
                        </p>
                    </div>
                ) : null}

                <div className="flex items-center mb-6">
                    <Link
                        to="/"
                        className="text-blue-700 hover:text-blue-600 transition-colors mr-4"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-mono font-bold text-blue-900">Register</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-mono text-blue-900 mb-2" htmlFor="displayName">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-blue-900 mb-2" htmlFor="username">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                required
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {uniqueUser === 'unique' ? (
                                    <CheckCircle2 className="text-green-500" size={20} />
                                ) : uniqueUser === 'not_unique' ? (
                                    <XCircle className="text-red-500" size={20} />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-mono text-blue-900 mb-2" htmlFor="email">
                            Gmail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            pattern=".*@gmail\.com"
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-blue-900 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-mono rounded
                     border-2 border-blue-700 shadow-[4px_4px_0px_0px_rgba(29,78,216)]
                     active:shadow-[0px_0px_0px_0px_rgba(29,78,216)]
                     active:translate-x-[4px] active:translate-y-[4px]
                     transition-all duration-100"
                    >
                        REGISTER
                    </button>
                </form>
            </div>


            <div className="text-center mt-6">
                <a
                    href="/login"
                    className="retro-font text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Login instead?
                </a>
            </div>
        </div>
    );
}

function verifyPassword(password: string): boolean {
    if (password.length < 8 || password.length > 30) {
        return false;
    }

    if (/\s/.test(password)) {
        return false;
    }

    if (!/[a-zA-Z]/.test(password)) {
        return false;
    }

    if (!/[0-9]/.test(password)) {
        return false;
    }

    return /[^a-zA-Z0-9_]/.test(password);
}

function verifyName(username: string): boolean {
    if (username.length === 0 || username.length > 30) {
        return false;
    }

    if (/\s/.test(username)) {
        return false;
    }

    return /^(?=.*[a-zA-Z])(?!.* {2})[a-zA-Z0-9_]+$/.test(username);
}