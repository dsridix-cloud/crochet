import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/products';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Scissors,
  ArrowRight,
  Phone,
  Instagram,
  User,
  LogOut,
  MapPin,
  Truck,
  Settings,
  ShieldCheck,
  UserPlus
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    openSearchModal, 
    cartCount, 
    wishlistCount,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    user,
    logout,
    setAccountTab
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountNav = (tab?: 'overview' | 'orders' | 'track-order' | 'addresses' | 'profile' | 'settings' | 'support') => {
    setIsAccountDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (!user) {
      navigateTo('login');
    } else {
      if (tab) {
        setAccountTab(tab);
      }
      navigateTo('account');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div 
        id="announcement-bar" 
        className="bg-[#8C6F5A] text-white text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 text-center tracking-[0.5px] sm:tracking-[1px] font-medium uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 overflow-hidden"
      >
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E7DED2] flex-shrink-0 animate-pulse" />
        <span className="truncate">Free shipping on orders above ₹999</span>
        <span className="hidden sm:inline text-white/50">•</span>
        <span className="hidden sm:inline text-[#E7DED2]">Slow-crafted in Jaipur, India</span>
      </div>

      {/* Main Header */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F8F4EE]/95 backdrop-blur-md shadow-sm border-b border-[#E7DED2]/80 py-2.5 sm:py-3' 
            : 'bg-[#F8F4EE] border-b border-[#E7DED2]/40 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Mobile Left: Hamburger */}
            <div className="flex items-center lg:hidden flex-shrink-0">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 -ml-1 text-[#332C28] hover:text-[#8C6F5A] focus:outline-none transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start min-w-0">
              <button 
                id="brand-logo-btn"
                onClick={() => navigateTo('home')} 
                className="text-center lg:text-left group flex flex-col items-center lg:items-start focus:outline-none"
              >
                <span className="font-serif-heading text-lg sm:text-2xl md:text-3xl font-bold tracking-wider sm:tracking-widest text-[#332C28] group-hover:text-[#8C6F5A] transition-colors whitespace-nowrap">
                  MAISON CROCHET
                </span>
                <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#8C6F5A] font-semibold -mt-0.5 sm:-mt-1 flex items-center gap-1 whitespace-nowrap">
                  <span>Artisanal Studio</span>
                  <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#D9A7A0]"></span>
                  <span>Est. 2024</span>
                </span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <button
                id="nav-link-home"
                onClick={() => navigateTo('home')}
                className={`transition-colors relative py-1 ${
                  currentPage === 'home' 
                    ? 'text-[#332C28] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-shop"
                onClick={() => navigateTo('shop')}
                className={`transition-colors relative py-1 ${
                  currentPage === 'shop' 
                    ? 'text-[#332C28] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                Shop All
                {currentPage === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              {/* Collections Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
              >
                <button
                  id="nav-link-collections"
                  onClick={() => navigateTo('collection', { categorySlug: 'bags' })}
                  className={`flex items-center gap-1 py-1 transition-colors ${
                    currentPage === 'collection' 
                      ? 'text-[#332C28] font-semibold' 
                      : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsDropdownOpen ? 'rotate-180 text-[#8C6F5A]' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCollectionsDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#E7DED2] p-3 animate-fade-in z-50">
                    <div className="text-[11px] font-semibold text-[#8C6F5A] uppercase tracking-wider px-3 py-1.5 border-b border-[#E7DED2]/60">
                      Curated Categories
                    </div>
                    <div className="mt-1 space-y-1">
                      {CATEGORIES_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          id={`dropdown-cat-${cat.id}`}
                          onClick={() => {
                            setIsCollectionsDropdownOpen(false);
                            navigateTo('collection', { categorySlug: cat.id });
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-[#332C28] hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={cat.image} 
                              alt={cat.name} 
                              className="w-7 h-7 rounded-md object-cover border border-[#E7DED2]" 
                            />
                            <div>
                              <div className="font-medium text-xs text-[#332C28]">{cat.name}</div>
                              <div className="text-[10px] text-[#332C28]/60">{cat.count} handcrafted styles</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8C6F5A] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                id="nav-link-custom-orders"
                onClick={() => navigateTo('custom-orders')}
                className={`flex items-center gap-1.5 transition-colors relative py-1 ${
                  currentPage === 'custom-orders' 
                    ? 'text-[#8C6F5A] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-[#D9A7A0]" />
                <span>Custom Orders</span>
                {currentPage === 'custom-orders' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-about"
                onClick={() => navigateTo('about')}
                className={`transition-colors relative py-1 ${
                  currentPage === 'about' 
                    ? 'text-[#332C28] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                Our Story
                {currentPage === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-faq"
                onClick={() => navigateTo('faq')}
                className={`transition-colors relative py-1 ${
                  currentPage === 'faq' 
                    ? 'text-[#332C28] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                FAQ
                {currentPage === 'faq' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-contact"
                onClick={() => navigateTo('contact')}
                className={`transition-colors relative py-1 ${
                  currentPage === 'contact' 
                    ? 'text-[#332C28] font-semibold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                Contact
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>
            </nav>

            {/* Right Action Icons: Search, Wishlist, Cart, Profile */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-2.5 flex-shrink-0">
              {/* 1. Search Button */}
              <button
                id="header-search-btn"
                type="button"
                onClick={openSearchModal}
                className="p-1.5 sm:p-2 text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 rounded-full transition-all"
                aria-label="Search handmade products"
                title="Search products"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>

              {/* 2. Wishlist Button with Badge */}
              <button
                id="header-wishlist-btn"
                type="button"
                onClick={() => navigateTo('wishlist')}
                className="p-1.5 sm:p-2 text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 rounded-full transition-all relative"
                aria-label="View Saved Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#D9A7A0] text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* 3. Cart Button with Badge */}
              <button
                id="header-cart-btn"
                type="button"
                onClick={() => navigateTo('cart')}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:py-2 sm:px-3.5 bg-[#332C28] text-[#F8F4EE] hover:bg-[#8C6F5A] rounded-full transition-all shadow-xs group"
                aria-label="View Shopping Bag"
                title="Your Shopping Bag"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 sm:w-4 sm:h-4 text-[#F8F4EE] group-hover:scale-105 transition-transform" />
                  {cartCount > 0 && (
                    <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-[#D9A7A0] text-[#332C28] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold tracking-wide">
                  <span>Bag</span>
                  {cartCount > 0 && (
                    <span className="bg-[#D9A7A0] text-[#332C28] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </span>
              </button>

              {/* 4. Profile / Account Dropdown (Set as last item) */}
              <div className="relative" ref={accountDropdownRef}>
                <button
                  id="header-account-btn"
                  type="button"
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className={`p-1.5 sm:py-1.5 sm:px-2.5 rounded-full flex items-center gap-1.5 transition-all text-xs font-semibold ${
                    currentPage === 'account' || isAccountDropdownOpen
                      ? 'bg-[#E7DED2]/60 text-[#332C28]'
                      : 'text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40'
                  }`}
                  aria-label="Customer Account"
                  title="My Account"
                >
                  {user ? (
                    <>
                      <img
                        src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={user.firstName}
                        className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full object-cover border border-[#D9A7A0]"
                      />
                      <span className="hidden sm:inline font-medium">
                        Hi, {user.firstName}
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline font-medium">Sign In</span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 hidden sm:inline text-[#332C28]/60" />
                </button>

                {/* Account Dropdown Menu */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-60 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-[#E7DED2] p-2 animate-fade-in z-50">
                    {user ? (
                      <>
                        {/* Logged in header info */}
                        <div className="p-3 border-b border-[#E7DED2]/60 mb-1">
                          <div className="font-semibold text-xs text-[#332C28] truncate">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-[10px] text-[#332C28]/60 truncate">
                            {user.email}
                          </div>
                        </div>

                        {/* Navigation items */}
                        <div className="space-y-0.5 text-xs font-medium text-[#332C28]">
                          <button
                            onClick={() => handleAccountNav('overview')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <User className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>My Account Overview</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('orders')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>My Orders</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('track-order')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <Truck className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Track Order</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsAccountDropdownOpen(false);
                              navigateTo('wishlist');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <Heart className="w-3.5 h-3.5 text-[#D9A7A0]" />
                            <span>Favorites ({wishlistCount})</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('addresses')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Saved Addresses</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('settings')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left"
                          >
                            <Settings className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Account Settings</span>
                          </button>
                        </div>

                        {/* Logout */}
                        <div className="pt-1 mt-1 border-t border-[#E7DED2]/60">
                          <button
                            onClick={() => {
                              setIsAccountDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-2 space-y-2">
                        <div className="p-2 text-center">
                          <p className="text-xs text-[#332C28]/80 font-medium">Welcome to Maison Crochet</p>
                          <p className="text-[10px] text-[#332C28]/60 mt-0.5">Sign in to track orders & save favorites.</p>
                        </div>

                        <button
                          id="dropdown-signin-btn"
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigateTo('login');
                          }}
                          className="w-full py-2.5 px-4 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>SIGN IN</span>
                        </button>

                        <button
                          id="dropdown-signup-btn"
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigateTo('signup');
                          }}
                          className="w-full py-2 px-4 bg-[#F8F4EE] hover:bg-[#E7DED2]/50 border border-[#E7DED2] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-[#8C6F5A]" />
                          <span>CREATE ACCOUNT</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-[85vw] max-w-xs sm:max-w-sm bg-[#F8F4EE] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#E7DED2] p-5 sm:p-6 z-10 animate-fade-in">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7DED2]">
                <div className="font-serif-heading text-lg sm:text-xl font-bold text-[#332C28]">
                  MAISON CROCHET
                </div>
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#332C28] hover:bg-[#E7DED2]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Account Profile or Sign In CTA */}
              <div className="py-3 border-b border-[#E7DED2]/80">
                {user ? (
                  <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E7DED2] space-y-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover border border-[#D9A7A0]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-xs text-[#332C28] truncate">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-[10px] text-[#332C28]/60 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-semibold">
                      <button
                        onClick={() => handleAccountNav('overview')}
                        className="py-1.5 px-2.5 rounded-lg bg-[#F8F4EE] hover:bg-[#E7DED2] text-[#332C28] text-center"
                      >
                        My Account
                      </button>
                      <button
                        onClick={() => handleAccountNav('orders')}
                        className="py-1.5 px-2.5 rounded-lg bg-[#F8F4EE] hover:bg-[#E7DED2] text-[#332C28] text-center"
                      >
                        My Orders
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateTo('login');
                      }}
                      className="flex-1 py-2 px-3 bg-[#332C28] text-[#F8F4EE] text-xs font-semibold rounded-xl text-center"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateTo('signup');
                      }}
                      className="flex-1 py-2 px-3 bg-[#FFFFFF] border border-[#E7DED2] text-[#332C28] text-xs font-semibold rounded-xl text-center"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-3 space-y-1.5">
                {/* Mobile Bag Link Highlight */}
                <button
                  id="mob-nav-shopping-bag"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#332C28] hover:bg-[#8C6F5A] active:bg-[#735A48] transition-all flex items-center justify-between shadow-xs mb-2 group"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <ShoppingBag className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
                    <span className="truncate whitespace-nowrap">Your Shopping Bag</span>
                  </div>
                  <span className="flex-shrink-0 whitespace-nowrap text-[11px] bg-[#8C6F5A] text-white px-2.5 py-0.5 rounded-full font-bold leading-normal ml-2">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </button>

                <button
                  id="mob-nav-home"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#332C28] hover:bg-[#E7DED2]/60 transition-colors flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A]" />
                </button>

                <button
                  id="mob-nav-shop"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('shop');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#332C28] hover:bg-[#E7DED2]/60 transition-colors flex items-center justify-between"
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A]" />
                </button>

                {/* Mobile Collections Expandable */}
                <div className="pt-2 pb-1 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6F5A] px-2">
                    Collections
                  </span>
                  <div className="mt-1 space-y-1 pl-2 border-l-2 border-[#D9A7A0]/60">
                    {CATEGORIES_DATA.map((cat) => (
                      <button
                        key={cat.id}
                        id={`mob-cat-${cat.id}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('collection', { categorySlug: cat.id });
                        }}
                        className="w-full text-left py-1.5 px-2 rounded-lg text-xs text-[#332C28]/90 hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-xs text-[#332C28]">{cat.name}</span>
                        <span className="text-[10px] font-bold text-[#8C6F5A] bg-[#E7DED2]/70 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {cat.count} styles
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  id="mob-nav-custom-orders"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('custom-orders');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#8C6F5A] bg-[#E7DED2]/50 hover:bg-[#E7DED2] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#D9A7A0]" />
                    <span>Custom Orders Studio</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#8C6F5A]" />
                </button>

                <button
                  id="mob-nav-about"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('about');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#332C28] hover:bg-[#E7DED2]/60 transition-colors flex items-center justify-between"
                >
                  <span>Our Story & Artisans</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A]" />
                </button>

                <button
                  id="mob-nav-faq"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('faq');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#332C28] hover:bg-[#E7DED2]/60 transition-colors flex items-center justify-between"
                >
                  <span>Frequently Asked Questions</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A]" />
                </button>

                <button
                  id="mob-nav-contact"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('contact');
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg font-medium text-sm text-[#332C28] hover:bg-[#E7DED2]/60 transition-colors flex items-center justify-between"
                >
                  <span>Contact Artisan Studio</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A]" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="pt-4 border-t border-[#E7DED2] text-xs text-[#332C28]/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Handcrafted with care in Jaipur</span>
                <span className="text-[#D9A7A0] text-sm">♥</span>
              </div>
              <div className="flex items-center gap-4 text-[#332C28]/90">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#8C6F5A]">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@maisoncrochet</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
