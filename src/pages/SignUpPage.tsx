import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

// DEMO ONLY — Replace with real authentication backend later
export const SignUpPage: React.FC = () => {
  const { signup, navigateTo } = useShop();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-neutral-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-400', textColor: 'text-red-600' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-400', textColor: 'text-amber-600' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-blue-400', textColor: 'text-blue-600' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-[#AAB5A0]', textColor: 'text-[#5b724e]' };
      default:
        return { score: 0, label: '', color: 'bg-neutral-200', textColor: 'text-neutral-400' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please provide your full first and last name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        signup({
          firstName,
          lastName,
          email,
          phone,
          password
        });
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-[90vh] bg-[#F8F4EE] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Breadcrumb */}
      <div className="w-full max-w-lg mb-6 text-xs text-[#332C28]/60 flex items-center gap-1.5">
        <button onClick={() => navigateTo('home')} className="hover:text-[#8C6F5A] transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('login')} className="hover:text-[#8C6F5A] transition-colors">Sign In</button>
        <span>/</span>
        <span className="text-[#332C28] font-medium">Create Account</span>
      </div>

      <div className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl border border-[#E7DED2] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A7A0] via-[#8C6F5A] to-[#AAB5A0]" />

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E7DED2]/40 text-[#8C6F5A] mb-3">
            <Sparkles className="w-6 h-6 text-[#8C6F5A]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28] tracking-tight font-normal">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-2 font-sans leading-relaxed max-w-sm mx-auto">
            Save your favorites, track orders and make every purchase easier.
          </p>
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
            <span className="font-medium">Account created! Preparing your artisanal dashboard...</span>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="signup-firstname" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                First Name <span className="text-[#D9A7A0]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-lastname" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Last Name <span className="text-[#D9A7A0]">*</span>
              </label>
              <input
                id="signup-lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Sharma"
                className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Email Address <span className="text-[#D9A7A0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="signup-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Phone Number <span className="text-[#D9A7A0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Password <span className="text-[#D9A7A0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#332C28]/60">Strength</span>
                  <span className={`font-semibold ${strength.textColor}`}>{strength.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full rounded-full transition-all ${
                        step <= strength.score ? strength.color : 'bg-[#E7DED2]/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="signup-confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
              Confirm Password <span className="text-[#D9A7A0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-10 pr-10 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-sm text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#332C28]/50 hover:text-[#332C28] transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 space-y-2.5">
            <div className="flex items-start">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A] cursor-pointer"
                required
              />
              <label htmlFor="agree-terms" className="ml-2.5 text-xs text-[#332C28]/80 cursor-pointer select-none leading-relaxed">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('terms-conditions')}
                  className="text-[#8C6F5A] underline hover:text-[#332C28]"
                >
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('privacy-policy')}
                  className="text-[#8C6F5A] underline hover:text-[#332C28]"
                >
                  Privacy Policy
                </button>
                . <span className="text-[#D9A7A0]">*</span>
              </label>
            </div>

            <div className="flex items-start">
              <input
                id="newsletter-opt-in"
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A] cursor-pointer"
              />
              <label htmlFor="newsletter-opt-in" className="ml-2.5 text-xs text-[#332C28]/70 cursor-pointer select-none leading-relaxed">
                Send me new collection updates, artisan stories, and special offers.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#F8F4EE] border-t-transparent rounded-full animate-spin" />
                  <span>CREATING ACCOUNT...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#AAB5A0]" />
                  <span>ACCOUNT CREATED</span>
                </div>
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer / Back to Sign In */}
        <div className="mt-8 text-center pt-5 border-t border-[#E7DED2]/60">
          <p className="text-xs text-[#332C28]/70">
            Already have an account?{' '}
            <button
              id="signup-signin-link"
              onClick={() => navigateTo('login')}
              className="text-[#8C6F5A] font-semibold hover:underline ml-1"
            >
              SIGN IN
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
