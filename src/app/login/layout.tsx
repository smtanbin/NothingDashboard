export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-50/50 nothing-dot-grid p-4">
            <div className="w-full max-w-sm">
                {/* Logo Header */}
                <div className="text-center mb-8 font-mono text-xl font-bold tracking-[0.2em] text-neutral-900">
                    STANDARD<span className="text-nothing-red font-dot">.</span>
                </div>

                {/* Form Box */}
                <div className="bg-white/85 backdrop-blur-xl border border-neutral-200 rounded-3xl p-8 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
