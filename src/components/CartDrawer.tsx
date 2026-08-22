import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    navigateTo,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    isFreeShippingEligible,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; amount?: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const codeUpper = couponCode.trim().toUpperCase();

    if (codeUpper === 'HANDMADE10') {
      setAppliedDiscount({ code: 'HANDMADE10', percent: 10 });
      showToast('Coupon Applied!', '10% discount applied to your order', 'success');
      setCouponCode('');
    } else if (codeUpper === 'FIRST100') {
      setAppliedDiscount({ code: 'FIRST100', amount: 100 });
      showToast('Coupon Applied!', '₹100 discount applied to your order', 'success');
      setCouponCode('');
    } else {
      setCouponError('Invalid code. Try "HANDMADE10" or "FIRST100"');
    }
  };

  const discountAmount = appliedDiscount
    ? appliedDiscount.percent
      ? Math.round((cartSubtotal * appliedDiscount.percent) / 100)
      : appliedDiscount.amount || 0
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={closeCart}
      />

      {/* Slide Drawer Content */}
      <div className="relative w-full max-w-md bg-[#F8F4EE] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#E7DED2] animate-fade-in">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7DED2] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C6F5A]" />
            <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
              Your Shopping Bag
            </h2>
            <span className="bg-[#E7DED2] text-[#332C28] text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={closeCart}
            className="p-1.5 rounded-full text-[#332C28]/60 hover:text-[#332C28] hover:bg-[#F8F4EE] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#E7DED2]/40 px-5 py-3 border-b border-[#E7DED2]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#332C28] mb-1.5">
            {isFreeShippingEligible ? (
              <span className="text-[#5B734E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5B734E]" />
                <span>You've unlocked <strong>FREE Standard Shipping</strong>!</span>
              </span>
            ) : (
              <span>
                Add <strong className="text-[#8C6F5A]">₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping</strong>
              </span>
            )}
            <span className="text-[11px] text-[#332C28]/60">{freeShippingProgress}%</span>
          </div>

          <div className="w-full h-2 bg-[#E7DED2] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#8C6F5A] transition-all duration-500 rounded-full" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#E7DED2]/60 flex items-center justify-center text-[#8C6F5A] mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] mb-1">
                Your cart is feeling a little empty
              </h3>
              <p className="text-xs text-[#332C28]/70 max-w-xs mx-auto mb-6">
                Discover our handcrafted tops, heirloom amigurumi toys, and woven bags made slowly with natural yarn.
              </p>
              <button
                id="cart-empty-explore-btn"
                onClick={() => {
                  closeCart();
                  navigateTo('shop');
                }}
                className="py-2.5 px-6 rounded-full bg-[#332C28] text-[#F8F4EE] text-xs font-semibold hover:bg-[#8C6F5A] transition-colors shadow-xs"
              >
                Explore Handcrafted Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-[#E7DED2] flex gap-3 shadow-2xs relative"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-[#F8F4EE] border border-[#E7DED2]/60 flex-shrink-0"
                />

                {/* Info & Modifiers */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          closeCart();
                          navigateTo('product-detail', { productId: item.product.id });
                        }}
                        className="text-xs font-bold text-[#332C28] line-clamp-1 cursor-pointer hover:text-[#8C6F5A]"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#332C28]/40 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#332C28]/70">
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-black/20" 
                          style={{ backgroundColor: item.selectedColor?.hex || item.product?.colors?.[0]?.hex || '#8C6F5A' }} 
                        />
                        <span>{item.selectedColor?.name || item.product?.colors?.[0]?.name || 'Natural'}</span>
                      </span>
                      <span>•</span>
                      <span>{item.selectedSize || item.product?.sizes?.[0] || 'One Size'}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#E7DED2]/50">
                    <div className="flex items-center border border-[#E7DED2] rounded-lg bg-[#F8F4EE]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#332C28] hover:bg-[#E7DED2] rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-[#332C28]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#332C28] hover:bg-[#E7DED2] rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-[#332C28]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E7DED2] space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. HANDMADE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-lg px-3 py-1.5 text-xs text-[#332C28] placeholder:text-[#332C28]/40 focus:outline-none focus:border-[#8C6F5A]"
                />
              </div>
              <button
                type="submit"
                className="py-1.5 px-3 bg-[#E7DED2] hover:bg-[#8C6F5A] hover:text-white text-[#332C28] text-xs font-semibold rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedDiscount && (
              <div className="flex items-center justify-between text-xs text-[#5B734E] bg-[#5B734E]/10 p-2 rounded-lg">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Code <strong>{appliedDiscount.code}</strong> applied</span>
                </span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            {couponError && (
              <div className="text-[11px] text-red-600">{couponError}</div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-[#332C28]/80 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#5B734E]">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{isFreeShippingEligible ? 'FREE' : '₹79'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#332C28] pt-2 border-t border-[#E7DED2]">
                <span>Estimated Total</span>
                <span>₹{(finalTotal + (isFreeShippingEligible ? 0 : 79)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                id="cart-drawer-view-cart-btn"
                onClick={() => {
                  closeCart();
                  navigateTo('cart');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#332C28] text-[#332C28] text-xs font-bold hover:bg-[#332C28] hover:text-[#F8F4EE] transition-colors"
              >
                View Full Cart
              </button>

              <button
                id="cart-drawer-checkout-btn"
                onClick={() => {
                  closeCart();
                  navigateTo('checkout');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#332C28] text-[#F8F4EE] text-xs font-bold hover:bg-[#8C6F5A] transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center text-[10px] text-[#332C28]/50 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>Safe & Secure Artisanal Demo Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
