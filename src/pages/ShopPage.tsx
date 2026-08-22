import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Sparkles,
  LayoutGrid,
  Grid3X3,
  Search,
  Star
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { navigateTo } = useShop();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [localSearch, setLocalSearch] = useState<string>('');

  const categories = ['All', 'Tops', 'Bags', 'Toys', 'Home & Decor', 'Gifts'];
  
  const allColors = [
    { name: 'Cream', hex: '#F4EBE1' },
    { name: 'Soft Pink', hex: '#D9A7A0' },
    { name: 'Sage Green', hex: '#AAB5A0' },
    { name: 'Terracotta', hex: '#8C6F5A' },
    { name: 'Oatmeal', hex: '#E7DED2' },
    { name: 'Olive Green', hex: '#7A8C6E' }
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'One Size', 'Mini', 'Standard'];

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(3000);
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setMinRating(0);
    setLocalSearch('');
    setSortBy('featured');
  };

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (localSearch ? 1 : 0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Color filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = product.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasMatchingColor) return false;
      }
      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some((s) =>
          selectedSizes.some((ss) => s.toLowerCase().includes(ss.toLowerCase()))
        );
        if (!hasMatchingSize) return false;
      }
      // In stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Min rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Local keyword search
      if (localSearch.trim()) {
        const q = localSearch.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'newest':
        list = [...list].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        list = [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured
        break;
    }

    return list;
  }, [selectedCategory, maxPrice, selectedColors, selectedSizes, inStockOnly, minRating, localSearch, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div id="shop-page" className="min-h-screen bg-[#F8F4EE] pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#E7DED2]/40 border-b border-[#E7DED2] py-10 sm:py-14 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6F5A]">
            The Complete Atelier Collection
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#332C28] mt-1 mb-3">
            Shop All Creations
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/75 max-w-lg mx-auto leading-relaxed">
            Slow-fashioned crochet tops, textured bags, floral home decor, and gentle toys handcrafted with certified organic cotton.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Control Bar: Search, Mobile Filter Trigger, Sort, View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7DED2]/80">
          
          {/* Left: Mobile Filter Button & Active count */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-filter-drawer-btn"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#E7DED2] text-xs font-bold text-[#332C28] shadow-2xs hover:border-[#8C6F5A]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8C6F5A]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="text-xs text-[#332C28]/70">
              Showing <strong>{filteredProducts.length}</strong> handmade items
            </span>
          </div>

          {/* Right: Search, Sort Dropdown & Layout switch */}
          <div className="flex items-center gap-3">
            {/* Quick search input */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#332C28]/40" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E7DED2] rounded-lg text-xs text-[#332C28] placeholder:text-[#332C28]/40 focus:outline-none focus:border-[#8C6F5A]"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-2 top-2 text-[#332C28]/40 hover:text-[#332C28]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#332C28]/60 hidden sm:inline">Sort by:</span>
              <select
                id="shop-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E7DED2] text-xs font-semibold text-[#332C28] py-2 px-3 rounded-lg focus:outline-none focus:border-[#8C6F5A] cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Column layout toggle */}
            <div className="hidden lg:flex items-center border border-[#E7DED2] rounded-lg bg-white p-0.5">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-md transition-colors ${gridCols === 3 ? 'bg-[#332C28] text-white' : 'text-[#332C28]/60 hover:text-[#332C28]'}`}
                title="3 Columns Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-md transition-colors ${gridCols === 4 ? 'bg-[#332C28] text-white' : 'text-[#332C28]/60 hover:text-[#332C28]'}`}
                title="4 Columns Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] font-bold text-[#8C6F5A] uppercase tracking-wider">
              Active Filters:
            </span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            )}

            {maxPrice < 3000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>Under ₹{maxPrice}</span>
                <button onClick={() => setMaxPrice(3000)}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            )}

            {selectedColors.map((color) => (
              <span key={color} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>Color: {color}</span>
                <button onClick={() => toggleColor(color)}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            ))}

            {selectedSizes.map((size) => (
              <span key={size} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>Size: {size}</span>
                <button onClick={() => toggleSize(size)}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            ))}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>In Stock Only</span>
                <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E7DED2] text-xs text-[#332C28]">
                <span>{minRating}★ & above</span>
                <button onClick={() => setMinRating(0)}><X className="w-3 h-3 text-[#8C6F5A]" /></button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-[#8C6F5A] hover:underline flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Shop Body: Desktop Left Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-[#E7DED2] shadow-2xs h-fit">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DED2]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8C6F5A]" />
                <h3 className="font-serif-heading text-base font-bold text-[#332C28]">Filter Creations</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#8C6F5A] font-semibold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Category</h4>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const count = cat === 'All' 
                    ? PRODUCTS_DATA.length 
                    : PRODUCTS_DATA.filter((p) => p.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-[#F8F4EE] text-[#8C6F5A] font-bold' 
                          : 'text-[#332C28]/80 hover:bg-[#F8F4EE]/60'
                      }`}
                    >
                      <span>{cat === 'All' ? 'All Collections' : cat}</span>
                      <span className="text-[11px] text-[#332C28]/50">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E7DED2]/60">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#8C6F5A]">Max Price</span>
                <span className="font-bold text-[#332C28]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8C6F5A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#332C28]/50">
                <span>₹200</span>
                <span>₹3,000</span>
              </div>
            </div>

            {/* 3. Color Filters */}
            <div className="space-y-2 pt-2 border-t border-[#E7DED2]/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Yarn Palette</h4>
              <div className="flex flex-wrap gap-1.5">
                {allColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border transition-all ${
                        isSelected
                          ? 'border-[#8C6F5A] bg-[#8C6F5A] text-white font-semibold'
                          : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex || '#8C6F5A' }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Size Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E7DED2]/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Size</h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                        isSelected
                          ? 'border-[#332C28] bg-[#332C28] text-white font-bold'
                          : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Rating Filter */}
            <div className="space-y-2 pt-2 border-t border-[#E7DED2]/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Rating</h4>
              <div className="space-y-1">
                {[4.8, 4.5, 4.0].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setMinRating(minRating === ratingVal ? 0 : ratingVal)}
                    className={`w-full flex items-center justify-between text-xs py-1 px-2 rounded-lg ${
                      minRating === ratingVal ? 'bg-[#F8F4EE] font-bold text-[#8C6F5A]' : 'text-[#332C28]/80 hover:bg-[#F8F4EE]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D9A7A0] fill-[#D9A7A0]" />
                      <span>{ratingVal} & up</span>
                    </div>
                    {minRating === ratingVal && <Check className="w-3 h-3 text-[#8C6F5A]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Availability Checkbox */}
            <div className="pt-2 border-t border-[#E7DED2]/60">
              <label className="flex items-center gap-2 text-xs text-[#332C28] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A]"
                />
                <span>In Stock only (Ready to Ship)</span>
              </label>
            </div>

          </aside>

          {/* Right: Products Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E7DED2]">
                <div className="w-16 h-16 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mx-auto mb-4">
                  <Sparkles className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#332C28] mb-2">
                  No handmade treasures match your current filters
                </h3>
                <p className="text-xs text-[#332C28]/70 max-w-md mx-auto mb-6">
                  Try adjusting your price range, color palette, or category selections to explore more slow-crafted pieces.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="py-2.5 px-6 rounded-full bg-[#332C28] text-white text-xs font-semibold hover:bg-[#8C6F5A] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div 
                  className={`grid grid-cols-2 sm:grid-cols-2 ${
                    gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
                  } gap-4 sm:gap-6`}
                >
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="text-center pt-12">
                    <button
                      id="shop-load-more-btn"
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="py-3 px-8 rounded-full border border-[#332C28] text-[#332C28] text-xs font-bold uppercase tracking-wider hover:bg-[#332C28] hover:text-white transition-colors shadow-xs"
                    >
                      Load More Creations ({filteredProducts.length - displayedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DED2]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#8C6F5A]" />
                  <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">Filter Products</h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#332C28]/60 hover:text-[#332C28]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A] mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs ${
                        selectedCategory === cat ? 'bg-[#F8F4EE] font-bold text-[#8C6F5A]' : 'text-[#332C28]'
                      }`}
                    >
                      {cat === 'All' ? 'All Products' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold uppercase text-[#8C6F5A]">Max Price</span>
                  <span className="font-bold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8C6F5A]"
                />
              </div>

              {/* Mobile Colors */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A] mb-2">Yarn Colors</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                        selectedColors.includes(color.name) ? 'bg-[#8C6F5A] text-white' : 'bg-white text-[#332C28]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full border border-black/20" style={{ backgroundColor: color.hex || '#8C6F5A' }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7DED2] flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-[#E7DED2] text-xs font-semibold text-[#332C28]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#332C28] text-white text-xs font-bold"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
