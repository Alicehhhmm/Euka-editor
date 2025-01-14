import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const COLORS = [
    "#DC2626",
    "#D97706",
    "#7C3AED",
    "#DB2777",
    "#Dfff00",
]

export const GenColors = (id: number): string => {
    return COLORS[id % COLORS.length]
}
