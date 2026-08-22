import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Package, 
  ArrowRight, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const ReturnsRefundsPage: React.FC = () => {
  const { navigateTo, showToast } = useShop();

  // Return request form state
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Size / fit adjustment');
  const [type, setType] = useState<'exchange' | 'refund'>('exchange');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) {
      showToast('Missing Details', 'Please fill in your Order ID and Email address', 'info');
      return;
    }

    setIsSubmitted(true);
    showToast('Return Request Submitted', `Demo request for ${orderId} logged. Our team will arrange reverse pickup!`, 'success');
  };

  return (
    <div id="returns-refunds-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Hassle-Free Artisanal Guarantee
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
          Returns, Exchanges & Refunds
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
          We want you to truly love your handmade crochet piece. If something doesn’t feel right, our easy 14-day return and exchange policy is here to help.
        </p>
      </div>

      {/* 3 Pillars Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
            14-Day Easy Window
          </h3>
          <p className="text-xs text-[#332C28]/70 leading-relaxed">
            Initiate a return or size exchange within 14 calendar days from the date of delivery.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
            Doorstep Reverse Pickup
          </h3>
          <p className="text-xs text-[#332C28]/70 leading-relaxed">
            Our courier partners will pick up the parcel directly from your home across 19,000+ Indian pincodes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
            100% Full Refund
          </h3>
          <p className="text-xs text-[#332C28]/70 leading-relaxed">
            Refunds are credited directly to your original payment method (or UPI account) within 3 to 5 business days.
          </p>
        </div>

      </div>

      {/* Interactive Return / Exchange Form */}
      <div className="bg-white rounded-3xl border border-[#E7DED2] p-6 sm:p-10 shadow-xs max-w-3xl mx-auto space-y-6">
        <div className="border-b border-[#E7DED2] pb-4">
          <h2 className="font-serif-heading text-xl font-bold text-[#332C28] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#8C6F5A]" />
            <span>Initiate Return or Exchange (Demo Portal)</span>
          </h2>
          <p className="text-xs text-[#332C28]/60 mt-1">
            Submit your request below to schedule a complimentary doorstep reverse pickup.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-[#AAB5A0]/20 border border-[#AAB5A0]/50 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#8C6F5A] text-white flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
              Return Request Received!
            </h3>
            <p className="text-xs text-[#332C28]/80 max-w-md mx-auto leading-relaxed">
              We have generated reverse pickup request for <strong>{orderId}</strong>. Our courier executive will arrive within 24–48 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-xs font-semibold text-[#8C6F5A] hover:underline"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#332C28] mb-1">
                  Order ID / Number *
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. CR-1024"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] text-xs text-[#332C28] bg-[#F8F4EE]/30 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#332C28] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] text-xs text-[#332C28] bg-[#F8F4EE]/30 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
                />
              </div>
            </div>

            {/* Request Type */}
            <div>
              <label className="block text-xs font-semibold text-[#332C28] mb-1.5">
                I would like to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('exchange')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    type === 'exchange'
                      ? 'border-[#8C6F5A] bg-[#8C6F5A] text-white shadow-xs'
                      : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]/50'
                  }`}
                >
                  <span>Exchange (Size / Color)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('refund')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    type === 'refund'
                      ? 'border-[#8C6F5A] bg-[#8C6F5A] text-white shadow-xs'
                      : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]/50'
                  }`}
                >
                  <span>Return for Full Refund</span>
                </button>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-[#332C28] mb-1">
                Reason for Return
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] text-xs text-[#332C28] bg-[#F8F4EE]/30 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40"
              >
                <option value="Size / fit adjustment">Size / fit adjustment</option>
                <option value="Want a different colorway">Want a different colorway</option>
                <option value="Item different from expectations">Item different from expectations</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Received damaged during transit">Received damaged during transit</option>
              </select>
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-xs font-semibold text-[#332C28] mb-1">
                Additional Comments (Optional)
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Mention desired replacement size, color, or reason..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DED2] text-xs text-[#332C28] bg-[#F8F4EE]/30 focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#8C6F5A] text-white font-bold text-xs shadow-md hover:bg-[#735A48] transition-colors"
            >
              Submit Return Request (Demo)
            </button>

          </form>
        )}
      </div>

      {/* Return Eligibility Rules */}
      <div className="bg-[#E7DED2]/30 rounded-3xl border border-[#E7DED2] p-8 space-y-6">
        <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
          Return Eligibility Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#332C28]/80 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-[#332C28] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              <span>Eligible for Return:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[#332C28]/70">
              <li>Unworn, unwashed pieces in pristine original condition.</li>
              <li>Packed in original cotton dust bag with plantable seed tag.</li>
              <li>Ready-to-ship standard collection items.</li>
              <li>Reported within 14 days of delivery.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#332C28] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#8C6F5A]" />
              <span>Non-Returnable Items:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[#332C28]/70">
              <li>Personalized / custom bespoke pieces crafted to custom measurements (Free alterations provided).</li>
              <li>Items damaged due to improper washing (see Care Guide).</li>
              <li>Products marked as clearance / final sale.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Need Help CTA */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#332C28]/70">
          Have questions about your order?{' '}
          <button
            onClick={() => navigateTo('contact')}
            className="font-bold text-[#8C6F5A] hover:underline"
          >
            Contact Our Care Team →
          </button>
        </p>
      </div>

    </div>
  );
};
