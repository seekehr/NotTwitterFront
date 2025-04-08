import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 ml-16 p-4">
                <Outlet />
            </main>
        </div>
    )
}

