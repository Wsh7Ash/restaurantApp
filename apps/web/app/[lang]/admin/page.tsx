'use client';

import { motion } from 'framer-motion';
import { ChefHat, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const stats = [
    { name: 'Total Revenue', value: '$12,450', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Active Orders', value: '24', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Total Customers', value: '1,205', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Menu Items', value: '48', icon: ChefHat, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-slate-500">How your restaurant is performing today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">{stat.name}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Orders - Placeholder */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between py-4 border-b last:border-0 border-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center flex text-xl">👤</div>
                                    <div>
                                        <p className="font-bold">Customer #{i * 123}</p>
                                        <p className="text-xs text-slate-400">2 mins ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary-500">$45.00</p>
                                    <span className="text-[10px] px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full font-bold">Pending</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Log - Placeholder */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold mb-6">Menu Performance</h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Wagyu Burger', sales: 120, trend: '+15%' },
                            { name: 'Double Pepperoni', sales: 98, trend: '+10%' },
                            { name: 'Truffle Fries', sales: 85, trend: '-2%' }
                        ].map(item => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-xs text-slate-400">{item.sales} sold this week</p>
                                </div>
                                <span className={`text-sm font-bold ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.trend}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
