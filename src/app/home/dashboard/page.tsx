import Link from "next/link";
import FIFACards from "./components/FIFACards";
import WelcomeCards from "./components/WelcomeCards";
import Widget from "./components/Widgets";

export default function Page() {
    const c = {
        USD: 124,
        EUR: 150,
        GBP: 134
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold font-mono tracking-tight text-neutral-900 flex items-center">
                        DASHBOARD
                        <span className="ml-3 h-2 w-2 rounded-full bg-nothing-red animate-pulse"></span>
                    </h1>
                    <p className="text-xs text-neutral-400 font-mono mt-1">OPERATIONAL CONTROL PANEL</p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono mt-4 md:mt-0">
                    <Link href="/home" className="text-neutral-400 hover:text-neutral-900 transition-colors text-decoration-none">
                        HOME
                    </Link>
                    <span className="text-neutral-300">/</span>
                    <span className="text-neutral-900 font-bold">DASHBOARD</span>
                </div>
            </div>

            {/* Dashboard Widgets */}
            <Widget currency={c} />

            {/* Sub Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WelcomeCards />
                <FIFACards />
            </div>
        </div>
    );
}