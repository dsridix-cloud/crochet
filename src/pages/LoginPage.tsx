import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

// DEMO ONLY — Replace with real authentication backend later
export const LoginPage: React.FC = () => {
  const { login, navigateTo } = useShop();

  const [email, setEmail] = useState('priya@example.com');
  const [password, setPassword] = useState('CrochetLover@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Input validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        login(email, password, rememberMe);
      }, 700);
    }, 900);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        login('priya.sharma@gmail.com', 'google-auth-demo', true);
      }, 600);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8F4EE] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Decorative Breadcrumb */}
      <div className="w-full max-w-md mb-6 text-xs text-[#332C28]/60 flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#8C6F5A] transition-colors">Home</button>
        <span>/</span>
        <span className="text-[#332C28] font-medium">Customer Sign In</span>
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#E7DED2] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A7A0] via-[#8C6F5A] to-[#AAB5A0]" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E7DED2]/40 text-[#8C6F5A] mb-3">
            <Sparkles className="w-6 h-6 text-[#8C6F5A]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28] tracking-tight font-normal">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1.5 font-sans leading-relaxed">
            Sign in to continue your handmade journey.
          </p>
        </div>

        {/* Demo Quick Notice */}
        <div className="mb-6 p-3 bg-[#E7DED2]/30 border border-[#E7DED2] rounded-xl text-[11px] sm:text-xs text-[#332C28]/80 flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#AAB5A0] mt-1.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-[#332C28]">Demo Account Loaded:</span> Any valid email & password will grant access to explore the complete customer portal.
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#D9A7A0]/15 border border-[#D9A7A0]/40 rounded-xl text-xs text-[#332C28] flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-5 p-3.5 bg-[#AAB5A0]/20 border border-[#AAB5A0]/50 rounded-xl text-xs text-[#332C28] flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#AAB5A0] flex-shrink-0" />
            <span className="font-medium">Sign in successful! Redirecting to your account...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Email Address <span className="text-[#D9A7A0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80">
                Password <span className="text-[#D9A7A0]">*</span>
              </label>
              <button
                id="login-forgot-password-btn"
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-xs text-[#8C6F5A] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#332C28]/50 hover:text-[#332C28] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A] cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2.5 text-xs text-[#332C28]/80 cursor-pointer select-none">
              Remember me on this browser
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#F8F4EE] border-t-transparent rounded-full animate-spin" />
                  <span>SIGNING IN...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AAB5A0]" />
                  <span>SIGNED IN</span>
                </div>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E7DED2]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[#FFFFFF] text-[#332C28]/50 uppercase tracking-widest font-medium">
              OR
            </span>
          </div>
        </div>

        {/* Social / Google Login */}
        <button
          id="login-google-btn"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isSuccess}
          className="w-full py-2.5 px-4 bg-[#F8F4EE] hover:bg-[#E7DED2]/50 border border-[#E7DED2] text-[#332C28] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>CONTINUE WITH GOOGLE</span>
        </button>

        {/* Footer / Create Account */}
        <div className="mt-8 text-center pt-5 border-t border-[#E7DED2]/60">
          <p className="text-xs text-[#332C28]/70">
            Don't have an account?{' '}
            <button
              id="login-create-account-link"
              onClick={() => navigateTo('signup')}
              className="text-[#8C6F5A] font-semibold hover:underline ml-1"
            >
              CREATE ACCOUNT
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
