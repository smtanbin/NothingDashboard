import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function FIFACards() {
    return (
        <div className="lg:col-span-1">
            <Card className="h-full flex flex-col justify-between">
                <div>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono">
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                            <span className="text-xs text-neutral-500">Database Connection</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-800 border border-neutral-250">
                                Active
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                            <span className="text-xs text-neutral-500">HMR Server</span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-800 border border-neutral-250">
                                Running
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-neutral-500">API Latency</span>
                            <span className="text-xs font-bold text-neutral-800">12ms</span>
                        </div>
                    </CardContent>
                </div>
                <div className="p-6">
                    <Button variant="outline" className="w-full">
                        Run Diagnostics
                    </Button>
                </div>
            </Card>
        </div>
    );
}