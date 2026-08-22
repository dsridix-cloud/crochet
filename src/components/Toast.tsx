import React, { useEffect, useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle2, 
  Info, 
  Heart, 
  ShoppingBag, 
  X, 
  ArrowRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
  onNavigateToCart: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss, onNavigateToCart }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number>(4500);
  const startTimeRef = useRef<number>(Date.now());

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 280);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      remainingTimeRef.current -= (Date.now() - startTimeRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, Math.max(remainingTimeRef.current, 500));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused]);

  // Icon and Accent Color configuration
  const getIconAndAccent = () => {
    switch (toast.type) {
      case 'cart':
        return {
          icon: <ShoppingBag className="w-4 h-4 text-[#8C6F5A]" />,
          bgColor: 'bg-[#8C6F5A]/10',
          borderColor: 'border-[#8C6F5A]/25',
          accentColor: '#8C6F5A',
          badgeText: 'BAG'
        };
      case 'wishlist':
        return {
          icon: <Heart className="w-4 h-4 text-[#D9A7A0] fill-[#D9A7A0]" />,
          bgColor: 'bg-[#D9A7A0]/15',
          borderColor: 'border-[#D9A7A0]/40',
          accentColor: '#D9A7A0',
          badgeText: 'WISHLIST'
        };
      case 'success':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-[#5B7553]" />,
          bgColor: 'bg-[#AAB5A0]/20',
          borderColor: 'border-[#AAB5A0]/40',
          accentColor: '#5B7553',
          badgeText: 'SUCCESS'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4 text-[#C45A5A]" />,
          bgColor: 'bg-[#D9A7A0]/25',
          borderColor: 'border-[#D9A7A0]/50',
          accentColor: '#C45A5A',
          badgeText: 'NOTICE'
        };
      case 'info':
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-[#8C6F5A]" />,
          bgColor: 'bg-[#F8F4EE]',
          borderColor: 'border-[#E7DED2]',
          accentColor: '#8C6F5A',
          badgeText: 'UPDATE'
        };
    }
  };

  const styleConfig = getIconAndAccent();

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-[#FFFFFF]/98 backdrop-blur-md border border-[#E7DED2] text-[#332C28] p-3 sm:p-3.5 shadow-xl shadow-black/8 sm:shadow-2xl transition-all duration-300 ${
        isExiting ? 'animate-toast-out' : 'animate-toast-in'
      }`}
      style={{
        boxShadow: '0 10px 30px -5px rgba(51, 44, 40, 0.12), 0 4px 10px -2px rgba(51, 44, 40, 0.06)'
      }}
    >
      {/* Subtle Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E7DED2]/40 overflow-hidden rounded-b-2xl"
      >
        <div 
          className="h-full animate-toast-progress" 
          style={{ 
            backgroundColor: styleConfig.accentColor,
            animationPlayState: isPaused ? 'paused' : 'running'
          }} 
        />
      </div>

      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Visual Media (Image or Icon) */}
        {toast.image ? (
          <div className="relative flex-shrink-0">
            <img 
              src={toast.image} 
              alt="" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#E7DED2] shadow-2xs" 
            />
            <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full ${styleConfig.bgColor} border border-white`}>
              {toast.type === 'cart' && <ShoppingBag className="w-2.5 h-2.5 text-[#8C6F5A]" />}
              {toast.type === 'wishlist' && <Heart className="w-2.5 h-2.5 text-[#D9A7A0] fill-[#D9A7A0]" />}
              {toast.type === 'success' && <CheckCircle2 className="w-2.5 h-2.5 text-[#5B7553]" />}
            </div>
          </div>
        ) : (
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${styleConfig.bgColor} border ${styleConfig.borderColor} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
            {styleConfig.icon}
          </div>
        )}

        {/* Text and Actions */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-[13px] font-bold text-[#332C28] leading-snug">
              {toast.title}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#332C28]/80 mt-0.5 leading-relaxed break-words">
            {toast.message}
          </p>

          {toast.type === 'cart' && (
            <button
              id={`toast-view-bag-${toast.id}`}
              type="button"
              onClick={() => {
                onNavigateToCart();
                handleClose();
              }}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#8C6F5A] hover:text-[#332C28] transition-colors group cursor-pointer"
            >
              <span className="underline underline-offset-2">View Shopping Bag</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          id={`toast-close-${toast.id}`}
          type="button"
          onClick={handleClose}
          className="p-1 sm:p-1.5 text-[#332C28]/40 hover:text-[#332C28] hover:bg-[#F8F4EE] rounded-lg transition-colors flex-shrink-0 -mr-1 -mt-0.5 cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, navigateTo } = useShop();

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex flex-col items-center gap-2 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md md:max-w-lg px-2 sm:px-0"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={removeToast}
          onNavigateToCart={() => navigateTo('cart')}
        />
      ))}
    </aside>
  );
};

export const Toast = ToastContainer;

