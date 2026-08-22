import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  Heart, 
  MapPin, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AccountOverview } from '../components/account/AccountOverview';
import { AccountOrdersList } from '../components/account/AccountOrdersList';
import { AccountOrderDetail } from '../components/account/AccountOrderDetail';
import { AccountOrderTracking } from '../components/account/AccountOrderTracking';
import { AccountAddresses } from '../components/account/AccountAddresses';
import { AccountProfile } from '../components/account/AccountProfile';
import { AccountSettings } from '../components/account/AccountSettings';
import { AccountHelpSupport } from '../components/account/AccountHelpSupport';
import { AccountLogoutModal } from '../components/account/AccountLogoutModal';
import { AccountTab } from '../types';

export const AccountPage: React.FC = () => {
  const { 
    user, 
    accountTab, 
    setAccountTab, 
    wishlistCount, 
    accountOrders, 
    savedAddresses, 
    navigateTo 
  } = useShop();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navItems: {
    id: AccountTab | 'favorites';
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    section: 'activity' | 'account';
  }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, section: 'activity' },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag className="w-4 h-4" />, badge: accountOrders.length, section: 'activity' },
    { id: 'track-order', label: 'Track Order', icon: <Truck className="w-4 h-4" />, badge: 'Live', section: 'activity' },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-4 h-4" />, badge: wishlistCount, section: 'activity' },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" />, badge: `${savedAddresses.length}/3`, section: 'activity' },
    { id: 'profile', label: 'Personal Info', icon: <User className="w-4 h-4" />, section: 'account' },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" />, section: 'account' },
    { id: 'support', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" />, section: 'account' },
  ];

  const handleNavClick = (id: AccountTab | 'favorites') => {
    if (id === 'favorites') {
      navigateTo('wishlist');
    } else {
      setAccountTab(id);
    }
  };

  const renderActiveView = () => {
    switch (accountTab) {
      case 'overview':
        return <AccountOverview />;
      case 'orders':
        return <AccountOrdersList />;
      case 'order-detail':
        return <AccountOrderDetail />;
      case 'track-order':
        return <AccountOrderTracking />;
      case 'addresses':
        return <AccountAddresses />;
      case 'profile':
        return <AccountProfile />;
      case 'settings':
        return <AccountSettings />;
      case 'support':
        return <AccountHelpSupport />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#332C28]/60">
          <button onClick={() => navigateTo('home')} className="hover:text-[#8C6F5A] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => setAccountTab('overview')} className="hover:text-[#8C6F5A] transition-colors">My Account</button>
          <span>/</span>
          <span className="text-[#332C28] font-medium capitalize">
            {accountTab.replace('-', ' ')}
          </span>
        </div>

        {/* Mobile Horizontal Navigation Chips */}
        <div className="lg:hidden bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-3 shadow-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = accountTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`mobile-account-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#332C28] text-[#F8F4EE] shadow-xs'
                      : 'text-[#332C28]/80 hover:bg-[#E7DED2]/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#D9A7A0] text-[#332C28]' : 'bg-[#E7DED2] text-[#332C28]/70'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="py-2 px-3.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 whitespace-nowrap flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar & Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            {/* Sidebar Profile Card */}
            <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 shadow-xs text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full mx-auto relative mb-3">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user?.firstName || 'Priya'}
                  className="w-full h-full rounded-full object-cover border-2 border-[#D9A7A0] shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#AAB5A0] text-white p-1 rounded-full border-2 border-white" title="Verified Customer">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>

              <h2 className="font-serif text-lg text-[#332C28] font-normal">
                {user ? `${user.firstName} ${user.lastName}` : 'Priya Sharma'}
              </h2>
              <p className="text-xs text-[#332C28]/60 mt-0.5 truncate">
                {user?.email || 'priya@example.com'}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#AAB5A0]/20 text-[#3e5333] border border-[#AAB5A0]/30">
                <ShieldCheck className="w-3 h-3" />
                <span>Handmade Club Member</span>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-4 shadow-xs space-y-6">
              {/* Activity Section */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#332C28]/40 px-3 block mb-1">
                  Orders & Activity
                </span>
                {navItems
                  .filter((item) => item.section === 'activity')
                  .map((item) => {
                    const isActive = accountTab === item.id;

                    return (
                      <button
                        key={item.id}
                        id={`sidebar-nav-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                          isActive
                            ? 'bg-[#332C28] text-[#F8F4EE] shadow-xs'
                            : 'text-[#332C28]/80 hover:bg-[#F8F4EE] hover:text-[#332C28]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-[#D9A7A0]' : 'text-[#8C6F5A]'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>

                        {item.badge !== undefined ? (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-[#D9A7A0] text-[#332C28]' : 'bg-[#E7DED2]/80 text-[#332C28]/70'
                          }`}>
                            {item.badge}
                          </span>
                        ) : (
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                            isActive ? 'text-[#F8F4EE]' : 'text-[#332C28]/30 group-hover:translate-x-0.5'
                          }`} />
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* Account Settings Section */}
              <div className="space-y-1 pt-3 border-t border-[#E7DED2]/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#332C28]/40 px-3 block mb-1">
                  Account Settings
                </span>
                {navItems
                  .filter((item) => item.section === 'account')
                  .map((item) => {
                    const isActive = accountTab === item.id;

                    return (
                      <button
                        key={item.id}
                        id={`sidebar-nav-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                          isActive
                            ? 'bg-[#332C28] text-[#F8F4EE] shadow-xs'
                            : 'text-[#332C28]/80 hover:bg-[#F8F4EE] hover:text-[#332C28]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-[#D9A7A0]' : 'text-[#8C6F5A]'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>

                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                          isActive ? 'text-[#F8F4EE]' : 'text-[#332C28]/30 group-hover:translate-x-0.5'
                        }`} />
                      </button>
                    );
                  })}

                {/* Logout Button */}
                <button
                  id="sidebar-logout-btn"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between mt-2"
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area (9 cols) */}
          <div className="lg:col-span-9">
            {renderActiveView()}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <AccountLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};
