import React, { useState, useEffect } from 'react';
import { User, Product, CartItem, Order } from './types';
import { CATEGORIES } from './data/initialData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import AiAssistant from './components/AiAssistant';
import Dashboards from './components/Dashboards';
import StaticPages from './components/StaticPages';
import CheckoutModal from './components/CheckoutModal';
import { Brain, Search, Sparkles, ShoppingBag, Trash2, ShieldAlert, Heart, Info, Mail, HelpCircle, FileText, CheckCircle, X } from 'lucide-react';

export default function App() {
  // Application State
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<string>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Interactive Overlays
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  
  // Filter States (Product Catalog)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Notification Banners
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Orders State (for dashboard analytics sync)
  const [orders, setOrders] = useState<Order[]>([]);

  // Auto Login Default Customer for instant preview usability
  useEffect(() => {
    handleLogin('customer@apex.com', 'customer');
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ==========================================
  // BACKEND API LOGIC
  // ==========================================
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      showNotification('Synaptic network error. Ensure backend server is booted.', 'error');
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/orders?userId=${user.id}&role=${user.role}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (email: string, role?: 'customer' | 'seller' | 'admin') => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setLoginModalOpen(false);
        showNotification(`Logged in securely as ${data.user.name} (${data.user.role})`, 'success');
      }
    } catch (err) {
      console.error(err);
      showNotification('Failed to initialize session profile.', 'error');
    }
  };

  const handleChangeRole = (role: 'customer' | 'seller' | 'admin') => {
    if (!user) return;
    handleLogin(user.email, role);
    setActiveView('dashboard');
  };

  const handleAddToCart = (product: Product, versionId?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.versionId === versionId);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.versionId === versionId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const finalPrice = versionId && product.versions 
        ? (product.versions.find(v => v.id === versionId)?.price ?? product.price) 
        : product.price;
      return [...prev, { productId: product.id, quantity: 1, priceAtAddition: finalPrice, versionId }];
    });
    const verName = versionId && product.versions
      ? ` (${product.versions.find(v => v.id === versionId)?.name})`
      : '';
    showNotification(`Added "${product.name}${verName}" to your collection.`, 'success');
  };

  const handleRemoveFromCart = (productId: string, versionId?: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.versionId === versionId)));
    showNotification('Item removed from cart.', 'info');
  };

  const handleUpdateCartQuantity = (productId: string, qty: number, versionId?: string) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, versionId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId && item.versionId === versionId ? { ...item, quantity: qty } : item))
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    const item = products.find((p) => p.id === productId);
    if (item) {
      const added = !wishlist.includes(productId);
      showNotification(
        added ? `Saved "${item.name}" to Wishlist.` : `Removed "${item.name}" from Wishlist.`,
        'success'
      );
    }
  };

  // Submit checkout order to backend
  const handleCheckoutSubmit = async (shippingAddress: Order['shippingAddress'], paymentMethod: Order['paymentMethod']) => {
    if (!user) {
      showNotification('Please log in to finalize transaction parameters.', 'error');
      return;
    }

    const resolvedItems = cart.map((item) => {
      const prod = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        productName: prod ? prod.name : 'Unknown Product',
        productImage: prod ? prod.image : '',
        quantity: item.quantity,
        price: prod ? prod.price : 0,
      };
    });

    const subtotal = resolvedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalAmount = parseFloat((subtotal + (subtotal > 150 ? 0 : 15)).toFixed(2));

    const orderPayload = {
      userId: user.id,
      userName: shippingAddress.fullName,
      items: resolvedItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: orderPayload, userEmail: user.email }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Order #${data.order.id} verified and placed!`, 'success');
        fetchProducts(); // Refresh stock count
        fetchOrders(); // Refresh order analytics
      }
    } catch (err) {
      console.error(err);
      showNotification('Authorization mainframe error during payment.', 'error');
    }
  };

  // Seller/Admin: Create Product
  const handleAddProduct = async (productFields: any) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productFields, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Successfully deployed Sku "${data.product.name}"!`, 'success');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      showNotification('Product deployment aborted.', 'error');
    }
  };

  // Seller/Admin: Delete Sku
  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}?userEmail=${user?.email}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Product successfully moderation deleted.', 'info');
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Admin: Update Order tracking status
  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Order status updated to "${status}"`, 'success');
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Review to Product
  const handleAddReview = async (productId: string, reviewFields: { userName: string; rating: number; comment: string }) => {
    try {
      const res = await fetch(`/api/products/${productId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: reviewFields, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Review verified and submitted.', 'success');
        fetchProducts(); // Refresh ratings/reviews
        // Keep active selectedProduct modal aligned with updated reviews!
        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(data.product);
        }
      }
    } catch (err) {
      console.error(err);
      showNotification('Failed to submit review.', 'error');
    }
  };

  // Resolve Cart Details for Drawer
  const cartProducts = cart.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    if (!prod) return null;

    const selectedVersion = item.versionId && prod.versions
      ? prod.versions.find(v => v.id === item.versionId)
      : null;

    const resolvedProduct: Product = selectedVersion
      ? {
          ...prod,
          name: `${prod.name} (${selectedVersion.name})`,
          price: selectedVersion.price,
          inventory: selectedVersion.inventory,
          specs: { ...prod.specs, ...selectedVersion.specs }
        }
      : prod;

    return {
      product: resolvedProduct,
      quantity: item.quantity,
      versionId: item.versionId,
      keyId: `${item.productId}-${item.versionId || 'standard'}`
    };
  }).filter((x) => x !== null) as { product: Product; quantity: number; versionId?: string; keyId: string }[];

  const cartTotal = cartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col justify-between">
      
      {/* Floating Alerts */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-semibold backdrop-blur-md ${
            notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
            notification.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
            'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Global Header */}
      <Navbar
        user={user}
        cart={cart}
        products={products}
        wishlist={wishlist}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCart={() => setCartOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
        onLoginClick={() => setLoginModalOpen(true)}
        onChangeRole={handleChangeRole}
      />

      {/* Primary Dynamic Main Routing Container */}
      <main className="flex-grow">
        
        {/* VIEW 1: LANDING & HERO HOME */}
        {activeView === 'landing' && (
          <div className="space-y-16 pb-16">
            <Hero
              featuredProducts={featuredProducts}
              onExploreProduct={(p) => setSelectedProduct(p)}
              onExploreCatalog={(category) => {
                if (category) setSelectedCategory(category);
                setActiveView('products');
              }}
            />

            {/* Category Select Filters */}
            <section className="max-w-7xl mx-auto px-6 space-y-6 text-center">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">High-End Engineering</span>
                <h3 className="font-display font-extrabold text-2xl text-gray-900">Select Adaptive Segments</h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['All', ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCategory(c);
                      setActiveView('products');
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-sm border cursor-pointer ${
                      selectedCategory === c
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>

            {/* Featured Apex Grid */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Curated Collections</span>
                  <h3 className="font-display font-bold text-lg text-gray-900">The Senses Collection</h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('products');
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  View Full Catalog →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 3).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={wishlist.includes(p.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRODUCT CATALOG PAGE */}
        {activeView === 'products' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-3xl text-gray-900">Apex Sku Catalog</h2>
                <p className="text-xs text-gray-400">Discover biocombatible composites and quantum synchronized home systems.</p>
              </div>

              {/* Natural Language and Semantic Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Semantic text discovery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Category Segment Filter Sidebar */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explore Segments</h4>
                  <div className="flex flex-col gap-1.5">
                    {['All', ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-xs font-semibold px-4 py-2.5 rounded-xl transition-all border cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-indigo-50 border-indigo-100 text-indigo-700 font-bold'
                            : 'bg-white border-transparent hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid List */}
              <div className="lg:col-span-9">
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products
                      .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
                      .filter((p) => {
                        const q = searchQuery.toLowerCase();
                        return (
                          p.name.toLowerCase().includes(q) ||
                          p.description.toLowerCase().includes(q) ||
                          p.tags.some(t => t.toLowerCase().includes(q))
                        );
                      })
                      .map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          isWishlisted={wishlist.includes(p.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onSelectProduct={(p) => setSelectedProduct(p)}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="p-12 text-center border border-dashed border-gray-200 rounded-3xl">
                    <p className="text-xs text-gray-400 italic">No products available in the workspace mainframe.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SYSTEM DASHBOARDS (CUSTOMER, SELLER, ADMIN) */}
        {activeView === 'dashboard' && user && (
          <Dashboards
            user={user}
            products={products}
            orders={orders}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onRefreshProducts={fetchProducts}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {/* STATICS (ABOUT, BLOGS, CONTACT, PRIVACY) */}
        {['blogs', 'about', 'contact', 'faq', 'privacy', 'terms'].includes(activeView) && (
          <StaticPages view={activeView as any} />
        )}

      </main>

      {/* Floating AI Assistant Spark Trigger */}
      <button
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
        title="Synaptic AI Assistant"
      >
        <Brain className="w-6 h-6 animate-pulse" />
      </button>

      {/* AI Assistant Chat Drawer */}
      <AiAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200/50 flex flex-col justify-between transition-all duration-300">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-900 text-white">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <span className="font-display font-bold text-sm">Your Gathering ({cartProducts.length})</span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <div key={item.keyId} className="flex gap-3 items-center border-b border-gray-100 pb-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                  />
                  <div className="min-w-0 flex-grow text-left text-xs space-y-0.5">
                    <h5 className="font-bold text-gray-800 truncate leading-tight">{item.product.name}</h5>
                    <span className="text-[10px] text-indigo-700 font-bold">${item.product.price}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity - 1, item.versionId)}
                        className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-[10px] font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateCartQuantity(item.product.id, item.quantity + 1, item.versionId)}
                        className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-[10px] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.product.id, item.versionId)}
                    className="p-1 text-gray-400 hover:text-rose-600 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-2">
                <p className="text-xs text-gray-400 italic">No acquisitions gathered.</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-500">Cart Total:</span>
              <span className="font-display font-extrabold text-base text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              disabled={cart.length === 0}
              className="w-full py-2.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 shadow-md shadow-indigo-100 transition-colors cursor-pointer"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddReview}
        />
      )}

      {/* Checkout Flow Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        products={products}
        onSubmitOrder={handleCheckoutSubmit}
        onClearCart={() => setCart([])}
      />

      {/* Workspace Connect Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-6 text-center">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 flex flex-col items-center">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-gray-950">Connect Workspace Profile</h3>
              <p className="text-[10px] text-gray-400 max-w-xs">Switch credentials instantly below to test roles.</p>
            </div>

            <div className="space-y-2.5 text-left">
              {[
                { email: 'customer@apex.com', role: 'customer', label: 'Authorized Buyer', desc: 'Browse catalog, review products, buy items.' },
                { email: 'seller@apex.com', role: 'seller', label: 'Approved Sku Seller', desc: 'Manage stock, deploy new futuristic products.' },
                { email: 'admin@apex.com', role: 'admin', label: 'Operator Mainframe', desc: 'Analyze audit logs, view demand forecast.' },
              ].map((role) => (
                <button
                  key={role.role}
                  onClick={() => handleLogin(role.email, role.role as any)}
                  className="w-full p-3 rounded-2xl bg-gray-50 hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100 text-left text-xs transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center font-bold text-gray-800">
                    <span>{role.label}</span>
                    <span className="text-[10px] text-indigo-600 font-mono font-medium">{role.email}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{role.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Editorial Footer */}
      <footer className="bg-gray-950 text-gray-400 text-xs py-12 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="font-display text-white text-lg font-bold tracking-tight">APEX <span className="text-indigo-500 font-light">AI</span></h4>
            <p className="text-[11px] leading-relaxed font-light text-gray-400">
              Synthesizing luxury active neuro wear and circadian biological systems. Formulated for the high-performance modern operator.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Acquisitions</h5>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setSelectedCategory('All'); setActiveView('products'); }} className="text-left text-[11px] hover:text-white transition-colors">Adaptive Sku Catalog</button>
              <button onClick={() => { setSelectedCategory('Cybernetic Gear'); setActiveView('products'); }} className="text-left text-[11px] hover:text-white transition-colors">Cybernetic wear</button>
              <button onClick={() => { setSelectedCategory('Ambient Living'); setActiveView('products'); }} className="text-left text-[11px] hover:text-white transition-colors">Circadian Lights</button>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Philosophies</h5>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveView('about')} className="text-left text-[11px] hover:text-white transition-colors">About Us</button>
              <button onClick={() => setActiveView('blogs')} className="text-left text-[11px] hover:text-white transition-colors">Apex Chronicles</button>
              <button onClick={() => setActiveView('contact')} className="text-left text-[11px] hover:text-white transition-colors">Operational coordinates</button>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Security & Legal</h5>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveView('privacy')} className="text-left text-[11px] hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveView('terms')} className="text-left text-[11px] hover:text-white transition-colors">Terms of Service</button>
              <div className="flex items-center gap-1.5 pt-2 text-[10px] font-bold text-emerald-400 uppercase">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>PCI-DSS Secured</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-900 text-center text-[10px] text-gray-500">
          <p>© 2026 Apex AI Platform. Designed as a luxury portfolio-grade full-stack experience.</p>
        </div>
      </footer>

    </div>
  );
}
