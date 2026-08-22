import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div id="privacy-policy-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7DED2]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Trust & Security
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70">
          Last updated: August 2026 • Maison Crochet Slow Craft Collective
        </p>
      </div>

      {/* Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E7DED2] shadow-xs space-y-2">
          <ShieldCheck className="w-5 h-5 text-[#8C6F5A]" />
          <h3 className="text-xs font-bold text-[#332C28]">Zero Data Selling</h3>
          <p className="text-[11px] text-[#332C28]/70">
            We never sell, rent, or trade your personal information to third-party brokers.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DED2] shadow-xs space-y-2">
          <Lock className="w-5 h-5 text-[#8C6F5A]" />
          <h3 className="text-xs font-bold text-[#332C28]">256-Bit SSL Encryption</h3>
          <p className="text-[11px] text-[#332C28]/70">
            All customer addresses and payment transactions are secured with enterprise-grade SSL.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7DED2] shadow-xs space-y-2">
          <Eye className="w-5 h-5 text-[#8C6F5A]" />
          <h3 className="text-xs font-bold text-[#332C28]">Cookie Transparency</h3>
          <p className="text-[11px] text-[#332C28]/70">
            Cookies are used strictly for cart persistence and seamless checkout sessions.
          </p>
        </div>
      </div>

      {/* Policy Clauses */}
      <div className="bg-white rounded-3xl border border-[#E7DED2] p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#332C28]/80 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            1. Information We Collect
          </h2>
          <p>
            When you visit Maison Crochet, interact with our handmade catalog, or place a bespoke or ready-to-ship order, we collect information necessary to fulfill your request:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#332C28]/70">
            <li><strong>Contact details:</strong> Full name, shipping address, email address, and phone number.</li>
            <li><strong>Order details:</strong> Specific crochet piece selections, custom measurement choices, color selections, and gift note text.</li>
            <li><strong>Technical device data:</strong> Browser type, approximate location, and shopping bag state stored via local browser storage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            2. How We Use Your Information
          </h2>
          <p>
            We use your data strictly for legitimate artisanal commerce purposes:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#332C28]/70">
            <li>Fulfilling, blocking, packaging, and dispatching your handmade orders to your address.</li>
            <li>Sending tracking SMS and delivery progress notifications.</li>
            <li>Responding to your custom crochet requests and care inquiries.</li>
            <li>Improving website usability and regional shipping performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            3. Demo & Sandbox Environment Notice
          </h2>
          <p>
            This website is a customer-facing frontend demonstration and prototype. No real bank accounts or credit cards are charged. Any payment numbers or addresses entered during demo sessions are processed locally within your browser sandbox.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            4. Data Retention & Deletion
          </h2>
          <p>
            You retain the right at any time to request a copy of the data stored in your session, clear your browser cookies and local storage, or request complete removal of your contact details by writing to our privacy officer at <strong>privacy@maisoncrochet.in</strong>.
          </p>
        </section>

      </div>

      {/* Footer link */}
      <div className="text-center">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8C6F5A] hover:underline"
        >
          <span>Return to Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
