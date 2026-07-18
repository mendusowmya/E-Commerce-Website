import React, { useState } from 'react';
import { Product, Review, ProductVersion } from '../types';
import { X, Star, Brain, Sparkles, Send, PenTool, Check, Cpu } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, versionId?: string) => void;
  onAddReview: (pId: string, review: { userName: string; rating: number; comment: string }) => Promise<void>;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddReview,
}: ProductDetailModalProps) {
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Selected version/model ID
  const [selectedVersionId, setSelectedVersionId] = useState<string | undefined>(
    product.versions && product.versions.length > 0 ? product.versions[0].id : undefined
  );

  // AI Summary States
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState('');

  // Resolve active version specific values
  const activeVersion = product.versions?.find((v) => v.id === selectedVersionId);
  const currentPrice = activeVersion ? activeVersion.price : product.price;
  const currentSpecs = activeVersion ? { ...product.specs, ...activeVersion.specs } : product.specs;
  const currentInventory = activeVersion ? activeVersion.inventory : product.inventory;

  // Fetch AI review summarization from server
  const handleGenerateAiSummary = async () => {
    setLoadingAi(true);
    setAiError('');
    try {
      const res = await fetch(`/api/products/${product.id}/ai-summary`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.error) {
        setAiError(data.error);
      } else {
        setAiSummary(data.summary);
      }
    } catch (err: any) {
      setAiError('Failed to establish connection to the AI Synthesizer.');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      await onAddReview(product.id, {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewSuccess(true);
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      // Automatically reset success state after 3 seconds
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#090909]/95 rounded-3xl shadow-2xl border border-zinc-200 dark:border-white/10 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row text-zinc-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 dark:text-white/40 hover:text-zinc-950 dark:hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image & Technical Specs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 space-y-6 bg-zinc-50/50 dark:bg-transparent">
          <div className="rounded-2xl overflow-hidden bg-neutral-900 aspect-video md:aspect-square shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-white/5 pb-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm uppercase tracking-wider">
                Engineering Specifications
              </h4>
            </div>
            
            <div className="bg-zinc-100/55 dark:bg-white/5 rounded-2xl p-4 border border-zinc-200/60 dark:border-white/5 space-y-2.5">
              {Object.entries(currentSpecs || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 dark:text-white/40 font-medium">{key}</span>
                  <span className="text-zinc-900 dark:text-white font-mono font-medium text-right ml-4">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Product Details, Reviews, AI Synthesis */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
          {/* Header Info */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 inline-block mb-2">
                {product.category}
              </span>
              <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-white leading-tight">
                {product.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-zinc-700 dark:text-white/80">{product.rating}</span>
                <span className="text-[10px] text-zinc-400 dark:text-white/40">({product.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-zinc-200 dark:text-white/10">|</span>
              <span className="text-[10px] text-zinc-400 dark:text-white/40 font-medium">Distributed by {product.sellerName}</span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-white/60 font-light leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Versions & Models Selector Section */}
            {product.versions && product.versions.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-white/50 flex items-center gap-1">
                  <span>Available Specs & Models</span>
                  <span className="text-[10px] lowercase font-normal">({product.versions.length} models)</span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.versions.map((ver) => {
                    const isActive = selectedVersionId === ver.id;
                    return (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => setSelectedVersionId(ver.id)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/50 dark:bg-blue-500/10 border-blue-500 ring-1 ring-blue-500'
                            : 'bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 border-zinc-200 dark:border-white/10'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-zinc-950 dark:text-white">
                            {ver.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-white/40 font-mono">
                            <span>Stock: {ver.inventory > 0 ? `${ver.inventory} left` : 'Out of Stock'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">${ver.price}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isActive ? 'border-blue-500 bg-blue-500 text-white' : 'border-zinc-300 dark:border-white/20'
                          }`}>
                            {isActive && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing and Action Row */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Unit Price</span>
                <span className="font-display text-3xl font-extrabold text-zinc-900 dark:text-white">${currentPrice}</span>
              </div>
              <button
                onClick={() => onAddToCart(product, selectedVersionId)}
                disabled={currentInventory === 0}
                className={`px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer border border-transparent ${
                  currentInventory === 0
                    ? 'bg-zinc-200 text-zinc-400 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed'
                    : 'bg-zinc-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white shadow-zinc-200/50 dark:shadow-white/5'
                }`}
              >
                {currentInventory === 0 ? 'Out of Stock' : 'Add to Collection'}
              </button>
            </div>
          </div>

          {/* Transparent AI Review Summarizer Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 dark:from-blue-950/40 dark:to-cyan-950/40 border border-blue-500/20 space-y-3 relative glow-ambient">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <Brain className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold tracking-tight">AI Review Summarizer</span>
              </div>
              <span className="text-[9px] font-mono font-semibold text-cyan-600 dark:text-cyan-400/80 uppercase">Gemini Powered</span>
            </div>

            {aiSummary ? (
              <div className="space-y-2">
                <p className="text-xs text-blue-900 dark:text-blue-100 leading-relaxed font-light italic bg-zinc-100/50 dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/5 font-sans">
                  "{aiSummary}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-zinc-500 dark:text-white/40">Ethics Check: Synthesized solely from factual buyer ratings.</span>
                  <button
                    onClick={handleGenerateAiSummary}
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] text-blue-700 dark:text-blue-300/80 font-light leading-snug font-sans">
                  Need a quick sentiment overview? Synthesize all ratings instantly.
                </p>
                <button
                  onClick={handleGenerateAiSummary}
                  disabled={loadingAi}
                  className="shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{loadingAi ? 'Synthesizing...' : 'Summarize'}</span>
                </button>
              </div>
            )}
            {aiError && <p className="text-[10px] text-rose-500 dark:text-rose-400 font-semibold">{aiError}</p>}
          </div>

          {/* Reviews List & Write Form */}
          <div className="space-y-4 pt-3 border-t border-zinc-200 dark:border-white/10">
            <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm flex items-center gap-1.5">
              <span>Customer Ledger</span>
              <span className="text-xs font-normal text-zinc-500 dark:text-white/40">({product.reviews?.length || 0})</span>
            </h4>

            {/* Scrollable Reviews */}
            <div className="max-h-40 overflow-y-auto space-y-3 pr-1">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((r) => (
                  <div key={r.id} className="text-xs space-y-1 bg-zinc-50 dark:bg-white/5 p-3 rounded-xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-900 dark:text-white/90">{r.userName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-zinc-600 dark:text-white/60 font-light leading-relaxed font-sans">{r.comment}</p>
                    <span className="text-[9px] text-zinc-400 dark:text-white/30 block">{r.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500 dark:text-white/40 italic font-sans">No reviews logged yet. Be the first to express opinions.</p>
              )}
            </div>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-3 bg-zinc-50/50 dark:bg-white/5 p-4 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-1 text-xs font-bold text-zinc-800 dark:text-white/80">
                <PenTool className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Submit Verified Experience</span>
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors font-sans"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full text-xs px-2.5 py-2 bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-sans"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n} className="bg-white text-zinc-900 dark:bg-black dark:text-white font-sans">{n} Stars</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative">
                <textarea
                  required
                  rows={2}
                  placeholder="Share details of your experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full text-xs p-3 bg-zinc-50 dark:bg-black rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="absolute right-2 bottom-3 p-1.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50 cursor-pointer border border-transparent"
                >
                  {reviewSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 font-bold" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
