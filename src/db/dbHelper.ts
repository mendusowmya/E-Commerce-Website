import fs from 'fs';
import path from 'path';
import { Product, Order, AuditLog, User } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialData';

const DB_FILE = path.join(process.cwd(), 'db.json');

export interface DbSchema {
  users: User[];
  products: Product[];
  orders: Order[];
  auditLogs: AuditLog[];
}

const DEFAULT_USERS: User[] = [
  {
    id: 'user-customer',
    email: 'customer@apex.com',
    name: 'Sowmya Mendum',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'user-seller',
    email: 'seller@apex.com',
    name: 'AeroWear Labs (Official Seller)',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    isApprovedSeller: true
  },
  {
    id: 'user-admin',
    email: 'admin@apex.com',
    name: 'Chief Admin Operator',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  }
];

const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'System Initialization',
    userEmail: 'system@apex.com',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    ipAddress: '127.0.0.1'
  },
  {
    id: 'log-2',
    action: 'AeroWear Labs approved as verified seller',
    userEmail: 'admin@apex.com',
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
    ipAddress: '192.168.1.5'
  }
];

export function getDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DbSchema = {
        users: DEFAULT_USERS,
        products: INITIAL_PRODUCTS,
        orders: [],
        auditLogs: DEFAULT_AUDIT_LOGS
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(content) as DbSchema;

    // Synchronize INITIAL_PRODUCTS into existing db.json, updating specs, versions, etc., while keeping reviews
    let dbUpdated = false;
    INITIAL_PRODUCTS.forEach(initialProd => {
      const existingIdx = db.products.findIndex(p => p.id === initialProd.id);
      if (existingIdx === -1) {
        db.products.push(initialProd);
        dbUpdated = true;
      } else {
        const existing = db.products[existingIdx];
        db.products[existingIdx] = {
          ...initialProd,
          // Retain reviews & custom rating if they were modified/added by testing
          reviews: existing.reviews?.length ? existing.reviews : initialProd.reviews,
          rating: existing.rating !== 5.0 ? existing.rating : initialProd.rating,
          reviewsCount: existing.reviewsCount !== 0 ? existing.reviewsCount : initialProd.reviewsCount,
          // Let inventory sync up or retain
          inventory: existing.inventory !== undefined ? existing.inventory : initialProd.inventory
        };
        dbUpdated = true;
      }
    });

    if (dbUpdated) {
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    }

    return db;
  } catch (error) {
    console.error('Error reading JSON DB, returning defaults:', error);
    return {
      users: DEFAULT_USERS,
      products: INITIAL_PRODUCTS,
      orders: [],
      auditLogs: DEFAULT_AUDIT_LOGS
    };
  }
}

export function saveDb(db: DbSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to JSON DB:', error);
  }
}

export function logAudit(action: string, userEmail: string, ip: string = '127.0.0.1'): void {
  const db = getDb();
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    action,
    userEmail,
    timestamp: new Date().toISOString(),
    ipAddress: ip
  };
  db.auditLogs.unshift(newLog);
  // Keep last 100 logs
  if (db.auditLogs.length > 100) {
    db.auditLogs = db.auditLogs.slice(0, 100);
  }
  saveDb(db);
}
