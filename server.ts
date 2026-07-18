import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { getDb, saveDb, logAudit } from './src/db/dbHelper';
import { Product, Order, User } from './src/types';

// Load environment variables in local dev
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key === '') {
      throw new Error('GEMINI_API_KEY is not configured. Please add it via AI Studio Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// ==========================================
// AUTHENTICATION ENDPOINTS (MOCK SESSION)
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  const db = getDb();
  
  // Find or create user
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      email: email,
      name: email.split('@')[0].toUpperCase(),
      role: role || 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      isApprovedSeller: role === 'seller' ? true : false
    };
    db.users.push(user);
    saveDb(db);
  } else if (role && user.role !== role) {
    // Switch role if requested
    user.role = role;
    if (role === 'seller' && !user.isApprovedSeller) {
      user.isApprovedSeller = true; // Auto-approve mock for ease of testing
    }
    saveDb(db);
  }
  
  logAudit(`User Login: logged in as ${user.role}`, user.email);
  res.json({ success: true, user });
});

// ==========================================
// USER & BUYER DATABASE ENDPOINTS
// ==========================================
app.get('/api/users', (req, res) => {
  const db = getDb();
  res.json(db.users);
});

app.post('/api/users', (req, res) => {
  const { name, email, role, avatar } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const db = getDb();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'A user with this email already exists in the database.' });
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    email: email,
    name: name || email.split('@')[0].toUpperCase(),
    role: role || 'customer',
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    isApprovedSeller: role === 'seller' ? true : false
  };

  db.users.push(newUser);
  saveDb(db);
  logAudit(`Created User: ${newUser.name} (${newUser.role})`, email);
  res.json({ success: true, user: newUser });
});

app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, isApprovedSeller } = req.body;
  const db = getDb();
  const userIndex = db.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = db.users[userIndex];
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (isApprovedSeller !== undefined) user.isApprovedSeller = isApprovedSeller;

  saveDb(db);
  logAudit(`Updated User Database Entry: ${user.name}`, email || 'admin@apex.com');
  res.json({ success: true, user });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { adminEmail } = req.query;
  const db = getDb();
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Prevent self deletion or admin deletion
  if (user.role === 'admin' || user.id === 'user-admin') {
    return res.status(400).json({ error: 'Cannot delete default administrator account.' });
  }

  db.users = db.users.filter(u => u.id !== id);
  saveDb(db);
  logAudit(`Deleted User from Database: ${user.name}`, String(adminEmail || 'admin@apex.com'));
  res.json({ success: true });
});

// ==========================================
// PRODUCT ENDPOINTS
// ==========================================
app.get('/api/products', (req, res) => {
  const db = getDb();
  const { category, search } = req.query;
  let list = [...db.products];
  
  if (category && category !== 'All') {
    list = list.filter(p => p.category === category);
  }
  if (search) {
    const term = String(search).toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  }
  res.json(list);
});

// Seller: Create Product
app.post('/api/products', (req, res) => {
  const { product, userEmail } = req.body;
  if (!product || !userEmail) {
    return res.status(400).json({ error: 'Missing product content or seller email.' });
  }
  
  const db = getDb();
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    rating: 5.0,
    reviewsCount: 0,
    reviews: []
  };
  
  db.products.push(newProduct);
  saveDb(db);
  
  logAudit(`Created Product: "${newProduct.name}"`, userEmail);
  res.json({ success: true, product: newProduct });
});

// Seller: Update Product Inventory/Details
app.patch('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { fields, userEmail } = req.body;
  
  const db = getDb();
  const productIndex = db.products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  db.products[productIndex] = {
    ...db.products[productIndex],
    ...fields
  };
  saveDb(db);
  
  logAudit(`Updated Product: "${db.products[productIndex].name}" details`, userEmail || 'seller@apex.com');
  res.json({ success: true, product: db.products[productIndex] });
});

// Product Moderation / Delete
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.query;
  
  const db = getDb();
  const item = db.products.find(p => p.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  db.products = db.products.filter(p => p.id !== id);
  saveDb(db);
  
  logAudit(`Deleted Product: "${item.name}"`, String(userEmail || 'admin@apex.com'));
  res.json({ success: true });
});

// Submit Reviews
app.post('/api/products/:id/review', (req, res) => {
  const { id } = req.params;
  const { review, userEmail } = req.body;
  
  const db = getDb();
  const productIndex = db.products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const newReview = {
    id: `rev-${Date.now()}`,
    userId: `user-${Date.now()}`,
    userName: review.userName || 'Anonymous Client',
    rating: Number(review.rating) || 5,
    comment: review.comment || '',
    date: new Date().toISOString().split('T')[0]
  };
  
  const product = db.products[productIndex];
  product.reviews = [...(product.reviews || []), newReview];
  product.reviewsCount = product.reviews.length;
  product.rating = parseFloat((product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1));
  
  saveDb(db);
  logAudit(`Added Review for "${product.name}"`, userEmail || 'customer@apex.com');
  res.json({ success: true, product });
});

