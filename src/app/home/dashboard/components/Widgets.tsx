import { CalendarDays, DollarSign, Cpu, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function Widget({ currency }: any) {
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    }).format(now);

    const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }).format(now);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* DATE WIDGET (Nothing OS Dot Style) */}
            <Card glow className="relative overflow-hidden aspect-square flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">Date / Time</span>
                    <CalendarDays size={18} className="text-neutral-400" />
                </div>
                <div className="my-auto text-center">
                    <h2 className="text-5xl font-bold font-dot text-black tracking-widest my-2">
                        {now.getHours().toString().padStart(2, "0")}:{now.getMinutes().toString().padStart(2, "0")}
                    </h2>
                    <p className="text-sm font-mono text-neutral-500 mt-1">{formattedDate}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-t border-neutral-100 pt-3">
                    <span>Hijri: {hijri}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-nothing-red animate-pulse"></span>
                </div>
            </Card>

            {/* CURRENCY CONVERSION WIDGET */}
            <Card className="aspect-square flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">Exchange (BDT)</span>
                    <DollarSign size={18} className="text-neutral-400" />
                </div>
                <div className="flex flex-col space-y-3 my-auto">
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                        <span className="text-xs text-neutral-500 font-mono">USD</span>
                        <span className="text-lg font-bold font-mono text-black">৳ {currency?.USD || "124.0"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                        <span className="text-xs text-neutral-500 font-mono">EUR</span>
                        <span className="text-lg font-bold font-mono text-black">৳ {currency?.EUR || "134.0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500 font-mono">GBP</span>
                        <span className="text-lg font-bold font-mono text-black">৳ {currency?.GBP || "150.0"}</span>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 border-t border-neutral-100 pt-3">
                    Live Rates
                </div>
            </Card>

            {/* SYSTEM LOAD WIDGET */}
            <Card className="aspect-square flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">System Load</span>
                    <Cpu size={18} className="text-neutral-400" />
                </div>
                <div className="my-auto space-y-4">
                    <div>
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                            <span className="text-neutral-500">CPU</span>
                            <span className="text-black">32%</span>
                        </div>
                        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-black h-full rounded-full" style={{ width: "32%" }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                            <span className="text-neutral-500">RAM</span>
                            <span className="text-black">58%</span>
                        </div>
                        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-black h-full rounded-full" style={{ width: "58%" }}></div>
                        </div>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 border-t border-neutral-100 pt-3 flex items-center justify-between">
                    <span>Temp: 42°C</span>
                    <span className="text-green-600 font-bold">Stable</span>
                </div>
            </Card>

            {/* SECURITY/ALERTS WIDGET */}
            <Card className="aspect-square flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">Security Check</span>
                    <ShieldCheck size={18} className="text-neutral-400" />
                </div>
                <div className="my-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-neutral-100 rounded-full mb-3">
                        <ShieldCheck size={36} className="text-neutral-900" />
                    </div>
                    <h3 className="text-sm font-bold font-mono text-black mb-0.5">All Systems Safe</h3>
                    <p className="text-[10px] text-neutral-400 font-mono">Zero threats detected</p>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 border-t border-neutral-100 pt-3 flex justify-between items-center">
                    <span>Audit Status</span>
                    <span className="text-neutral-600 font-bold">Passed</span>
                </div>
            </Card>
        </div>
    );
}