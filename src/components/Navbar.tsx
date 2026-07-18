import React from 'react';
import { User, CartItem, Product } from '../types';
import { ShoppingCart, Heart, Brain, LogIn, Sparkles, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  cart: CartItem[];
  products: Product[];
  wishlist: string[];
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
  onLoginClick: () => void;
  onChangeRole: (role: 'customer' | 'seller' | 'admin') => void;
}

export default function Navbar({
  user,
  cart,
  products,
  wishlist,
  activeView,
  setActiveView,
  onOpenCart,
  onOpenAssistant,
  onLoginClick,
  onChangeRole,
}: NavbarProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/40 border-b border-white/10 backdrop-blur-xl px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-white group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-md group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-white font-bold tracking-tighter">
            APEX<span className="text-blue-500 font-normal text-xs tracking-widest bg-blue-500/10 px-2 py-0.5 rounded ml-2 uppercase">AI</span>
          </span>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {[
            { id: 'landing', label: 'Home' },
            { id: 'products', label: 'Catalog' },
            { id: 'blogs', label: 'Insights' },
            { id: 'about', label: 'Philosophy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeView === tab.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick AI Shopping Assistant Shortcut */}
          <button
            onClick={onOpenAssistant}
            className="relative flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Open AI Shopping Companion"
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Companion</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => setActiveView('products')}
            className="relative p-2 text-white/60 hover:text-rose-500 rounded-full hover:bg-white/5 transition-colors"
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-white/60 hover:text-blue-400 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-[10px] font-bold text-white shadow-sm ring-2 ring-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Authentication & Role Controller */}
          {user ? (
            <div className="flex items-center gap-2 bg-white/5 p-1 pr-3 rounded-full border border-white/10">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-white/10"
              />
              
              {/* Role Selection Dropdown (For Workspace demonstration ease) */}
              <select
                value={user.role}
                onChange={(e) => onChangeRole(e.target.value as any)}
                className="bg-transparent border-none text-xs font-semibold text-white/80 focus:ring-0 cursor-pointer pr-1"
              >
                <option value="customer" className="bg-[#0e0e0e] text-white">Buyer: {user.name.split(' ')[0]}</option>
                <option value="seller" className="bg-[#0e0e0e] text-white">Seller Mode</option>
                <option value="admin" className="bg-[#0e0e0e] text-white">Admin Operator</option>
              </select>

              {/* Status Badge */}
              <button
                onClick={() => setActiveView('dashboard')}
                className="p-1 hover:text-blue-400 text-white/40 rounded-full transition-colors"
                title="Go to Dashboard"
              >
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                ) : user.role === 'seller' ? (
                  <UserCheck className="w-4 h-4 text-blue-400" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-white/40" />
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-400 transition-colors cursor-pointer"
            >
              <span>Connect Workspace</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