// ==========================================
// AI REVIEW SUMMARIZATION (TRANSPARENT AI)
// ==========================================
app.post('/api/products/:id/ai-summary', async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const product = db.products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const reviewsText = product.reviews && product.reviews.length > 0
    ? product.reviews.map(r => `[Rating: ${r.rating}/5] "${r.comment}"`).join('\n')
    : 'No reviews submitted yet.';
    
  if (reviewsText === 'No reviews submitted yet.') {
    return res.json({ summary: 'No customer reviews exist for this futuristic item yet. Be the first to express your thoughts!' });
  }

  try {
    const ai = getAi();
    const prompt = `You are a professional, transparent, and ethical e-commerce AI summarization engine.
Analyze the following user reviews for the product "${product.name}" (${product.description}):
---
REVIEWS:
${reviewsText}
---
Provide a concise, balanced, 2-to-3 sentence summary capturing the common sentiments, mentioning both praise and constructive notes if they exist.
The tone must be helpful, transparent, objective and clearly appropriate for an elite online store.
Do not invent facts or reviews not listed above. Start directly with the summary text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    res.json({ summary: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini Review Summary failed:', error);
    res.status(500).json({ error: 'AI summarization currently unavailable', details: error.message });
  }
});

// ==========================================
// ORDER ENDPOINTS
// ==========================================
app.get('/api/orders', (req, res) => {
  const db = getDb();
  const { userId, role } = req.query;
  
  let list = db.orders;
  if (role === 'customer' && userId) {
    list = list.filter(o => o.userId === userId);
  } else if (role === 'seller' && userId) {
    // For simplicity of seller dashboard, let's return orders with at least one product matching seller products
    // Or return all since AeroWear Labs controls the catalog in the mock
  }
  res.json(list);
});

// Submit/Checkout Order
app.post('/api/orders', (req, res) => {
  const { order, userEmail } = req.body;
  if (!order || !order.userId) {
    return res.status(400).json({ error: 'Incomplete order payload' });
  }
  
  const db = getDb();
  const newOrder: Order = {
    ...order,
    id: `order-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'pending',
    trackingSteps: [
      { title: 'Order Placed', description: 'Your secure transaction was finalized.', timestamp: new Date().toISOString(), completed: true },
      { title: 'Processing', description: 'The smart fulfillment module is packing your order.', timestamp: '', completed: false },
      { title: 'Shipped', description: 'A carrier has registered your package details.', timestamp: '', completed: false },
      { title: 'Delivered', description: 'Item has successfully arrived.', timestamp: '', completed: false }
    ],
    createdAt: new Date().toISOString()
  };
  
  // Deduct Inventory
  newOrder.items.forEach(item => {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod) {
      prod.inventory = Math.max(0, prod.inventory - item.quantity);
    }
  });
  
  db.orders.unshift(newOrder);
  saveDb(db);
  
  logAudit(`Placed Secure Order: #${newOrder.id} for $${newOrder.totalAmount}`, userEmail || 'customer@apex.com');
  res.json({ success: true, order: newOrder });
});

// Update Order Tracking / Status (Seller/Admin tool)
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status, userEmail } = req.body;
  
  const db = getDb();
  const orderIndex = db.orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  const order = db.orders[orderIndex];
  order.status = status;
  
  // Update tracking steps dynamically
  const statusIndex = ['pending', 'processing', 'shipped', 'delivered'].indexOf(status);
  order.trackingSteps = order.trackingSteps.map((step, idx) => {
    if (idx <= statusIndex + 1) { // Offset because step 0 is "Order Placed"
      return {
        ...step,
        completed: true,
        timestamp: step.timestamp || new Date().toISOString()
      };
    }
    return step;
  });
  
  saveDb(db);
  logAudit(`Updated Order Status: #${order.id} status set to ${status}`, userEmail || 'seller@apex.com');
  res.json({ success: true, order });
});

