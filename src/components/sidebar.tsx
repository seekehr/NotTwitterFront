
import React from "react";
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Search,
    label: "Explore",
    href: "/explore",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: Mail,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: Bookmark,
    label: "Bookmarks",
    href: "/bookmarks",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: MoreHorizontal,
    label: "More",
    href: "/more",
  },
];

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen sticky top-0 flex-col justify-between p-2 lg:p-4 border-r border-sidebar-border">
      <div className="space-y-2">
        <div className="p-2 mb-4">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-8 h-8 text-blue-500 fill-current"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-full text-lg font-medium transition-colors hover:bg-sidebar-accent group",
                item.href === window.location.pathname
                  ? "font-bold"
                  : "text-sidebar-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="hidden lg:inline-flex">{item.label}</span>
            </Link>
          ))}
        </nav>
        <button className="mt-6 w-full rounded-full bg-blue-500 hover:bg-blue-600 transition-colors p-3 text-white font-bold">
          <span className="hidden lg:inline-flex">Tweet</span>
          <span className="lg:hidden">+</span>
        </button>
      </div>
      <div className="flex items-center gap-3 p-3 mt-auto rounded-full hover:bg-sidebar-accent cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="hidden lg:block">
          <p className="font-bold text-sm">Username</p>
          <p className="text-gray-500 text-sm">@handle</p>
        </div>
      </div>
    </div>
  );
}
