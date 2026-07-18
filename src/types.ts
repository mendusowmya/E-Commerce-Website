export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  avatar: string;
  isApprovedSeller?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  aiSummarized?: boolean;
}

export interface ProductVersion {
  id: string;
  name: string; // e.g. "Model S - Standard", "Model X - Pro", "Model Omega - Enterprise"
  price: number;
  inventory: number;
  specs: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inventory: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  sellerId: string;
  sellerName: string;
  tags: string[];
  specs: Record<string, string>;
  isFeatured?: boolean;
  versions?: ProductVersion[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  priceAtAddition: number;
  versionId?: string; // Selected version/model ID if applicable
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'stripe' | 'paypal' | 'paytm' | 'credit';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  trackingSteps: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  products?: Product[]; // For showing product recommendation cards inside the chat
}

export interface SalesAnalytics {
  labels: string[];
  revenue: number[];
  orders: number[];
}

export interface AuditLog {
  id: string;
  action: string;
  userEmail: string;
  timestamp: string;
  ipAddress: string;
}
