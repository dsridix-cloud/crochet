import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  ProductColor, 
  CartItem, 
  WishlistItem, 
  PageType, 
  ToastMessage, 
  Coupon, 
  ShippingAddress, 
  OrderDetails,
  UserProfile,
  SavedAddress,
  AccountOrder,
  AccountTab,
  UserPreferences
} from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { DEFAULT_DEMO_USER, DEFAULT_SAVED_ADDRESSES, DEFAULT_ACCOUNT_ORDERS } from '../data/accountData';

interface ShopContextType {
  currentPage: PageType;
  selectedCategorySlug: string | null;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewed: Product[];
  isCartOpen: boolean;
  isSearchModalOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewProduct: Product | null;
  lightboxItem: { image: string; caption?: string; tag?: string } | null;
  toasts: ToastMessage[];
  lastOrderNumber: string | null;
  lastOrderDetails: OrderDetails | null;
  shippingAddress: ShippingAddress;
  appliedCoupon: Coupon | null;
  
  // Navigation & modals
  navigateTo: (page: PageType, options?: { productId?: string; categorySlug?: string; query?: string; accountTab?: AccountTab; orderId?: string }) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openLightbox: (image: string, caption?: string, tag?: string) => void;
  closeLightbox: () => void;
  
  // Cart Actions
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  buyNow: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  clearWishlist: () => void;
  
  // Customer Account System
  user: UserProfile | null;
  isLoggedIn: boolean;
  savedAddresses: SavedAddress[];
  accountOrders: AccountOrder[];
  activeAccountOrder: AccountOrder | null;
  accountTab: AccountTab;
  setAccountTab: (tab: AccountTab) => void;
  login: (email: string, password?: string, rememberMe?: boolean) => boolean;
  signup: (userData: { firstName: string; lastName: string; email: string; phone: string; password?: string }) => boolean;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateAccountPreferences: (prefs: Partial<UserPreferences>) => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => boolean;
  updateSavedAddress: (id: string, address: Partial<SavedAddress>) => boolean;
  deleteSavedAddress: (id: string) => boolean;
  setDefaultAddress: (id: string) => void;
  setActiveAccountOrder: (order: AccountOrder | null) => void;
  viewOrderDetails: (orderIdOrNumber: string) => void;
  trackOrder: (orderIdOrNumber: string) => void;

  // Feedback
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'cart' | 'wishlist' | 'error', image?: string) => void;
  removeToast: (id: string) => void;
  
  // Checkout & Order
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  placeOrder: (paymentMethod: string, customAddress?: ShippingAddress) => OrderDetails;
  setLastOrderNumber: (orderNum: string | null) => void;
  
  // Metrics
  cartSubtotal: number;
  cartCount: number;
  wishlistCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isFreeShippingEligible: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_crochet_cart_v2';
const WISHLIST_STORAGE_KEY = 'maison_crochet_wishlist_v2';
const RECENTLY_VIEWED_KEY = 'maison_crochet_recent_v2';
const ORDER_STORAGE_KEY = 'maison_crochet_order_v2';
const ADDRESS_STORAGE_KEY = 'maison_crochet_address_v2';
const USER_STORAGE_KEY = 'maison_crochet_user_v2';
const AUTH_STORAGE_KEY = 'maison_crochet_auth_v2';
const SAVED_ADDRESSES_STORAGE_KEY = 'maison_crochet_saved_addresses_v2';
const ACCOUNT_ORDERS_STORAGE_KEY = 'maison_crochet_account_orders_v2';

const defaultShippingAddress: ShippingAddress = {
  fullName: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  addressLine1: '12, Green Avenue, Adajan',
  addressLine2: 'Near Floral Garden',
  city: 'Surat',
  state: 'Gujarat',
  pincode: '395009',
  deliveryMethod: 'standard',
  notes: 'Handmade with care'
};

