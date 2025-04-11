import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const DOMAIN = "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getCookie(key: string): string | undefined {
    if (document.cookie.includes(key)) {
        const cookies = document.cookie.split(';');
        const keyCookie = cookies.find(cookie => cookie.trim().startsWith(key + '='));
        if (keyCookie) {
            return keyCookie.split('=')[1];
        }
    }

    return undefined;
}