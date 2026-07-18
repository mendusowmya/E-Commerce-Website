import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ChevronRight, ArrowRight, Activity, Globe, Leaf, Zap } from 'lucide-react';

interface HeroProps {
  featuredProducts: Product[];
  onExploreProduct: (p: Product) => void;
  onExploreCatalog: (category?: string) => void;
}

export default function Hero({ featuredProducts, onExploreProduct, onExploreCatalog }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slide every 6 seconds
  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  const activeProduct = featuredProducts[currentSlide] || null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-[#050505] dark:via-[#0b0b0b] dark:to-[#050505] py-24 px-6 border-b border-zinc-200/60 dark:border-white/5 transition-colors duration-300">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/5 to-emerald-500/5 dark:from-blue-400/10 dark:to-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
            <Zap className="w-3 h-3 text-blue-500 dark:text-blue-400 animate-pulse" />
            <span>AI-Driven Future Retail</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-tight text-zinc-900 dark:text-white leading-none">
            Synthesizing <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 dark:from-blue-500 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent font-normal">
              Luxury & Neurotech
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-xl font-sans">
            Welcome to Apex. We formulate responsive, bio-adaptive apparel and circadian ambient systems engineered for the modern high-performance workspace.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onExploreCatalog()}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-zinc-200/50 dark:shadow-white/5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onExploreCatalog('Cybernetic Gear')}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Neuro Wear</span>
              <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-white/40" />
            </button>
          </div>

          {/* Core Sustainable Metrics */}
          <div className="pt-8 border-t border-zinc-200 dark:border-white/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">100%</p>
              <p className="text-xs text-zinc-500 dark:text-white/40 font-medium flex items-center gap-1.5 mt-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Carbon Offset</span>
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">4.9★</p>
              <p className="text-xs text-zinc-500 dark:text-white/40 font-medium flex items-center gap-1.5 mt-1">
                <Activity className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>Bio Validation</span>
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">Global</p>
              <p className="text-xs text-zinc-500 dark:text-white/40 font-medium flex items-center gap-1.5 mt-1">
                <Globe className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>Smart Insured</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Active Product Banner (Circadian Carousel) */}
        {activeProduct && (
          <div className="lg:col-span-5 relative">
            {/* Ambient Background Glow matching category */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl transform -rotate-3 scale-95 pointer-events-none animate-pulse" />

            <div className="relative bg-white dark:bg-[#0d0d0d]/80 border border-zinc-200 dark:border-white/10 p-6 rounded-3xl shadow-xl dark:shadow-2xl flex flex-col justify-between transition-all duration-700 transform hover:scale-[1.01]">
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 aspect-video mb-6">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover transition-transform duration-1000 transform hover:scale-115"
                />
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-400 border border-white/10 uppercase">
                  Featured Product
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                    {activeProduct.name}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 whitespace-nowrap">
                    ${activeProduct.price}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-white/60 line-clamp-2 leading-relaxed font-sans">
                  {activeProduct.description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-zinc-200 dark:border-white/10">
                  <div className="flex gap-1.5">
                    {featuredProducts.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentSlide === i ? 'w-5 bg-blue-500' : 'w-1.5 bg-zinc-300 dark:bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => onExploreProduct(activeProduct)}
                    className="text-xs font-semibold text-zinc-600 dark:text-white/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Analyze Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
