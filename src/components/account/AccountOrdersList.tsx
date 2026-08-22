import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Package, Truck, Eye, ArrowRight, Search, Filter } from 'lucide-react';
import { AccountOrder } from '../../types';

export const AccountOrdersList: React.FC = () => {
  const { accountOrders, viewOrderDetails, trackOrder, navigateTo } = useShop();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;

  const filteredOrders = accountOrders.filter(order => {
    const matchesTab = selectedFilter === 'All' || order.status === selectedFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(it => it.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: AccountOrder['status']) => {
    switch (status) {
      case 'Processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Processing</span>;
      case 'Shipped':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#AAB5A0]/25 text-[#3e5233] border border-[#AAB5A0]/40">Shipped</span>;
      case 'Delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8C6F5A]/15 text-[#634835] border border-[#8C6F5A]/30">Delivered</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
              My Orders
            </h1>
            <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
              View your handcrafted order history, invoices, and shipment tracking.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#332C28]/40">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order or product..."
              className="w-full pl-9 pr-3.5 py-2 bg-[#F8F4EE]/60 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 border-b border-[#E7DED2] scrollbar-none">
          {filterTabs.map((tab) => {
            const count = tab === 'All' 
              ? accountOrders.length 
              : accountOrders.filter(o => o.status === tab).length;

            const isActive = selectedFilter === tab;

            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#332C28] text-[#F8F4EE] shadow-xs'
                    : 'text-[#332C28]/70 hover:text-[#332C28] hover:bg-[#E7DED2]/40'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#D9A7A0] text-[#332C28]' : 'bg-[#E7DED2] text-[#332C28]/70'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#E7DED2]/40 text-[#8C6F5A] flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#332C28]">
            No orders yet.
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1 max-w-sm mx-auto">
            Your first handmade treasure is waiting.
          </p>
          <button
            id="orders-shop-now-btn"
            onClick={() => navigateTo('shop')}
            className="mt-6 inline-flex items-center gap-2 py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            return (
              <div
                key={order.id}
                className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#8C6F5A]/40 transition-all"
              >
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E7DED2]/80 text-xs">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-[#332C28] text-sm">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-[#332C28]/40">•</span>
                    <span className="text-[#332C28]/70">Placed: {order.date}</span>
                    <span className="text-[#332C28]/40">•</span>
                    <span className="text-[#332C28]/70">Paid via {order.paymentMethod}</span>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Products in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'}
                          alt={item.product?.name}
                          className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-[#E7DED2] flex-shrink-0 bg-[#F8F4EE]"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-[#332C28] line-clamp-1">
                            {item.product?.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[#332C28]/70">
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
                                <span>{item.size}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-sm font-bold text-[#332C28]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar with Total & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-4 border-t border-[#E7DED2]/80">
                  <div className="text-xs text-[#332C28]">
                    <span className="text-[#332C28]/60">Total Amount: </span>
                    <span className="text-base font-serif font-bold text-[#332C28]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#332C28]/50 ml-1.5 font-normal">
                      (Includes taxes & shipping)
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      id={`order-card-view-${order.orderNumber}`}
                      onClick={() => viewOrderDetails(order.id)}
                      className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#332C28] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8C6F5A]" />
                      <span>View Details</span>
                    </button>

                    <button
                      id={`order-card-track-${order.orderNumber}`}
                      onClick={() => trackOrder(order.id)}
                      className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
