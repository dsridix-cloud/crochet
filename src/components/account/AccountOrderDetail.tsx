import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  ArrowLeft, 
  Truck, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles,
  ExternalLink,
  Printer
} from 'lucide-react';
import { AccountOrder } from '../../types';

export const AccountOrderDetail: React.FC = () => {
  const { activeAccountOrder, accountOrders, setAccountTab, trackOrder, showToast } = useShop();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Fallback to first order if none selected
  const order: AccountOrder = activeAccountOrder || accountOrders[0];

  if (!order) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-12 text-center">
        <p className="text-sm text-[#332C28]/70">No order selected.</p>
        <button
          onClick={() => setAccountTab('orders')}
          className="mt-4 text-xs font-semibold text-[#8C6F5A] underline"
        >
          Return to Orders list
        </button>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    setShowInvoiceModal(true);
    showToast('Invoice Generated', `Invoice for Order #${order.orderNumber} is ready to print or save.`, 'info');
  };

  const steps = [
    { key: 'ORDER PLACED', label: 'Order Placed', shortDesc: 'Received' },
    { key: 'CONFIRMED', label: 'Confirmed', shortDesc: 'Artisan Allocated' },
    { key: 'PACKED', label: 'Packed', shortDesc: 'Eco-packaged' },
    { key: 'SHIPPED', label: 'Shipped', shortDesc: 'In Transit' },
    { key: 'OUT FOR DELIVERY', label: 'Out for Delivery', shortDesc: 'With Courier' },
    { key: 'DELIVERED', label: 'Delivered', shortDesc: 'Completed' },
  ];

  // Compute status index
  const getStatusIndex = (status: AccountOrder['status']) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 3;
      case 'Delivered': return 5;
      case 'Cancelled': return 0;
      default: return 0;
    }
  };

  const currentStepIdx = getStatusIndex(order.status);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Breadcrumb */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setAccountTab('orders')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6F5A] hover:text-[#332C28] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </button>
          <span className="text-xs text-[#332C28]/60">
            Placed on {order.placedDate || order.date}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E7DED2]/60">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs sm:text-sm text-[#332C28]/70 mt-0.5">
              Estimated Delivery: <span className="font-semibold text-[#332C28]">{order.expectedDelivery}</span> via {order.carrier}
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="order-detail-track-btn"
              onClick={() => trackOrder(order.id)}
              className="py-2 px-4 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Shipment</span>
            </button>

            <button
              id="order-detail-invoice-btn"
              onClick={handleDownloadInvoice}
              className="py-2 px-3.5 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#332C28] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>Download Invoice</span>
            </button>

            <button
              id="order-detail-support-btn"
              onClick={() => setAccountTab('support')}
              className="py-2 px-3.5 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#332C28] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Step Timeline */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-lg text-[#332C28] mb-6">
          Order Progress
        </h3>

        {/* Desktop Step Tracker */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E7DED2] z-0" />
            
            {/* Active Highlight Line */}
            <div 
              className="absolute top-4 left-6 h-0.5 bg-[#AAB5A0] z-0 transition-all duration-500"
              style={{ width: `${(currentStepIdx / (steps.length - 1)) * 88}%` }}
            />

            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center text-center max-w-[100px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20 scale-110'
                        : isCompleted
                        ? 'bg-[#AAB5A0] text-white'
                        : 'bg-[#FFFFFF] border-2 border-[#E7DED2] text-[#332C28]/30'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[11px] font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold mt-2.5 ${isCurrent ? 'text-[#8C6F5A]' : isCompleted ? 'text-[#332C28]' : 'text-[#332C28]/40'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#332C28]/60 mt-0.5">
                    {step.shortDesc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Step Tracker */}
        <div className="md:hidden space-y-4">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.key} className="flex items-start gap-3 relative">
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-6 left-3.5 w-0.5 h-8 -ml-px ${
                      idx < currentStepIdx ? 'bg-[#AAB5A0]' : 'bg-[#E7DED2]'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    isCurrent
                      ? 'bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20'
                      : isCompleted
                      ? 'bg-[#AAB5A0] text-white'
                      : 'bg-[#FFFFFF] border-2 border-[#E7DED2] text-[#332C28]/30'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${isCurrent ? 'text-[#8C6F5A]' : isCompleted ? 'text-[#332C28]' : 'text-[#332C28]/50'}`}>
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#8C6F5A]/15 text-[#8C6F5A]">CURRENT STATUS</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#332C28]/60 mt-0.5">{step.shortDesc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Items & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List (2 cols) */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-serif text-lg text-[#332C28] pb-3 border-b border-[#E7DED2]">
            Handmade Items in this Order ({order.items.length})
          </h3>

          <div className="divide-y divide-[#E7DED2]/60">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'}
                    alt={item.product?.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E7DED2] flex-shrink-0 bg-[#F8F4EE]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#332C28]">
                      {item.product?.name}
                    </h4>
                    <div className="flex items-center gap-2.5 mt-1 text-xs text-[#332C28]/70 flex-wrap">
                      {item.color && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                      )}
                      {item.size && (
                        <>
                          <span>•</span>
                          <span>Size: {item.size}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <p className="text-xs text-[#8C6F5A] mt-1 italic">
                      Crafted from 100% organic cotton yarn
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-[#332C28]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#332C28]/50">
                    ₹{item.price.toLocaleString('en-IN')} each
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-4 border-t border-[#E7DED2] space-y-2 text-xs text-[#332C28]/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#332C28]">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="font-semibold text-[#332C28]">
                {order.shipping === 0 ? <span className="text-[#557049]">FREE</span> : `₹${order.shipping}`}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#8C6F5A]">
                <span>Artisanal Discount</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-[#E7DED2] text-sm font-serif font-bold text-[#332C28]">
              <span>Total Paid</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Address & Payment Info (1 col) */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#332C28]/70">
              <MapPin className="w-4 h-4 text-[#8C6F5A]" />
              <span>Delivery Address</span>
            </div>
            <div className="text-xs text-[#332C28] leading-relaxed">
              <p className="font-bold text-sm text-[#332C28]">{order.shippingAddress.fullName}</p>
              <p className="mt-1">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-[#332C28]/60 mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#332C28]/70">
              <CreditCard className="w-4 h-4 text-[#8C6F5A]" />
              <span>Payment Details</span>
            </div>
            <div className="text-xs text-[#332C28] space-y-1">
              <p className="font-semibold text-xs">{order.paymentMethod}</p>
              <p className="text-[#332C28]/70">Status: <span className="font-semibold text-[#557049]">Payment Verified & Captured</span></p>
              <p className="text-[#332C28]/50 text-[11px] pt-1">Invoice ID: INV-{order.orderNumber}-2026</p>
            </div>
          </div>

          {/* Courier Details */}
          <div className="bg-[#E7DED2]/30 border border-[#E7DED2] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#332C28]">Carrier: {order.carrier}</span>
              <span className="text-[11px] text-[#8C6F5A] font-medium">{order.trackingNumber}</span>
            </div>
            <button
              onClick={() => trackOrder(order.id)}
              className="w-full mt-2 py-2 px-3 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] text-xs font-semibold text-[#332C28] rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#8C6F5A]" />
              <span>View Courier Milestones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal Simulation */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#E7DED2] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C6F5A] font-semibold">TAX INVOICE</span>
                <h3 className="font-serif text-xl text-[#332C28]">Maison Crochet Studio</h3>
              </div>
              <span className="text-xs text-[#332C28]/60">INV-{order.orderNumber}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#332C28]/80">
              <div>
                <span className="text-[#332C28]/50 block">Billed To:</span>
                <span className="font-bold text-[#332C28]">{order.shippingAddress.fullName}</span>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              </div>
              <div className="text-right">
                <span className="text-[#332C28]/50 block">Date:</span>
                <span className="font-bold text-[#332C28]">{order.date}</span>
                <p>Status: PAID</p>
              </div>
            </div>

            {/* Table of items */}
            <div className="border border-[#E7DED2] rounded-xl overflow-hidden text-xs">
              <div className="bg-[#F8F4EE] p-2.5 font-semibold grid grid-cols-4 text-[#332C28]">
                <span className="col-span-2">Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Amount</span>
              </div>
              <div className="divide-y divide-[#E7DED2]">
                {order.items.map((item, i) => (
                  <div key={i} className="p-2.5 grid grid-cols-4 text-[#332C28]">
                    <span className="col-span-2 line-clamp-1">{item.product.name}</span>
                    <span className="text-center">{item.quantity}</span>
                    <span className="text-right font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-sm font-serif font-bold text-[#332C28] pt-2">
              <span>Total Amount:</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => {
                  window.print?.();
                }}
                className="flex-1 py-2.5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="py-2.5 px-4 border border-[#E7DED2] text-xs font-semibold text-[#332C28] rounded-xl hover:bg-[#F8F4EE] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
