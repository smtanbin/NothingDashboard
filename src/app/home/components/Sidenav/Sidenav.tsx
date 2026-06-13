"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface MenuItem {
    name: string;
    path: string;
    icon: string;
}

interface MenuGroup {
    title: string;
    icon: string;
    key: string;
    items: MenuItem[];
}

export default function Sidenav({ user }: { user: any }) {
    const currentPath = usePathname();
    const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        core: true,
        ops: false,
        reports: false,
        security: false,
        support: false,
    });

    useEffect(() => {
        fetch("/api/menu-groups")
            .then((res) => res.json())
            .then((data) => {
                setMenuGroups(data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    const toggleGroup = (key: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const filteredGroups = menuGroups.map((group) => {
        const filteredItems = group.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0 || searchQuery === "");

    return (
        <aside className="h-screen border-r border-neutral-250 bg-[#fafafa] flex flex-col z-50 w-64">
            {/* BRAND / LOGO */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 shrink-0">
                <Link href="/home/dashboard" className="text-black text-decoration-none font-bold tracking-[0.2em] font-mono text-sm">
                    STANDARD<span className="text-nothing-red font-dot">.</span>
                </Link>
            </div>

            {/* SIDEBAR CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {/* SEARCH */}
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="SEARCH..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 font-mono text-xs uppercase"
                    />
                    <Search size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                </div>

                {/* NAVIGATION */}
                <nav className="space-y-1">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase px-2 mb-2">
                        MAIN MENU
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center py-6 text-neutral-400 font-mono text-xs">
                            <RefreshCw size={14} className="animate-spin mr-2" />
                            LOADING...
                        </div>
                    )}

                    {!isLoading &&
                        filteredGroups.map((group) => {
                            const isOpen = openGroups[group.key];

                            return (
                                <div key={group.key} className="space-y-1">
                                    <button
                                        onClick={() => toggleGroup(group.key)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-neutral-500 hover:text-black rounded-lg transition-colors border-0 bg-transparent"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <i className={group.icon}></i>
                                            <span className="uppercase">{group.title}</span>
                                        </div>
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-200 text-neutral-400 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Sub Items */}
                                    <ul
                                        className="nav flex-column ps-3 mt-1"
                                        style={{
                                            display: isOpen ? "block" : "none",
                                            listStyle: "none",
                                        }}
                                    >
                                        {group.items.map((item) => {
                                            const isActive = currentPath === item.path;
                                            return (
                                                <li key={item.path} className="nav-item mb-1">
                                                    <Link
                                                        href={item.path}
                                                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors text-decoration-none ${
                                                            isActive
                                                                ? "bg-black text-white font-bold"
                                                                : "text-neutral-600 hover:text-black"
                                                        }`}
                                                        style={{ fontSize: "14px" }}
                                                    >
                                                        <i className={`${item.icon} nav-icon me-2`} style={{ fontSize: "12px" }}></i>
                                                        <span>{item.name.toUpperCase()}</span>
                                                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-nothing-red"></span>}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                </nav>
            </div>
        </aside>
    );
}