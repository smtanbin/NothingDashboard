import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Footer() {
    const [message, setMessage] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            alert(`Support Message Sent: "${message}"`);
            setMessage("");
        }
    };

    return (
        <footer className="border-t border-neutral-200 bg-white py-12 px-8 text-neutral-500 text-xs font-mono">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-neutral-900 tracking-widest uppercase">CENTRAL</h4>
                    <p className="leading-relaxed text-neutral-600 max-w-xs">
                        Secure operational environment and digital gateway built with Nothing OS design principles.
                    </p>
                </div>

                {/* Nav */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">NAVIGATION</h4>
                    <ul className="space-y-2 list-none p-0">
                        <li><a href="/home/dashboard" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">DASHBOARD</a></li>
                        <li><a href="/profile" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">PROFILE</a></li>
                        <li><a href="/login" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">LOGOUT</a></li>
                    </ul>
                </div>

                {/* Policies */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">POLICIES</h4>
                    <ul className="space-y-2 list-none p-0">
                        <li><a href="#" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">PRIVACY STATEMENT</a></li>
                        <li><a href="#" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">TERMS OF SERVICE</a></li>
                        <li><a href="#" className="text-neutral-500 hover:text-black transition-colors text-decoration-none">CYBER SECURITY</a></li>
                    </ul>
                </div>

                {/* Support Form */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">SUPPORT DESK</h4>
                    <form onSubmit={handleSend} className="space-y-2">
                        <textarea
                            rows={2}
                            placeholder="Describe your request..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 resize-none"
                        />
                        <div className="flex justify-end">
                            <Button type="submit" size="sm" variant="outline">
                                SEND MESSAGE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-neutral-100 mt-12 pt-6 text-center text-[10px] text-neutral-400">
                © {new Date().getFullYear()} STANDARDBANKBD.COM. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
}