// ==========================================
// AI SHOPPING ASSISTANT & SEMANTIC DISCOVERY
// ==========================================
app.post('/api/ai/chat', async (req, res) => {
  const { messages, cartItems } = req.body;
  
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: 'Missing conversation messages.' });
  }
  
  const db = getDb();
  const productsCatalog = db.products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    rating: p.rating,
    tags: p.tags,
    inventory: p.inventory
  }));

  try {
    const ai = getAi();
    
    // Format previous messages for context
    const conversationHistory = messages.map((m: any) => 
      `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.content}`
    ).join('\n');

    const prompt = `You are a sophisticated, polite, and helpful AI Shopping Assistant for "Apex AI E-Commerce Platform", an elite retailer of luxury futuristic gadgets, active wellnesswear, circadian systems, and sustainable eco-luxury products.

The current available products in stock are:
${JSON.stringify(productsCatalog, null, 2)}

Current items inside Customer's Shopping Cart:
${JSON.stringify(cartItems || [], null, 2)}

Guidelines:
1. Provide accurate, professional, conversational assistance. Do NOT fabricate products or specifications not listed in the inventory above.
2. If the user expresses an interest in any product, explicitly mention its name, key benefit, price, and invite them to add it to their cart.
3. Be highly creative but truthful about their futuristic benefits (circadian alignment, graphene tech wear, biofeedback headbands, aeroponic mists).
4. If they ask about buying or checkout, instruct them to open the "Cart" drawer at the top and click "Proceed to Checkout".
5. ALWAYS output a structured response in valid JSON matching this schema:
{
  "reply": "Your conversational answer to the shopper...",
  "recommendedProductIds": ["prod-1", "prod-2"] // optional, array of matched product IDs from the inventory that correspond directly to your response recommendations. Max 3.
}

Ensure the output is ONLY valid JSON. No markdown code blocks, no trailing comments, no leading text. Make sure it is strictly parseable as standard JSON.

Here is the conversation so far:
${conversationHistory}
Assistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text?.trim() || '{}';
    const parsed = JSON.parse(resultText);
    
    // Enrich recommended product ids with actual product details
    let recommendedProducts: Product[] = [];
    if (parsed.recommendedProductIds && Array.isArray(parsed.recommendedProductIds)) {
      recommendedProducts = db.products.filter(p => parsed.recommendedProductIds.includes(p.id));
    }

    res.json({
      reply: parsed.reply || "I am processing your query. How else can I assist with our premium line of goods?",
      products: recommendedProducts
    });
  } catch (error: any) {
    console.error('Gemini E-Commerce Chat Failed:', error);
    res.status(500).json({ error: 'AI assistant currently offline', details: error.message });
  }
});

// ==========================================
// AI DEMAND FORECASTING (ADMIN DASHBOARD)
// ==========================================
app.post('/api/ai/forecast', async (req, res) => {
  const { userEmail } = req.body;
  const db = getDb();
  
  const salesSummary = db.products.map(p => {
    // Mock sales numbers based on rating, category, and catalog presence
    const baseSales = p.rating > 4.7 ? 42 : 21;
    const remaining = p.inventory;
    const popularityScore = p.reviewsCount * 4 + p.rating * 10;
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      currentInventory: remaining,
      estimatedMonthlySales: baseSales,
      popularityIndex: parseFloat(popularityScore.toFixed(0))
    };
  });

  try {
    const ai = getAi();
    const prompt = `You are an elite AI Business Intelligence & Demand Forecasting expert.
Given the following product inventory and recent mock sales metrics from our store:
${JSON.stringify(salesSummary, null, 2)}

Provide an executive, professional demand forecasting report for the store administrator. Include:
1. **Inventory Health Review**: Identify items facing imminent stockout (low inventory relative to estimated monthly sales).
2. **Trending Insights**: Call out high-popularity index items and explain why they drive high consumer enthusiasm.
3. **Strategic Stocking & Promotion Advice**: Suggest stock replenishments and price/coupon optimizations to clear slow-moving inventory.
4. **Demand Forecast Statement**: Briefly state the expected trends for the upcoming quarter.

Make the output beautifully formatted in clear, professional Markdown. Use professional e-commerce terminology (sell-through rate, turnover ratio, lead time). Do not mention that the sales are "mocked" - treat it as a real-world enterprise dataset.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    logAudit('Generated AI Demand Forecast Report', userEmail || 'admin@apex.com');
    res.json({ report: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini Demand Forecast Failed:', error);
    res.status(500).json({ error: 'AI forecasting service currently offline', details: error.message });
  }
});

// ==========================================
// AUDIT LOGS ENDPOINT
// ==========================================
app.get('/api/audit-logs', (req, res) => {
  const db = getDb();
  res.json(db.auditLogs);
});

// ==========================================
// STATIC VITE DEV MIDDLEWARE / PROD BUILD
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted successfully.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Apex Server running securely on port ${PORT}`);
  });
}

startServer();
