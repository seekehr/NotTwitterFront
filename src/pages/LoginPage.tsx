import React, {useEffect, useState} from 'react';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import {Link, redirect, useNavigate} from 'react-router-dom';
import {DOMAIN, getCookie} from "@/lib/utils.ts";
import ErrorPage from "@/pages/ErrorPage.tsx";

export default function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (getCookie("token")) {
            navigate("/");
        }
    }, []);

    const [fatalError, setFatalError] = useState<string | undefined>(undefined);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifyName(formData.username)) {
            setError("Username must be between 8 and 30 characters, contain only lowercase letters, numbers, and underscores, and cannot contain spaces.");
        } else if (!verifyPassword(formData.password)) {
            setError('Password must contain letters, numbers, and special characters, and must be below 30 characters and more than 8.');
        } else {
            login(formData.username, formData.password)
                .then(() => {
                    if (document.cookie.includes("token")) {
                        navigate("/");
                    } else {
                        setError("Invalid login details! Click forget password to reset your password (WIP) or create a new account.");
                    }
                }).catch((error) => {
                    setFatalError(error.message);
                });
        }
    };

    return (
        <>
            {typeof fatalError === 'string' ? (
                <ErrorPage error={fatalError} link="/register" /> // Conditionally render ErrorPage if error occurs
            ) : (
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
                            <h1 className="text-2xl font-mono font-bold text-blue-900">Login</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block font-mono text-blue-900 mb-2" htmlFor="email">
                            Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
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
                        LOGIN
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <a
                            href="/login"
                            className="retro-font text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                    Click here to forget password!
                        </a>
                    </div>
                    <div className="text-center mt-6">
                        <a
                            href="/register"
                            className="retro-font text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                    Register instead?
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

function verifyName(username: string): boolean {
    if (username.length < 8 || username.length > 30) {
        return false;
    }

    if (/\s/.test(username)) {
        return false;
    }

    if (username === 'Loading...' || username === 'trending') {
        return false;
    }

    return /^(?!.*[A-Z])(?!.* {2})[a-z0-9_]+$/.test(username);
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

async function login(username: string, password: string) : Promise<string|undefined> {
    const response = await fetch(DOMAIN + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'username': username,
            'password': password
        },
    });

    const data = await response.json();
    if (typeof data !== 'object') {
        throw new Error("Data not parsed correctly");
    }

    if (response.ok) {
        if ('token' in data) {
            document.cookie = "token=" + data.token + ";" + "path=/; max-age=1209600" // 2 weeks
            return;
        }
    }

    throw new Error("Error?!?!");
}