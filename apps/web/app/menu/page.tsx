'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Drinks', 'Desserts'];
const MENU_ITEMS = [
    { id: 1, name: 'Double Wagyu Burger', price: 18.99, category: 'Burgers', image: '🍔', desc: 'Premium Wagyu beef with truffled cheese.' },
    { id: 2, name: 'Truffle Mushroom Pizza', price: 22.99, category: 'Pizza', image: '🍕', desc: 'Wild mushrooms, truffle oil, fresh mozzarella.' },
    { id: 3, name: 'Craft Cola', price: 4.99, category: 'Drinks', image: '🥤', desc: 'Artisanal cola with natural cane sugar.' },
    { id: 4, name: 'Truffle Fries', price: 8.99, category: 'Burgers', image: '🍟', desc: 'Crispy fries with parmesan and truffle oil.' },
    { id: 5, name: 'Gold Leaf Ice Cream', price: 12.99, category: 'Desserts', image: '🍦', desc: 'Madagascan vanilla with edible 24k gold.' },
    { id: 6, name: 'Spicy Pepperoni', price: 19.99, category: 'Pizza', image: '🍕', desc: 'Italian pepperoni with chili honey glaze.' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? MENU_ITEMS
        : MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-secondary-900 text-white font-sans">
            <nav className="sticky top-0 z-40 bg-secondary-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">
                    TastyBites
                </Link>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-secondary-300 hover:text-white transition">
                        <Search className="w-6 h-6" />
                    </button>
                    <Link href="/cart" className="relative p-2 text-secondary-300 hover:text-primary-400 transition">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
                        <p className="text-secondary-400 text-lg">Curated dishes for the discerning palate.</p>
                    </div>
                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === cat
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                        : 'bg-secondary-800 text-secondary-400 hover:bg-secondary-700 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    key={activeCategory} // Reset animation on category change
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemAnim}
                            whileHover={{ y: -5 }}
                            className="group bg-secondary-800/50 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-primary-500/30 transition-all overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-400 transform hover:scale-110 transition-all">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="aspect-square mb-6 bg-gradient-to-br from-secondary-800 to-black rounded-2xl flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
                                {item.image}
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">{item.name}</h3>
                                <span className="text-primary-500 font-bold text-lg">${item.price}</span>
                            </div>
                            <p className="text-secondary-400 text-sm mb-6 leading-relaxed">{item.desc}</p>

                            <button className="w-full py-4 bg-secondary-700/50 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors border border-white/5">
                                Add to Order
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
