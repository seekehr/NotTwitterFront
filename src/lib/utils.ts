import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const DOMAIN = "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
