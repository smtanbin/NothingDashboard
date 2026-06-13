import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Database from "../../../../model/database";
import Link from "next/link";
import { Search, ShieldAlert } from "lucide-react";

const dummyUsers = [
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Administrator", status: "Active" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Manager", status: "Active" },
    { id: 3, name: "John Smith", email: "john@example.com", role: "Operator", status: "Inactive" },
    { id: 4, name: "Alice Johnson", email: "alice@example.com", role: "Auditor", status: "Active" },
    { id: 5, name: "Dev Central", email: "dev@central.com", role: "Developer", status: "Active" }
];

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { q } = await searchParams;
    const queryStr = typeof q === "string" ? q.trim() : "";

    // Mock DB Call
    const db = new Database();
    db.qurry("SELECT * FROM user WHERE username LIKE :q OR email LIKE :q", [queryStr]);

    const results = queryStr
        ? dummyUsers.filter(
            (u) =>
                u.name.toLowerCase().includes(queryStr.toLowerCase()) ||
                u.email.toLowerCase().includes(queryStr.toLowerCase()) ||
                u.role.toLowerCase().includes(queryStr.toLowerCase())
        )
        : dummyUsers;

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold font-mono tracking-tight text-neutral-900 flex items-center">
                        SEARCH
                        <span className="ml-3 h-2 w-2 rounded-full bg-nothing-red animate-pulse"></span>
                    </h1>
                    <p className="text-xs text-neutral-400 font-mono mt-1">SEARCH REGISTERED PORTAL USERS</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono mt-4 md:mt-0">
                    <Link href="/home" className="text-neutral-400 hover:text-neutral-900 transition-colors text-decoration-none">
                        HOME
                    </Link>
                    <span className="text-neutral-300">/</span>
                    <span className="text-neutral-900 font-bold">SEARCH</span>
                </div>
            </div>

            {/* Search Bar Bar */}
            <Card className="p-6">
                <form method="GET" action="/home/search" className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            name="q"
                            defaultValue={queryStr}
                            placeholder="SEARCH BY NAME, EMAIL OR ROLE..."
                            className="pl-10 font-mono"
                        />
                        <Search size={16} className="absolute left-3.5 top-3 text-neutral-400" />
                    </div>
                    <Button type="submit" variant="primary" className="font-mono">
                        SEARCH
                    </Button>
                </form>
            </Card>

            {/* Results Grid */}
            <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    Results ({results.length})
                </div>

                {results.length === 0 ? (
                    <Card className="p-12 text-center flex flex-col items-center justify-center">
                        <ShieldAlert size={36} className="text-neutral-400 mb-2" />
                        <h3 className="text-sm font-bold font-mono text-neutral-800">No Users Found</h3>
                        <p className="text-xs text-neutral-400 font-mono mt-1">Try refining your search terms.</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((u) => (
                            <Card key={u.id} className="p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-neutral-100 border border-neutral-200 text-black font-bold font-mono flex items-center justify-center text-sm shadow-sm">{u.name.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <h4 className="text-sm font-bold font-mono text-neutral-900">{u.name}</h4>
                                            <p className="text-xs text-neutral-400 font-mono mt-0.5">{u.email}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-2 w-2 rounded-full ${u.status === "Active" ? "bg-green-500" : "bg-neutral-300"
                                            }`}
                                    />
                                </div>
                                <div className="mt-6 flex justify-between items-center border-t border-neutral-100 pt-4">
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{u.role}</span>
                                    <Button variant="outline" size="sm" className="font-mono text-[10px] h-7 px-3">
                                        DETAILS
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
