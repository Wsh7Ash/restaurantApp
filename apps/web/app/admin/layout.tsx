import Link from 'next/link';
import { LayoutDashboard, Utensils, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col pt-8 pb-4">
                <div className="px-8 mb-10">
                    <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                        Admin Panel
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
                        { name: 'Manage Menu', icon: Utensils, href: '/admin/items' },
                        { name: 'Customers', icon: Users, href: '/admin/customers' },
                        { name: 'Settings', icon: Settings, href: '/admin/settings' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                            <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="px-4 mt-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-xl font-bold">Welcome, Owner</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center font-bold text-white shadow-lg">
                            O
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
