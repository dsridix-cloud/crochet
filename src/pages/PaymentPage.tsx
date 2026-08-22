import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  Globe2, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  HelpCircle,
  Truck,
  Check,
  AlertCircle
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    shippingAddress, 
    isLoggedIn,
    savedAddresses,
    placeOrder, 
    navigateTo,
    showToast 
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod' | 'intl'>('upi');
  
  // UPI State
  const [upiMethod, setUpiMethod] = useState<'qr' | 'id'>('qr');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  // Card State
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardName, setCardName] = useState(shippingAddress.fullName || 'Ananya Sharma');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('882');
  const [saveCard, setSaveCard] = useState(true);

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // COD State
  const [codVerified, setCodVerified] = useState(true);

  // Loading state for demo submit
  const [isProcessing, setIsProcessing] = useState(false);

  // Guard 1: Logged Out Protection
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-[#E7DED2] text-center shadow-xs">
        <Lock className="w-10 h-10 text-[#8C6F5A] mx-auto mb-3" />
        <h2 className="font-serif-heading text-xl font-bold text-[#332C28]">Sign In Required</h2>
        <p className="text-xs text-[#332C28]/70 mt-2 mb-6">Please sign in to your account to complete payment and place your order.</p>
        <button
          onClick={() => navigateTo('login')}
          className="w-full py-3 bg-[#8C6F5A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#735A48] transition-colors cursor-pointer"
        >
          Sign In to Continue
        </button>
      </div>
    );
  }

  // Guard 2: Missing Delivery Address Protection
  if (!shippingAddress.addressLine1 || (savedAddresses.length === 0 && !shippingAddress.fullName)) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-[#E7DED2] text-center shadow-xs">
        <Truck className="w-10 h-10 text-[#8C6F5A] mx-auto mb-3" />
        <h2 className="font-serif-heading text-xl font-bold text-[#332C28]">Delivery Address Required</h2>
        <p className="text-xs text-[#332C28]/70 mt-2 mb-6">Please provide a valid delivery address before proceeding with payment.</p>
        <button
          onClick={() => navigateTo('checkout')}
          className="w-full py-3 bg-[#8C6F5A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#735A48] transition-colors cursor-pointer"
        >
          Add Delivery Address
        </button>
      </div>
    );
  }

  // If cart is empty and no checkout info, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8" />
        </div>
        <h2 className="font-serif-heading text-2xl font-bold text-[#332C28]">No Items Ready for Payment</h2>
        <p className="text-sm text-[#332C28]/70 mt-2">Your shopping bag is currently empty.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-6 py-3 rounded-xl bg-[#8C6F5A] text-white text-sm font-semibold hover:bg-[#735A48] transition-colors"
        >
          Explore Handmade Collection
        </button>
      </div>
    );
  }

  // Calculations
  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discount) : 0;
  const shippingFee = (cartSubtotal >= 999 && shippingAddress.deliveryMethod === 'standard') 
    ? 0 
    : shippingAddress.deliveryMethod === 'express' 
      ? 99 
      : 79;
  const codHandlingFee = paymentMethod === 'cod' ? 49 : 0;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingFee + codHandlingFee);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    let methodLabel = 'UPI (Instant QR)';
    if (paymentMethod === 'upi') {
      methodLabel = upiMethod === 'qr' ? 'UPI (QR Code Demo)' : `UPI ID (${upiId || 'demo@upi'})`;
    } else if (paymentMethod === 'card') {
      const last4 = cardNumber.replace(/\s/g, '').slice(-4) || '6789';
      methodLabel = `Credit/Debit Card (ending in ••${last4})`;
    } else if (paymentMethod === 'netbanking') {
      methodLabel = `Net Banking (${selectedBank})`;
    } else if (paymentMethod === 'cod') {
      methodLabel = 'Cash on Delivery (COD)';
    } else if (paymentMethod === 'intl') {
      methodLabel = 'International Card (USD/Global Demo)';
    }

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(methodLabel);
    }, 1200);
  };

  return (
    <div id="payment-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Checkout Steps Indicator */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#E7DED2] -z-0" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-2/3 bg-[#8C6F5A] -z-0 transition-all duration-500" />
          
          <button 
            onClick={() => navigateTo('cart')}
            className="flex flex-col items-center relative z-10 group"
          >
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#332C28] mt-1.5">1. Bag</span>
          </button>

          <button 
            onClick={() => navigateTo('checkout')}
            className="flex flex-col items-center relative z-10 group"
          >
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-[#332C28] mt-1.5">2. Shipping</span>
          </button>

          <div className="flex flex-col items-center relative z-10">
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20 flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </div>
            <span className="text-[11px] font-bold text-[#8C6F5A] mt-1.5">3. Payment</span>
          </div>

          <div className="flex flex-col items-center relative z-10 opacity-50">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#E7DED2] text-[#332C28] flex items-center justify-center text-xs font-bold">
              4
            </div>
            <span className="text-[11px] font-medium text-[#332C28] mt-1.5">4. Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Payment Options */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Header & Back link */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28]">
                Select Payment Method
              </h1>
              <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
                All transactions are safe, encrypted, and run in demo sandbox mode.
              </p>
            </div>
            <button
              onClick={() => navigateTo('checkout')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6F5A] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shipping</span>
            </button>
          </div>

          {/* Demo Sandbox Alert Badge */}
          <div className="p-4 rounded-xl bg-[#E7DED2]/40 border border-[#8C6F5A]/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#8C6F5A] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#332C28]/80 leading-relaxed">
              <strong className="text-[#332C28]">Demo Payment Environment:</strong> Select any payment method below to test the complete end-to-end checkout flow. No real charges or real cards are processed.
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="bg-white rounded-2xl border border-[#E7DED2] shadow-xs overflow-hidden">
            
            {/* 1. UPI Payment Option */}
            <div className={`border-b border-[#E7DED2] transition-colors ${paymentMethod === 'upi' ? 'bg-[#F8F4EE]/40' : ''}`}>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'upi' ? 'border-[#8C6F5A] bg-[#8C6F5A]' : 'border-[#332C28]/30'
                  }`}>
                    {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#332C28] flex items-center gap-2">
                      <span>UPI / QR Code</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#AAB5A0]/30 text-[#332C28] font-bold">
                        Instant & Fastest
                      </span>
                    </div>
                    <div className="text-xs text-[#332C28]/60 mt-0.5">
                      Google Pay, PhonePe, Paytm, BHIM & Any UPI App
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C6F5A]">
                  <QrCode className="w-5 h-5 text-[#8C6F5A]" />
                </div>
              </button>

              {paymentMethod === 'upi' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DED2]/60 animate-fade-in space-y-4">
                  
                  {/* Mode Toggle: QR vs ID */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#E7DED2]/40 border border-[#E7DED2]">
                    <button
                      type="button"
                      onClick={() => setUpiMethod('qr')}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        upiMethod === 'qr' 
                          ? 'bg-white text-[#332C28] shadow-xs' 
                          : 'text-[#332C28]/70 hover:text-[#332C28]'
                      }`}
                    >
                      Scan QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiMethod('id')}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        upiMethod === 'id' 
                          ? 'bg-white text-[#332C28] shadow-xs' 
                          : 'text-[#332C28]/70 hover:text-[#332C28]'
                      }`}
                    >
                      Enter UPI ID / VPA
                    </button>
                  </div>

                  {upiMethod === 'qr' ? (
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#F8F4EE] border border-[#E7DED2]">
                      <div className="p-3 bg-white rounded-xl border border-[#E7DED2] shadow-xs flex-shrink-0 text-center">
                        <div className="w-36 h-36 bg-gradient-to-br from-[#332C28] to-[#8C6F5A] rounded-lg p-2 flex flex-col items-center justify-center text-white relative">
                          <QrCode className="w-28 h-28 text-white/90" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="px-2 py-0.5 rounded bg-white text-[#332C28] text-[9px] font-bold shadow-xs">
                              MAISON DEMO
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-[#332C28]/60 font-mono mt-1.5 block">
                          ₹{totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-[#332C28]/80 text-center sm:text-left">
                        <p className="font-bold text-sm text-[#332C28]">
                          1. Open any UPI application on your smartphone
                        </p>
                        <p className="text-[#332C28]/70">
                          Scan this demo QR code to authorize ₹{totalAmount.toLocaleString('en-IN')} securely.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                          <span className="px-2 py-0.5 rounded bg-white border border-[#E7DED2] text-[10px] font-semibold text-[#332C28]">GPay</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-[#E7DED2] text-[10px] font-semibold text-[#332C28]">PhonePe</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-[#E7DED2] text-[10px] font-semibold text-[#332C28]">Paytm</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-[#E7DED2] text-[10px] font-semibold text-[#332C28]">CRED</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#332C28] mb-1">
                          UPI ID (e.g. mobile@okhdfcbank or name@upi)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="ananya@okaxis"
                            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                          />
                          <button
                            type="button"
                            onClick={() => showToast('UPI Verified', 'Demo VPA is valid and verified', 'success')}
                            className="px-4 py-2.5 rounded-xl bg-[#E7DED2] text-[#332C28] text-xs font-semibold hover:bg-[#d8ccbe] transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* 2. Credit / Debit Card Option */}
            <div className={`border-b border-[#E7DED2] transition-colors ${paymentMethod === 'card' ? 'bg-[#F8F4EE]/40' : ''}`}>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'card' ? 'border-[#8C6F5A] bg-[#8C6F5A]' : 'border-[#332C28]/30'
                  }`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#332C28]">
                      Credit / Debit Card
                    </div>
                    <div className="text-xs text-[#332C28]/60 mt-0.5">
                      Visa, MasterCard, RuPay, Maestro & American Express
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#8C6F5A]" />
                </div>
              </button>

              {paymentMethod === 'card' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DED2]/60 animate-fade-in space-y-4">
                  
                  {/* Card Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#332C28] mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs font-mono text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#8C6F5A] uppercase tracking-wider">
                        Visa Demo
                      </span>
                    </div>
                  </div>

                  {/* Card Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#332C28] mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#332C28] mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs font-mono text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#332C28] mb-1 flex items-center justify-between">
                        <span>CVV</span>
                        <span className="text-[10px] text-[#332C28]/60 font-normal">3 digits on back</span>
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs font-mono text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-[#332C28]/80 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A]"
                    />
                    <span>Save card securely for seamless demo checkouts</span>
                  </label>

                </div>
              )}
            </div>

            {/* 3. Net Banking Option */}
            <div className={`border-b border-[#E7DED2] transition-colors ${paymentMethod === 'netbanking' ? 'bg-[#F8F4EE]/40' : ''}`}>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'netbanking' ? 'border-[#8C6F5A] bg-[#8C6F5A]' : 'border-[#332C28]/30'
                  }`}>
                    {paymentMethod === 'netbanking' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#332C28]">
                      Net Banking
                    </div>
                    <div className="text-xs text-[#332C28]/60 mt-0.5">
                      All Major Indian Banks & Direct Account Transfer
                    </div>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-[#8C6F5A]" />
              </button>

              {paymentMethod === 'netbanking' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DED2]/60 animate-fade-in space-y-4">
                  <label className="block text-xs font-semibold text-[#332C28]">
                    Select Bank
                  </label>
                  
                  {/* Quick Select Banks */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak', 'PNB'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-center transition-all text-xs font-semibold ${
                          selectedBank === bank
                            ? 'border-[#8C6F5A] bg-[#8C6F5A] text-white shadow-xs'
                            : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]/50'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  {/* All banks dropdown */}
                  <div>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] bg-white text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="SBI">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak">Kotak Mahindra Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="IndusInd Bank">IndusInd Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                      <option value="Union Bank of India">Union Bank of India</option>
                      <option value="Canara Bank">Canara Bank</option>
                      <option value="Yes Bank">Yes Bank</option>
                      <option value="IDFC First Bank">IDFC First Bank</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Cash on Delivery (COD) */}
            <div className={`border-b border-[#E7DED2] transition-colors ${paymentMethod === 'cod' ? 'bg-[#F8F4EE]/40' : ''}`}>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#8C6F5A] bg-[#8C6F5A]' : 'border-[#332C28]/30'
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#332C28] flex items-center gap-2">
                      <span>Cash on Delivery (COD)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7DED2] text-[#332C28] font-bold">
                        +₹49 handling
                      </span>
                    </div>
                    <div className="text-xs text-[#332C28]/60 mt-0.5">
                      Pay in cash upon doorstep delivery by courier
                    </div>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-[#8C6F5A]" />
              </button>

              {paymentMethod === 'cod' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DED2]/60 animate-fade-in space-y-3">
                  <div className="p-3 rounded-xl bg-[#F8F4EE] border border-[#E7DED2] text-xs text-[#332C28]/80 leading-relaxed">
                    <p className="font-semibold text-[#332C28]">
                      OTP Verification for Cash on Delivery:
                    </p>
                    <p className="text-[11px] text-[#332C28]/70 mt-1">
                      Our courier partner will request a 4-digit security code sent to <strong>{shippingAddress.phone}</strong> before handing over the parcel.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 5. International Cards */}
            <div className={`transition-colors ${paymentMethod === 'intl' ? 'bg-[#F8F4EE]/40' : ''}`}>
              <button
                type="button"
                onClick={() => setPaymentMethod('intl')}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'intl' ? 'border-[#8C6F5A] bg-[#8C6F5A]' : 'border-[#332C28]/30'
                  }`}>
                    {paymentMethod === 'intl' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#332C28]">
                      International Cards & Multi-Currency
                    </div>
                    <div className="text-xs text-[#332C28]/60 mt-0.5">
                      Accepting USD, EUR, GBP, AED, SGD, CAD
                    </div>
                  </div>
                </div>
                <Globe2 className="w-5 h-5 text-[#8C6F5A]" />
              </button>

              {paymentMethod === 'intl' && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DED2]/60 animate-fade-in space-y-3">
                  <div className="p-3 rounded-xl bg-[#F8F4EE] border border-[#E7DED2] text-xs text-[#332C28]/80">
                    <p className="font-semibold text-[#332C28]">
                      International Order Support:
                    </p>
                    <p className="text-[11px] text-[#332C28]/70 mt-1">
                      Real-time FX conversion estimated at ~${(totalAmount / 87).toFixed(2)} USD. All global cards supported seamlessly in demo mode.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Place Order Form Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl bg-[#8C6F5A] text-white font-bold text-base shadow-md hover:bg-[#735A48] active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                isProcessing ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing Demo Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ₹{totalAmount.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-[#332C28]/60 mt-2.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#AAB5A0]" />
              <span>Safe Encrypted Demo Checkout • No Actual Charges</span>
            </p>
          </div>

        </div>

        {/* Right Column: Order Summary & Address Review */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          
          {/* Shipping Address Summary Card */}
          <div className="bg-white rounded-2xl border border-[#E7DED2] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DED2]">
              <h3 className="font-serif-heading text-sm font-bold text-[#332C28] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8C6F5A]" />
                <span>Deliver To</span>
              </h3>
              <button
                onClick={() => navigateTo('checkout')}
                className="text-xs font-semibold text-[#8C6F5A] hover:underline"
              >
                Change
              </button>
            </div>

            <div className="mt-3 text-xs text-[#332C28]/80 space-y-1">
              <div className="font-bold text-[#332C28]">{shippingAddress.fullName}</div>
              <div>{shippingAddress.addressLine1}</div>
              {shippingAddress.addressLine2 && <div>{shippingAddress.addressLine2}</div>}
              <div>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</div>
              <div className="text-[11px] text-[#332C28]/60 pt-1">Phone: {shippingAddress.phone}</div>
              <div className="text-[11px] font-semibold text-[#8C6F5A] pt-1">
                {shippingAddress.deliveryMethod === 'express' ? '⚡ Express 2-3 Days Delivery' : '📦 Standard 4-6 Days Delivery'}
              </div>
            </div>
          </div>

          {/* Items Preview & Cost Breakdown */}
          <div className="bg-white rounded-2xl border border-[#E7DED2] p-5 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-sm font-bold text-[#332C28]">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Mini items list */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#E7DED2]/50">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pt-2.5 first:pt-0">
                  <img
                    src={item.product?.images?.[0] || ''}
                    alt={item.product?.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#F8F4EE] border border-[#E7DED2] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-[#332C28] truncate">{item.product?.name}</div>
                    <div className="text-[11px] text-[#332C28]/60">
                      {item.selectedColor?.name || 'Natural'} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#332C28]">
                    ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-[#E7DED2] space-y-2 text-xs">
              <div className="flex justify-between text-[#332C28]/80">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-[#8C6F5A] font-semibold">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#332C28]/80">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : `₹${shippingFee}`}</span>
              </div>

              {codHandlingFee > 0 && (
                <div className="flex justify-between text-[#332C28]/80">
                  <span>COD Handling Fee</span>
                  <span>₹{codHandlingFee}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#E7DED2] flex justify-between items-baseline font-bold text-sm text-[#332C28]">
                <span>Total Amount</span>
                <span className="text-base text-[#8C6F5A]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Artisan Guarantee */}
          <div className="p-4 rounded-2xl bg-[#E7DED2]/30 border border-[#E7DED2] text-xs text-[#332C28]/80 space-y-2">
            <div className="font-bold text-[#332C28] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8C6F5A]" />
              <span>Handmade Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#332C28]/70">
              Each piece is slow-crafted by women artisans in Jaipur. Hand-inspected and sealed in plastic-free botanical paper before dispatch.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
