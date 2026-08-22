import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Sparkles, Send } from 'lucide-react';

// DEMO ONLY — Replace with real authentication backend later
export const ForgotPasswordPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate sending reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8F4EE] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Breadcrumb */}
      <div className="w-full max-w-md mb-6 text-xs text-[#332C28]/60 flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#8C6F5A] transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('login')} className="hover:text-[#8C6F5A] transition-colors">Sign In</button>
        <span>/</span>
        <span className="text-[#332C28] font-medium">Forgot Password</span>
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#E7DED2] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A7A0] via-[#8C6F5A] to-[#AAB5A0]" />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E7DED2]/40 text-[#8C6F5A] mb-3">
            <KeyRound className="w-6 h-6 text-[#8C6F5A]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28] tracking-tight font-normal">
            Forgot Your Password?
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-2 font-sans leading-relaxed">
            Enter your email and we'll help you get back into your account.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#D9A7A0]/15 border border-[#D9A7A0]/40 rounded-xl text-xs text-[#332C28] flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSent ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 bg-[#AAB5A0]/15 border border-[#AAB5A0]/40 rounded-2xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#AAB5A0]/30 text-[#495b3e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-[#332C28]">
                Reset link sent! Please check your inbox.
              </h3>
              <p className="text-xs text-[#332C28]/70">
                We've sent password reset instructions to <span className="font-semibold text-[#332C28]">{email}</span>.
              </p>
              <div className="text-[11px] text-[#332C28]/50 pt-1 italic">
                (Frontend demo: In a production environment, you would receive an actual secure link).
              </div>
            </div>

            <button
              id="forgot-back-to-login-btn"
              type="button"
              onClick={() => navigateTo('login')}
              className="w-full py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO SIGN IN</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Email Address <span className="text-[#D9A7A0]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                  required
                />
              </div>
            </div>

            <button
              id="forgot-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#F8F4EE] border-t-transparent rounded-full animate-spin" />
                  <span>SENDING LINK...</span>
                </div>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND RESET LINK</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                id="forgot-cancel-btn"
                type="button"
                onClick={() => navigateTo('login')}
                className="inline-flex items-center gap-1 text-xs text-[#8C6F5A] hover:underline font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
