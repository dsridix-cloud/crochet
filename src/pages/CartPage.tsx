import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/products';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Sparkles, 
  Gift, 
  Truck, 
  ShieldCheck,
  Check,
  Heart,
  RotateCcw,
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo,
    moveToCartFromWishlist,
    toggleWishlist,
    isInWishlist,
    showToast,
    addToCart
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  
  // Pincode estimation state
  const [pincode, setPincode] = useState('302001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [pincodeCity, setPincodeCity] = useState('Jaipur, Rajasthan');

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discount) : 0;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 79;
  const giftWrapFee = isGiftWrap ? 99 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const success = applyCoupon(couponCodeInput.trim());
    if (success) {
      setCouponCodeInput('');
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      if (pincode.startsWith('11') || pincode.startsWith('12')) {
        setPincodeCity('Delhi NCR');
      } else if (pincode.startsWith('56')) {
        setPincodeCity('Bengaluru, Karnataka');
      } else if (pincode.startsWith('40')) {
        setPincodeCity('Mumbai, Maharashtra');
      } else if (pincode.startsWith('30')) {
        setPincodeCity('Jaipur, Rajasthan');
      } else if (pincode.startsWith('60')) {
        setPincodeCity('Chennai, Tamil Nadu');
      } else {
        setPincodeCity('Pan-India Serviceable');
      }
      setPincodeChecked(true);
      showToast('Delivery Available', `Orders to ${pincode} are delivered in 3–5 days with live tracking`, 'success');
    } else {
      showToast('Invalid PIN', 'Please enter a valid 6-digit postal code', 'info');
    }
  };

  const handleMoveToWishlist = (item: any) => {
    if (item.product) {
      if (!isInWishlist(item.product.id)) {
        toggleWishlist(item.product);
      }
      removeFromCart(item.id);
      showToast('Saved for Later', `${item.product.name} moved to your wishlist`, 'wishlist', item.product.images[0]);
    }
  };

  // Recommended products (excluding ones already in cart)
  const cartProductIds = new Set(cart.map(c => c.product.id));
  const suggestedProducts = PRODUCTS_DATA.filter(p => !cartProductIds.has(p.id)).slice(0, 4);

  // If bag is empty
  if (cart.length === 0) {
    return (
      <div id="cart-page-empty" className="min-h-screen bg-[#F8F4EE] py-12 sm:py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7DED2] shadow-xs space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#F8F4EE] border border-[#E7DED2] flex items-center justify-center text-[#8C6F5A] mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 opacity-70" />
            </div>
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">Artisan Studio</span>
              <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28] mt-1">
                Your Shopping Bag is Empty
              </h1>
              <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed max-w-md mx-auto mt-2">
                Looks like you haven't added any slow-crafted treasures yet. Explore our handcrafted crochet tops, bags, toys, and decor pieces.
              </p>
            </div>

            <div className="pt-2">
              <button
                id="cart-empty-explore-btn"
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>EXPLORE ALL COLLECTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Category Discovery */}
            <div className="pt-6 border-t border-[#E7DED2]">
              <div className="text-xs font-bold text-[#332C28] mb-3">Popular Categories</div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo('collection', { categorySlug: cat.id })}
                    className="px-3 py-1.5 rounded-full bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#E7DED2] text-xs font-medium text-[#332C28] transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Featured Handcrafted Recommendations */}
          <div className="mt-12 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
                Artisan Bestsellers
              </h3>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-[#8C6F5A] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {PRODUCTS_DATA.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3 rounded-2xl border border-[#E7DED2] shadow-2xs hover:border-[#8C6F5A]/50 transition-all group flex flex-col justify-between"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => navigateTo('product-detail', { productId: product.id })}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#F8F4EE] mb-2 border border-[#E7DED2]/60">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#8C6F5A] uppercase tracking-wider">
                      {product.category}
                    </div>
                    <div className="text-xs font-bold text-[#332C28] line-clamp-1 group-hover:text-[#8C6F5A] transition-colors">
                      {product.name}
                    </div>
                    <div className="text-xs font-bold text-[#332C28] mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product, product.colors[0], product.sizes[0], 1)}
                    className="mt-2.5 w-full py-1.5 rounded-lg bg-[#F8F4EE] hover:bg-[#332C28] hover:text-white border border-[#E7DED2] text-[11px] font-bold text-[#332C28] transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="cart-page" className="min-h-screen bg-[#F8F4EE] pb-32 lg:pb-20">
      
      {/* Mobile-Friendly Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-[#E7DED2] sticky top-16 z-20 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            id="cart-back-to-shop-btn"
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-[#8C6F5A] hover:text-[#332C28] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Shop</span>
          </button>

          <div className="flex items-center gap-2">
            <h1 className="font-serif-heading text-base sm:text-xl font-bold text-[#332C28]">
              Your Shopping Bag
            </h1>
            <span className="bg-[#8C6F5A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8C6F5A] font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#8C6F5A]" />
            <span className="hidden sm:inline">Secure Bag</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Free Shipping Progress Indicator (Mobile-Responsive Card) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DED2] shadow-2xs mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#332C28] mb-2.5">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] flex-shrink-0">
                <Truck className="w-3.5 h-3.5" />
              </div>
              {amountNeeded > 0 ? (
                <span>
                  Add <strong className="text-[#8C6F5A]">₹{amountNeeded.toLocaleString('en-IN')}</strong> more for <strong className="text-green-700">FREE Pan-India Shipping</strong>!
                </span>
              ) : (
                <span className="text-green-800 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-700 inline" />
                  You have qualified for FREE Shipping!
                </span>
              )}
            </span>
            <span className="text-xs font-bold text-[#8C6F5A]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#F8F4EE] rounded-full overflow-hidden border border-[#E7DED2]/80">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                amountNeeded === 0 ? 'bg-green-700' : 'bg-[#8C6F5A]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* LEFT: Cart Items (Mobile Cards + Desktop Flow) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Bag Items Container */}
            <div className="bg-white rounded-2xl border border-[#E7DED2] shadow-xs overflow-hidden divide-y divide-[#E7DED2]">
              {cart.map((item) => {
                const colorHex = item.selectedColor?.hex || item.product?.colors?.[0]?.hex || '#8C6F5A';
                const colorName = item.selectedColor?.name || item.product?.colors?.[0]?.name || 'Natural';
                const sizeName = item.selectedSize || item.product?.sizes?.[0] || 'One Size';
                const itemSubtotal = (item.product?.price || 0) * item.quantity;
                const isFavorite = isInWishlist(item.product.id);

                return (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors hover:bg-[#F8F4EE]/30"
                  >
                    {/* Top Row / Left Info */}
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 w-full sm:flex-1">
                      {/* Product Thumbnail */}
                      <div 
                        className="relative flex-shrink-0 cursor-pointer"
                        onClick={() => navigateTo('product-detail', { productId: item.product?.id })}
                      >
                        <img
                          src={item.product?.images?.[0] || ''}
                          alt={item.product?.name || 'Handmade Crochet'}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#E7DED2] bg-[#F8F4EE]"
                        />
                      </div>

                      {/* Product Metadata */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C6F5A]">
                          {item.product?.category}
                        </div>
                        <h2
                          onClick={() => navigateTo('product-detail', { productId: item.product?.id })}
                          className="font-serif-heading text-sm sm:text-base font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors cursor-pointer line-clamp-1"
                        >
                          {item.product?.name}
                        </h2>

                        {/* Variants and Badges */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#332C28]/80 mt-1">
                          <span className="inline-flex items-center gap-1.5 bg-[#F8F4EE] px-2 py-0.5 rounded-md border border-[#E7DED2]">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: colorHex }}
                            />
                            <span className="font-medium text-[11px]">{colorName}</span>
                          </span>

                          <span className="bg-[#F8F4EE] px-2 py-0.5 rounded-md border border-[#E7DED2] text-[11px] font-medium">
                            Size: {sizeName}
                          </span>
                        </div>

                        {/* Unit Price on Mobile */}
                        <div className="flex items-baseline gap-2 mt-1.5 sm:hidden">
                          <span className="text-sm font-bold text-[#332C28]">
                            ₹{itemSubtotal.toLocaleString('en-IN')}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-[#332C28]/60">
                              (₹{item.product?.price?.toLocaleString('en-IN')} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row on Mobile / Right Controls on Desktop */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7DED2]/60">
                      
                      {/* Quantity Stepper with large touch targets */}
                      <div className="flex flex-col items-start gap-1">
                        <div className={`flex items-center border rounded-xl bg-[#F8F4EE] overflow-hidden shadow-2xs transition-all ${
                          item.quantity > (item.product?.stock ?? 9)
                            ? 'border-[#C45A5A] ring-2 ring-[#C45A5A]/30 bg-[#FFF0F0]'
                            : 'border-[#E7DED2]'
                        }`}>
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-[#332C28] hover:bg-[#E7DED2] active:bg-[#D9A7A0]/30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className={`w-8 text-center text-xs font-bold ${
                            item.quantity > (item.product?.stock ?? 9) ? 'text-[#C45A5A]' : 'text-[#332C28]'
                          }`}>
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-[#332C28] hover:bg-[#E7DED2] active:bg-[#D9A7A0]/30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.quantity > (item.product?.stock ?? 9) && (
                          <div className="text-[11px] font-semibold text-[#C45A5A] flex items-center gap-1 mt-0.5 animate-fade-in">
                            <AlertCircle className="w-3 h-3 text-[#C45A5A] flex-shrink-0" />
                            <span>Quantity cannot be greater than Ready to Ship quantity.</span>
                          </div>
                        )}
                      </div>

                      {/* Desktop Price Subtotal */}
                      <div className="hidden sm:block text-right min-w-[90px]">
                        <div className="text-sm font-bold text-[#332C28]">
                          ₹{itemSubtotal.toLocaleString('en-IN')}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-[#332C28]/50">
                            ₹{item.product?.price} ea
                          </div>
                        )}
                      </div>

                      {/* Item Actions: Save for later & Remove */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className={`p-2 rounded-lg hover:bg-[#F8F4EE] transition-colors ${
                            isFavorite ? 'text-[#D9A7A0]' : 'text-[#332C28]/40 hover:text-[#8C6F5A]'
                          }`}
                          title="Save for later"
                          aria-label="Save for later"
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#D9A7A0]' : ''}`} />
                        </button>

                        <button
                          id={`remove-cart-item-${item.id}`}
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-lg text-[#332C28]/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Quick Delivery Pincode Checker */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DED2] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#332C28]">
                  <MapPin className="w-4 h-4 text-[#8C6F5A]" />
                  <span>Check Delivery Date & Serviceability</span>
                </div>
                {pincodeChecked && (
                  <span className="text-[11px] text-green-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{pincodeCity}</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 bg-[#F8F4EE]/60 border border-[#E7DED2] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#332C28] placeholder:text-[#332C28]/40 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-[#332C28] hover:bg-[#8C6F5A] text-white text-xs font-bold transition-colors"
                >
                  Verify
                </button>
              </form>

              {pincodeChecked && (
                <div className="flex items-center gap-4 text-[11px] text-[#332C28]/70 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8C6F5A]" />
                    <span>Estimated: <strong>3–5 Business Days</strong></span>
                  </span>
                  <span>•</span>
                  <span>Plastic-Free Botanical Packaging</span>
                </div>
              )}
            </div>

            {/* Artisan Gift Wrapping Option */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DED2] shadow-2xs space-y-3">
              <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                  className="mt-0.5 sm:mt-0 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] w-4 h-4 accent-[#8C6F5A]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-[#332C28] flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#D9A7A0]" />
                    <span>Artisanal Gift Packaging with Dried Lavender (+₹99)</span>
                  </div>
                  <div className="text-[#332C28]/60 text-[11px] mt-0.5">
                    Includes handcrafted honeycomb box, botanical cotton ribbon, and handwritten calligraphy note.
                  </div>
                </div>
              </label>

              {isGiftWrap && (
                <div className="pl-7 pt-1 animate-fade-in">
                  <label className="block text-[11px] font-bold text-[#332C28] mb-1">
                    Handwritten Note Message (Max 150 chars):
                  </label>
                  <textarea
                    rows={2}
                    maxLength={150}
                    placeholder="e.g. Wishing you warmth and joy! With love, Ananya"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full bg-[#F8F4EE]/60 border border-[#E7DED2] rounded-xl p-3 text-xs text-[#332C28] placeholder:text-[#332C28]/40 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                  <div className="text-right text-[10px] text-[#332C28]/50">
                    {giftMessage.length}/150
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Cross-Sell Shelf ("You May Also Like") */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7DED2] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#332C28]">
                  <Sparkles className="w-4 h-4 text-[#D9A7A0]" />
                  <span>Handcrafted Pairings For Your Bag</span>
                </div>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-[11px] font-bold text-[#8C6F5A] hover:underline"
                >
                  View Catalog
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                {suggestedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl border border-[#E7DED2] bg-[#F8F4EE]/30 hover:border-[#8C6F5A]/40 transition-all flex flex-col justify-between"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => navigateTo('product-detail', { productId: p.id })}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full aspect-square rounded-lg object-cover mb-1.5"
                      />
                      <div className="text-[11px] font-bold text-[#332C28] truncate">{p.name}</div>
                      <div className="text-[11px] font-semibold text-[#8C6F5A]">₹{p.price}</div>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.colors[0], p.sizes[0], 1)}
                      className="mt-2 w-full py-1 rounded-md bg-white hover:bg-[#332C28] hover:text-white border border-[#E7DED2] text-[10px] font-bold text-[#332C28] transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary (Desktop Sticky + Complete Breakdown) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E7DED2] shadow-xs p-5 sm:p-6 space-y-5 lg:sticky lg:top-24">
              
              <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-[#332C28] pb-3 border-b border-[#E7DED2] flex items-center justify-between">
                <span>Bag Summary</span>
                <span className="text-xs font-normal text-[#332C28]/60">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </h2>

              {/* Promo / Coupon Box */}
              <div>
                <label className="block text-xs font-bold text-[#332C28] mb-1.5">
                  Have a Promo Code?
                </label>

                {/* Quick One-Tap Coupon Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <button
                    type="button"
                    onClick={() => applyCoupon('HANDMADE10')}
                    className="px-2.5 py-1 rounded-full bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#8C6F5A]/30 text-[10px] font-bold text-[#8C6F5A] transition-colors flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span>HANDMADE10 (10% Off)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCoupon('WELCOME5')}
                    className="px-2.5 py-1 rounded-full bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#8C6F5A]/30 text-[10px] font-bold text-[#8C6F5A] transition-colors flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span>WELCOME5 (5% Off)</span>
                  </button>
                </div>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Code (e.g. HANDMADE10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-[#F8F4EE]/60 border border-[#E7DED2] rounded-xl px-3 py-2 text-xs uppercase font-semibold text-[#332C28] placeholder:text-[#332C28]/40 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-[#332C28] hover:bg-[#8C6F5A] text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="mt-2.5 flex items-center justify-between p-2 rounded-xl bg-[#5B734E]/10 border border-[#5B734E]/20 text-xs text-[#5B734E]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} ({appliedCoupon.description})</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="space-y-3 text-xs text-[#332C28]/80 pt-3 border-t border-[#E7DED2]/60">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-[#332C28]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Coupon Savings ({appliedCoupon.code})</span>
                    <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-bold text-[#332C28]">
                    {shippingFee === 0 ? <span className="text-green-700">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                {isGiftWrap && (
                  <div className="flex justify-between">
                    <span>Artisanal Gift Wrapping</span>
                    <span className="font-bold text-[#332C28]">₹99</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t border-[#E7DED2] flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Grand Total</div>
                  <div className="text-[10px] text-[#332C28]/50">Includes all GST & slow-craft packaging</div>
                </div>
                <div className="font-serif-heading text-2xl font-bold text-[#332C28]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Desktop Checkout CTA */}
              <button
                id="cart-proceed-checkout-desktop-btn"
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 rounded-xl bg-[#8C6F5A] hover:bg-[#735A48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Indicators */}
              <div className="space-y-2 pt-2 border-t border-[#E7DED2]/60 text-[11px] text-[#332C28]/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>Encrypted Payment with UPI & Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#8C6F5A] flex-shrink-0" />
                  <span>14-Day Free Exchange & Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
                  <span>Handcrafted by Master Artisans in Jaipur</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* MOBILE STICKY BOTTOM CHECKOUT BAR (Visible only on mobile/tablet screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7DED2] p-3.5 shadow-2xl safe-area-bottom">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8C6F5A] tracking-wider">
              Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </div>
            <div className="font-serif-heading text-lg font-bold text-[#332C28]">
              ₹{grandTotal.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            id="cart-proceed-checkout-mobile-btn"
            onClick={() => navigateTo('checkout')}
            className="flex-1 max-w-xs py-3.5 px-5 rounded-xl bg-[#8C6F5A] active:bg-[#735A48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
