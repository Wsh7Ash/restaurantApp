'use client';

import { useState, useEffect } from 'react';
import { Search, Grid, List, LogOut, Clock } from 'lucide-react';

// Mock Data
const MENU_ITEMS = [
    { id: 1, name: 'Burger', price: 10, category: 'Food' },
    { id: 2, name: 'Fries', price: 5, category: 'Food' },
    { id: 3, name: 'Soda', price: 3, category: 'Drink' },
    { id: 4, name: 'Pizza', price: 12, category: 'Food' },
    { id: 5, name: 'Salad', price: 8, category: 'Food' },
    { id: 6, name: 'Water', price: 2, category: 'Drink' },
    { id: 7, name: 'Steak', price: 25, category: 'Food' },
    { id: 8, name: 'Ice Cream', price: 4, category: 'Dessert' },
];

export default function CounterScreen() {
    const [cart, setCart] = useState<{ item: typeof MENU_ITEMS[0]; quantity: number }[]>([]);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const addToCart = (item: typeof MENU_ITEMS[0]) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.item.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart((prev) => prev.filter((i) => i.item.id !== itemId));
    };

    const total = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

    return (
        <div className="flex h-screen bg-black font-sans text-white overflow-hidden">
            {/* Sidenav (Condensed) */}
            <div className="w-20 bg-secondary-900 border-r border-white/10 flex flex-col items-center py-6 gap-8">
                <div className="text-2xl font-bold text-primary-500">POS</div>
                <button className="p-3 rounded-xl bg-secondary-800 text-primary-400"><Grid /></button>
                <button className="p-3 rounded-xl text-secondary-500 hover:text-white transition"><List /></button>
                <button className="p-3 rounded-xl text-secondary-500 hover:text-white transition"><Search /></button>
                <div className="flex-1"></div>
                <button className="p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition"><LogOut /></button>
            </div>

            {/* Main Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Counter #1</h1>
                        <p className="text-secondary-400">Staff: John Doe</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary-800 rounded-lg border border-white/5">
                        <Clock className="w-5 h-5 text-primary-500" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => addToCart(item)}
                            className="bg-secondary-800 p-4 rounded-2xl border border-white/5 hover:border-primary-500 hover:bg-secondary-700 transition-all active:scale-95 flex flex-col items-center justify-center h-32 group"
                        >
                            <span className="text-lg font-bold group-hover:text-primary-400">{item.name}</span>
                            <span className="text-secondary-400 text-sm mt-1">${item.price.toFixed(2)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="w-96 bg-secondary-900 border-l border-white/10 flex flex-col h-full z-10 shadow-2xl">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold">Current Order</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-secondary-600 opacity-50">
                            <span className="text-6xl mb-4">🛒</span>
                            <p>Ready for items</p>
                        </div>
                    ) : (
                        cart.map((lineItem) => (
                            <div key={lineItem.item.id} className="flex justify-between items-center p-3 bg-secondary-800 rounded-xl border border-white/5">
                                <div>
                                    <div className="font-bold">{lineItem.item.name}</div>
                                    <div className="text-sm text-secondary-400">x{lineItem.quantity} · ${lineItem.item.price}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">${(lineItem.item.price * lineItem.quantity).toFixed(2)}</div>
                                    <button
                                        onClick={() => removeFromCart(lineItem.item.id)}
                                        className="text-xs text-red-400 hover:text-red-300 mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-secondary-800 p-6 border-t border-white/10">
                    <div className="space-y-2 mb-6 text-sm">
                        <div className="flex justify-between text-secondary-400">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-secondary-400">
                            <span>Tax (10%)</span>
                            <span>${(total * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-white pt-2 border-t border-white/10 mt-2">
                            <span>Total</span>
                            <span className="text-primary-500">${(total * 1.1).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg transition-colors col-span-2 shadow-lg shadow-green-900/50">
                            Checkout (Cash)
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors">
                            Card
                        </button>
                        <button className="bg-secondary-700 hover:bg-secondary-600 text-white py-3 rounded-xl font-bold transition-colors">
                            Splilt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
