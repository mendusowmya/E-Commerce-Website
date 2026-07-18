import React from 'react';
import { Product } from '../types';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (pId: string) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white dark:bg-[#0d0d0d]/80 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg dark:shadow-2xl hover:shadow-blue-500/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image & Top Actions */}
      <div className="relative overflow-hidden aspect-square bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Soft shadow gradients over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/60 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Category Label */}
        <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white/80 border border-white/10 text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
          {product.category}
        </span>
      </div>

      {/* Card Info Content */}
      <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-zinc-700 dark:text-white/80">{product.rating}</span>
              <span className="text-[10px] text-zinc-400 dark:text-white/40">({product.reviewsCount})</span>
            </div>
            
            {/* In-Stock Status */}
            {product.inventory === 0 ? (
              <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Sold Out</span>
            ) : product.inventory < 5 ? (
              <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Only {product.inventory} left</span>
            ) : null}
          </div>

          <h4 className="font-display font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h4>

          <p className="text-xs text-zinc-600 dark:text-white/60 line-clamp-2 font-light leading-relaxed font-sans">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between mt-auto">
          {/* Price */}
          <span className="font-display text-base font-extrabold text-zinc-900 dark:text-white">
            ${product.price}
          </span>

          {/* Action Triggers */}
          <div className="flex gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="p-1.5 text-zinc-500 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-white/10 transition-all cursor-pointer"
              title="Analyze Specs"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.inventory === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                product.inventory === 0
                  ? 'bg-zinc-200 text-zinc-400 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed'
                  : 'bg-zinc-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white font-bold uppercase tracking-wider border border-transparent shadow-sm'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
