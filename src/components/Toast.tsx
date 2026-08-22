import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, Heart, ShoppingBag, X, ArrowRight } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, navigateTo } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#E7DED2] text-[#332C28] p-3.5 rounded-xl shadow-xl flex items-start gap-3 transition-all animate-fade-in"
        >
          {toast.image ? (
            <img 
              src={toast.image} 
              alt="" 
              className="w-12 h-12 rounded-lg object-cover border border-[#E7DED2] flex-shrink-0" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#F8F4EE] flex items-center justify-center flex-shrink-0 text-[#8C6F5A]">
              {toast.type === 'cart' && <ShoppingBag className="w-4 h-4 text-[#8C6F5A]" />}
              {toast.type === 'wishlist' && <Heart className="w-4 h-4 text-[#D9A7A0] fill-[#D9A7A0]" />}
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#AAB5A0]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#8C6F5A]" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#332C28] flex items-center gap-1.5">
              <span>{toast.title}</span>
            </div>
            <p className="text-xs text-[#332C28]/80 line-clamp-2 mt-0.5">
              {toast.message}
            </p>
            {toast.type === 'cart' && (
              <button
                id={`toast-view-bag-${toast.id}`}
                onClick={() => {
                  navigateTo('cart');
                  removeToast(toast.id);
                }}
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6F5A] hover:underline"
              >
                <span>View Shopping Bag</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#332C28]/40 hover:text-[#332C28] p-1 rounded-md transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toast = ToastContainer;
