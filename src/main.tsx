"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./providers/theme_provider"
import MainLayout from "./layout/main_layout"
import HomePage from "./pages/home"
import LoadingScreen from "./components/loading_screen"
import "./index.css"

function App() {
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <ThemeProvider defaultTheme="system">
            <LoadingScreen isLoading={isLoading} />
            {!isLoading && (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="messages" element={<div>Messages page</div>} />
                            <Route path="notifications" element={<div>Notifications page</div>} />
                            <Route path="settings" element={<div>Settings page</div>} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            )}
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

