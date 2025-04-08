"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { MessageSquare, Bell, Settings, Sun, Moon } from "lucide-react"
import { useTheme } from "../providers/theme_provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SidebarItem = {
    icon: React.ElementType
    label: string
    href: string
}

export default function Sidebar() {
    const { theme, setTheme } = useTheme()

    const sidebarItems: SidebarItem[] = [
        { icon: MessageSquare, label: "Messages", href: "/messages" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: Settings, label: "Settings", href: "/settings" },
    ]

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="h-screen w-16 border-r fixed left-0 top-0 flex flex-col items-center py-4 bg-background">
            <div className="w-10 h-10 rounded-full bg-red-500 mb-6 flex items-center justify-center">
                <span className="font-bold text-white">X</span>
            </div>

            <nav className="flex flex-col items-center gap-6 flex-1">
                <TooltipProvider>
                    {sidebarItems.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <Link to={item.href}>
                                    <button className="rounded-full h-12 w-12 flex items-center justify-center bg-transparent hover:bg-accent text-foreground transition-all duration-200 hover:shadow-hover dark:hover:shadow-hover-dark">
                                        <item.icon className="h-6 w-6" />
                                        <span className="sr-only">{item.label}</span>
                                    </button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={toggleTheme}
                            className="rounded-full h-12 w-12 mt-auto flex items-center justify-center bg-transparent hover:bg-accent text-foreground transition-all duration-200 hover:shadow-hover dark:hover:shadow-hover-dark"
                        >
                            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                            <span className="sr-only">Toggle theme</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{theme === "dark" ? "Light mode" : "Dark mode"}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

