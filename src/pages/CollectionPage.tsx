import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';

export const CollectionPage: React.FC<{ categoryKey?: string }> = ({ categoryKey }) => {
  const { currentPage, selectedCategorySlug, navigateTo } = useShop();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Determine active category
  let activeSlug = categoryKey || selectedCategorySlug;
  if (!activeSlug) {
    if (currentPage === 'collection-tops') activeSlug = 'tops';
    else if (currentPage === 'collection-bags') activeSlug = 'bags';
    else if (currentPage === 'collection-toys') activeSlug = 'toys';
    else if (currentPage === 'collection-home-decor') activeSlug = 'home-decor';
    else if (currentPage === 'collection-gifts') activeSlug = 'gifts';
    else activeSlug = 'bags';
  }

  const activeCategory = CATEGORIES_DATA.find((c) => c.id === activeSlug) || CATEGORIES_DATA[0];

  const categoryProducts = PRODUCTS_DATA.filter((p) => p.category === activeCategory.categoryKey);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <div id="collection-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Editorial Collection Hero Banner */}
      <div className="relative bg-[#332C28] text-[#F8F4EE] py-16 sm:py-24 overflow-hidden">
        {/* Background Image with warm overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeCategory.bannerImage}
            alt={activeCategory.name}
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#332C28] via-[#332C28]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs text-[#E7DED2]/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </button>

          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#D9A7A0]">
              {activeCategory.subtitle}
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              {activeCategory.name}
            </h1>
            <p className="text-sm sm:text-base text-[#F8F4EE]/85 leading-relaxed font-light">
              {activeCategory.description}
            </p>
          </div>
        </div>
      </div>

      {/* Category Tab Pills */}
      <div className="border-b border-[#E7DED2] bg-white sticky top-[68px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-3 gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            {CATEGORIES_DATA.map((cat) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  id={`collection-tab-${cat.id}`}
                  onClick={() => navigateTo('collection', { categorySlug: cat.id })}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#332C28] text-white shadow-xs'
                      : 'bg-[#F8F4EE] text-[#332C28] hover:bg-[#E7DED2]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pl-4 flex-shrink-0">
            <span className="text-xs text-[#332C28]/60 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#F8F4EE] border border-[#E7DED2] text-xs font-semibold text-[#332C28] py-1.5 px-3 rounded-lg focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collection Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif-heading text-2xl font-bold text-[#332C28]">
            {activeCategory.name} Catalog
          </h2>
          <span className="text-xs text-[#332C28]/70">
            {sortedProducts.length} pieces in this collection
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCategory={false} />
          ))}
        </div>

        {/* Custom Order Callout in Collection */}
        <div className="mt-16 bg-[#E7DED2]/50 border border-[#E7DED2] rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
            <Sparkles className="w-5 h-5 text-[#D9A7A0]" />
          </div>
          <h3 className="font-serif-heading text-2xl font-bold text-[#332C28]">
            Looking for a custom {activeCategory.name.toLowerCase()} design?
          </h3>
          <p className="text-xs text-[#332C28]/75 max-w-md mx-auto">
            Choose your custom yarn colors, specific strap lengths, or unique sizes through our Jaipur master crochet workshop.
          </p>
          <button
            onClick={() => navigateTo('custom-orders')}
            className="py-2.5 px-6 rounded-full bg-[#332C28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8C6F5A] transition-colors inline-flex items-center gap-2"
          >
            <span>Request Bespoke {activeCategory.categoryKey}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
