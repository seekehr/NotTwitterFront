import React, {useEffect} from 'react';
import { Bug } from 'lucide-react';
import ErrorProp from "@/lib/types/ErrorProp.ts";
import {useNavigate} from "react-router-dom";

interface ErrorPageProp {
    error: string
    link: string
}

function ErrorPage({ error, link }: ErrorPageProp) {
    const navigate = useNavigate();
    useEffect(() => {
        const handleClick = () => {
            navigate("/"); // Go back to the previous page
        };

        // Attach click listener to the whole document
        document.addEventListener("click", handleClick);

        // Cleanup
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-red-950 text-red-100 p-4 font-mono flex items-start justify-center">
            <div className="w-full max-w-3xl mt-12">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Bug className="w-8 h-8" />
                    <h1 className="text-2xl font-bold tracking-tight">Error</h1>
                </div>

                {/* Main error message */}
                <div className="bg-red-900/50 border border-red-800 rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold text-red-200 mb-2">
                        Something went terribly wrong
                    </h2>
                    <pre className="font-mono text-sm text-red-300 whitespace-pre-wrap">
            Error: {error}
                    </pre>
                </div>

                {/* Suggestions */}
                <div className="space-y-4">
                    <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-200 mb-2 flex items-center gap-2">
                            <span className="text-red-500">●</span> More Information
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-red-300">
                            <li> Link: {link} </li>
                            <li> Contact the developer @ seekehr.github.io </li>
                        </ul>
                    </div>

                    <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-200 mb-2 flex items-center gap-2">
                            <span className="text-red-500">●</span> Stack Information
                        </h3>
                        <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm text-red-300">
                            <span className="font-semibold">Browser:</span>
                            <span>Chrome 121.0.0</span>
                            <span className="font-semibold">OS:</span>
                            <span>Windows 11</span>
                            <span className="font-semibold">Time:</span>
                            <span>{new Date().toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-8 text-center text-red-400 text-sm">
                    <p>Click anywhere to dismiss</p>
                </footer>
            </div>
        </div>
    );
}

export default ErrorPage;