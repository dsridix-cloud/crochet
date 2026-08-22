import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Heart, MapPin, User, Package, ChevronRight, Truck, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { AccountOrder } from '../../types';

export const AccountOverview: React.FC = () => {
  const { 
    user, 
    accountOrders, 
    wishlistCount, 
    savedAddresses, 
    setAccountTab, 
    viewOrderDetails, 
    trackOrder,
    navigateTo 
  } = useShop();

  const activeOrders = accountOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped');
  const recentOrders = accountOrders.slice(0, 3);

  const getStatusBadge = (status: AccountOrder['status']) => {
    switch (status) {
      case 'Processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">Processing</span>;
      case 'Shipped':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#AAB5A0]/25 text-[#3e5233] border border-[#AAB5A0]/40">Shipped</span>;
      case 'Delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8C6F5A]/15 text-[#634835] border border-[#8C6F5A]/30">Delivered</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#FFFFFF] to-[#F8F4EE] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user?.firstName || 'Priya'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#D9A7A0] shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#AAB5A0] text-white p-1 rounded-full border-2 border-[#FFFFFF]" title="Verified Customer">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28] font-normal">
                Hello, {user?.firstName || 'Priya'} 👋
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
              Welcome back to your handmade world.
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-[#332C28]/60">
              <span>Member since {user?.memberSince || 'March 2025'}</span>
              <span>•</span>
              <span className="text-[#8C6F5A] font-medium">{user?.email}</span>
            </div>
          </div>
        </div>

        <button
          id="overview-explore-shop-btn"
          onClick={() => navigateTo('shop')}
          className="py-2.5 px-5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <span>EXPLORE SHOP</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: My Orders */}
        <button
          id="overview-card-orders"
          onClick={() => setAccountTab('orders')}
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/40 text-[#8C6F5A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-[#332C28]/30 group-hover:text-[#8C6F5A] transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#332C28]/60 uppercase tracking-wider">
              My Orders
            </h3>
            <p className="font-serif text-lg sm:text-xl text-[#332C28] font-normal mt-1">
              {activeOrders.length > 0 ? `${activeOrders.length} Active Orders` : `${accountOrders.length} Total Orders`}
            </p>
          </div>
        </button>

        {/* Card 2: Favorites */}
        <button
          id="overview-card-favorites"
          onClick={() => setAccountTab('favorites')}
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9A7A0]/20 text-[#D9A7A0] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <ChevronRight className="w-4 h-4 text-[#332C28]/30 group-hover:text-[#8C6F5A] transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#332C28]/60 uppercase tracking-wider">
              Favorites
            </h3>
            <p className="font-serif text-lg sm:text-xl text-[#332C28] font-normal mt-1">
              {wishlistCount} Saved Items
            </p>
          </div>
        </button>

        {/* Card 3: Saved Addresses */}
        <button
          id="overview-card-addresses"
          onClick={() => setAccountTab('addresses')}
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#AAB5A0]/20 text-[#607455] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-[#332C28]/30 group-hover:text-[#8C6F5A] transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#332C28]/60 uppercase tracking-wider">
              Saved Addresses
            </h3>
            <p className="font-serif text-lg sm:text-xl text-[#332C28] font-normal mt-1">
              {savedAddresses.length} Addresses
            </p>
          </div>
        </button>

        {/* Card 4: Account Details */}
        <button
          id="overview-card-profile"
          onClick={() => setAccountTab('profile')}
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6F5A]/15 text-[#8C6F5A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-[#332C28]/30 group-hover:text-[#8C6F5A] transition-colors" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#332C28]/60 uppercase tracking-wider">
              Account Details
            </h3>
            <p className="font-serif text-lg sm:text-xl text-[#332C28] font-normal mt-1 truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Priya Sharma'}
            </p>
          </div>
        </button>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E7DED2]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#332C28]">
              Recent Orders
            </h2>
            <p className="text-xs text-[#332C28]/60 mt-0.5">
              Track active deliveries and view your handmade purchases.
            </p>
          </div>
          <button
            id="overview-view-all-orders-btn"
            onClick={() => setAccountTab('orders')}
            className="text-xs text-[#8C6F5A] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <Package className="w-10 h-10 text-[#332C28]/30 mx-auto mb-3" />
            <p className="text-sm text-[#332C28]/70">No orders placed yet.</p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-3 text-xs text-[#8C6F5A] font-semibold hover:underline"
            >
              Start shopping handmade crochet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const primaryItem = order.items[0];
              const remainingCount = order.items.length - 1;

              return (
                <div
                  key={order.id}
                  className="border border-[#E7DED2] rounded-xl p-4 sm:p-5 hover:border-[#8C6F5A]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F8F4EE]/30"
                >
                  {/* Order Info & Primary Product */}
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={primaryItem?.product?.images?.[0] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'}
                      alt={primaryItem?.product?.name || 'Crochet piece'}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#E7DED2] flex-shrink-0 bg-white"
                    />
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-semibold text-xs sm:text-sm text-[#332C28]">
                          Order #{order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <h4 className="text-sm font-medium text-[#332C28] mt-1 line-clamp-1">
                        {primaryItem?.product?.name}
                        {remainingCount > 0 && (
                          <span className="text-xs text-[#332C28]/60 font-normal ml-1">
                            +{remainingCount} more {remainingCount === 1 ? 'item' : 'items'}
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-[#332C28]/70">
                        <span>Placed: {order.date}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#332C28]">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#E7DED2]/60">
                    <button
                      id={`overview-view-order-${order.orderNumber}`}
                      onClick={() => viewOrderDetails(order.id)}
                      className="flex-1 md:flex-initial py-2 px-3.5 border border-[#E7DED2] hover:border-[#332C28] bg-[#FFFFFF] text-xs font-semibold text-[#332C28] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#8C6F5A]" />
                      <span>View Order</span>
                    </button>

                    <button
                      id={`overview-track-order-${order.orderNumber}`}
                      onClick={() => trackOrder(order.id)}
                      className="flex-1 md:flex-initial py-2 px-3.5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Support Card */}
        <div className="bg-[#E7DED2]/30 border border-[#E7DED2] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm text-[#332C28]">Have a question about custom stitching?</h4>
            <p className="text-xs text-[#332C28]/70 mt-0.5">Our master artisan studio is here to assist you.</p>
          </div>
          <button
            onClick={() => setAccountTab('support')}
            className="py-2 px-3.5 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] text-[#332C28] text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Help Center
          </button>
        </div>

        {/* Saved Addresses Card */}
        <div className="bg-[#E7DED2]/30 border border-[#E7DED2] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm text-[#332C28]">Default Delivery Address</h4>
            <p className="text-xs text-[#332C28]/70 mt-0.5 truncate max-w-xs">
              {savedAddresses.find(a => a.isDefault)?.addressLine1 || '12, Green Avenue, Adajan, Surat'}
            </p>
          </div>
          <button
            onClick={() => setAccountTab('addresses')}
            className="py-2 px-3.5 bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] text-[#332C28] text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};
