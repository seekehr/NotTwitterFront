import { MessageSquare, Bell, Settings, SunMoon, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        icon: MessageSquare,
        label: "Messages",
        id: "messages",
    },
    {
        icon: Bell,
        label: "Notifications",
        id: "notifications",
    },
    {
        icon: Settings,
        label: "Settings",
        id: "settings",
    },
];

export default function Sidebar() {
    const { theme, setTheme } = useTheme();
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative">
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    aria-label="Open Sidebar"
                >
                    <MessageSquare size={20} />
                </button>
            )}

            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-16 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out flex flex-col items-center py-4",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <button
                    onClick={toggleSidebar}
                    className="absolute top-2 right-2 text-sidebar-foreground hover:text-sidebar-accent-foreground"
                    aria-label="Close Sidebar"
                >
                    <X size={16} />
                </button>

                <div className="flex flex-col items-center space-y-6 mt-8">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveItem(item.id === activeItem ? null : item.id)}
                            className={cn(
                                "p-3 rounded-md text-sidebar-foreground transition-all duration-200 hover:scale-110",
                                activeItem === item.id ? "sidebar-item-active" : "sidebar-item-hover"
                            )}
                            aria-label={item.label}
                            title={item.label}
                        >
                            <item.icon size={24} />
                        </button>
                    ))}
                </div>

                <div className="mt-auto mb-6">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-md text-sidebar-foreground sidebar-item-hover transition-all duration-200 hover:scale-110"
                        aria-label="Toggle Theme"
                        title="Toggle Theme"
                    >
                        <SunMoon size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
