import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { getMenuItems, getCategories } from '../../../actions/menu';
import Link from 'next/link';

export default async function ManageItemsPage() {
    const items = await getMenuItems();
    const categories = await getCategories();

    return (
        <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Manage Menu</h1>
                    <p className="text-slate-500">Add, edit or remove items from your public menu.</p>
                </div>
                <Link
                    href="/admin/items/new"
                    className="bg-primary-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-400 transition-all flex items-center gap-2 shadow-lg shadow-primary-500/20"
                >
                    <Plus className="w-5 h-5" /> Add New Item
                </Link>
            </header>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 rounded-xl transition-all outline-none"
                    />
                </div>
                <select className="bg-slate-50 px-6 py-3 rounded-xl border-transparent outline-none focus:ring-2 focus:ring-primary-500/20 w-full md:w-auto">
                    <option>All Categories</option>
                    {categories.map(c => <option key={c.id}>{c.nameEn}</option>)}
                </select>
            </div>

            {/* Items Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-8 py-5 font-bold text-slate-600">Item</th>
                            <th className="px-8 py-5 font-bold text-slate-600">Category</th>
                            <th className="px-8 py-5 font-bold text-slate-600">Price</th>
                            <th className="px-8 py-5 font-bold text-slate-600">Status</th>
                            <th className="px-8 py-5 font-bold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                                    No items found. Click "Add New Item" to get started.
                                </td>
                            </tr>
                        ) : items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                                            {item.imageUrl || '🍲'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{item.nameEn}</p>
                                            <p className="text-xs text-slate-400 max-w-[200px] truncate">{item.descriptionEn}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                        {item.category.nameEn}
                                    </span>
                                </td>
                                <td className="px-8 py-5 font-bold text-slate-900">${item.price.toFixed(2)}</td>
                                <td className="px-8 py-5">
                                    <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> In Stock
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-400 hover:text-primary-500 transition-colors">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
