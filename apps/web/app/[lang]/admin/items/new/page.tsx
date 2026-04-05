'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat, ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { addMenuItem, getCategories } from '../../../../actions/menu';

export default function NewItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const cats = await getCategories();
            setCategories(cats);
        }
        load();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            await addMenuItem(formData);
            router.push('/admin/items');
        } catch (err) {
            console.error(err);
            alert('Failed to add item');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl">
            <header className="mb-10">
                <Link
                    href="/admin/items"
                    className="text-slate-400 hover:text-slate-600 flex items-center gap-2 mb-4 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Menu
                </Link>
                <h1 className="text-3xl font-bold">Add New Item</h1>
                <p className="text-slate-500">Introduce a new taste to your customers.</p>
            </header>

            <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Item Name (English)</label>
                                <input name="nameEn" required type="text" placeholder="e.g. Wagyu Truffle Burger" className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Item Name (Arabic)</label>
                                <input name="nameAr" type="text" placeholder="e.g. برجر واغيو" className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none text-right" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Price ($)</label>
                            <input
                                name="price"
                                required
                                type="number"
                                step="0.01"
                                placeholder="24.50"
                                className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Category</label>
                        <select
                            name="categoryId"
                            required
                            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none appearance-none"
                        >
                            <option value="">Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.nameEn}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description (English)</label>
                            <textarea name="descriptionEn" required rows={4} placeholder="Tell customers about this item..." className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none resize-none"></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description (Arabic)</label>
                            <textarea name="descriptionAr" rows={4} placeholder="وصف المنتج للعملاء..." className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none resize-none text-right" dir="rtl"></textarea>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Emoji Icon (or Image URL)</label>
                        <input
                            name="imageUrl"
                            type="text"
                            placeholder="e.g. 🍔 or https://..."
                            className="w-full px-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-2xl transition-all outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {loading ? 'Adding Item...' : 'Save Menu Item'}
                    </button>
                </form>
            </div>
        </div>
    );
}
