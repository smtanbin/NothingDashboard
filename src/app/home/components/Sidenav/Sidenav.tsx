"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, RefreshCw } from "lucide-react";

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

const defaultMenuGroups: MenuGroup[] = [
    {
        title: "Core Operations",
        icon: "fa fa-cogs",
        key: "core",
        items: [
            { name: "Dashboard", path: "/home/dashboard", icon: "fa fa-dashboard" },
            { name: "Search Users", path: "/home/search", icon: "fa fa-search" },
        ]
    }
];

const DB_NAME = "MenuCacheDB";
const STORE_NAME = "menu_groups";
const CACHE_KEY = "menu_data";
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 hour in ms

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(new Error("IndexedDB is only available in the browser"));
            return;
        }
        const request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getCachedMenu(): Promise<MenuGroup[] | null> {
    try {
        const db = await openDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(CACHE_KEY);
            request.onsuccess = () => {
                const data = request.result;
                if (data && Date.now() - data.timestamp < CACHE_DURATION) {
                    resolve(data.menuGroups);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => resolve(null);
        });
    } catch {
        return null;
    }
}

async function cacheMenu(menuGroups: MenuGroup[]) {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put({ menuGroups, timestamp: Date.now() }, CACHE_KEY);
    } catch (e) {
        console.error("Failed to write to IndexedDB", e);
    }
}

export default function Sidenav({ user }: { user: any }) {
    const currentPath = usePathname();
    const [menuGroups, setMenuGroups] = useState<MenuGroup[]>(defaultMenuGroups);
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
        const loadMenu = async () => {
            setIsLoading(true);
            const cached = await getCachedMenu();
            if (cached) {
                setMenuGroups(cached);
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch("/api/menu-groups");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setMenuGroups(data);
                    await cacheMenu(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadMenu();
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
        <aside className="h-screen border-r border-neutral-900 bg-[#050505] flex flex-col z-50 w-64">
            {/* BRAND / LOGO */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-900 shrink-0">
                <Link href="/home/dashboard" className="text-white text-decoration-none font-bold tracking-[0.2em] font-mono text-sm">
                    CENTRAL<span className="text-nothing-red font-dot">.</span>
                </Link>
            </div>

            {/* SIDEBAR CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {/* SEARCH */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="SEARCH..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 py-2 bg-neutral-900/50 border border-neutral-850 rounded-3xl text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-800 pl-9 font-mono text-xs uppercase"
                    />
                    <Search size={14} className="absolute left-3.5 top-3.5 text-neutral-500" />
                </div>

                {/* NAVIGATION */}
                <nav className="space-y-1">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase px-2 mb-2">
                        MAIN MENU
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center py-6 text-neutral-500 font-mono text-xs">
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
                                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-neutral-400 hover:text-white rounded-lg transition-colors border-0 bg-transparent"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <i className={group.icon}></i>
                                            <span className="uppercase">{group.title}</span>
                                        </div>
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-200 text-neutral-500 ${
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
                                                                ? "bg-white text-black font-bold"
                                                                : "text-neutral-400 hover:text-white"
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