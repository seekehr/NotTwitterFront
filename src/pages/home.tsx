import { X } from "lucide-react"

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-background border-4 border-red-500 mb-4">
                <X className="h-12 w-12 text-red-500" />
            </div>
            <p className="text-xl font-medium text-muted-foreground">Nothing here yet!</p>
        </div>
    )
}

