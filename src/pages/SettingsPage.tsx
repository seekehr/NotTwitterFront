import React, {useEffect, useState} from 'react';
import {
    Home,
    Search,
    Bell,
    MessageCircle,
    Bookmark,
    User,
    Settings,
    Camera,
    Edit3,
    Mail,
    Phone,
    MapPin,
    Calendar,
    X,
    LogOut, LogIn
} from 'lucide-react';
import NavItem from "@/components/ui/navitem.tsx";
import {Sidebar} from "@/components/Sidebar.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import {DOMAIN, getCookie} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";

function SettingsPage() {
    const [token, setToken] = useState<string|undefined>(getCookie("token"));
    const [error, setError] = useState<string|null>(null);
    const [loggedIn, setIsLoggedIn] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [displayName, setDisplayName] = useState('Loading...');
    const [handle, setHandle] = useState('Loading...');
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop');
    const [dateJoined, setDateJoined] = useState(new Date().toDateString());

    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState<boolean>(true);


    const navigate = useNavigate();
    // TODO: introduce caching to avoid so many db reqs (for this, home page, etc)
    useEffect(() => {
        async function loadAccountData(token: string) {
            const response = await fetch(DOMAIN + '/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (typeof(data) === 'object' && 'account' in data && typeof(data['account']) === 'object' &&
                    'displayName' in data.account && 'username' in data.account && 'pfp' in data.account && 'timeCreated' in data.account) {
                    setDisplayName(data.account.displayName);
                    setHandle(data.account.username);
                    setProfileImage(data.account.profileImage);
                    setDateJoined(new Date(data.account.timeCreated).toDateString());
                    setIsLoggedIn(true);
                } else {
                    setError(`Invalid data. Object: ${JSON.stringify(data)}`);
                }
            } else {
                if (response.status !== 401) {
                    setError(`Invalid response. Status: ${response.status}`)
                }
            }
        }

        if (token) {
            loadAccountData(token).catch((error) => setError("Caught error: " + error));
        }

        const theme = getCookie("theme");
        if (theme) {
            setTheme(theme);
        } else {
            document.cookie = `theme=light; path=/; max-age=15552000`; // 6 months
            setTheme("light");
        }

        const notifications = getCookie("notifications");
        if (notifications) {
            setNotifications(notifications === "true");
        } else {
            document.cookie = `notifications=true; path=/; max-age=15552000`;
            setNotifications(true);
        }
    }, [token, setIsLoggedIn, setError, setDisplayName, setHandle, setProfileImage, setDateJoined, setTheme, setNotifications, navigate]);

    useEffect(() => {
        const notif = getCookie("notifications");
        if (theme !== getCookie("theme")) {
            document.cookie = `theme=${theme}; path=/; max-age=15552000`;
        } else if (typeof(notif) === 'string' && notifications !== (notif === "true")) {
            document.cookie = `notifications=${notifications}; path=/; max-age=15552000`;
        }
    }, [theme, notifications]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const toggleNotifications = () => {
        setNotifications(!notifications);
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        document.cookie = "token=; max-age=0; path=/";
        navigate("/");
    };

    if (!loggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-mono py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-colors text-xl"
                    onClick={() => navigate('/login')}
                >
                    <LogIn size={28} />
                    <span>Login</span>
                </button>
            </div>
        );
    }

    return (
        <>
            {typeof error === 'string' ? (
                <ErrorPage error={error} link="/register" /> // Conditionally render ErrorPage if error occurs
            ) : (
                <div className="min-h-screen bg-blue-50 flex">
                    {/* Sidebar */}
                    <nav className="w-64 border-r border-blue-200 p-6 space-y-6 font-mono">
                        <div className="text-2xl font-bold mb-12 font-mono tracking-tight">
                    Settings
                        </div>

                        <Sidebar />

                    </nav>

                    {/* Main Content */}
                    <main className="flex-1 p-8">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl font-bold mb-8 font-mono">Account Settings</h1>

                            {/* Profile Section */}
                            <div className="bg-white border border-blue-200 rounded-lg p-6 mb-8">
                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="relative">
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
                                        />
                                        <label className="absolute bottom-0 right-0 bg-blue-100 p-2 rounded-full border border-blue-200 cursor-pointer">
                                            <Camera size={16} />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-mono">{displayName}</h2>
                                        <p className="text-gray-600 text-sm">@{handle}</p>
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="mt-2 flex items-center space-x-2 text-sm bg-blue-100 px-4 py-2 rounded-full border border-blue-200"
                                        >
                                            <Edit3 size={14} />
                                            <span>Edit Profile</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Profile Fields */}
                                <div className="space-y-4">
                                    <ProfileField icon={<Calendar />} label="Joined" value={dateJoined} />
                                </div>
                            </div>

                            {/* Preferences Section */}
                            <div className="bg-white border border-blue-200 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-bold mb-4 font-mono">Preferences</h3>
                                <div className="space-y-4">
                                    <PreferenceToggle label="Dark Mode" onClick={toggleTheme} isToggled={theme === "dark"} />
                                    <PreferenceToggle label="Notifications" onClick={toggleNotifications} isToggled={notifications}/>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-mono py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </main>

                    {/* Edit Profile Modal */}
                    {isEditModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 w-96 font-mono">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold">Edit Profile</h3>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full p-2 border border-blue-200 rounded-lg bg-white focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">Username</label>
                                        <input
                                            type="text"
                                            value={handle}
                                            onChange={(e) => setHandle(e.target.value)}
                                            className="w-full p-2 border border-blue-200 rounded-lg bg-white focus:outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

function ProfileField({ icon, label, value }) {
    return (
        <div className="flex items-center space-x-4 p-3 rounded-lg bg-blue-50">
            <div className="text-blue-700">{icon}</div>
            <div>
                <p className="text-xs text-gray-500 font-mono">{label}</p>
                <p className="font-mono">{value}</p>
            </div>
        </div>
    );
}

function PreferenceToggle({ label, onClick, isToggled }) {
    const [toggled, setToggled] = useState<boolean>(isToggled);
    return (
        <div className="flex items-center justify-between py-2">
            <span className="font-mono text-sm">{label}</span>
            <button
                onClick={() => {
                    onClick(!isToggled);
                    setToggled(!toggled);
                }}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    toggled ? 'bg-blue-400' : 'bg-gray-200'
                }`}
            >
                <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        toggled ? 'translate-x-6' : ''
                    }`}
                />
            </button>
        </div>
    );
}

export default SettingsPage;