const sanitizeCartItem = (raw: any): CartItem | null => {
  if (!raw || !raw.product) return null;
  const product = raw.product;
  const selectedColor: ProductColor = raw.selectedColor || raw.color || product.colors?.[0] || { name: 'Natural', hex: '#8C6F5A' };
  const selectedSize: string = raw.selectedSize || raw.size || product.sizes?.[0] || 'One Size';
  const quantity = typeof raw.quantity === 'number' && raw.quantity > 0 ? raw.quantity : 1;
  const id = raw.id || `${product.id}-${selectedColor.name}-${selectedSize}`;
  return {
    id,
    product,
    selectedColor,
    selectedSize,
    quantity
  };
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>('cr-bag-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lightboxItem, setLightboxItem] = useState<{ image: string; caption?: string; tag?: string } | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Customer Account State
  const [accountTab, setAccountTab] = useState<AccountTab>('overview');
  const [pendingCheckout, setPendingCheckout] = useState<boolean>(false);
  
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      const isAuth = savedAuth !== null ? JSON.parse(savedAuth) : true;
      if (!isAuth) return null;
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  // DEMO ONLY — Replace with real database later
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_ADDRESSES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_SAVED_ADDRESSES;
    } catch {
      return DEFAULT_SAVED_ADDRESSES;
    }
  });

  // DEMO ONLY — Replace with real order API later
  const [accountOrders, setAccountOrders] = useState<AccountOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ACCOUNT_ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_ACCOUNT_ORDERS;
    } catch {
      return DEFAULT_ACCOUNT_ORDERS;
    }
  });

  const [activeAccountOrder, setActiveAccountOrder] = useState<AccountOrder | null>(() => {
    return DEFAULT_ACCOUNT_ORDERS[0] || null;
  });

  const [lastOrderNumber, setLastOrderNumber] = useState<string | null>(() => {
    return localStorage.getItem('maison_crochet_last_order_num') || 'CR-1024';
  });

  const [lastOrderDetails, setLastOrderDetails] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(() => {
    try {
      const saved = localStorage.getItem(ADDRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultShippingAddress;
    } catch {
      return defaultShippingAddress;
    }
  });

  // Persistent States
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('maison_crochet_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.map(sanitizeCartItem).filter(Boolean) as CartItem[];
          if (sanitized.length > 0) return sanitized;
        }
      }
      return [
        {
          id: 'cr-bag-01-Cream / Yellow-One Size',
          product: PRODUCTS_DATA[1],
          selectedColor: PRODUCTS_DATA[1].colors?.[0] || { name: 'Cream / Yellow', hex: '#F4EBE1' },
          selectedSize: 'One Size',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY) || localStorage.getItem('maison_crochet_wishlist_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.filter((item: any) => item && item.product);
          if (valid.length > 0) return valid;
        }
      }
      // Default 6 iconic favorite pieces
      const defaultProducts = [
        PRODUCTS_DATA.find(p => p.id === 'cr-bag-01') || PRODUCTS_DATA[1], // Daisy Bloom Crochet Bag
        PRODUCTS_DATA.find(p => p.id === 'cr-top-01') || PRODUCTS_DATA[0], // Cloud Petal Crochet Top
        PRODUCTS_DATA.find(p => p.id === 'cr-toy-01') || PRODUCTS_DATA[2], // Little Bunny Amigurumi
        PRODUCTS_DATA.find(p => p.id === 'cr-bag-02') || PRODUCTS_DATA[3], // Sage Garden Crochet Tote
        PRODUCTS_DATA.find(p => p.id === 'cr-home-01') || PRODUCTS_DATA[4], // Floral Crochet Coaster Set
        PRODUCTS_DATA.find(p => p.id === 'cr-bag-03') || PRODUCTS_DATA[5], // Luna Crochet Shoulder Bag
      ].filter(Boolean) as Product[];

      return defaultProducts.map((p, idx) => ({
        product: p,
        addedAt: new Date(Date.now() - idx * 3600000).toISOString()
      }));
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean);
        }
      }
      return PRODUCTS_DATA.slice(0, 4);
    } catch {
      return PRODUCTS_DATA.slice(0, 4);
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isLoggedIn));
      if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(SAVED_ADDRESSES_STORAGE_KEY, JSON.stringify(savedAddresses));
      localStorage.setItem(ACCOUNT_ORDERS_STORAGE_KEY, JSON.stringify(accountOrders));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(shippingAddress));
      if (lastOrderDetails) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(lastOrderDetails));
      }
    } catch {
      // ignore
    }
  }, [isLoggedIn, user, savedAddresses, accountOrders, cart, wishlist, recentlyViewed, shippingAddress, lastOrderDetails]);

  // Selected product helper
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return PRODUCTS_DATA[0];
    return PRODUCTS_DATA.find(p => p.id === selectedProductId) || PRODUCTS_DATA[0];
  }, [selectedProductId]);

  // Navigation router
  const navigateTo = (page: PageType, options?: { productId?: string; categorySlug?: string; query?: string; accountTab?: AccountTab; orderId?: string }) => {
    if (options?.productId) setSelectedProductId(options.productId);
    if (options?.categorySlug) setSelectedCategorySlug(options.categorySlug);
    if (options?.query !== undefined) setSearchQuery(options.query);
    if (options?.accountTab) setAccountTab(options.accountTab);

    // Protection for checkout & payment routes when logged out
    if ((page === 'checkout' || page === 'payment') && !isLoggedIn) {
      setPendingCheckout(true);
      showToast('Sign In Required', 'Please sign in to proceed with checkout and place your order.', 'info');
      setCurrentPage('login');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Map sub-account routes to 'account' container with sub-tabs
    if (page === 'account-orders') {
      setAccountTab('orders');
      setCurrentPage('account');
    } else if (page === 'account-order-detail') {
      if (options?.orderId) {
        const found = accountOrders.find(o => o.id === options.orderId || o.orderNumber === options.orderId);
        if (found) setActiveAccountOrder(found);
      }
      setAccountTab('order-detail');
      setCurrentPage('account');
    } else if (page === 'account-order-track') {
      if (options?.orderId) {
        const found = accountOrders.find(o => o.id === options.orderId || o.orderNumber === options.orderId);
        if (found) setActiveAccountOrder(found);
      }
      setAccountTab('track-order');
      setCurrentPage('account');
    } else if (page === 'account-addresses') {
      setAccountTab('addresses');
      setCurrentPage('account');
    } else if (page === 'account-profile') {
      setAccountTab('profile');
      setCurrentPage('account');
    } else if (page === 'account-settings') {
      setAccountTab('settings');
      setCurrentPage('account');
    } else if (page === 'account-support') {
      setAccountTab('support');
      setCurrentPage('account');
    } else {
      setCurrentPage(page);
    }

    setIsMobileMenuOpen(false);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openLightbox = (image: string, caption?: string, tag?: string) => {
    setLightboxItem({ image, caption, tag });
  };
  const closeLightbox = () => setLightboxItem(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'cart' | 'wishlist' | 'error' = 'success', image?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, message, type, image };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth & Account Methods
  const login = (email: string, _password?: string, rememberMe = true) => {
    const nameParts = email.split('@')[0].split('.');
    const first = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'Priya';
    const last = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : 'Sharma';
    
    const loggedUser: UserProfile = {
      firstName: user?.firstName || first,
      lastName: user?.lastName || last,
      email: email,
      phone: user?.phone || '+91 98765 43210',
      dateOfBirth: '1996-04-18',
      avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      memberSince: 'August 2026',
      preferences: user?.preferences || {
        emailNotifications: true,
        newCollectionUpdates: true,
        specialOffers: false,
        orderSmsUpdates: true
      }
    };

    setUser(loggedUser);
    setIsLoggedIn(true);

    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser));
    }
    showToast('Welcome Back', `Signed in as ${loggedUser.firstName}`, 'success');

    if (pendingCheckout) {
      setPendingCheckout(false);
      setCurrentPage('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('account', { accountTab: 'overview' });
    }
    return true;
  };

  const signup = (userData: { firstName: string; lastName: string; email: string; phone: string; password?: string }) => {
    const newUser: UserProfile = {
      firstName: userData.firstName.trim() || 'Priya',
      lastName: userData.lastName.trim() || 'Sharma',
      email: userData.email.trim() || 'priya@example.com',
      phone: userData.phone.trim() || '+91 98765 43210',
      dateOfBirth: '',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      memberSince: 'August 2026',
      preferences: {
        emailNotifications: true,
        newCollectionUpdates: true,
        specialOffers: false,
        orderSmsUpdates: true
      }
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(true));
    showToast('Account Created', `Welcome to Maison Crochet, ${newUser.firstName}!`, 'success');

    if (pendingCheckout) {
      setPendingCheckout(false);
      setCurrentPage('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('account', { accountTab: 'overview' });
    }
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setPendingCheckout(false);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));
    localStorage.removeItem(USER_STORAGE_KEY);
    showToast('Logged Out', 'You have been safely signed out', 'info');
    navigateTo('home');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...profile };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    showToast('Profile Updated', 'Your personal details have been saved', 'success');
  };

  const updateAccountPreferences = (prefs: Partial<UserPreferences>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        preferences: { ...prev.preferences, ...prefs }
      };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    showToast('Preferences Saved', 'Your communication settings have been updated', 'success');
  };

  const changePassword = (_currentPass: string, _newPass: string) => {
    showToast('Password Updated', 'Your password has been changed successfully', 'success');
    return true;
  };

  // Saved Addresses (Max 3 constraint strictly enforced)
  // DEMO ONLY — Replace with real database later
  const addSavedAddress = (newAddrData: Omit<SavedAddress, 'id'>): boolean => {
    if (savedAddresses.length >= 3) {
      showToast('Address Limit Reached', 'You can save up to 3 addresses. Please delete an existing address first.', 'info');
      return false;
    }

    const newId = `addr-${Date.now()}`;
    let updatedList = [...savedAddresses];

    // If new address is set as default, remove default flag from all other addresses
    if (newAddrData.isDefault || savedAddresses.length === 0) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
    }

    const newAddress: SavedAddress = {
      ...newAddrData,
      id: newId,
      isDefault: newAddrData.isDefault || savedAddresses.length === 0
    };

    updatedList.push(newAddress);
    setSavedAddresses(updatedList);
    showToast('Address Added', `${newAddress.label} address saved successfully`, 'success');
    return true;
  };

  const updateSavedAddress = (id: string, updatedFields: Partial<SavedAddress>): boolean => {
    let updatedList = [...savedAddresses];

    if (updatedFields.isDefault) {
      updatedList = updatedList.map(a => ({ ...a, isDefault: a.id === id }));
    }

    updatedList = updatedList.map(a => {
      if (a.id === id) {
        return { ...a, ...updatedFields };
      }
      return a;
    });

    setSavedAddresses(updatedList);
    showToast('Address Updated', 'Address updated successfully.', 'success');
    return true;
  };

  const deleteSavedAddress = (id: string): boolean => {
    const target = savedAddresses.find(a => a.id === id);
    const filtered = savedAddresses.filter(a => a.id !== id);

    // If deleted address was default and others remain, make the first remaining default
    if (target?.isDefault && filtered.length > 0) {
      filtered[0].isDefault = true;
    }

    setSavedAddresses(filtered);
    showToast('Address Deleted', 'The address was removed from your account', 'info');
    return true;
  };

  const setDefaultAddress = (id: string) => {
    const updated = savedAddresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setSavedAddresses(updated);
    
    // Also sync to active checkout shipping address
    const chosen = updated.find(a => a.id === id);
    if (chosen) {
      setShippingAddress(prev => ({
        ...prev,
        fullName: chosen.fullName,
        phone: chosen.phone,
        addressLine1: chosen.addressLine1,
        addressLine2: chosen.addressLine2 || '',
        city: chosen.city,
        state: chosen.state,
        pincode: chosen.pincode
      }));
    }

    showToast('Default Address Set', 'Address set as primary for checkout', 'success');
  };

  const viewOrderDetails = (orderIdOrNumber: string) => {
    const found = accountOrders.find(o => o.id === orderIdOrNumber || o.orderNumber === orderIdOrNumber);
    if (found) {
      setActiveAccountOrder(found);
      setAccountTab('order-detail');
      setCurrentPage('account');
    }
  };

  const trackOrder = (orderIdOrNumber: string) => {
    const found = accountOrders.find(o => o.id === orderIdOrNumber || o.orderNumber === orderIdOrNumber);
    if (found) {
      setActiveAccountOrder(found);
      setAccountTab('track-order');
      setCurrentPage('account');
    } else {
      if (accountOrders.length > 0) {
        setActiveAccountOrder(accountOrders[0]);
        setAccountTab('track-order');
        setCurrentPage('account');
      }
    }
  };

  // Cart Handlers
  const addToCart = (product: Product, color?: ProductColor, size?: string, quantity: number = 1) => {
    const selectedColor = color || product.colors?.[0] || { name: 'Natural', hex: '#8C6F5A' };
    const selectedSize = size || product.sizes?.[0] || 'One Size';
    const itemId = `${product.id}-${selectedColor.name}-${selectedSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor,
          selectedSize,
          quantity
        }
      ];
    });

    showToast('Added to cart', `${product.name} has been added to your shopping bag.`, 'cart', product.images[0]);
  };

  const buyNow = (product: Product, color?: ProductColor, size?: string, quantity: number = 1) => {
    addToCart(product, color, size, quantity);
    navigateTo('cart');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Removed from Bag', 'Item removed from your bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'CROCHET10' || cleaned === 'MAISON10') {
      setAppliedCoupon({
        code: cleaned,
        discountType: 'percentage',
        value: 10,
        minOrder: 500,
        description: '10% off artisanal handcrafted pieces'
      });
      showToast('Coupon Applied!', '10% discount added to your cart.', 'success');
      return true;
    }
    if (cleaned === 'WELCOME15') {
      setAppliedCoupon({
        code: cleaned,
        discountType: 'percentage',
        value: 15,
        minOrder: 1000,
        description: '15% off first artisanal purchase'
      });
      showToast('Welcome Offer Applied!', '15% off applied.', 'success');
      return true;
    }
    showToast('Invalid Coupon', 'Code not recognized or expired.', 'info');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed from cart.', 'info');
  };

  // Wishlist Handlers
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      showToast('Removed from favorites', `${product.name} removed from your favorites`, 'info');
    } else {
      setWishlist((prev) => [
        { product, addedAt: new Date().toISOString() },
        ...prev,
      ]);
      showToast('Added to favorites', `${product.name} saved to your favorites`, 'wishlist', product.images[0]);
    }
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  const clearWishlist = () => setWishlist([]);

  // Place Order Simulation
  const placeOrder = (paymentMethod: string, customAddress?: ShippingAddress): OrderDetails => {
    if (!isLoggedIn) {
      showToast('Sign In Required', 'You must be logged in to place an order.', 'error');
      setPendingCheckout(true);
      navigateTo('login');
      throw new Error('User is not authenticated');
    }

    const finalAddress = customAddress || shippingAddress;
    
    if (savedAddresses.length === 0 && (!finalAddress.addressLine1 || !finalAddress.fullName)) {
      showToast('Delivery Address Required', 'Please add a delivery address before completing your order.', 'error');
      navigateTo('checkout');
      throw new Error('Missing delivery address');
    }

    const items = [...cart];
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }

    const shippingFee = subtotal >= 999 ? 0 : 99;
    const total = Math.max(0, subtotal - discount + shippingFee);
    const orderNum = `CR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderDetails = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      items,
      shippingAddress: finalAddress,
      paymentMethod,
      subtotal,
      discount,
      shippingFee,
      total,
      couponCode: appliedCoupon?.code,
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    // Also push to Account Orders history
    const accountOrderRecord: AccountOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: newOrder.date,
      placedDate: `${newOrder.date}, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
      status: 'Processing',
      carrier: 'Demo Express',
      trackingNumber: `CRX${Math.floor(100000000 + Math.random() * 900000000)}`,
      expectedDelivery: newOrder.estimatedDelivery,
      paymentMethod,
      shippingAddress: finalAddress,
      subtotal,
      shipping: shippingFee,
      discount,
      total,
      items: items.map(it => ({
        product: it.product,
        color: it.selectedColor,
        size: it.selectedSize,
        quantity: it.quantity,
        price: it.product.price
      })),
      timeline: [
        { step: 'ORDER PLACED', label: 'Order Placed', date: 'Just now', completed: true, current: true },
        { step: 'CONFIRMED', label: 'Confirmed', date: 'Pending', completed: false },
        { step: 'PACKED', label: 'Packed', date: 'Pending', completed: false },
        { step: 'SHIPPED', label: 'Shipped', date: 'Pending', completed: false },
        { step: 'OUT FOR DELIVERY', label: 'Out for Delivery', date: 'Pending', completed: false },
        { step: 'DELIVERED', label: 'Delivered', date: newOrder.estimatedDelivery, completed: false },
      ],
      shippingHistory: [
        {
          date: 'Today',
          time: 'Just now',
          title: 'Order Placed Successfully',
          location: 'Maison Crochet Studio',
          description: `Order ${orderNum} confirmed with ${paymentMethod}.`
        }
      ]
    };

    setAccountOrders(prev => [accountOrderRecord, ...prev]);
    setActiveAccountOrder(accountOrderRecord);

    setLastOrderNumber(orderNum);
    setLastOrderDetails(newOrder);
    localStorage.setItem('maison_crochet_last_order_num', orderNum);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    
    // Clear cart after ordering
    clearCart();
    setAppliedCoupon(null);

    return newOrder;
  };

  // Metrics
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const isFreeShippingEligible = cartSubtotal >= freeShippingThreshold;

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedCategorySlug,
        selectedProductId,
        selectedProduct,
        searchQuery,
        cart,
        wishlist,
        recentlyViewed,
        isCartOpen,
        isSearchModalOpen,
        isMobileMenuOpen,
        quickViewProduct,
        lightboxItem,
        toasts,
        lastOrderNumber,
        lastOrderDetails,
        shippingAddress,
        setShippingAddress,
        appliedCoupon,
        navigateTo,
        openCart,
        closeCart,
        openSearchModal,
        closeSearchModal,
        setIsMobileMenuOpen,
        openQuickView,
        closeQuickView,
        openLightbox,
        closeLightbox,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        clearWishlist,
        
        // Account System
        user,
        isLoggedIn,
        savedAddresses,
        accountOrders,
        activeAccountOrder,
        accountTab,
        setAccountTab,
        login,
        signup,
        logout,
        updateUserProfile,
        updateAccountPreferences,
        changePassword,
        addSavedAddress,
        updateSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        setActiveAccountOrder,
        viewOrderDetails,
        trackOrder,

        showToast,
        removeToast,
        setLastOrderNumber,
        placeOrder,
        cartSubtotal,
        cartCount,
        wishlistCount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isFreeShippingEligible
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
