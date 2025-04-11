import React from "react";

export default function NavItem({ icon, text, link, active = false }) {
    return (
        <a href={link}>
            <button
                className={`flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition-colors
        ${active ? 'bg-blue-100 text-blue-900' : 'hover:bg-blue-50 text-gray-700'}`}
            >
                {icon}
                <span className="font-mono text-sm">{text}</span>
            </button>
        </a>
    );
}