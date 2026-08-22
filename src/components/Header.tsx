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
  const [expandedCollectionId, setExpandedCollectionId] = useState<string | null>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Reset expanded collection when mobile drawer closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setExpandedCollectionId(null);
    }
  }, [isMobileMenuOpen]);

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
            ? 'bg-[#F8F4EE]/95 backdrop-blur-md shadow-xs border-b border-[#E7DED2]/80 py-2 sm:py-2.5' 
            : 'bg-[#F8F4EE] border-b border-[#E7DED2]/40 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Top Row: Mobile Menu Toggle / Desktop Info (Left), Brand Logo (Center), Action Buttons (Right) */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 py-0.5">
            
            {/* 1. Left Control (Mobile Hamburger button & Desktop Quick Info) */}
            <div className="flex items-center gap-2 sm:w-1/4 min-w-0">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 -ml-1 text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 focus:outline-none transition-all rounded-xl xl:hidden flex items-center gap-1.5 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <>
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="hidden sm:inline text-xs font-semibold text-[#332C28]/80 uppercase tracking-wider">Menu</span>
                  </>
                )}
              </button>

              <div className="hidden xl:flex items-center gap-2 text-xs text-[#332C28]/70 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A7A0] flex-shrink-0" />
                <span className="truncate">Jaipur Artisanal Studio</span>
              </div>
            </div>

            {/* 2. Center Brand Logo (Prominent, Unobstructed Centered Banner) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
              <button 
                id="brand-logo-btn"
                onClick={() => navigateTo('home')} 
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
              >
                <span className="font-serif-heading text-lg sm:text-2xl md:text-3xl font-bold tracking-wider sm:tracking-widest text-[#332C28] group-hover:text-[#8C6F5A] transition-colors whitespace-nowrap">
                  MAISON CROCHET
                </span>
                <span className="text-[7.5px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#8C6F5A] font-semibold -mt-0.5 sm:-mt-1 flex items-center gap-1.5 whitespace-nowrap">
                  <span>Artisanal Studio</span>
                  <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#D9A7A0]"></span>
                  <span>Est. 2024</span>
                </span>
              </button>
            </div>

            {/* 3. Right Action Icons (Search, Wishlist, Bag, My Account) */}
            <div className="flex items-center justify-end gap-1 sm:gap-2.5 sm:w-1/4 flex-shrink-0">
              {/* Search Button */}
              <button
                id="header-search-btn"
                type="button"
                onClick={openSearchModal}
                className="p-1.5 sm:p-2 text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 rounded-full transition-all cursor-pointer"
                aria-label="Search handmade products"
                title="Search products"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Button with Badge */}
              <button
                id="header-wishlist-btn"
                type="button"
                onClick={() => navigateTo('wishlist')}
                className="p-1.5 sm:p-2 text-[#332C28] hover:text-[#8C6F5A] hover:bg-[#E7DED2]/40 rounded-full transition-all relative cursor-pointer"
                aria-label="View Saved Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#D9A7A0] text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-2xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button with Badge */}
              <button
                id="header-cart-btn"
                type="button"
                onClick={() => navigateTo('cart')}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:py-2 sm:px-3.5 bg-[#332C28] text-[#F8F4EE] hover:bg-[#8C6F5A] rounded-full transition-all shadow-2xs group cursor-pointer"
                aria-label="View Shopping Bag"
                title="Your Shopping Bag"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#F8F4EE] group-hover:scale-105 transition-transform" />
                  {cartCount > 0 && (
                    <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-[#D9A7A0] text-[#332C28] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-2xs">
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

              {/* Profile / Account Dropdown */}
              <div className="relative" ref={accountDropdownRef}>
                <button
                  id="header-account-btn"
                  type="button"
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className={`p-1.5 sm:py-1.5 sm:px-2.5 rounded-full flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
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
                        <div className="p-3 border-b border-[#E7DED2]/60 mb-1">
                          <div className="font-semibold text-xs text-[#332C28] truncate">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-[10px] text-[#332C28]/60 truncate">
                            {user.email}
                          </div>
                        </div>

                        <div className="space-y-0.5 text-xs font-medium text-[#332C28]">
                          <button
                            onClick={() => handleAccountNav('overview')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <User className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>My Account Overview</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('orders')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>My Orders</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('track-order')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Track Order</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsAccountDropdownOpen(false);
                              navigateTo('wishlist');
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <Heart className="w-3.5 h-3.5 text-[#D9A7A0]" />
                            <span>Favorites ({wishlistCount})</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('addresses')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Saved Addresses</span>
                          </button>

                          <button
                            onClick={() => handleAccountNav('settings')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors text-left cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5 text-[#8C6F5A]" />
                            <span>Account Settings</span>
                          </button>
                        </div>

                        <div className="pt-1 mt-1 border-t border-[#E7DED2]/60">
                          <button
                            onClick={() => {
                              setIsAccountDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
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
                          className="w-full py-2.5 px-4 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                          className="w-full py-2 px-4 bg-[#F8F4EE] hover:bg-[#E7DED2]/50 border border-[#E7DED2] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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

          {/* Desktop Navigation Row (Visible on desktop `xl:flex`, converted to drawer on mobile/tablet `< xl`) */}
          <div className="hidden xl:flex items-center justify-center pt-2 mt-2 border-t border-[#E7DED2]/50">
            <nav id="desktop-nav" className="flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium tracking-wide">
              <button
                id="nav-link-home"
                onClick={() => navigateTo('home')}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'home' 
                    ? 'text-[#332C28] font-bold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <span>Home</span>
                {currentPage === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-shop"
                onClick={() => navigateTo('shop')}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'shop' 
                    ? 'text-[#332C28] font-bold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <span>Shop All</span>
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
                  className={`flex items-center gap-1 py-1 transition-colors cursor-pointer ${
                    currentPage === 'collection' 
                      ? 'text-[#332C28] font-bold' 
                      : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollectionsDropdownOpen ? 'rotate-180 text-[#8C6F5A]' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCollectionsDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/98 backdrop-blur-md rounded-xl shadow-xl border border-[#E7DED2] p-3 animate-fade-in z-50">
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
                          className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-[#332C28] hover:bg-[#F8F4EE] hover:text-[#8C6F5A] transition-colors group cursor-pointer"
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
                className={`flex items-center gap-1.5 transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'custom-orders' 
                    ? 'text-[#8C6F5A] font-bold' 
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
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'about' 
                    ? 'text-[#332C28] font-bold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <span>Our Story</span>
                {currentPage === 'about' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-faq"
                onClick={() => navigateTo('faq')}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'faq' 
                    ? 'text-[#332C28] font-bold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <span>FAQ</span>
                {currentPage === 'faq' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>

              <button
                id="nav-link-contact"
                onClick={() => navigateTo('contact')}
                className={`transition-colors relative py-1 cursor-pointer ${
                  currentPage === 'contact' 
                    ? 'text-[#332C28] font-bold' 
                    : 'text-[#332C28]/80 hover:text-[#8C6F5A]'
                }`}
              >
                <span>Contact</span>
                {currentPage === 'contact' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-[85vw] max-w-xs sm:max-w-md md:max-w-lg bg-[#F8F4EE] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#E7DED2] p-5 sm:p-6 sm:p-8 z-10 animate-fade-in">
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
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6F5A]">
                      Collections
                    </span>
                    <span className="text-[10px] text-[#332C28]/50 font-medium">
                      Tap to view sub-collections
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {CATEGORIES_DATA.map((cat) => {
                      const hasSubCategories = Boolean(cat.subCategories && cat.subCategories.length > 0);
                      const isExpanded = expandedCollectionId === cat.id;

                      return (
                        <div key={cat.id} className="rounded-xl border border-[#E7DED2]/90 bg-white/80 overflow-hidden transition-all shadow-2xs">
                          {/* Main Collection Button */}
                          <button
                            type="button"
                            id={`mob-cat-${cat.id}`}
                            onClick={() => {
                              if (hasSubCategories) {
                                setExpandedCollectionId(isExpanded ? null : cat.id);
                              } else {
                                setIsMobileMenuOpen(false);
                                navigateTo('collection', { categorySlug: cat.id });
                              }
                            }}
                            className="w-full text-left py-2.5 px-3 flex items-center justify-between text-xs font-semibold text-[#332C28] hover:bg-[#E7DED2]/40 active:bg-[#E7DED2]/70 transition-colors cursor-pointer"
                            aria-expanded={hasSubCategories ? isExpanded : undefined}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img 
                                src={cat.image} 
                                alt={cat.name} 
                                className="w-6 h-6 rounded-md object-cover border border-[#E7DED2]" 
                              />
                              <span className="font-semibold text-xs text-[#332C28] truncate">{cat.name}</span>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[10px] font-bold text-[#8C6F5A] bg-[#E7DED2]/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {cat.count} styles
                              </span>
                              {hasSubCategories ? (
                                <ChevronDown 
                                  className={`w-4 h-4 text-[#8C6F5A] transition-transform duration-300 ${
                                    isExpanded ? 'rotate-180 text-[#332C28]' : ''
                                  }`} 
                                />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-[#8C6F5A]" />
                              )}
                            </div>
                          </button>

                          {/* Sub-Collections List - Accordion Panel */}
                          {hasSubCategories && (
                            <div 
                              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isExpanded ? 'max-h-96 opacity-100 py-2 border-t border-[#E7DED2]/60 bg-[#F8F4EE]/80' : 'max-h-0 opacity-0 py-0 border-t-0'
                              }`}
                            >
                              <div className="pl-3.5 pr-3 space-y-1">
                                {/* Shop All in Collection */}
                                <button
                                  type="button"
                                  id={`mob-subcat-all-${cat.id}`}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigateTo('collection', { categorySlug: cat.id });
                                  }}
                                  className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-bold text-[#8C6F5A] hover:bg-[#E7DED2]/60 active:bg-[#E7DED2] transition-colors flex items-center justify-between group cursor-pointer"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-[#D9A7A0]" />
                                    <span>Shop All {cat.name}</span>
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#8C6F5A] group-hover:translate-x-0.5 transition-transform" />
                                </button>

                                {/* Sub-Collections */}
                                {cat.subCategories!.map((sub) => (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    id={`mob-subcat-${cat.id}-${sub.id}`}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      navigateTo('collection', { categorySlug: cat.id });
                                    }}
                                    className="w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-medium text-[#332C28]/85 hover:text-[#332C28] hover:bg-[#E7DED2]/40 active:bg-[#E7DED2]/60 transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9A7A0] flex-shrink-0"></span>
                                    <span className="truncate">{sub.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
