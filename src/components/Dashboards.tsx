import React, { useState, useEffect } from 'react';
import { User, Product, Order, AuditLog } from '../types';
import { Plus, Trash, Eye, Brain, RefreshCw, BarChart2, Shield, Settings, CheckCircle, Package, Layers, Users, UserPlus, Check, X, Edit, Info } from 'lucide-react';

interface DashboardsProps {
  user: User;
  products: Product[];
  orders: Order[];
  onSelectProduct: (p: Product) => void;
  onRefreshProducts: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'reviews'>) => Promise<void>;
  onDeleteProduct: (pId: string) => Promise<void>;
  onUpdateOrderStatus: (oId: string, status: Order['status']) => Promise<void>;
}

export default function Dashboards({
  user,
  products,
  orders,
  onSelectProduct,
  onRefreshProducts,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}: DashboardsProps) {
  // New Product Form States (Seller)
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(100);
  const [newProdCategory, setNewProdCategory] = useState('Futuristic Wear');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600');
  const [newProdInventory, setNewProdInventory] = useState(10);
  const [newProdSpecs, setNewProdSpecs] = useState('Material: Graphene G3, Weight: 200g');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin States
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [forecastReport, setForecastReport] = useState('');
  const [loadingForecast, setLoadingForecast] = useState(false);

  // User & Buyer Database Admin States
  const [adminTab, setAdminTab] = useState<'forecast' | 'users'>('forecast');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');
  
  // Create User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'customer' | 'seller' | 'admin'>('customer');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  
  // Edit User State
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] = useState<'customer' | 'seller' | 'admin'>('customer');

  // Fetch Audit Logs and Users for Admin
  useEffect(() => {
    if (user.role === 'admin') {
      fetchAuditLogs();
      fetchUsers();
    }
  }, [user.role]);

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/audit-logs');
      const data = await res.json();
      setAuditLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUserError('');
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      } else {
        setUserError('Failed to synchronize user database.');
      }
    } catch (err) {
      console.error(err);
      setUserError('Network error connecting to user mainframe database.');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');
    if (!newUserEmail) return;

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 500000) + 1500000000000}?auto=format&fit=crop&q=80&w=150`
        })
      });

      const data = await res.json();
      if (res.ok) {
        setNewUserName('');
        setNewUserEmail('');
        setNewUserRole('customer');
        setShowAddUserForm(false);
        fetchUsers();
        fetchAuditLogs(); // Refresh logs
      } else {
        setUserError(data.error || 'Failed to insert user/buyer record.');
      }
    } catch (err) {
      console.error(err);
      setUserError('Connection failure.');
    }
  };

  const handleUpdateUser = async (userId: string) => {
    setUserError('');
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editUserName,
          email: editUserEmail,
          role: editUserRole,
          isApprovedSeller: editUserRole === 'seller' ? true : undefined
        })
      });
      const data = await res.json();
      if (res.ok) {
        setEditingUserId(null);
        fetchUsers();
        fetchAuditLogs();
      } else {
        setUserError(data.error || 'Failed to modify entry.');
      }
    } catch (err) {
      console.error(err);
      setUserError('Update operation failed.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to permanently purge this user registry from the secure database? This will clear all access keys.')) {
      return;
    }
    setUserError('');
    try {
      const res = await fetch(`/api/users/${userId}?adminEmail=${encodeURIComponent(user.email)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
        fetchAuditLogs();
      } else {
        setUserError(data.error || 'Failed to delete database record.');
      }
    } catch (err) {
      console.error(err);
      setUserError('Purge sequence failed.');
    }
  };

  const startEditing = (u: User) => {
    setEditingUserId(u.id);
    setEditUserName(u.name);
    setEditUserEmail(u.email);
    setEditUserRole(u.role);
  };

  // Generate Demand Forecast
  const handleGenerateForecast = async () => {
    setLoadingForecast(true);
    setForecastReport('');
    try {
      const res = await fetch('/api/ai/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const data = await res.json();
      setForecastReport(data.report || 'Forecast completed.');
      fetchAuditLogs(); // Refresh logs
    } catch (err) {
      console.error(err);
      setForecastReport('AI mainframe failed to compile report.');
    } finally {
      setLoadingForecast(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc) return;

    setIsSubmitting(true);
    // Parse specs string into Record
    const specRecord: Record<string, string> = {};
    newProdSpecs.split(',').forEach((s) => {
      const parts = s.split(':');
      if (parts.length === 2) {
        specRecord[parts[0].trim()] = parts[1].trim();
      }
    });

    try {
      await onAddProduct({
        name: newProdName,
        description: newProdDesc,
        price: Number(newProdPrice),
        category: newProdCategory,
        image: newProdImage,
        inventory: Number(newProdInventory),
        sellerId: user.id,
        sellerName: user.name,
        tags: [newProdCategory.toLowerCase().replace(' ', '')],
        specs: specRecord,
      });

      // Clear Form
      setNewProdName('');
      setNewProdDesc('');
      setNewProdPrice(100);
      setNewProdSpecs('Material: Composite, Weight: 150g');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // CUSTOMER DASHBOARD
  // ==========================================
  if (user.role === 'customer') {
    const customerOrders = orders.filter((o) => o.userId === user.id);
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border border-zinc-200 dark:border-white/10 shadow-sm object-cover" />
          <div>
            <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">{user.name}</h2>
            <p className="text-xs text-zinc-500 dark:text-white/40 font-medium font-sans">Verified Customer • {user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Tracking & Ledger */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Your Secure Acquisitions ({customerOrders.length})</span>
            </h3>

            {customerOrders.length > 0 ? (
              <div className="space-y-4">
                {customerOrders.map((order) => (
                  <div key={order.id} className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
                    <div className="flex flex-wrap justify-between items-center border-b border-zinc-200 dark:border-white/10 pb-3 text-xs gap-2">
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-white/95">Order ID: #{order.id}</span>
                        <span className="mx-2 text-zinc-200 dark:text-white/10">|</span>
                        <span className="text-zinc-500 dark:text-white/40 font-medium font-sans">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 dark:text-white/40 font-sans">Total:</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">${order.totalAmount}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                          order.status === 'shipped' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-lg object-cover bg-neutral-900 border border-zinc-200 dark:border-white/5 shrink-0" />
                          <div className="min-w-0 flex-grow font-sans">
                            <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.productName}</h5>
                            <span className="text-[10px] text-zinc-500 dark:text-white/40">Quantity: {item.quantity} x ${item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Step Tracker Details */}
                    <div className="pt-3 border-t border-zinc-200 dark:border-white/10 space-y-2">
                      <p className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider font-sans">Acquisition Status Steps</p>
                      <div className="grid grid-cols-4 gap-2">
                        {order.trackingSteps.map((step, idx) => (
                          <div key={idx} className="space-y-1 font-sans">
                            <div className={`h-1.5 rounded-full ${step.completed ? 'bg-blue-500' : 'bg-zinc-200 dark:bg-neutral-800'}`} />
                            <h6 className={`text-[10px] font-bold ${step.completed ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-white/30'}`}>{step.title}</h6>
                            <p className="text-[8px] text-zinc-500 dark:text-white/40 leading-tight line-clamp-1">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl text-center space-y-2">
                <p className="text-xs text-zinc-500 dark:text-white/40 italic font-sans">No acquisitions found in the server log.</p>
              </div>
            )}
          </div>

          {/* Customer Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Credentials & Settings</span>
            </h3>

            <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Insured Address Vault</span>
                <p className="text-xs text-zinc-700 dark:text-white/70 leading-relaxed font-light font-sans">
                  Sowmya Mendum<br />
                  128 Quantum Lane, Horizon West<br />
                  Silicon Valley, CA 94025<br />
                  United States
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-zinc-200 dark:border-white/10">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Carbon Neutral Offset Level</span>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-sans">Tier 3 Platinum (2.4 tons offset)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SELLER DASHBOARD
  // ==========================================
  if (user.role === 'seller') {
    const sellerProducts = products.filter((p) => p.sellerId === user.id || p.sellerId === 'sell-1');
    const totalEarnings = orders.reduce((acc, o) => acc + o.totalAmount, 0);

    return (
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border border-zinc-200 dark:border-white/10 shadow-sm object-cover" />
            <div>
              <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">{user.name}</h2>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold font-sans">Verified Corporate Seller • Approved</p>
            </div>
          </div>
          <button
            onClick={onRefreshProducts}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/80 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Synchronize Listings</span>
          </button>
        </div>

        {/* Sales Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Combined Gross Sales</span>
            <p className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">${totalEarnings.toFixed(2)}</p>
          </div>
          <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Listed Catalog Skus</span>
            <p className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">{sellerProducts.length}</p>
          </div>
          <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Seller Rating</span>
            <p className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mt-1 font-sans">4.8★</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List New Product Form */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Deploy New Sku</span>
            </h3>

            <form onSubmit={handleCreateProduct} className="bg-zinc-50/50 dark:bg-[#0d0d0d] p-5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
              <div className="space-y-1 font-sans">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AeroShell Trenchcoat"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1 font-sans">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed futuristic features..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full text-xs p-3 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-sans transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 font-sans">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Inventory</label>
                  <input
                    type="number"
                    required
                    value={newProdInventory}
                    onChange={(e) => setNewProdInventory(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1 font-sans">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-sans transition-colors"
                >
                  {['Futuristic Wear', 'Ambient Living', 'Cybernetic Gear', 'Eco Luxury', 'Smart Wellness'].map((c) => (
                    <option key={c} value={c} className="bg-white text-zinc-900 dark:bg-black dark:text-white font-sans">{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 font-sans">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Product Image URL</label>
                <input
                  type="text"
                  required
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
                />
              </div>

              <div className="space-y-1 font-sans">
                <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Specs (Comma separated key:val)</label>
                <input
                  type="text"
                  value={newProdSpecs}
                  onChange={(e) => setNewProdSpecs(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white transition-all disabled:opacity-50 cursor-pointer border border-transparent shadow-md"
              >
                {isSubmitting ? 'Deploying...' : 'Deploy Sku to Mainframe'}
              </button>
            </form>
          </div>

          {/* Active Listings Table */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Active Sku Ledger ({sellerProducts.length})</span>
            </h3>

            <div className="bg-white dark:bg-[#090909] rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-black/40 text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider border-b border-zinc-200 dark:border-white/10">
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/10 text-xs text-zinc-900 dark:text-white/90 font-sans">
                  {sellerProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-neutral-950 border border-zinc-200 dark:border-white/5" />
                        <div className="min-w-0">
                          <h5 className="font-bold text-zinc-900 dark:text-white truncate">{p.name}</h5>
                          <span className="text-[10px] text-zinc-400 dark:text-white/40 font-mono">ID: {p.id}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-600 dark:text-white/50 font-medium">{p.category}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">${p.price}</td>
                      <td className="p-4">
                        <span className={`font-mono font-bold ${p.inventory < 5 ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-white/60'}`}>
                          {p.inventory}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="p-1.5 text-zinc-400 dark:text-white/40 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 rounded-lg border border-transparent transition-all cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-zinc-400 dark:text-white/40 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500/30 rounded-lg border border-transparent transition-all cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================
  if (user.role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">Operator Mainframe</h2>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold font-sans">Systems Administrator Mode • Level 5 Auth</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                fetchAuditLogs();
                fetchUsers();
              }}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/80 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Synchronize Database</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Admin */}
        <div className="flex border-b border-zinc-200 dark:border-white/10 gap-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setAdminTab('forecast')}
            className={`pb-3 relative transition-colors ${
              adminTab === 'forecast'
                ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-white/40 dark:hover:text-white/80'
            } cursor-pointer`}
          >
            <span>Logistics & Forecasting</span>
            {adminTab === 'forecast' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
            )}
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`pb-3 relative transition-colors ${
              adminTab === 'users'
                ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-white/40 dark:hover:text-white/80'
            } cursor-pointer`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>User & Buyer Database Registry</span>
            </span>
            {adminTab === 'users' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
            )}
          </button>
        </div>

        {adminTab === 'forecast' ? (
          <>
            {/* Global Admin Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 animate-fade-in">
              <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Global Sku Catalog</span>
                <p className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">{products.length}</p>
              </div>
              <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Global Order Volume</span>
                <p className="font-display text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">{orders.length}</p>
              </div>
              <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">System Health</span>
                <p className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-sans">99.98% OK</p>
              </div>
              <div className="bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <span className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block font-sans">Carbon Net Zero status</span>
                <p className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-sans">ACTIVE</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
              {/* Transparent AI Forecasting Panel */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-5 rounded-3xl bg-gradient-to-tr from-blue-900/5 via-zinc-100/30 to-cyan-900/5 dark:from-blue-950 dark:via-[#101010] dark:to-cyan-950 text-zinc-900 dark:text-white glow-ambient relative overflow-hidden border border-zinc-200 dark:border-white/10 animate-fade-in shadow-sm dark:shadow-none">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
                        <Brain className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">Gemini Quarterly Demand Forecast</h3>
                        <p className="text-[10px] text-zinc-500 dark:text-white/40 font-sans">AI-driven predictive stocking & trend reporting</p>
                      </div>
                    </div>
                    <button
                      onClick={handleGenerateForecast}
                      disabled={loadingForecast}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-zinc-900 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white transition-all cursor-pointer shadow-sm border border-transparent"
                    >
                      <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>{loadingForecast ? 'Computing Mainframe...' : 'Initiate Forecast'}</span>
                    </button>
                  </div>

                  {forecastReport ? (
                    <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 text-xs leading-relaxed space-y-3 font-light text-zinc-800 dark:text-blue-100 max-h-96 overflow-y-auto font-sans">
                      <div className="prose prose-xs">
                        {forecastReport.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('#') ? 'font-bold text-blue-600 dark:text-blue-400 mt-2 text-sm' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-zinc-200 dark:border-white/10 rounded-2xl text-center space-y-2">
                      <p className="text-xs text-zinc-500 dark:text-white/40 italic font-sans">No forecast initialized. Click the trigger button to evaluate active inventory against trend metrics.</p>
                    </div>
                  )}
                </div>

                {/* Order Moderation / Fulfilment Status controller */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-white">Order Dispatch Center ({orders.length})</h3>
                  <div className="bg-white dark:bg-[#090909] rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none font-sans">
                    <div className="p-4 bg-zinc-50 dark:bg-black/40 border-b border-zinc-200 dark:border-white/10">
                      <p className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase font-sans">Operational orders pending shipment</p>
                    </div>
                    {orders.length > 0 ? (
                      <div className="divide-y divide-zinc-100 dark:divide-white/10 max-h-72 overflow-y-auto text-zinc-900 dark:text-white/90">
                        {orders.map((o) => (
                          <div key={o.id} className="p-4 flex justify-between items-center text-xs hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-colors font-sans">
                            <div>
                              <p className="font-bold text-zinc-900 dark:text-white">Order #{o.id}</p>
                              <p className="text-zinc-500 dark:text-white/40 text-[10px]">Client: {o.userName} ({o.shippingAddress.city})</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={o.status}
                                onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                                className="text-xs py-1 px-2.5 bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-lg text-zinc-900 dark:text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="pending" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Pending</option>
                                <option value="processing" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Processing</option>
                                <option value="shipped" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Shipped</option>
                                <option value="delivered" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Delivered</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="p-4 text-xs text-zinc-500 dark:text-white/40 italic font-sans">No global orders recorded.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Audit Logs System Trail */}
              <div className="lg:col-span-4 space-y-6">
                <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Security Audit Trail</span>
                </h3>

                <div className="bg-zinc-50/50 dark:bg-[#0e0e0e] p-4 rounded-2xl border border-zinc-200 dark:border-white/10 max-h-[500px] overflow-y-auto space-y-3 shadow-sm dark:shadow-none">
                  {auditLogs.length > 0 ? (
                    auditLogs.map((log) => (
                      <div key={log.id} className="text-[10px] space-y-1 p-2.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-white/10 shadow-sm font-sans">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-800 dark:text-white uppercase tracking-tight">{log.action}</span>
                          <span className="text-zinc-400 dark:text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400 dark:text-white/40 font-mono">
                          <span>{log.userEmail}</span>
                          <span>{log.ipAddress}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500 dark:text-white/40 italic font-sans">No logs logged.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* User & Buyer Database Registry Tab */
          <div className="space-y-6 animate-fade-in">
            {/* Database Header Summary and Add User Trigger */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-50/50 dark:bg-[#0e0e0e]/60 p-6 rounded-2xl border border-zinc-200 dark:border-white/10">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Real-Time User & Buyer Records</span>
                </h3>
                <p className="text-xs text-zinc-500 dark:text-white/40 leading-relaxed font-sans">
                  Total of <span className="font-bold text-blue-500">{usersList.length} entities</span> cataloged in the active relational repository. Synchronized with checkout ledger.
                </p>
              </div>
              <button
                onClick={() => setShowAddUserForm(!showAddUserForm)}
                className="px-4 py-2 bg-zinc-900 hover:bg-blue-600 text-white dark:bg-white dark:text-black dark:hover:bg-blue-500 dark:hover:text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer border border-transparent shadow-sm"
              >
                {showAddUserForm ? <X className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                <span>{showAddUserForm ? 'Close Registration Form' : 'Register New User/Buyer'}</span>
              </button>
            </div>

            {/* Error Message Box */}
            {userError && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium font-sans flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-500" />
                <span>{userError}</span>
              </div>
            )}

            {/* Manual New User Registration Form */}
            {showAddUserForm && (
              <form onSubmit={handleCreateUser} className="bg-zinc-50/50 dark:bg-[#0d0d0d] p-6 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-4 animate-fade-in shadow-sm dark:shadow-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sowmya Mendum"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Secure Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. buyer@apex.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Database Access Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as any)}
                      className="w-full text-xs px-2.5 py-2 bg-white dark:bg-black text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-sans transition-colors"
                    >
                      <option value="customer" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Customer / Buyer</option>
                      <option value="seller" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Verified Merchant / Seller</option>
                      <option value="admin" className="bg-white text-zinc-900 dark:bg-black dark:text-white">Chief Administrator</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Insert New Database Registry Entry
                  </button>
                </div>
              </form>
            )}

            {/* Users list table */}
            <div className="bg-white dark:bg-[#090909] rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none font-sans">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-black/40 text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider border-b border-zinc-200 dark:border-white/10">
                    <th className="p-4">User Identity</th>
                    <th className="p-4">Secure Email Address</th>
                    <th className="p-4">System Role</th>
                    <th className="p-4">Checkout Ledger History</th>
                    <th className="p-4 text-right">Database Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/10 text-xs text-zinc-900 dark:text-white/90">
                  {usersList.map((u) => {
                    // Cross-reference user orders
                    const userOrders = orders.filter(o => o.userId === u.id || o.userName.toLowerCase() === u.name.toLowerCase() || o.id === u.id);
                    const totalSpend = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);

                    const isEditing = editingUserId === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editUserName}
                              onChange={(e) => setEditUserName(e.target.value)}
                              className="px-2 py-1 bg-white dark:bg-black border border-zinc-300 dark:border-white/10 rounded-lg text-xs"
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover bg-neutral-900 border border-zinc-200 dark:border-white/5" />
                              <div>
                                <h5 className="font-bold text-zinc-900 dark:text-white">{u.name}</h5>
                                <span className="text-[10px] text-zinc-400 dark:text-white/30 font-mono">UID: {u.id}</span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-mono text-zinc-600 dark:text-white/60">
                          {isEditing ? (
                            <input
                              type="email"
                              value={editUserEmail}
                              onChange={(e) => setEditUserEmail(e.target.value)}
                              className="px-2 py-1 bg-white dark:bg-black border border-zinc-300 dark:border-white/10 rounded-lg text-xs font-mono"
                            />
                          ) : (
                            u.email
                          )}
                        </td>
                        <td className="p-4">
                          {isEditing ? (
                            <select
                              value={editUserRole}
                              onChange={(e) => setEditUserRole(e.target.value as any)}
                              className="px-2 py-1 bg-white dark:bg-black border border-zinc-300 dark:border-white/10 rounded-lg text-xs"
                            >
                              <option value="customer">customer</option>
                              <option value="seller">seller</option>
                              <option value="admin">admin</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'admin' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' :
                              u.role === 'seller' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                              'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            }`}>
                              {u.role}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <span className="font-bold text-zinc-900 dark:text-white font-mono">${totalSpend.toFixed(2)}</span>
                            <span className="text-[10px] text-zinc-500 dark:text-white/40 block">
                              {userOrders.length} acquisition logs
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right space-x-1.5">
                          {isEditing ? (
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={() => handleUpdateUser(u.id)}
                                className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg border border-transparent cursor-pointer font-bold"
                                title="Save changes"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg border border-transparent cursor-pointer"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={() => startEditing(u)}
                                className="p-1.5 text-zinc-400 hover:text-blue-600 dark:text-white/40 dark:hover:text-blue-400 rounded-lg border border-transparent transition-all cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 text-zinc-400 hover:text-rose-600 dark:text-white/40 dark:hover:text-rose-400 rounded-lg border border-transparent transition-all cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
