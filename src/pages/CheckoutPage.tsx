import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  ShoppingBag,
  Clock,
  Leaf
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    shippingAddress,
    setShippingAddress,
    isLoggedIn,
    user,
    savedAddresses,
    addSavedAddress,
    navigateTo, 
    showToast 
  } = useShop();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const defaultAddr = savedAddresses.find(a => a.isDefault) || savedAddresses[0];
    return defaultAddr ? defaultAddr.id : 'new';
  });

  const [formData, setFormData] = useState(() => {
    const defaultAddr = savedAddresses.find(a => a.isDefault) || savedAddresses[0];
    if (defaultAddr) {
      const parts = defaultAddr.fullName.split(' ');
      return {
        email: user?.email || 'priya@example.com',
        phone: defaultAddr.phone || user?.phone || '+91 98765 43210',
        firstName: parts[0] || 'Priya',
        lastName: parts.slice(1).join(' ') || 'Sharma',
        address: defaultAddr.addressLine1,
        apartment: defaultAddr.addressLine2 || '',
        city: defaultAddr.city,
        state: defaultAddr.state,
        pinCode: defaultAddr.pincode
      };
    }
    return {
      email: user?.email || shippingAddress.email || 'priya@example.com',
      phone: shippingAddress.phone || user?.phone || '+91 98765 43210',
      firstName: user?.firstName || (shippingAddress.fullName ? shippingAddress.fullName.split(' ')[0] : 'Priya'),
      lastName: user?.lastName || (shippingAddress.fullName ? shippingAddress.fullName.split(' ').slice(1).join(' ') : 'Sharma'),
      address: shippingAddress.addressLine1 || '',
      apartment: shippingAddress.addressLine2 || '',
      city: shippingAddress.city || '',
      state: shippingAddress.state || 'Rajasthan',
      pinCode: shippingAddress.pincode || ''
    };
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>(shippingAddress.deliveryMethod || 'standard');

  const selectSavedAddress = (addr: typeof savedAddresses[0]) => {
    setSelectedAddressId(addr.id);
    const parts = addr.fullName.split(' ');
    setFormData({
      email: user?.email || 'priya@example.com',
      phone: addr.phone,
      firstName: parts[0] || 'Priya',
      lastName: parts.slice(1).join(' ') || 'Sharma',
      address: addr.addressLine1,
      apartment: addr.addressLine2 || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pincode
    });
  };

  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discount) : 0;
  const shippingFee = (cartSubtotal >= 999 && shippingMethod === 'standard') 
    ? 0 
    : shippingMethod === 'express' 
      ? 99 
      : 79;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pinCode.trim()) {
      showToast('Missing Details', 'Please complete all required delivery address fields', 'info');
      return;
    }

    const fullAddressObj = {
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      addressLine1: formData.address,
      addressLine2: formData.apartment,
      city: formData.city,
      state: formData.state,
      pincode: formData.pinCode,
      label: 'Home' as const,
      isDefault: savedAddresses.length === 0
    };

    // If user had no saved address, automatically save it to their profile!
    if (savedAddresses.length === 0 || selectedAddressId === 'new') {
      addSavedAddress(fullAddressObj);
    }

    setShippingAddress({
      ...fullAddressObj,
      email: formData.email,
      deliveryMethod: shippingMethod
    });

    navigateTo('payment');
  };

  // Auth Guard: Logged-out users cannot access checkout
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[80vh] bg-[#F8F4EE] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#E7DED2] p-8 shadow-xs relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A7A0] via-[#8C6F5A] to-[#AAB5A0]" />
          
          <div className="w-16 h-16 rounded-full bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#8C6F5A]" />
          </div>

          <h2 className="font-serif-heading text-2xl font-bold text-[#332C28]">
            Sign In Required for Checkout
          </h2>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-2 mb-6 leading-relaxed">
            Please log in or create an account to proceed to checkout and complete your order.
          </p>

          <div className="space-y-3">
            <button
              id="checkout-login-guard-btn"
              onClick={() => navigateTo('login')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#8C6F5A] hover:bg-[#735A48] active:bg-[#5C473A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOG IN TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="checkout-signup-guard-btn"
              onClick={() => navigateTo('signup')}
              className="w-full py-3 px-6 rounded-xl border border-[#E7DED2] bg-white hover:bg-[#F8F4EE] text-[#332C28] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create New Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F4EE] py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#E7DED2]">
          <ShoppingBag className="w-12 h-12 text-[#8C6F5A] mx-auto mb-3 opacity-60" />
          <h2 className="font-serif-heading text-2xl font-bold text-[#332C28] mb-2">Your Bag is Empty</h2>
          <p className="text-xs text-[#332C28]/60 mb-6">Add artisan crochet pieces to your bag before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="py-3 px-6 rounded-full bg-[#332C28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8C6F5A] transition-colors"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Checkout Header */}
      <div className="bg-white border-b border-[#E7DED2] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-bold text-[#8C6F5A] hover:text-[#332C28] flex items-center gap-1.5 p-1 -ml-1 sm:p-0 sm:ml-0 rounded-lg transition-colors cursor-pointer"
            aria-label="Return to Bag"
          >
            <ArrowLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline hover:underline">Return to Bag</span>
          </button>

          <div className="font-serif-heading text-lg font-bold text-[#332C28] tracking-wider uppercase">
            Maison Crochet
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#8C6F5A] font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between relative">
          <div className="w-full absolute top-1/2 left-0 h-0.5 bg-[#E7DED2] -z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center bg-[#F8F4EE] px-3">
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white text-xs font-bold flex items-center justify-center shadow-xs">
              ✓
            </div>
            <span className="text-[11px] font-bold text-[#332C28] mt-1">1. Bag</span>
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#F8F4EE] px-3">
            <div className="w-8 h-8 rounded-full bg-[#332C28] text-white text-xs font-bold flex items-center justify-center ring-4 ring-[#8C6F5A]/20">
              2
            </div>
            <span className="text-[11px] font-bold text-[#332C28] mt-1">2. Shipping</span>
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#F8F4EE] px-3">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E7DED2] text-[#332C28]/60 text-xs font-bold flex items-center justify-center">
              3
            </div>
            <span className="text-[11px] font-medium text-[#332C28]/60 mt-1">3. Payment</span>
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#F8F4EE] px-3">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E7DED2] text-[#332C28]/60 text-xs font-bold flex items-center justify-center">
              4
            </div>
            <span className="text-[11px] font-medium text-[#332C28]/60 mt-1">4. Confirmation</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleContinueToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Shipping and Contact Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Contact Information */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7DED2] shadow-xs space-y-4">
              <h2 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8C6F5A] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Email for Order Updates *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Mobile Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7DED2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#8C6F5A] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Delivery Address</span>
                </h2>
                {savedAddresses.length > 0 && (
                  <span className="text-xs font-semibold text-[#8C6F5A] bg-[#E7DED2]/50 px-2.5 py-1 rounded-full">
                    {savedAddresses.length} Saved {savedAddresses.length === 1 ? 'Address' : 'Addresses'}
                  </span>
                )}
              </div>

              {/* Notice when no saved address is present */}
              {savedAddresses.length === 0 && (
                <div className="p-3.5 bg-[#E7DED2]/40 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#8C6F5A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Delivery Address Required:</span> Please provide your shipping address below. It will be automatically saved to your account for future orders.
                  </div>
                </div>
              )}

              {/* Saved Address Cards List */}
              {savedAddresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  <div className="text-xs font-bold text-[#332C28] uppercase tracking-wider">Select Saved Address:</div>
                  <div className="grid grid-cols-1 gap-3">
                    {savedAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => selectSavedAddress(addr)}
                          className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-[#8C6F5A] bg-[#F8F4EE] ring-1 ring-[#8C6F5A]'
                              : 'border-[#E7DED2] bg-white hover:bg-[#F8F4EE]/50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <input
                              type="radio"
                              name="savedAddressSelect"
                              checked={isSelected}
                              onChange={() => selectSavedAddress(addr)}
                              className="mt-0.5 accent-[#8C6F5A]"
                            />
                            <div>
                              <div className="font-bold text-[#332C28] flex items-center gap-2">
                                <span>{addr.fullName}</span>
                                {addr.isDefault && (
                                  <span className="text-[10px] font-bold bg-[#8C6F5A] text-white px-2 py-0.5 rounded-md">Default</span>
                                )}
                              </div>
                              <div className="text-[#332C28]/80 mt-1 leading-relaxed">
                                {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}
                              </div>
                              <div className="text-[#332C28]/60 mt-0.5">Phone: {addr.phone}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div
                      onClick={() => {
                        setSelectedAddressId('new');
                        setFormData({
                          email: user?.email || 'priya@example.com',
                          phone: user?.phone || '+91 98765 43210',
                          firstName: user?.firstName || '',
                          lastName: user?.lastName || '',
                          address: '',
                          apartment: '',
                          city: '',
                          state: 'Rajasthan',
                          pinCode: ''
                        });
                      }}
                      className={`p-3 rounded-xl border border-dashed text-xs cursor-pointer transition-all flex items-center gap-2 font-bold ${
                        selectedAddressId === 'new'
                          ? 'border-[#8C6F5A] bg-[#F8F4EE] text-[#8C6F5A]'
                          : 'border-[#E7DED2] text-[#332C28]/70 hover:border-[#8C6F5A]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="savedAddressSelect"
                        checked={selectedAddressId === 'new'}
                        onChange={() => setSelectedAddressId('new')}
                        className="accent-[#8C6F5A]"
                      />
                      <span>+ Enter a New Shipping Address</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat No., Street, Area"
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Apartment, Suite, Landmark (Optional)</label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    placeholder="e.g. Near City Palace"
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  >
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#332C28] mb-1">Postal PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="6-digit Indian PIN Code"
                    className="w-full bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Speed Selection */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7DED2] shadow-xs space-y-4">
              <h2 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8C6F5A] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Select Shipping Speed</span>
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#8C6F5A] bg-[#F8F4EE] ring-1 ring-[#8C6F5A]'
                      : 'border-[#E7DED2] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#8C6F5A]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#332C28] flex items-center gap-2">
                        <span>Standard Plastic-Free Shipping (4–6 Days)</span>
                        <Leaf className="w-3.5 h-3.5 text-[#8C6F5A]" />
                      </div>
                      <div className="text-[11px] text-[#332C28]/60">Recycled honeycomb botanical kraft wrap</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#332C28]">
                    {cartSubtotal >= 999 ? <span className="text-green-700 font-bold">FREE</span> : '₹79'}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#8C6F5A] bg-[#F8F4EE] ring-1 ring-[#8C6F5A]'
                      : 'border-[#E7DED2] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#8C6F5A]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#332C28] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#8C6F5A]" />
                        <span>Priority Air Courier (2–3 Days)</span>
                      </div>
                      <div className="text-[11px] text-[#332C28]/60">Direct air express with real-time SMS tracking</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#332C28]">₹99</span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E7DED2] shadow-xs space-y-5 sticky top-24">
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] pb-3 border-b border-[#E7DED2] flex items-center justify-between">
                <span>Bag Summary</span>
                <span className="text-xs font-normal text-[#332C28]/60">{cart.length} unique items</span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-[#E7DED2]/60">
                {cart.map((item) => {
                  const colorName = item.selectedColor?.name || item.product?.colors?.[0]?.name || 'Natural';
                  const sizeName = item.selectedSize || item.product?.sizes?.[0] || 'One Size';

                  return (
                    <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.product?.images?.[0] || ''}
                          alt={item.product?.name || 'Product'}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E7DED2] bg-[#F8F4EE]"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#8C6F5A] text-white text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#332C28] truncate">{item.product?.name}</div>
                        <div className="text-[11px] text-[#332C28]/60">{colorName} • {sizeName}</div>
                      </div>

                      <div className="text-xs font-bold text-[#332C28]">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-4 border-t border-[#E7DED2] text-xs text-[#332C28]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#332C28]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-700">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#332C28]">
                    {shippingFee === 0 ? <span className="text-green-700">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-[#E7DED2] flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-bold uppercase text-[#8C6F5A]">Grand Total</div>
                  <div className="text-[10px] text-[#332C28]/50">Includes all GST & taxes</div>
                </div>
                <div className="font-serif-heading text-2xl font-bold text-[#332C28]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Continue to Payment CTA */}
              <button
                id="checkout-continue-payment-btn"
                type="submit"
                className="w-full py-4 rounded-xl bg-[#8C6F5A] hover:bg-[#735A48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#332C28]/50 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                <span>Zero Risk • 14-Day Free Exchange Guarantee</span>
              </div>

            </div>
          </div>

        </form>
      </div>

    </div>
  );
};
