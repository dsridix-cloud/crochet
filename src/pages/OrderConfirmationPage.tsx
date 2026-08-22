import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Download, 
  Printer, 
  ArrowRight, 
  HeartHandshake, 
  Sparkles,
  ShoppingBag,
  Clock,
  Share2
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrderNumber, lastOrderDetails, shippingAddress, navigateTo, showToast } = useShop();
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Fallback demo order details if direct access
  const orderNum = lastOrderDetails?.orderNumber || lastOrderNumber || 'CR-1024';
  const orderDate = lastOrderDetails?.date || new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const orderItems = lastOrderDetails?.items || [];
  const address = lastOrderDetails?.shippingAddress || shippingAddress;
  const total = lastOrderDetails?.total || 1899;
  const subtotal = lastOrderDetails?.subtotal || 1899;
  const discount = lastOrderDetails?.discount || 0;
  const shippingFee = lastOrderDetails?.shippingFee ?? 0;
  const paymentMethod = lastOrderDetails?.paymentMethod || 'UPI (Google Pay / QR Demo)';
  const estimatedDelivery = lastOrderDetails?.estimatedDelivery || 'In 4–5 business days';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    showToast('Invoice Downloaded', `Tax invoice for ${orderNum} downloaded successfully`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Maison Crochet Order ${orderNum}`,
        text: `I just placed an order for handmade crochet pieces on Maison Crochet! Order #${orderNum}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link Copied', 'Order tracking link copied to clipboard', 'info');
    }
  };

  return (
    <div id="order-confirmation-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Success Banner */}
      <div className="text-center space-y-4 pb-8 border-b border-[#E7DED2]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#AAB5A0]/30 text-[#332C28] flex items-center justify-center mx-auto shadow-sm animate-bounce-short">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#8C6F5A]" />
        </div>
        
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
            Thank You For Supporting Slow Craft
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
            Order #{orderNum} Confirmed!
          </h1>
          <p className="text-sm text-[#332C28]/70 max-w-lg mx-auto mt-2 leading-relaxed">
            Your handmade order has been received by our Jaipur artisan studio. We have sent a confirmation email to <strong className="text-[#332C28]">{address.email}</strong>.
          </p>
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7DED2] text-xs font-semibold text-[#332C28] hover:bg-[#F8F4EE] shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#8C6F5A]" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7DED2] text-xs font-semibold text-[#332C28] hover:bg-[#F8F4EE] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#8C6F5A]" />
            <span>Download Invoice</span>
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7DED2] text-xs font-semibold text-[#332C28] hover:bg-[#F8F4EE] shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8C6F5A]" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Craft & Delivery Timeline Progress */}
      <div className="my-8 bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E7DED2]">
          <div>
            <h2 className="font-serif-heading text-base font-bold text-[#332C28] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C6F5A]" />
              <span>Live Order Status</span>
            </h2>
            <p className="text-xs text-[#332C28]/60 mt-0.5">
              Estimated Delivery: <strong className="text-[#8C6F5A]">{estimatedDelivery}</strong>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AAB5A0]/20 text-[#332C28] text-xs font-bold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#8C6F5A] animate-ping" />
            In Artisan Queue
          </span>
        </div>

        {/* 4-Step Progress Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-[#332C28]">Order Placed</div>
              <div className="text-[11px] text-[#332C28]/60">{orderDate}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20 flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-[#8C6F5A]">Artisan Crafting</div>
              <div className="text-[11px] text-[#332C28]/60">Hand-crocheting in Jaipur</div>
            </div>
          </div>

          <div className="space-y-2 opacity-60">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#E7DED2] text-[#332C28] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <div className="text-xs font-semibold text-[#332C28]">Quality & Steam Blocking</div>
              <div className="text-[11px] text-[#332C28]/60">Eco-paper gift wrap</div>
            </div>
          </div>

          <div className="space-y-2 opacity-60">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#E7DED2] text-[#332C28] flex items-center justify-center text-xs font-bold">
              4
            </div>
            <div>
              <div className="text-xs font-semibold text-[#332C28]">Dispatched & Delivery</div>
              <div className="text-[11px] text-[#332C28]/60">{estimatedDelivery}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8">
        
        {/* Left: Ordered Items List */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-4">
          <h3 className="font-serif-heading text-sm font-bold text-[#332C28] flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8C6F5A]" />
            <span>Items in this Order ({orderItems.length || 1})</span>
          </h3>

          <div className="divide-y divide-[#E7DED2]/60 space-y-3">
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-4">
                  <img
                    src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85'}
                    alt={item.product?.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#F8F4EE] border border-[#E7DED2] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#332C28]">{item.product?.name}</h4>
                    <div className="text-[11px] text-[#332C28]/70 mt-0.5 space-x-2">
                      <span>Color: <strong>{item.selectedColor?.name || 'Natural'}</strong></span>
                      <span>•</span>
                      <span>Size: <strong>{item.selectedSize || 'One Size'}</strong></span>
                    </div>
                    <div className="text-[11px] text-[#332C28]/60 mt-0.5">
                      Qty: {item.quantity} × ₹{item.product?.price?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#332C28]">
                    ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#332C28]/70 py-2">
                Handmade Crochet Tote Bag • Vintage Granny Square (Demo Item)
              </div>
            )}
          </div>

          {/* Totals Breakdown */}
          <div className="pt-4 border-t border-[#E7DED2] space-y-2 text-xs">
            <div className="flex justify-between text-[#332C28]/80">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#8C6F5A] font-semibold">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#332C28]/80">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? <strong className="text-green-700">FREE</strong> : `₹${shippingFee}`}</span>
            </div>
            <div className="pt-2 border-t border-[#E7DED2] flex justify-between items-baseline font-bold text-sm text-[#332C28]">
              <span>Grand Total Paid</span>
              <span className="text-base text-[#8C6F5A]">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Right: Shipping & Payment Details */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-[#E7DED2] p-5 shadow-xs space-y-3">
            <h3 className="font-serif-heading text-xs font-bold text-[#332C28] flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>Shipping Address</span>
            </h3>
            <div className="text-xs text-[#332C28]/80 space-y-0.5 leading-relaxed">
              <div className="font-bold text-[#332C28]">{address.fullName}</div>
              <div>{address.addressLine1}</div>
              {address.addressLine2 && <div>{address.addressLine2}</div>}
              <div>{address.city}, {address.state} - {address.pincode}</div>
              <div className="text-[11px] text-[#332C28]/60 pt-1">Phone: {address.phone}</div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-[#E7DED2] p-5 shadow-xs space-y-3">
            <h3 className="font-serif-heading text-xs font-bold text-[#332C28] flex items-center gap-1.5 uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>Payment Information</span>
            </h3>
            <div className="text-xs text-[#332C28]/80 space-y-1">
              <div className="font-semibold text-[#332C28]">{paymentMethod}</div>
              <div className="text-[11px] text-green-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Authorized in Demo Sandbox Mode</span>
              </div>
            </div>
          </div>

          {/* Artisan Impact Note */}
          <div className="p-4 rounded-2xl bg-[#E7DED2]/30 border border-[#E7DED2] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#332C28]">
              <HeartHandshake className="w-4 h-4 text-[#8C6F5A]" />
              <span>Handmade with Purpose</span>
            </div>
            <p className="text-[11px] text-[#332C28]/70 leading-relaxed">
              Your order directly supports fair living wages for our women artisan collective in Jaipur, Rajasthan.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Navigation CTAs */}
      <div className="text-center pt-6 space-y-4">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#8C6F5A] text-white font-bold text-sm shadow-md hover:bg-[#735A48] active:scale-[0.99] transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <div>
          <button
            onClick={() => navigateTo('custom-orders')}
            className="text-xs font-semibold text-[#8C6F5A] hover:underline"
          >
            Looking for something bespoke? Request a Custom Crochet Piece →
          </button>
        </div>
      </div>

    </div>
  );
};
