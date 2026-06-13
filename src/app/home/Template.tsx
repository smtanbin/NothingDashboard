"use client";

import Navbar from "@/app/home/components/Navbar/Navbar";
import Sidenav from "@/app/home/components/Sidenav/Sidenav";
import { useAuth } from "@/context/AuthContext";
import Footer from "./components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-neutral-50/50">
            {/* Sidebar */}
            <Sidenav user={user} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Navbar */}
                <Navbar user={user} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}