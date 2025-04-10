import React, {useEffect, useState} from 'react';
import {ArrowLeft, CheckCircle2, XCircle} from 'lucide-react';
import {Link, redirect} from 'react-router-dom';
import {DOMAIN} from "../lib/utils.ts";
import { useNavigate } from 'react-router-dom';
import HomePage from "@/pages/HomePage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import ErrorProp from "@/lib/types/ErrorProp.ts";

type FormErrorState = 'success' | 'error' | 'not_typed';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        email: '',
        password: ''
    });

    const [dNameError, setDNameError] = useState<FormErrorState>('not_typed');
    const [userError, setUserError] = useState<FormErrorState>('not_typed'); // This would normally come from an API check
    const [passwordError, setPasswordError] = useState<FormErrorState>('not_typed');

    const [fatalError, setFatalError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Check username availability when username changes
    useEffect(() => {
        // Only check if username has some content
        if (formData.username.length === 0) {
            setUserError('not_typed');
            return;
        }

        // Debounce the API call
        const timeoutId = setTimeout(async () => {
            if (formData.username.length > 0) {
                try {
                    const response = await fetch(DOMAIN + `/check-username?username=${formData.username}`);

                    if (response.ok && verifyName(formData.username)) {
                        setUserError('success');
                    } else {
                        if (response.status === 400) {
                            setError("Error while checking username! Try again later.");
                            setUserError('not_typed');
                        } else {
                            setUserError('error');
                        }
                    }
                } catch (err) {
                    setError("Got an error while checking username! Try again later.");
                    setUserError('not_typed'); // Reset on error
                }
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [formData.username]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        if (formData.displayName.length < 5 || formData.displayName.length > 50 || !verifyDisplayName(formData.displayName)) {
            setDNameError("error")
        } else {
            setDNameError("success");
        }

        if (formData.username.length < 7 || formData.username.length > 30 || !verifyName(formData.username)) {
            setUserError("error");
        }

        if (formData.password.length < 7 || formData.password.length > 30 || !verifyPassword(formData.password)) {
            setPasswordError('error');
        } else {
            setPasswordError('success');
        }
    };

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.displayName.length < 6 || formData.displayName.length > 50 || !verifyDisplayName(formData.displayName)) {
            setError('Display name can only contain letters, numbers, and underscores, and must be below 50 characters.');
        } else if (formData.username.length < 8 || formData.username.length > 30 || !verifyName(formData.username)) {
            setError('User name can only contain letters, numbers, and underscores, and must be below 30 characters.');
        } else if (formData.password.length < 8 || formData.password.length > 30 || !verifyPassword(formData.password)) {
            setError('Password must contain letters, numbers, and special characters, and must be below 30 characters and more than 8.');
        } else {
            if (userError === "success") {
                register(formData.displayName, formData.username, formData.password)
                    .then(() => {
                        if (document.cookie.includes("token")) {
                            navigate("/");
                        } else {
                            setFatalError("Cookies could not be loaded.");
                        }
                    }).catch((error) => {
                    setFatalError(error.message);
                });
            } else {
                setError("Username must be unique.");
            }
        }
    };

    return (
        <>
            {typeof fatalError === 'string' ? (
                <ErrorPage error={fatalError} link="/register" /> // Conditionally render ErrorPage if error occurs
            ) : (
                <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-lg border-4 border-blue-700 p-8 shadow-[8px_8px_0px_0px_rgba(29,78,216)]">
                        {typeof (error) === 'string' ? (
                            <div className="retro-error">
                                <div className="flex items-center gap-3">
                                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0"/>
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
                                <ArrowLeft size={24}/>
                            </Link>
                            <h1 className="text-2xl font-mono font-bold text-blue-900">Register</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block font-mono text-blue-900 mb-2" htmlFor="displayName">
                                    Display Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                        required
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {dNameError === 'success' ? (
                                            <CheckCircle2 className="text-green-500" size={20}/>
                                        ) : dNameError === 'error' ? (
                                            <XCircle className="text-red-500" size={20}/>
                                        ) : null}
                                    </div>
                                </div>
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
                                        {userError === 'success' ? (
                                            <CheckCircle2 className="text-green-500" size={20}/>
                                        ) : userError === 'error' ? (
                                            <XCircle className="text-red-500" size={20}/>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block font-mono text-blue-900 mb-2" htmlFor="email">
                                    Email
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
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 font-mono border-2 border-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                                        required
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {passwordError === 'success' ? (
                                            <CheckCircle2 className="text-green-500" size={20}/>
                                        ) : passwordError === 'error' ? (
                                            <XCircle className="text-red-500" size={20}/>
                                        ) : null}
                                    </div>
                                </div>
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
                        <Link
                            to="/login"
                            className="retro-font text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Login instead?
                        </Link>
                    </div>
                </div>
            )}
        </>
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
    if (username.length < 8 || username.length > 30) {
        return false;
    }

    if (/\s/.test(username)) {
        return false;
    }

    return /^(?=.*[a-zA-Z])(?!.* {2})[a-zA-Z0-9_]+$/.test(username);
}

function verifyDisplayName(name: string): boolean {
    return /^(?=.*[a-zA-Z])(?!.* {2})[a-zA-Z0-9_ ]+$/.test(name);
}

async function register(displayName: string, username: string, password: string) : Promise<void> {
    const response = await fetch(DOMAIN + "/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'displayName': displayName,
            'username': username,
            'password': password
        },
    });
    const data = await response.json();
    if (typeof data !== 'object') {
        throw new Error("Data not parsed correctly");
    }

    if (!response.ok) {
        if ('error' in data) {
            throw new Error("(" + response.status + ") " + data.error);
        }
    } else {
        if ('token' in data) {
            document.cookie = "token=" + data.token.substring(10) + ";";
            return;
        }
    }

    throw new Error("Error?!?!");
}