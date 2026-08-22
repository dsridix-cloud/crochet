export interface ProductColor {
  name: string;
  hex: string;
  bgClass?: string;
  imageIndex?: number;
}

export interface ProductDimensions {
  width?: string;
  height?: string;
  handle?: string;
  depth?: string;
  diameter?: string;
  length?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Tops' | 'Bags' | 'Toys' | 'Home & Decor' | 'Gifts';
  price: number;
  comparePrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  material: string;
  details: string[];
  sizeDimensions: ProductDimensions;
  care: string[];
  handmadeNote?: string;
  stock: number;
  tags: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  featured?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id based on product.id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number;
  description: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CustomOrderData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  productType: string;
  preferredColor: string;
  size: string;
  quantity: number;
  budget: string;
  desiredDate: string;
  notes: string;
  referenceImage?: string;
  estimatedPrice?: number;
  status?: string;
}

export interface FAQItem {
  id: string;
  category: 'Orders' | 'Custom Orders' | 'Products' | 'Care' | 'Shipping' | 'Returns';
  question: string;
  answer: string;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  inStockOnly: boolean;
  minRating: number;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'best-selling' | 'rating';
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: 'standard' | 'express';
  notes?: string;
}

export interface OrderDetails {
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  estimatedDelivery: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  newCollectionUpdates: boolean;
  specialOffers: boolean;
  orderSmsUpdates: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  memberSince?: string;
  preferences: UserPreferences;
}

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  product: Product;
  color?: ProductColor;
  size?: string;
  quantity: number;
  price: number;
}

export interface OrderTimelineStep {
  step: string;
  label: string;
  description?: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface ShippingHistoryEvent {
  date: string;
  time?: string;
  title: string;
  location?: string;
  description?: string;
}

export interface AccountOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: SavedAddress | ShippingAddress;
  carrier: string;
  trackingNumber: string;
  expectedDelivery: string;
  placedDate: string;
  timeline: OrderTimelineStep[];
  shippingHistory: ShippingHistoryEvent[];
}

export type AccountTab = 
  | 'overview'
  | 'orders'
  | 'order-detail'
  | 'track-order'
  | 'favorites'
  | 'addresses'
  | 'profile'
  | 'settings'
  | 'support';

export type PageType = 
  | 'home'
  | 'shop'
  | 'collection'
  | 'collection-tops'
  | 'collection-bags'
  | 'collection-toys'
  | 'collection-home-decor'
  | 'collection-gifts'
  | 'product-detail'
  | 'search-results'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'order-confirmation'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'account'
  | 'account-orders'
  | 'account-order-detail'
  | 'account-order-track'
  | 'account-addresses'
  | 'account-profile'
  | 'account-settings'
  | 'account-support'
  | 'about'
  | 'our-story'
  | 'custom-orders'
  | 'faq'
  | 'contact'
  | 'shipping-info'
  | 'returns-refunds'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'care-guide';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'cart' | 'wishlist' | 'error';
  image?: string;
}

