import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Bell, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Save, 
  Trash2 
} from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { user, showToast, logout } = useShop();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notifications state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [newDrops, setNewDrops] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(true);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password Updated', 'Your security credentials have been successfully changed.', 'success');
  };

  const handleSaveNotifications = () => {
    showToast('Preferences Saved', 'Your communication preferences have been updated.', 'success');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    showToast('Account Deleted', 'Your demo account and data have been removed.', 'info');
    logout();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
          Manage your password, notification preferences, and account privacy.
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E7DED2]">
          <div className="w-9 h-9 rounded-xl bg-[#8C6F5A]/15 text-[#8C6F5A] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg text-[#332C28]">
              Change Password
            </h2>
            <p className="text-xs text-[#332C28]/60">
              Ensure your account is using a long, secure password.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="p-3 bg-[#D9A7A0]/20 border border-[#D9A7A0]/50 rounded-xl text-xs text-[#332C28] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 bg-[#AAB5A0]/20 border border-[#AAB5A0]/50 rounded-xl text-xs text-[#332C28] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#AAB5A0] flex-shrink-0" />
            <span>Your password has been changed successfully!</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div>
            <label htmlFor="current-pass" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-pass"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A]"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#332C28]/50 hover:text-[#332C28]"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="new-pass" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-pass"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A]"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#332C28]/50 hover:text-[#332C28]"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirm-new-pass" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Confirm New Password
            </label>
            <input
              id="confirm-new-pass"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A]"
            />
          </div>

          <button
            id="update-password-btn"
            type="submit"
            className="py-2.5 px-5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs"
          >
            UPDATE PASSWORD
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E7DED2]">
          <div className="w-9 h-9 rounded-xl bg-[#AAB5A0]/20 text-[#4d663f] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg text-[#332C28]">
              Notification Preferences
            </h2>
            <p className="text-xs text-[#332C28]/60">
              Choose how you want to hear from us.
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-lg">
          <label className="flex items-start justify-between gap-4 cursor-pointer p-3 bg-[#F8F4EE]/40 rounded-xl hover:bg-[#F8F4EE]">
            <div>
              <span className="font-semibold text-xs text-[#332C28] block">Order & Shipping Emails</span>
              <span className="text-[11px] text-[#332C28]/70">Receive order confirmations, shipment tracking, and delivery receipts.</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A]"
            />
          </label>

          <label className="flex items-start justify-between gap-4 cursor-pointer p-3 bg-[#F8F4EE]/40 rounded-xl hover:bg-[#F8F4EE]">
            <div>
              <span className="font-semibold text-xs text-[#332C28] block">New Collection Drops</span>
              <span className="text-[11px] text-[#332C28]/70">Get early access when new limited-edition crochet pieces launch.</span>
            </div>
            <input
              type="checkbox"
              checked={newDrops}
              onChange={(e) => setNewDrops(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A]"
            />
          </label>

          <label className="flex items-start justify-between gap-4 cursor-pointer p-3 bg-[#F8F4EE]/40 rounded-xl hover:bg-[#F8F4EE]">
            <div>
              <span className="font-semibold text-xs text-[#332C28] block">Artisan Stories & Special Offers</span>
              <span className="text-[11px] text-[#332C28]/70">Occasional studio stories, artisan spotlights, and subscriber discounts.</span>
            </div>
            <input
              type="checkbox"
              checked={specialOffers}
              onChange={(e) => setSpecialOffers(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A]"
            />
          </label>

          <label className="flex items-start justify-between gap-4 cursor-pointer p-3 bg-[#F8F4EE]/40 rounded-xl hover:bg-[#F8F4EE]">
            <div>
              <span className="font-semibold text-xs text-[#332C28] block">SMS & WhatsApp Alerts</span>
              <span className="text-[11px] text-[#332C28]/70">Receive delivery arrival notifications directly to your phone.</span>
            </div>
            <input
              type="checkbox"
              checked={smsUpdates}
              onChange={(e) => setSmsUpdates(e.target.checked)}
              className="w-4 h-4 mt-1 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A]"
            />
          </label>

          <button
            id="save-notifications-btn"
            type="button"
            onClick={handleSaveNotifications}
            className="py-2.5 px-5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs"
          >
            SAVE PREFERENCES
          </button>
        </div>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-[#FFFFFF] border border-red-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Trash2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg text-red-900">
              Account Deletion
            </h2>
            <p className="text-xs text-[#332C28]/60">
              Permanently remove your account and stored local demo preferences.
            </p>
          </div>
        </div>

        <button
          id="open-delete-account-btn"
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="py-2 px-4 border border-red-200 text-xs font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
        >
          DELETE ACCOUNT
        </button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-xl text-[#332C28]">
                Delete Account?
              </h3>
              <p className="text-xs text-[#332C28]/70">
                This will remove your customer profile, saved addresses, and active session from this demo.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                id="confirm-delete-account-btn"
                type="button"
                onClick={handleDeleteAccount}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                DELETE ACCOUNT
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="py-2.5 px-5 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
