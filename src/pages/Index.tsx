import { X } from "lucide-react";
import Sidebar from "@/components/sidebar";

const Index = () => {
    return (
        <div className="min-h-screen flex bg-[hsl(var(--background))]">
            <Sidebar />

            <main className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-6 animate-scale-in">
                        <X size={64} strokeWidth={2} />
                    </div>
                    <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))] mt-4">Nothing here yet!</h1>
                </div>
            </main>
        </div>
    );
};

export default Index;
