import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';
import { Search, X, ArrowRight, Sparkles, Tag, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  // Filter products by title, category, description, tags
  const results = searchTerm.trim()
    ? PRODUCTS_DATA.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
        );
      })
    : [];

  const popularSearches = ['Daisy Bag', 'Crochet Top', 'Bunny Amigurumi', 'Coaster Set', 'Sage Tote', 'Bouquet'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeSearchModal}
      />

      {/* Search Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#F8F4EE] rounded-2xl shadow-2xl border border-[#E7DED2] overflow-hidden z-10 animate-fade-in flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E7DED2] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C6F5A] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bags, tops, toys, coasters, yarn gifts..."
            className="w-full bg-transparent text-[#332C28] placeholder:text-[#332C28]/45 text-base sm:text-lg focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-[#332C28]/40 hover:text-[#332C28] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="text-xs font-semibold text-[#8C6F5A] hover:underline px-2"
          >
            Esc
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-[#E7DED2]/30 border-b border-[#E7DED2] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-[#8C6F5A] uppercase tracking-wider flex-shrink-0">
            Popular:
          </span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-[#332C28] hover:border-[#8C6F5A] hover:text-[#8C6F5A] transition-colors flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-5">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-[#E7DED2]/60 flex items-center justify-center text-[#8C6F5A] mx-auto mb-3">
                <Search className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-xs text-[#332C28]/70">
                Type keywords like "bag", "halter top", "bunny", or "floral" to search our slow-crafted library.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <h4 className="font-serif-heading text-base font-bold text-[#332C28] mb-1">
                No handmade treasures found for "{searchTerm}"
              </h4>
              <p className="text-xs text-[#332C28]/60 max-w-sm mx-auto mb-4">
                Have a specific design in mind? Request a bespoke piece via our Custom Orders studio.
              </p>
              <button
                onClick={() => {
                  closeSearchModal();
                  navigateTo('custom-orders');
                }}
                className="py-2 px-4 rounded-full bg-[#332C28] text-white text-xs font-semibold hover:bg-[#8C6F5A] transition-colors"
              >
                Custom Order Inquiry
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C6F5A] flex items-center justify-between pb-2 border-b border-[#E7DED2]">
                <span>Matching Handcrafted Items ({results.length})</span>
                <button
                  onClick={() => {
                    closeSearchModal();
                    navigateTo('search-results', { query: searchTerm });
                  }}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {results.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    closeSearchModal();
                    navigateTo('product-detail', { productId: item.id });
                  }}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white border border-[#E7DED2]/80 hover:border-[#8C6F5A] transition-all cursor-pointer group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#F8F4EE] border border-[#E7DED2] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[#8C6F5A] font-semibold">
                      {item.category}
                    </div>
                    <div className="text-sm font-semibold text-[#332C28] group-hover:text-[#8C6F5A] transition-colors line-clamp-1">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#332C28]/80 mt-0.5">
                      <span className="font-bold text-[#332C28]">₹{item.price.toLocaleString('en-IN')}</span>
                      <div className="flex items-center gap-0.5 text-[11px] text-[#332C28]/60">
                        <Star className="w-2.5 h-2.5 text-[#D9A7A0] fill-[#D9A7A0]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C6F5A] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
