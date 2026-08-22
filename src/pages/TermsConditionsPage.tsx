import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div id="terms-conditions-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-[#E7DED2]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Legal & Transparency
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70">
          Effective as of August 2026 • Maison Crochet
        </p>
      </div>

      {/* Handmade Disclosure Banner */}
      <div className="p-6 rounded-3xl bg-[#E7DED2]/30 border border-[#E7DED2] flex items-start gap-4">
        <Sparkles className="w-6 h-6 text-[#8C6F5A] flex-shrink-0 mt-1" />
        <div className="text-xs sm:text-sm text-[#332C28]/80 leading-relaxed space-y-1">
          <strong className="text-[#332C28] block text-sm font-serif-heading">
            The Nature of 100% Handmade Slow Craft
          </strong>
          <p>
            Because every single loop and motif is crafted by hand by individual artisans rather than automated textile machines, slight variations in yarn tension, dye lot depth, or dimensional measurements (within ±1–2 cm) are natural characteristics of heirloom craftsmanship and not defects.
          </p>
        </div>
      </div>

      {/* Main Content Clauses */}
      <div className="bg-white rounded-3xl border border-[#E7DED2] p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#332C28]/80 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the Maison Crochet website, browsing our handcrafted catalog, placing an order, or submitting a bespoke custom commission, you agree to be bound by these Terms & Conditions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            2. Orders, Custom Commissions & Cancellations
          </h2>
          <p>
            Ready-to-ship catalog items may be canceled within 12 hours of order placement before steam-blocking and dispatch. Custom bespoke orders enter artisan yarn allocation immediately and can be adjusted within 24 hours of confirmation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            3. Pricing & Promotional Codes
          </h2>
          <p>
            All prices are listed in Indian Rupees (INR) inclusive of applicable goods & services taxes. Promotional codes (such as HANDMADE10 or WELCOME5) must be entered at checkout prior to order authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            4. Intellectual Property
          </h2>
          <p>
            All original crochet stitch patterns, visual photography, graphic logos, and product designs featured on Maison Crochet are proprietary assets protected under intellectual property laws. Reproduction for commercial mass replication without written consent is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold text-[#332C28]">
            5. Limitation of Liability
          </h2>
          <p>
            Maison Crochet shall not be held liable for indirect, incidental, or consequential damages resulting from improper garment washing or drying inconsistent with our published Care Guide.
          </p>
        </section>

      </div>

      {/* Navigation CTA */}
      <div className="text-center">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8C6F5A] hover:underline"
        >
          <span>Return to Shop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
