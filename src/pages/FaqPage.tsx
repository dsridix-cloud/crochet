import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { FAQS_DATA } from '../data/products';
import { ChevronDown, Search, HelpCircle, Mail, MessageCircle, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'Ordering & Custom', 'Care & Washing', 'Shipping & Delivery', 'Returns & Sizing'];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="faq-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Hero Header */}
      <div className="bg-[#E7DED2]/50 border-b border-[#E7DED2] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6F5A]">
            Artisanal Care & Support
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#332C28] mt-1 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/75 max-w-lg mx-auto">
            Everything you need to know about our slow crochet crafting, hand-washing techniques, custom orders, and pan-India shipping.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C6F5A] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. wash, shipping, custom)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E7DED2] rounded-full text-xs text-[#332C28] placeholder:text-[#332C28]/45 focus:outline-none focus:border-[#8C6F5A] shadow-xs"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#332C28] text-white shadow-xs'
                  : 'bg-white border border-[#E7DED2] text-[#332C28] hover:border-[#8C6F5A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#E7DED2]">
              <HelpCircle className="w-10 h-10 text-[#8C6F5A] mx-auto mb-2 opacity-60" />
              <div className="font-serif-heading text-lg font-bold text-[#332C28]">
                No answers found for "{searchQuery}"
              </div>
              <p className="text-xs text-[#332C28]/60 mt-1">
                Reach out directly to our artisan desk and we'll answer your query right away.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-heading text-base font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C6F5A] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#332C28]/80 leading-relaxed border-t border-[#E7DED2]/40 pt-4 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 bg-[#E7DED2]/50 rounded-3xl p-8 border border-[#E7DED2] text-center space-y-4">
          <h3 className="font-serif-heading text-2xl font-bold text-[#332C28]">
            Still have a query regarding stitches, colors, or sizing?
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/75 max-w-md mx-auto">
            Our Jaipur studio team is always happy to guide you on yarn textures, sizing charts, or custom requests.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="py-3 px-6 rounded-full bg-[#332C28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8C6F5A] transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#D9A7A0]" />
              <span>Contact Support</span>
            </button>
            <button
              onClick={() => navigateTo('custom-orders')}
              className="py-3 px-6 rounded-full border border-[#8C6F5A] text-[#8C6F5A] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              <span>Custom Order Form</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
