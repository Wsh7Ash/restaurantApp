'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
    return (
        <div className="min-h-screen bg-secondary-900 text-white font-sans flex items-center justify-center p-6">
            <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8">

                {/* Cart Items */}
                <div className="md:col-span-2">
                    <Link href="/menu" className="inline-flex items-center text-secondary-400 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
                    </Link>
                    <h1 className="text-3xl font-bold mb-6">Your Order</h1>

                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center p-4 bg-secondary-800/50 rounded-2xl border border-white/5">
                                <div className="w-24 h-24 bg-secondary-900 rounded-xl flex items-center justify-center text-4xl mr-6">
                                    🍔
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">Double Wagyu Burger</h3>
                                    <p className="text-secondary-400 text-sm">Extra Cheese, No Onions</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="font-bold text-lg">$18.99</span>
                                    <button className="text-red-400 hover:text-red-300 transition p-2 rounded-full hover:bg-red-500/10">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checkout Summary */}
                <div className="bg-secondary-800 p-8 rounded-3xl border border-white/5 h-fit sticky top-6">
                    <h2 className="text-xl font-bold mb-6">Summary</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-secondary-400">
                            <span>Subtotal</span>
                            <span>$37.98</span>
                        </div>
                        <div className="flex justify-between text-secondary-400">
                            <span>Tax</span>
                            <span>$3.80</span>
                        </div>
                        <div className="flex justify-between text-secondary-400">
                            <span>Delivery</span>
                            <span className="text-primary-500 font-bold">Free</span>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>$41.78</span>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20">
                        Checkout Now
                    </button>
                </div>
            </div>
        </div>
    );
}
