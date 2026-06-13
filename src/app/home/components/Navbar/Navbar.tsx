"use client";

import { useState } from "react";
import Avatar from "react-avatar";
import { Menu, MessageSquare, Bell, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
    user: any | null;
}

export default function Navbar({ user }: NavbarProps) {
    const router = useRouter();
    const [activeDropdown, setActiveDropdown] = useState<"messages" | "user" | null>(null);

    const toggleDropdown = (dropdown: "messages" | "user") => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("check");
        router.push("/");
    };

    const displayName = user?.name || "Guest";
    const displayRole = user?.role || "Member";

    return (
        <nav className="h-16 border-b border-neutral-200 bg-white/65 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
            {activeDropdown && (
                <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
            )}

            <div className="flex items-center space-x-4">
                <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 font-bold">
                    STANDARD PORTAL
                </div>
            </div>

            <div className="flex items-center space-x-3 relative z-50">
                {/* Messages */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleDropdown("messages")}
                        className="text-neutral-500 hover:text-black relative"
                    >
                        <MessageSquare size={18} />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-nothing-red"></span>
                    </Button>

                    {activeDropdown === "messages" && (
                        <Card className="absolute right-0 mt-2 w-80 p-4 z-50 border border-neutral-200">
                            <div className="text-xs font-mono text-neutral-400 border-b border-neutral-100 pb-2 mb-3">
                                MESSAGES (4)
                            </div>
                            <div className="space-y-3">
                                <div className="flex space-x-3 text-xs">
                                    <Avatar name="Support" size="30" round className="bg-neutral-100 text-black" />
                                    <div>
                                        <div className="font-bold font-mono text-neutral-900">Support Team</div>
                                        <div className="text-neutral-500 text-[10px] mt-0.5">Why not buy a new awesome theme?</div>
                                    </div>
                                </div>
                                <div className="flex space-x-3 text-xs">
                                    <Avatar name="Design" size="30" round className="bg-neutral-100 text-black" />
                                    <div>
                                        <div className="font-bold font-mono text-neutral-900">AdminLTE Design</div>
                                        <div className="text-neutral-500 text-[10px] mt-0.5">The new template styles are ready.</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("user")}
                        className="flex items-center space-x-2 p-1 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none"
                    >
                        <Avatar
                            name={displayName}
                            src={user?.avatar || undefined}
                            size="30"
                            round
                            className="bg-neutral-200 text-black"
                        />
                    </button>

                    {activeDropdown === "user" && (
                        <Card className="absolute right-0 mt-2 w-64 p-4 z-50 border border-neutral-200">
                            <div className="flex flex-col items-center border-b border-neutral-100 pb-4 mb-4">
                                <Avatar
                                    name={displayName}
                                    src={user?.avatar || undefined}
                                    size="60"
                                    round
                                    className="bg-neutral-100 border border-neutral-200 mb-2"
                                />
                                <div className="font-mono text-sm font-bold text-neutral-900">{displayName}</div>
                                <div className="text-[10px] text-neutral-400 font-mono tracking-wider mt-0.5">{displayRole.toUpperCase()}</div>
                            </div>
                            <div className="space-y-1">
                                <button
                                    onClick={() => { router.push("/profile"); setActiveDropdown(null); }}
                                    className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs font-mono text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-lg transition-colors border-0 bg-transparent"
                                >
                                    <UserIcon size={14} />
                                    <span>PROFILE</span>
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs font-mono text-nothing-red hover:bg-neutral-50 rounded-lg transition-colors border-0 bg-transparent"
                                >
                                    <LogOut size={14} />
                                    <span>LOGOUT</span>
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </nav>
    );
}