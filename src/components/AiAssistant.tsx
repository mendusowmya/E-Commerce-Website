import React, { useState, useEffect, useRef } from 'react';
import { Product, Message, CartItem } from '../types';
import { Brain, X, Send, Sparkles, ShoppingBag, Plus, MessageCircle } from 'lucide-react';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
}

export default function AiAssistant({
  isOpen,
  onClose,
  cart,
  onAddToCart,
}: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Greetings! I am the Apex Intelligent Shopping Companion, initialized to help you navigate our elite lines of bio-adaptive apparel, circadian lighting, and smart health tech. What wellness parameters are you looking to optimize today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Fetch response from server-side proxy
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          cartItems: cart,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Apologies, my synaptic processor encountered an error: ${data.error}. Please try again shortly.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            products: data.products,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble reaching the main synaptic mainframe. Please check your API secrets or connectivity.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-[#090909]/95 backdrop-blur-xl shadow-2xl border-l border-zinc-200 dark:border-white/10 flex flex-col justify-between transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between bg-zinc-50 dark:bg-black/50 text-zinc-900 dark:text-white rounded-tl-2xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-tight flex items-center gap-1">
              <span>Apex AI Concierge</span>
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </h3>
            <span className="text-[10px] text-zinc-500 dark:text-white/40">Circadian & Neuro Wear Expert</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-400 dark:text-white/40 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-zinc-50/60 dark:bg-[#050505]/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] space-y-1 ${
              m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {/* Timestamp/User identifier */}
            <span className="text-[9px] text-zinc-400 dark:text-white/30 font-medium px-1">
              {m.role === 'user' ? 'You' : 'Apex Concierge'} • {m.timestamp}
            </span>

            {/* Bubble */}
            <div
              className={`text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-medium rounded-tr-none'
                  : 'bg-white text-zinc-800 dark:bg-[#0e0e0e] dark:text-white/90 rounded-tl-none border border-zinc-200 dark:border-white/10 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>

            {/* Embedded Recommended Product Cards */}
            {m.products && m.products.length > 0 && (
              <div className="w-full mt-2.5 space-y-2">
                <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block">AI Recommendations</span>
                {m.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-tr from-zinc-50 to-blue-50/10 dark:from-[#0d0d0d] dark:to-blue-950/20 border border-zinc-200 dark:border-white/10 shadow-sm transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-950 border border-white/5 shrink-0"
                    />
                    <div className="min-w-0 flex-grow text-left">
                      <h5 className="font-display font-bold text-[11px] text-zinc-900 dark:text-white truncate leading-tight">{p.name}</h5>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">${p.price}</span>
                    </div>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-1.5 rounded-lg bg-zinc-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-black dark:hover:text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="Add Recommended to Cart"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex flex-col max-w-[80%] mr-auto items-start space-y-1 animate-pulse">
            <span className="text-[9px] text-zinc-400 dark:text-white/30 font-medium px-1">Apex Concierge is formulating...</span>
            <div className="bg-white dark:bg-[#0e0e0e] text-zinc-500 dark:text-white/40 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-white/10 p-3.5 flex items-center gap-2 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-[#0c0c0c] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask our AI about biofeedback, sol lights, sizing..."
          disabled={loading}
          className="flex-grow text-xs px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:bg-[#141414] transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-zinc-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-black dark:hover:text-white disabled:opacity-30 transition-all cursor-pointer border border-transparent shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
