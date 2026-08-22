import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, ArrowRight, Sparkles, Filter } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const { searchQuery, setSearchQuery, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('featured');

  const query = searchTerm.toLowerCase().trim();

  const results = query
    ? PRODUCTS_DATA.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
        );
      })
    : PRODUCTS_DATA;

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const popularKeywords = ['Daisy Bag', 'Crochet Top', 'Bunny Toy', 'Coaster Set', 'Sage Green', 'Organic Cotton'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <div id="search-results-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Search Header */}
      <div className="bg-[#E7DED2]/40 border-b border-[#E7DED2] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6F5A]">
            Slow Fashion Catalog Search
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] mt-1 mb-4">
            {query ? `Search Results for "${query}"` : 'Browse Handcrafted Catalog'}
          </h1>

          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C6F5A] absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search bags, tops, toys, coasters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E7DED2] rounded-full text-xs text-[#332C28] placeholder:text-[#332C28]/45 focus:outline-none focus:border-[#8C6F5A] shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Search
            </button>
          </form>

          {/* Popular Tag suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-[#332C28]/70">
            <span className="text-[11px] font-bold text-[#8C6F5A]">Suggestions:</span>
            {popularKeywords.map((k) => (
              <button
                key={k}
                onClick={() => {
                  setSearchTerm(k);
                  setSearchQuery(k);
                }}
                className="px-3 py-1 rounded-full bg-white border border-[#E7DED2] text-[11px] hover:border-[#8C6F5A] transition-colors"
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {sortedResults.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-[#E7DED2] text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mx-auto">
              <Search className="w-6 h-6 opacity-60" />
            </div>
            <h2 className="font-serif-heading text-xl font-bold text-[#332C28]">
              No crochet pieces found for "{searchTerm}"
            </h2>
            <p className="text-xs text-[#332C28]/70 leading-relaxed">
              We couldn't find a direct match in our ready stock. Would you like our artisans to craft a bespoke piece specifically for you?
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('custom-orders')}
                className="py-3 px-6 rounded-full bg-[#332C28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8C6F5A] transition-colors inline-flex items-center gap-2"
              >
                <span>Request Custom Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E7DED2]">
              <span className="text-xs font-bold text-[#8C6F5A] uppercase tracking-wider">
                {sortedResults.length} Handcrafted {sortedResults.length === 1 ? 'Creation' : 'Creations'} Found
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#332C28]/60 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#E7DED2] text-xs font-semibold text-[#332C28] py-1.5 px-3 rounded-lg focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
