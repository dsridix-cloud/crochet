import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Truck, 
  Package, 
  Clock, 
  Globe2, 
  Leaf, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ShippingInfoPage: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [trackNumber, setTrackNumber] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackNumber.trim()) {
      showToast('Enter Tracking Number', 'Please enter a valid order # or AWB code (e.g. CR-1024)', 'info');
      return;
    }
    setTrackResult(`Order ${trackNumber.toUpperCase()} is currently with our courier partner in Jaipur Hub. Estimated delivery: 3–4 business days.`);
  };

  return (
    <div id="shipping-info-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Safe, Sustainable Delivery
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
          Shipping Information & Policies
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
          Every handmade crochet piece is carefully blocked, inspected, and wrapped in plastic-free botanical packaging to arrive safely at your doorstep.
        </p>
      </div>

      {/* Live Tracking Demo Box */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-4">
        <h2 className="font-serif-heading text-sm font-bold text-[#332C28] flex items-center gap-2">
          <Search className="w-4 h-4 text-[#8C6F5A]" />
          <span>Track Your Order (Demo Tool)</span>
        </h2>
        <form onSubmit={handleTrackSubmit} className="flex gap-2">
          <input
            type="text"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            placeholder="Enter Order # (e.g. CR-1024) or AWB code"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E7DED2] text-xs text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40 bg-[#F8F4EE]/30"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#8C6F5A] text-white text-xs font-bold hover:bg-[#735A48] transition-colors"
          >
            Track Order
          </button>
        </form>

        {trackResult && (
          <div className="p-4 rounded-xl bg-[#AAB5A0]/20 border border-[#AAB5A0]/40 text-xs text-[#332C28] leading-relaxed flex items-start gap-2.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#8C6F5A] flex-shrink-0 mt-0.5" />
            <div>{trackResult}</div>
          </div>
        )}
      </div>

      {/* 3 Main Shipping Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
              Standard Shipping (India)
            </h3>
            <div className="text-lg font-bold text-[#8C6F5A] mt-1">
              FREE on orders ₹999+
            </div>
            <div className="text-xs text-[#332C28]/60 mt-0.5">₹79 flat fee on orders below ₹999</div>
          </div>
          <ul className="text-xs text-[#332C28]/80 space-y-2 pt-2 border-t border-[#E7DED2]/60">
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Delivered in 4–6 business days
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Covers 19,000+ Indian pincodes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Real-time SMS & email tracking
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#8C6F5A]/40 p-6 shadow-xs space-y-4 relative">
          <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-[#8C6F5A] text-white text-[10px] font-bold">
            Popular
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8C6F5A] text-white flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
              Express Priority Air
            </h3>
            <div className="text-lg font-bold text-[#8C6F5A] mt-1">
              Flat ₹99 Only
            </div>
            <div className="text-xs text-[#332C28]/60 mt-0.5">Dispatched via Air Courier Express</div>
          </div>
          <ul className="text-xs text-[#332C28]/80 space-y-2 pt-2 border-t border-[#E7DED2]/60">
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Delivered in 2–3 business days
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Priority artisan blocking queue
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Blue Dart & Delhivery Air Express
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
              Worldwide Global Shipping
            </h3>
            <div className="text-lg font-bold text-[#8C6F5A] mt-1">
              From $18 USD (~₹1,499)
            </div>
            <div className="text-xs text-[#332C28]/60 mt-0.5">USA, UK, EU, UAE, Australia, Canada</div>
          </div>
          <ul className="text-xs text-[#332C28]/80 space-y-2 pt-2 border-t border-[#E7DED2]/60">
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Delivered in 7–12 business days
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Fully tracked DHL / FedEx express
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#8C6F5A]">✓</span> Customs documentation handled
            </li>
          </ul>
        </div>

      </div>

      {/* Dispatch Timelines Section */}
      <div className="bg-white rounded-3xl border border-[#E7DED2] p-8 shadow-xs space-y-6">
        <h2 className="font-serif-heading text-xl font-bold text-[#332C28]">
          Craft & Dispatch Timelines
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] space-y-2">
            <div className="font-bold text-sm text-[#332C28] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#8C6F5A]" />
              <span>Ready-to-Ship Inventory</span>
            </div>
            <p className="text-xs text-[#332C28]/70 leading-relaxed">
              Items marked in stock in our catalog are already steam-blocked and ready in our Jaipur studio. They are dispatched within <strong>24 to 48 hours</strong> of placing your order.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] space-y-2">
            <div className="font-bold text-sm text-[#332C28] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6F5A]" />
              <span>Custom & Made-to-Order Pieces</span>
            </div>
            <p className="text-xs text-[#332C28]/70 leading-relaxed">
              Custom-sized tops, personalized colorway bags, and tailored blankets are crocheted specifically for you. These require <strong>7 to 12 business days</strong> for hand-stitching and blocking before dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Packaging Commitment */}
      <div className="bg-[#E7DED2]/30 rounded-3xl border border-[#E7DED2] p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#8C6F5A] flex items-center justify-center shadow-xs">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
              100% Plastic-Free Botanical Packaging
            </h3>
            <p className="text-xs text-[#332C28]/70">
              Good for your heirloom crochet pieces, kind to the planet.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/80 p-4 rounded-xl text-xs text-[#332C28]/80 leading-relaxed">
            <strong className="text-[#332C28] block mb-1">Kraft Honeycomb Paper</strong>
            Replaces plastic bubble wrap with expandable recycled kraft honeycomb cushioning.
          </div>
          <div className="bg-white/80 p-4 rounded-xl text-xs text-[#332C28]/80 leading-relaxed">
            <strong className="text-[#332C28] block mb-1">Cotton Dust Bags</strong>
            Every bag and top arrives inside a reusable unbleached cotton drawstring pouch.
          </div>
          <div className="bg-white/80 p-4 rounded-xl text-xs text-[#332C28]/80 leading-relaxed">
            <strong className="text-[#332C28] block mb-1">Plantable Seed Note Tag</strong>
            Your handwritten artisan thank-you card is embedded with marigold and basil seeds. Plant it in soil!
          </div>
        </div>
      </div>

      {/* Back to Shopping CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 rounded-xl bg-[#8C6F5A] text-white text-sm font-bold shadow-md hover:bg-[#735A48] transition-colors inline-flex items-center gap-2"
        >
          <span>Start Shopping With Free Shipping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
