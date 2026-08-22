import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  LayoutDashboard, 
  MapPin, 
  User, 
  Settings, 
  HelpCircle, 
  FileText,
  LogOut, 
  ChevronRight,
  ArrowLeft,
  Sparkles
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

export const AccountPage: React.FC = () => {
  const { 
    user,
    isLoggedIn,
    accountTab, 
    setAccountTab, 
    navigateTo 
  } = useShop();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Logged-out view: Hide private user info and render Sign In button
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[80vh] bg-[#F8F4EE] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#E7DED2] p-6 sm:p-10 shadow-xs text-center relative overflow-hidden animate-fadeIn">
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A7A0] via-[#8C6F5A] to-[#AAB5A0]" />

          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E7DED2]/40 text-[#8C6F5A] flex items-center justify-center shadow-2xs">
            <User className="w-8 h-8 text-[#8C6F5A]" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28] font-normal tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-2 leading-relaxed">
            Please log in to view your profile, manage saved delivery addresses, track active orders, and update account details.
          </p>

          <div className="mt-8 space-y-3">
            <button
              id="loggedout-login-btn"
              onClick={() => navigateTo('login')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#8C6F5A] hover:bg-[#735A48] active:bg-[#5C473A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOG IN TO ACCOUNT</span>
            </button>

            <button
              id="loggedout-signup-btn"
              onClick={() => navigateTo('signup')}
              className="w-full py-3 px-6 rounded-xl border border-[#E7DED2] bg-white hover:bg-[#F8F4EE] text-[#332C28] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create New Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleTabSelect = (tab: 'overview' | 'addresses' | 'profile' | 'settings' | 'support' | 'orders') => {
    setAccountTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => handleTabSelect('orders'),
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: <MapPin className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => handleTabSelect('addresses'),
    },
    {
      id: 'profile',
      label: 'Personal Info',
      icon: <User className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => handleTabSelect('profile'),
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: <Settings className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => handleTabSelect('settings'),
    },
    {
      id: 'support',
      label: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => handleTabSelect('support'),
    },
    {
      id: 'terms',
      label: 'Terms & Condition',
      icon: <FileText className="w-5 h-5 text-[#8C6F5A]" />,
      onClick: () => navigateTo('terms-conditions'),
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: <LogOut className="w-5 h-5 text-red-500" />,
      onClick: () => setIsLogoutModalOpen(true),
      isDanger: true,
    },
  ];

  const renderSubView = () => {
    switch (accountTab) {
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

  const isMainProfileMenu = accountTab === 'overview';

  return (
    <div className="min-h-screen bg-[#F8F4EE] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Breadcrumb & Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#332C28]/60">
            <button 
              onClick={() => navigateTo('home')} 
              className="hover:text-[#8C6F5A] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => setAccountTab('overview')} 
              className={`hover:text-[#8C6F5A] transition-colors cursor-pointer ${
                isMainProfileMenu ? 'text-[#332C28] font-bold' : ''
              }`}
            >
              My Account
            </button>
            {!isMainProfileMenu && (
              <>
                <span>/</span>
                <span className="text-[#332C28] font-medium capitalize">
                  {accountTab.replace('-', ' ')}
                </span>
              </>
            )}
          </div>

          {!isMainProfileMenu && (
            <button
              onClick={() => setAccountTab('overview')}
              className="text-xs font-semibold text-[#8C6F5A] hover:text-[#332C28] flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#E7DED2]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Profile</span>
            </button>
          )}
        </div>

        {/* MAIN PROFILE SCREEN (When accountTab === 'overview') */}
        {isMainProfileMenu ? (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. Profile Information Header */}
            <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.firstName || 'Priya'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#D9A7A0] shadow-2xs"
                  />
                  <div 
                    className="absolute -bottom-1 -right-1 bg-[#AAB5A0] text-white p-1 rounded-full border-2 border-[#FFFFFF]" 
                    title="Verified Customer"
                  >
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#332C28] truncate">
                    {user ? `${user.firstName} ${user.lastName}` : 'Priya Sharma'}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#332C28]/70 mt-0.5 truncate">
                    {user?.email || 'priya@example.com'}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-[#E7DED2]/50 rounded-full text-[10px] font-semibold text-[#8C6F5A]">
                    <span>Member since {user?.memberSince || 'March 2025'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Vertical Options List */}
            <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl overflow-hidden shadow-2xs divide-y divide-[#E7DED2]/60">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`profile-option-${item.id}`}
                  onClick={item.onClick}
                  className={`w-full py-4 px-5 flex items-center justify-between transition-colors group text-left cursor-pointer ${
                    item.isDanger
                      ? 'hover:bg-red-50/80 active:bg-red-100/80'
                      : 'hover:bg-[#F8F4EE] active:bg-[#E7DED2]/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl transition-colors flex-shrink-0 ${
                        item.isDanger
                          ? 'bg-red-50 text-red-600'
                          : 'bg-[#F8F4EE] group-hover:bg-[#E7DED2]/70'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm sm:text-base font-semibold truncate ${
                        item.isDanger ? 'text-red-600' : 'text-[#332C28]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${
                      item.isDanger
                        ? 'text-red-400 group-hover:translate-x-1'
                        : 'text-[#332C28]/40 group-hover:text-[#8C6F5A] group-hover:translate-x-1'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* SUB-VIEWS (Addresses, Profile Edit, Settings, Support, Orders, etc.) */
          <div className="w-full animate-fadeIn">
            {renderSubView()}
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <AccountLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};
