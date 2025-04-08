import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
    isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
    if (!isLoading) return null

    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50 animate-fade-in">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="font-bold text-white text-xl">X</span>
                </div>
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    )
}

