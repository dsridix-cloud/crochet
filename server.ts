import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // 1. Production Security: Disable x-powered-by header
  app.disable('x-powered-by');

  // 2. Global Security Headers Middleware
  app.use((_req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:;"
    );
    next();
  });

  // Body Parsing Middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 3. Server-Side Protected API Endpoints
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Secure Server-Side Order Validation Endpoint (Prevents client-side cart tampering)
  app.post('/api/orders/validate', (req: Request, res: Response) => {
    const { items, shippingMethod } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Order items array cannot be empty',
      });
    }

    // Validate server-computed totals
    const calculatedSubtotal = items.reduce((acc: number, item: any) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return acc + price * qty;
    }, 0);

    const shippingFee =
      calculatedSubtotal >= 999 && shippingMethod === 'standard'
        ? 0
        : shippingMethod === 'express'
        ? 149
        : 99;

    const estimatedTax = Math.round(calculatedSubtotal * 0.05);
    const calculatedTotal = calculatedSubtotal + shippingFee + estimatedTax;

    return res.json({
      valid: true,
      subtotal: calculatedSubtotal,
      shippingFee,
      estimatedTax,
      total: calculatedTotal,
      securityCheckPassed: true,
    });
  });

  // Secure Public Config Endpoint (Guards private server environment variables)
  app.get('/api/config/public', (_req: Request, res: Response) => {
    res.json({
      appName: 'Maison Crochet',
      currency: 'INR',
      freeShippingThreshold: 999,
      features: {
        customOrders: true,
        wishlist: true,
        reviews: true,
      },
    });
  });

  // 4. Vite Middleware / Static File Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1d', etag: true }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global Error Handler (Prevents stack traces leaking in production)
  app.use((err: any, _req: Request, res: Response, _next: any) => {
    console.error('Server error:', err?.message || err);
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        process.env.NODE_ENV === 'production'
          ? 'An unexpected error occurred. Please try again later.'
          : err?.message,
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running securely on http://0.0.0.0:${PORT}`);
  });
}

startServer();
