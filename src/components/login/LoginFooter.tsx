import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginFooter() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t-4 border-blue-500 px-4 py-3 shadow-lg animate-slideUp">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-1 right-2 text-blue-900 hover:text-blue-700 transition-colors"
                aria-label="Close footer"
            >
                <X size={16} />
            </button>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <p className="font-mono text-blue-900 text-lg">
                    Log in to access more features!
                </p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-mono rounded
                   border-2 border-blue-700 shadow-[4px_4px_0px_0px_rgba(29,78,216)]
                   active:shadow-[0px_0px_0px_0px_rgba(29,78,216)]
                   active:translate-x-[4px] active:translate-y-[4px]
                   transition-all duration-100"
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}