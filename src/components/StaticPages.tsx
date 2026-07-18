import React, { useState } from 'react';
import { INITIAL_BLOGS } from '../data/initialData';
import { BlogPost } from '../types';
import { BookOpen, MapPin, Mail, Phone, FileText, CheckCircle, ChevronDown, Award, Globe, Heart } from 'lucide-react';

interface StaticPagesProps {
  view: 'blogs' | 'about' | 'contact' | 'faq' | 'privacy' | 'terms';
}

export default function StaticPages({ view }: StaticPagesProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    { q: 'How does the circadian Sol Ambient Lamp synchronize?', a: 'The Sol Lamp integrates with your device clock, slowly shifting internal Kelvin levels from a vibrant 5500K clinical daylight during focus windows, down to a soft 1800K low-blue spectrum at sunset to assist circadian melatonin release.' },
    { q: 'What sensors are utilized in the NeuralBand Headband?', a: 'The NeuralBand utilizes 7 gold-plated dry EEG sensing pods arrayed across prefrontal cortex nodes. These record low-frequency alpha and theta waves to map cognitive workload and supply gentle bone-conduction audio cues.' },
    { q: 'How can I list my products as an approved Seller?', a: 'Sellers can switch roles from the top Navbar to "Seller Mode" and instantly register. Approved corporate sellers can list new futuristic SKUs, adjust inventory counts, and review real-time gross revenue metrics directly from their panel.' },
    { q: 'Is my transaction secured with real banking standards?', a: 'Absolutely. We utilize highly secured, simulated Stripe credit verification cards, fully guarding client data integrity in compliance with PCI-DSS guidelines. No real transaction funds are evaluated.' }
  ];

  // ==========================================
  // INSIGHTS (BLOGS) PAGE
  // ==========================================
  if (view === 'blogs') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">Apex Chronicles</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-white">Adaptive Living & Technology</h2>
          <p className="text-xs text-zinc-500 dark:text-white/40 font-light font-sans">Explore our curated editorial journals documenting circadian science, cybernetic wear, and biofeedback engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {INITIAL_BLOGS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-white dark:bg-[#0e0e0e]/60 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 shadow-md dark:shadow-none transition-all flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-video bg-neutral-950">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <span className="absolute bottom-3 left-3 bg-white dark:bg-[#050505]/95 backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-500 dark:text-white/40 font-medium">{post.date} • {post.readTime}</span>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-white/50 font-light leading-relaxed line-clamp-2 font-sans">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs mt-auto font-semibold text-zinc-700 group-hover:text-blue-600 dark:text-white/80 dark:group-hover:text-blue-400">
                  <span>Written by {post.author}</span>
                  <span className="underline decoration-blue-500/40">Read Article</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Post Modal Overlay */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#090909] rounded-3xl shadow-2xl border border-zinc-200 dark:border-white/10 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 dark:text-white/40 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                  {selectedPost.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-white leading-tight">{selectedPost.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-white/40">{selectedPost.date} • Published by {selectedPost.author} • {selectedPost.readTime}</p>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-neutral-950 border border-zinc-200 dark:border-white/10">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-xs text-zinc-700 dark:text-white/70 font-light leading-relaxed space-y-4 font-sans">
                <p>{selectedPost.content}</p>
                <p className="text-zinc-500 dark:text-white/40">As we transition into deeper integrations between software and tactile design, e-commerce collections such as Apex AI continue to synthesize these domains under strict biometric validation standards, providing users with verifiable improvements in cognitive stamina and general physical longevity.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // ABOUT (PHILOSOPHY) PAGE
  // ==========================================
  if (view === 'about') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">Corporate Creed</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-white">Adaptive Architectural Wear</h2>
          <p className="text-xs text-zinc-500 dark:text-white/40 font-light font-sans">We formulate responsive interfaces designed to reinforce biological wellness and maximize intellectual longevity.</p>
        </div>

        {/* Pillars bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="bg-white dark:bg-[#0e0e0e]/60 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white">Biometric Verification</h4>
            <p className="text-xs text-zinc-500 dark:text-white/40 leading-relaxed font-light font-sans">
              Every garment in our catalog is engineered with discrete EEG grids or climate response matrices validated under real clinical conditions to assure safety and efficacy.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0e0e0e]/60 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white">Carbon Compensated</h4>
            <p className="text-xs text-zinc-500 dark:text-white/40 leading-relaxed font-light font-sans">
              Our materials are derived from certified bio-regenerated polymers and recycled marine plastic composites, offsetting 100% of our carbon manufacturing logistics.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0e0e0e]/60 p-6 rounded-3xl border border-zinc-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white">Insured Worldwide Cargo</h4>
            <p className="text-xs text-zinc-500 dark:text-white/40 leading-relaxed font-light font-sans">
              Through integrated quantum transit partnerships, our items are dispatched via rapid, insured carbon-compensated carriers directly to your coordinates.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0e0e0e]/60 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-sm dark:shadow-none">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">Ethics & Transparency Statement</h3>
            <p className="text-xs text-zinc-600 dark:text-white/60 leading-relaxed font-light font-sans">
              We hold our platform to the absolute highest standards of ethical design. No dark patterns, hidden subscription fees, or deceptive marketing are tolerated. All product feedback and ratings are compiled transparently from verified client reviews, with summaries generated ethically via transparent server-side AI computation.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['Non-manipulative UI', 'Strict Data Privacy', 'Factual AI Synthesis', 'Climate-Conscious Catalog'].map((claim) => (
                <div key={claim} className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
                  <span>{claim}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-neutral-950 border border-zinc-200 dark:border-white/10 shadow-sm">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="Apex Labs Team" className="w-full h-full object-cover opacity-85" />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // HELP & FAQ PAGE / CONTACT
  // ==========================================
  if (view === 'contact') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">Operational Coordinates</span>
            <h2 className="font-display font-bold text-3xl text-zinc-900 dark:text-white">Reach Out</h2>
            <p className="text-xs text-zinc-500 dark:text-white/40 font-light font-sans">Have specific logistical questions regarding circadian devices or sizing? Our support operators are available 24/7.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs bg-zinc-50 dark:bg-black p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Apex Global Labs</h4>
                <p className="text-zinc-600 dark:text-white/50 font-sans">128 Quantum Lane, Silicon Valley, CA 94025</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs bg-zinc-50 dark:bg-black p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Support Mainframe</h4>
                <p className="text-zinc-600 dark:text-white/50 font-sans">support@apexaiplatform.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs bg-zinc-50 dark:bg-black p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Encrypted Hot-Line</h4>
                <p className="text-zinc-600 dark:text-white/50 font-sans">+1 (800) 555-APEX (2739)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: FAQ List */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Operational FAQ Database</span>
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-[#0e0e0e]/60 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center text-xs font-bold text-zinc-800 dark:text-white bg-zinc-50 hover:bg-zinc-100 dark:bg-black/40 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 dark:text-white/40 transition-transform ${openFaq === i ? 'transform rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-4 text-xs text-zinc-600 dark:text-white/60 font-light leading-relaxed border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/20 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEGAL POLICY PAGES
  // ==========================================
  if (view === 'privacy' || view === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-xs leading-relaxed text-zinc-600 dark:text-white/50 font-light font-sans">
        <div className="border-b border-zinc-200 dark:border-white/10 pb-6 space-y-2">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">
            {view === 'privacy' ? 'Platform Privacy Policy' : 'Platform Terms of Service'}
          </h2>
          <p className="text-xs text-zinc-400 dark:text-white/30 font-sans">Effective Date: July 18, 2026 • Version 2.2AA Compliance</p>
        </div>

        {view === 'privacy' ? (
          <div className="space-y-6">
            <section className="space-y-2">
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm">1. Biometric Data Integrity</h4>
              <p className="text-zinc-700 dark:text-white/60 leading-relaxed font-light font-sans">
                Certain smart products on the Apex E-Commerce Platform (e.g. EEG sensor headbands, respiratory biometric tracking rings) gather sensitive physical metrics to coordinate your wellness feedback. All recorded data is compiled and synthesized locally on your client machine or stored under advanced, hardware-encrypted server-side database containers. We strictly NEVER sell, trade, or expose biological data to third-party advertising brokers.
              </p>
            </section>
            <section className="space-y-2">
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm">2. Transparent Server Audits</h4>
              <p className="text-zinc-700 dark:text-white/60 leading-relaxed font-light font-sans">
                Platform administrators maintain a detailed audit trail (e.g. logging account sign-ins, SKU catalog deployments, and tracking dispatches) to protect our marketplace ecosystem. This log collects only non-identifying operational variables (email identifiers, IP addresses, timestamp records).
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="space-y-2">
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm">1. Permitted Transaction Actions</h4>
              <p className="text-zinc-700 dark:text-white/60 leading-relaxed font-light font-sans">
                Apex AI operates as a premium demonstration and portfolio-grade full-stack platform. By interfacing with our verified Stripe and PayPal simulated credit gateways, you authorize our backend to update simulated catalog stock and register shipping dispatch logistics.
              </p>
            </section>
            <section className="space-y-2">
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-sm">2. AI Integration Rules</h4>
              <p className="text-zinc-700 dark:text-white/60 leading-relaxed font-light font-sans">
                Our AI shopping assistant and demand forecast mainframes utilize the Google Gemini AI series. By posting text prompts or review entries, you acknowledge that content will be processed transparently via server-side generative mainforces, completely abiding by AI safety parameters.
              </p>
            </section>
          </div>
        )}
      </div>
    );
  }

  return null;
}
