import React from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  ArrowLeft, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  Calendar, 
  ShieldCheck, 
  FileText,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { AccountOrder } from '../../types';

export const AccountOrderTracking: React.FC = () => {
  const { activeAccountOrder, accountOrders, setAccountTab, viewOrderDetails } = useShop();

  const order: AccountOrder = activeAccountOrder || accountOrders[0];

  if (!order) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-12 text-center">
        <p className="text-sm text-[#332C28]/70">No order available to track.</p>
        <button
          onClick={() => setAccountTab('orders')}
          className="mt-4 text-xs font-semibold text-[#8C6F5A] underline"
        >
          View All Orders
        </button>
      </div>
    );
  }

  const steps = [
    { key: 'ORDER PLACED', label: 'Order Placed', time: '22 Aug, 02:30 PM', isDone: true },
    { key: 'CONFIRMED', label: 'Order Confirmed', time: '22 Aug, 04:15 PM', isDone: true },
    { key: 'PACKED', label: 'Packed', time: '23 Aug, 05:00 PM', isDone: true },
    { key: 'SHIPPED', label: 'Shipped', time: '24 Aug, 09:30 AM', isDone: order.status === 'Shipped' || order.status === 'Delivered', isCurrent: order.status === 'Shipped' },
    { key: 'OUT FOR DELIVERY', label: 'Out for Delivery', time: 'Expected 26 Aug', isDone: order.status === 'Delivered' },
    { key: 'DELIVERED', label: 'Delivered', time: 'Expected 26 Aug', isDone: order.status === 'Delivered', isCurrent: order.status === 'Delivered' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Tracking Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setAccountTab('orders')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6F5A] hover:text-[#332C28] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </button>
          <span className="text-xs text-[#332C28]/60">Live Courier Status</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-3 border-t border-[#E7DED2]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
                Tracking Order #{order.orderNumber}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#AAB5A0]/20 text-[#405435] border border-[#AAB5A0]/40">
                {order.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#332C28]/70">
              Carrier: <span className="font-semibold text-[#332C28]">{order.carrier}</span> • Tracking No: <span className="font-mono font-semibold text-[#8C6F5A]">{order.trackingNumber}</span>
            </p>
          </div>

          <div className="bg-[#F8F4EE] border border-[#E7DED2] rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#8C6F5A]/15 text-[#8C6F5A] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#332C28]/60 uppercase tracking-wider block font-semibold">Expected Delivery</span>
              <span className="font-serif text-base sm:text-lg font-normal text-[#332C28]">
                {order.expectedDelivery}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline Card */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif text-lg text-[#332C28] mb-6">
          Shipment Progress
        </h3>

        {/* Desktop Tracker Bar */}
        <div className="hidden lg:grid grid-cols-6 gap-2 relative">
          {/* Connector Line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E7DED2] z-0" />

          {steps.map((step, idx) => {
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center px-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    step.isCurrent
                      ? 'bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20 scale-110 shadow-xs'
                      : step.isDone
                      ? 'bg-[#AAB5A0] text-white'
                      : 'bg-white border-2 border-[#E7DED2] text-[#332C28]/30'
                  }`}
                >
                  {step.isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-[11px] font-bold">{idx + 1}</span>
                  )}
                </div>
                <span className={`text-xs font-semibold mt-2.5 ${step.isCurrent ? 'text-[#8C6F5A]' : step.isDone ? 'text-[#332C28]' : 'text-[#332C28]/40'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-[#332C28]/60 mt-0.5">
                  {step.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 relative">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-3.5 w-0.5 h-8 -ml-px ${
                    step.isDone ? 'bg-[#AAB5A0]' : 'bg-[#E7DED2]'
                  }`}
                />
              )}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  step.isCurrent
                    ? 'bg-[#8C6F5A] text-white ring-4 ring-[#8C6F5A]/20'
                    : step.isDone
                    ? 'bg-[#AAB5A0] text-white'
                    : 'bg-[#FFFFFF] border-2 border-[#E7DED2] text-[#332C28]/30'
                }`}
              >
                {step.isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${step.isCurrent ? 'text-[#8C6F5A]' : step.isDone ? 'text-[#332C28]' : 'text-[#332C28]/50'}`}>
                    {step.label}
                  </span>
                  {step.isCurrent && (
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#8C6F5A]/15 text-[#8C6F5A]">CURRENT</span>
                  )}
                </div>
                <span className="text-[11px] text-[#332C28]/60">{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Milestone History Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Detailed Tracking History (2 cols) */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DED2]">
            <h3 className="font-serif text-lg text-[#332C28]">
              Shipping Activity Log
            </h3>
            <span className="text-xs text-[#332C28]/60">Updated in real-time</span>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E7DED2]">
            {order.shippingHistory.map((event, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#F8F4EE] border-2 border-[#8C6F5A] text-[#8C6F5A] flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#8C6F5A]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#332C28]">
                      {event.title}
                    </h4>
                    <span className="text-[11px] text-[#8C6F5A] font-medium bg-[#E7DED2]/40 px-2 py-0.2 rounded-md">
                      {event.date} • {event.time}
                    </span>
                  </div>
                  {event.location && (
                    <p className="text-xs text-[#332C28]/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8C6F5A]" />
                      <span>{event.location}</span>
                    </p>
                  )}
                  {event.description && (
                    <p className="text-xs text-[#332C28]/80 leading-relaxed pt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Package Details & Actions (1 col) */}
        <div className="space-y-6">
          {/* Destination Card */}
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#332C28]/70 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C6F5A]" />
              <span>Delivering To</span>
            </h4>
            <div className="text-xs text-[#332C28] leading-relaxed">
              <p className="font-bold text-sm">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Items Preview */}
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#332C28]/70 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#8C6F5A]" />
              <span>Package Contents ({order.items.length})</span>
            </h4>
            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E7DED2]"
                  />
                  <div>
                    <span className="font-semibold text-[#332C28] line-clamp-1">{item.product?.name}</span>
                    <span className="text-[#332C28]/60 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E7DED2]">
              <button
                id="tracking-view-order-details-btn"
                onClick={() => viewOrderDetails(order.id)}
                className="w-full py-2.5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW ORDER DETAILS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
