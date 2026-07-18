import React, { useState } from 'react';
import { CartItem, Product, Order } from '../types';
import { X, CreditCard, ShieldCheck, ShoppingBag, Truck, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  onSubmitOrder: (shippingDetails: Order['shippingAddress'], paymentMethod: Order['paymentMethod']) => Promise<void>;
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  products,
  onSubmitOrder,
  onClearCart,
}: CheckoutModalProps) {
  // Shipping details Form State
  const [fullName, setFullName] = useState('Sowmya Mendum');
  const [street, setStreet] = useState('128 Quantum Lane');
  const [city, setCity] = useState('Silicon Valley');
  const [postalCode, setPostalCode] = useState('94025');
  const [country, setCountry] = useState('United States');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('stripe');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('371');

  // Paytm specific state
  const [paytmUpiId, setPaytmUpiId] = useState('sowmya@paytm');
  const [paytmMobile, setPaytmMobile] = useState('+91 98765 43210');

  // Credit specific state
  const [creditType, setCreditType] = useState<'card' | 'emi_3' | 'emi_6' | 'bnpl'>('card');
  const [creditProvider, setCreditProvider] = useState<'affirm' | 'klarna' | 'visa_credit'>('affirm');

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Resolve Cart Product details
  const resolvedItems = cart.map((item) => {
    const prod = products.find((p) => p.id === item.productId);
    return {
      product: prod,
      quantity: item.quantity,
      price: prod ? prod.price : 0,
    };
  }).filter((x) => x.product !== undefined) as { product: Product; quantity: number; price: number }[];

  const subtotal = resolvedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 150 ? 0 : 15.0;
  const totalAmount = parseFloat((subtotal + shippingFee).toFixed(2));

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || loading) return;

    setLoading(true);
    try {
      await onSubmitOrder(
        { fullName, street, city, postalCode, country },
        paymentMethod
      );
      setOrderPlaced({
        id: String(Math.floor(100000 + Math.random() * 900000)),
        userId: 'user-customer',
        userName: fullName,
        items: resolvedItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        status: 'pending',
        paymentMethod,
        shippingAddress: { fullName, street, city, postalCode, country },
        trackingSteps: [],
        createdAt: new Date().toISOString()
      });
      onClearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#090909]/95 rounded-3xl shadow-2xl border border-zinc-200 dark:border-white/10 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row text-zinc-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 dark:text-white/40 hover:text-zinc-900 dark:hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderPlaced ? (
          /* SUCCESS SCREEN */
          <div className="w-full p-8 text-center space-y-6 flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-white">Acquisition Completed Successfully</h3>
              <p className="text-xs text-zinc-500 dark:text-white/40 font-medium max-w-md leading-relaxed font-sans">
                Your order is secured and logged on the server. A carrier has been assigned to coordinate shipping parameters.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-white/5 p-5 rounded-2xl border border-zinc-200 dark:border-white/5 w-full max-w-md space-y-3 text-xs text-left">
              <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                <span>Acquisition Reference ID:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">#{orderPlaced.id}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-white/60 font-sans">
                <span>Delivery Recipient:</span>
                <span>{orderPlaced.userName}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-white/60 font-sans">
                <span>Address Registered:</span>
                <span className="text-right">{orderPlaced.shippingAddress.street}, {orderPlaced.shippingAddress.city}</span>
              </div>
              <div className="flex justify-between font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-white/10">
                <span>Authorized Total:</span>
                <span>${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white transition-all cursor-pointer border border-transparent shadow-md"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* CHECKOUT FLOW FORM */
          <>
            {/* Left Column: Cart Summary */}
            <div className="w-full md:w-1/2 p-6 md:p-8 bg-zinc-50/50 dark:bg-white/5 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 space-y-6">
              <h4 className="font-display font-bold text-zinc-900 dark:text-white text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Your Collection ({resolvedItems.length})</span>
              </h4>

              {resolvedItems.length > 0 ? (
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {resolvedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover bg-neutral-900 border border-zinc-200 dark:border-white/5 shrink-0"
                      />
                      <div className="min-w-0 flex-grow font-sans">
                        <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.product.name}</h5>
                        <span className="text-[10px] text-zinc-400 dark:text-white/40">Qty: {item.quantity} x ${item.price}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-700 dark:text-white/80">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-white/40 italic font-sans">No items gathered.</p>
              )}

              <div className="pt-4 border-t border-zinc-200 dark:border-white/10 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-zinc-500 dark:text-white/40">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500 dark:text-white/40">
                  <span>Fulfillment Logistics:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-display text-base font-bold text-zinc-950 dark:text-white pt-2 border-t border-zinc-200 dark:border-white/10">
                  <span>Authorized Total:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">${totalAmount}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2 text-[10px] text-blue-700 dark:text-blue-300 font-sans">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Orders above $150 qualify for complimentary climate-compensated express logistical shipping.</span>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="w-full md:w-1/2 p-6 md:p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <h4 className="font-display font-bold text-zinc-900 dark:text-white text-base">Fulfillment Parameters</h4>

                {/* Shipping Form */}
                <div className="space-y-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Street Address</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Country</label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-white/10">
                  <h5 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Authorized Payment Gateways</span>
                  </h5>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'stripe', label: 'Stripe Secure' },
                      { id: 'paypal', label: 'PayPal Instant' },
                      { id: 'paytm', label: 'Paytm UPI/Wallet' },
                      { id: 'credit', label: 'Credit / EMI Option' },
                    ].map((method) => (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                            : 'border-zinc-200 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/5 text-zinc-500 dark:text-white/60'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black space-y-3 font-sans">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Expiry</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">CVC</label>
                          <input
                            type="password"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black text-center space-y-2 font-sans">
                      <p className="text-[11px] text-zinc-500 dark:text-white/60">
                        Proceeding will launch a secure PayPal gateway overlay to complete your instant authorization.
                      </p>
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        Selected Account: sowmyamendumsd@gmail.com
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paytm' && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black space-y-3 font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-white/5">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Paytm Secure UPI Network</span>
                        <span className="text-[9px] bg-[#00baf2]/20 text-[#00baf2] px-1.5 py-0.5 rounded font-mono font-bold uppercase">Paytm</span>
                      </div>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Paytm UPI ID / VPA</label>
                          <input
                            type="text"
                            required
                            value={paytmUpiId}
                            onChange={(e) => setPaytmUpiId(e.target.value)}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Linked Paytm Mobile Number</label>
                          <input
                            type="text"
                            required
                            value={paytmMobile}
                            onChange={(e) => setPaytmMobile(e.target.value)}
                            className="w-full text-xs px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'credit' && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black space-y-3 font-sans">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-white/5">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Credit Facility & EMI Planner</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase">0% APR EMI</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {[
                          { id: 'card', label: 'Credit Card (Full)' },
                          { id: 'emi_3', label: '3-Month EMI (0%)' },
                          { id: 'emi_6', label: '6-Month EMI (0%)' },
                          { id: 'bnpl', label: 'Buy Now Pay Later' },
                        ].map((type) => (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() => setCreditType(type.id as any)}
                            className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                              creditType === type.id
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500'
                            }`}
                          >
                            <div className="font-bold">{type.label}</div>
                            {type.id === 'emi_3' && (
                              <div className="text-[9px] font-mono text-zinc-400 dark:text-white/40">
                                ${(totalAmount / 3).toFixed(2)}/mo
                              </div>
                            )}
                            {type.id === 'emi_6' && (
                              <div className="text-[9px] font-mono text-zinc-400 dark:text-white/40">
                                ${(totalAmount / 6).toFixed(2)}/mo
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {creditType === 'card' && (
                        <div className="space-y-3 pt-2">
                          <div className="space-y-1">
                            <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Credit Card Number</label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">Expiry</label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">CVC</label>
                              <input
                                type="password"
                                required
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value)}
                                className="w-full text-xs font-mono px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {(creditType === 'emi_3' || creditType === 'emi_6') && (
                        <div className="p-3 bg-zinc-50 dark:bg-[#0f0f0f] rounded-xl text-[10px] space-y-1 font-sans text-zinc-600 dark:text-white/70 border border-zinc-200 dark:border-white/5">
                          <p className="font-bold text-zinc-900 dark:text-white">EMI installment authorization details:</p>
                          <p>
                            • Monthly charges: <span className="font-mono font-bold text-emerald-500">${(totalAmount / (creditType === 'emi_3' ? 3 : 6)).toFixed(2)}</span>
                          </p>
                          <p>• Interest Rate: <span className="text-emerald-500 font-bold">0% APR</span> (Complimentary Credit Offer)</p>
                          <p>• First payment due: Today, followed by monthly automatic auto-debits.</p>
                        </div>
                      )}

                      {creditType === 'bnpl' && (
                        <div className="space-y-2 pt-2">
                          <label className="text-[8px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider block">Select BNPL Partner</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'affirm', name: 'Affirm BNPL' },
                              { id: 'klarna', name: 'Klarna Pay' },
                            ].map((prov) => (
                              <button
                                type="button"
                                key={prov.id}
                                onClick={() => setCreditProvider(prov.id as any)}
                                className={`p-2 rounded-lg text-center text-[10px] font-bold border transition-all cursor-pointer ${
                                  creditProvider === prov.id
                                    ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : 'border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500'
                                }`}
                              >
                                {prov.name}
                              </button>
                            ))}
                          </div>
                          <p className="text-[9px] text-zinc-400 text-center font-sans">
                            Instant credit approval inside the partner checkout page.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0 || loading}
                className="w-full mt-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-950 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-blue-500 dark:text-black dark:hover:text-white shadow-lg transition-all disabled:opacity-50 cursor-pointer border border-transparent"
              >
                {loading ? 'Authorizing Quantum Funds...' : `Authorize Transaction • $${totalAmount}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
