import React from 'react';
import { useShop } from '../../context/ShopContext';
import { LogOut, X } from 'lucide-react';

interface AccountLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountLogoutModal: React.FC<AccountLogoutModalProps> = ({ isOpen, onClose }) => {
  const { logout } = useShop();

  if (!isOpen) return null;

  const handleLogoutConfirm = () => {
    onClose();
    logout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp">
        <div className="w-12 h-12 rounded-full bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center mx-auto">
          <LogOut className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="font-serif text-xl sm:text-2xl text-[#332C28]">
            Are you sure you want to log out?
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/70">
            You will need to sign in again to view your saved addresses and track active deliveries.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            id="confirm-logout-btn"
            type="button"
            onClick={handleLogoutConfirm}
            className="flex-1 py-3 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs"
          >
            LOG OUT
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
