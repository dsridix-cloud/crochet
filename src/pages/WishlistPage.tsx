import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductColor } from '../types';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/products';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  Eye, 
  Trash2, 
  Sparkles, 
  Clock, 
  Filter, 
  ArrowUpDown, 
  Check, 
  AlertCircle,
  Package,
  Layers,
  ChevronRight
} from 'lucide-react';

type SortOption = 'recent' | 'price-low' | 'price-high' | 'rating';
type CategoryFilter = 'All' | 'Tops' | 'Bags' | 'Toys' | 'Home & Decor' | 'Gifts';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigateTo, 
    openQuickView, 
    recentlyViewed,
    showToast,
    isInWishlist
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedColors, setSelectedColors] = useState<Record<string, ProductColor>>({});

  // Filter categories available
  const categories: CategoryFilter[] = ['All', 'Tops', 'Bags', 'Toys', 'Home & Decor', 'Gifts'];

  // Handle color change per product card
  const handleColorChange = (productId: string, color: ProductColor) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  // Filtered and Sorted Wishlist
  const filteredWishlist = useMemo(() => {
    let list = [...wishlist];

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter(item => item.product.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.product.price - b.product.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.product.price - a.product.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.product.rating - a.product.rating);
    } else {
      // Default: Recently added (descending date)
      list.sort((a, b) => new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime());
    }

    return list;
  }, [wishlist, selectedCategory, sortBy]);

  // Count available in-stock items
  const availableItems = useMemo(() => {
    return wishlist.filter(item => (item.product.stock || 0) > 0);
  }, [wishlist]);

  // Add All Available to Cart
  const handleAddAllAvailableToCart = () => {
    if (availableItems.length === 0) {
      showToast('No Available Items', 'None of your saved pieces are currently in stock', 'info');
      return;
    }

    availableItems.forEach(item => {
      const chosenColor = selectedColors[item.product.id] || item.product.colors?.[0];
      const chosenSize = item.product.sizes?.[0];
      addToCart(item.product, chosenColor, chosenSize, 1);
    });

    showToast(
      'Added All to Cart',
      `Successfully added ${availableItems.length} available handmade ${availableItems.length === 1 ? 'item' : 'items'} to your bag!`,
      'cart'
    );
  };

  // Recommended products based on user's favorite categories
  const recommendedProducts = useMemo(() => {
    const favoriteCategorySet = new Set(wishlist.map(w => w.product.category));
    const wishlistIds = new Set(wishlist.map(w => w.product.id));

    // Prefer products in the user's favorite categories that aren't already favorited
    let matched = PRODUCTS_DATA.filter(
      p => favoriteCategorySet.has(p.category) && !wishlistIds.has(p.id)
    );

    // Fallback if not enough matches
    if (matched.length < 4) {
      const remaining = PRODUCTS_DATA.filter(p => !wishlistIds.has(p.id) && !matched.some(m => m.id === p.id));
      matched = [...matched, ...remaining];
    }

    return matched.slice(0, 4);
  }, [wishlist]);

  // Clean recently viewed items (filter out current favorites from recently viewed to avoid duplication, up to 4-6 items)
  const displayRecentlyViewed = useMemo(() => {
    const list = recentlyViewed.filter(Boolean);
    if (list.length > 0) return list.slice(0, 4);
    // Default fallback
    return PRODUCTS_DATA.slice(0, 4);
  }, [recentlyViewed]);

  return (
    <div id="favorites-page" className="min-h-screen bg-[#F8F4EE] pb-28 lg:pb-24">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white border-b border-[#E7DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C6F5A] mb-1.5">
                <Heart className="w-3.5 h-3.5 fill-[#D9A7A0] text-[#D9A7A0]" />
                <span>Maison Crochet Sanctuary</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#332C28]">
                Your Favorites
              </h1>
              <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1.5 max-w-lg leading-relaxed">
                Little handmade pieces you've saved for later.
              </p>
            </div>

            {/* Top Action Buttons (Desktop & Tablet) */}
            <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0">
              <button
                id="wishlist-continue-shopping-btn"
                onClick={() => navigateTo('shop')}
                className="py-2.5 px-4 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] text-[#332C28] text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-[#E7DED2]"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#8C6F5A]" />
                <span>Continue Shopping</span>
              </button>

              {wishlist.length > 0 && (
                <button
                  id="wishlist-add-all-top-btn"
                  onClick={handleAddAllAvailableToCart}
                  disabled={availableItems.length === 0}
                  className="py-2.5 px-5 rounded-xl bg-[#332C28] hover:bg-[#8C6F5A] active:bg-[#735A48] disabled:bg-[#332C28]/40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D9A7A0]" />
                  <span>Add All Available to Cart</span>
                  <span className="bg-[#8C6F5A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {availableItems.length}
                  </span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div id="favorites-empty-state" className="space-y-12">
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-[#E7DED2] shadow-xs text-center space-y-6">
              
              <div className="w-20 h-20 rounded-full bg-[#F8F4EE] border border-[#E7DED2] flex items-center justify-center text-[#D9A7A0] mx-auto shadow-inner">
                <Heart className="w-10 h-10 opacity-70" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
                  Slow Fashion Wishlist
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28] mt-1">
                  Your wishlist is waiting for something special.
                </h2>
                <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed max-w-md mx-auto mt-2">
                  Save the handmade pieces you love and come back to them whenever you're ready.
                </p>
              </div>

              <div className="pt-2">
                <button
                  id="favorites-empty-explore-btn"
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Category Quick Links */}
              <div className="pt-6 border-t border-[#E7DED2]">
                <div className="text-xs font-bold text-[#332C28] mb-3">Explore By Category</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => navigateTo('collection', { categorySlug: 'bags' })}
                    className="p-3 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#E7DED2] text-xs font-bold text-[#332C28] transition-colors text-center"
                  >
                    Crochet Bags
                  </button>
                  <button
                    onClick={() => navigateTo('collection', { categorySlug: 'tops' })}
                    className="p-3 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#E7DED2] text-xs font-bold text-[#332C28] transition-colors text-center"
                  >
                    Crochet Tops
                  </button>
                  <button
                    onClick={() => navigateTo('collection', { categorySlug: 'gifts' })}
                    className="p-3 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#E7DED2] text-xs font-bold text-[#332C28] transition-colors text-center"
                  >
                    Handmade Gifts
                  </button>
                  <button
                    onClick={() => navigateTo('collection', { categorySlug: 'home-decor' })}
                    className="p-3 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] border border-[#E7DED2] text-xs font-bold text-[#332C28] transition-colors text-center"
                  >
                    Home & Decor
                  </button>
                </div>
              </div>

            </div>

            {/* Empty State Bestsellers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#332C28]">
                    Artisan Favorites to Inspire You
                  </h3>
                  <p className="text-xs text-[#332C28]/60">Hand-crocheted bestsellers loved by our community</p>
                </div>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-xs font-bold text-[#8C6F5A] hover:underline flex items-center gap-1"
                >
                  <span>View Catalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
                {PRODUCTS_DATA.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-[#F8F4EE] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => navigateTo('product-detail', { productId: product.id })}
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#332C28] hover:text-[#D9A7A0] flex items-center justify-center shadow-xs transition-colors"
                        aria-label="Add to favorites"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C6F5A] tracking-wider">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="font-serif-heading text-xs sm:text-sm font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {product.name}
                        </h4>
                        <div className="text-xs font-bold text-[#332C28] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className="mt-3 w-full py-2 rounded-xl bg-[#F8F4EE] hover:bg-[#332C28] hover:text-white border border-[#E7DED2] text-[11px] font-bold text-[#332C28] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#D9A7A0]" />
                        <span>Save to Favorites</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* ACTIVE FAVORITES LIST */
          <div className="space-y-8">
            
            {/* Filter Bar & Sort Controls */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E7DED2] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Category Filter Pills (Horizontal scroll on mobile) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#332C28]/60 pr-2 border-r border-[#E7DED2] flex-shrink-0 hidden sm:flex">
                  <Filter className="w-3.5 h-3.5 text-[#8C6F5A]" />
                  <span>Filter:</span>
                </div>

                {categories.map((cat) => {
                  const count = cat === 'All' 
                    ? wishlist.length 
                    : wishlist.filter(item => item.product.category === cat).length;

                  if (count === 0 && cat !== 'All') return null;

                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#332C28] text-white shadow-xs'
                          : 'bg-[#F8F4EE] hover:bg-[#E7DED2] text-[#332C28] border border-[#E7DED2]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isSelected ? 'bg-[#8C6F5A] text-white' : 'bg-[#E7DED2] text-[#332C28]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort Control */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#E7DED2]">
                <div className="text-xs font-bold text-[#8C6F5A]">
                  {filteredWishlist.length} {filteredWishlist.length === 1 ? 'Item' : 'Items'}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#332C28]/60 hidden sm:inline">Sort:</span>
                  <div className="relative">
                    <select
                      id="wishlist-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3 py-1.5 text-xs font-bold text-[#332C28] focus:outline-none focus:ring-2 focus:ring-[#8C6F5A]/40 appearance-none pr-8 cursor-pointer"
                    >
                      <option value="recent">Recently Added</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ArrowUpDown className="w-3 h-3 text-[#8C6F5A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>

            {/* PRODUCT GRID (Desktop: 4 columns, Tablet: 3 columns, Mobile: 2 columns) */}
            <div 
              id="favorites-product-grid" 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6"
            >
              {filteredWishlist.map(({ product }) => {
                const isOutOfStock = (product.stock || 0) === 0;
                const isLowStock = !isOutOfStock && (product.stock || 0) <= 3;
                const discountPercent = product.comparePrice 
                  ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
                  : 0;

                const activeColor = selectedColors[product.id] || product.colors?.[0] || { name: 'Natural', hex: '#8C6F5A' };
                const imageIndex = activeColor?.imageIndex ?? 0;
                const displayImage = product.images[imageIndex] || product.images[0];

                return (
                  <div
                    key={product.id}
                    id={`favorite-card-${product.id}`}
                    className="group bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
                  >
                    {/* Top Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#F8F4EE]">
                      <img
                        src={displayImage}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => navigateTo('product-detail', { productId: product.id })}
                      />

                      {/* Product Badges (Top Left) */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                        {isOutOfStock ? (
                          <span className="bg-[#332C28] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            SOLD OUT
                          </span>
                        ) : isLowStock ? (
                          <span className="bg-[#C87D55] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            ONLY {product.stock} LEFT
                          </span>
                        ) : product.isBestSeller ? (
                          <span className="bg-[#D9A7A0] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            BESTSELLER
                          </span>
                        ) : product.isNewArrival ? (
                          <span className="bg-[#AAB5A0] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            NEW DROP
                          </span>
                        ) : null}

                        {discountPercent > 0 && (
                          <span className="bg-[#8C6F5A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            SAVE {discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Heart / Favorite Button (Top Right) */}
                      <button
                        id={`fav-heart-btn-${product.id}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#D9A7A0] text-white shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10"
                        title="Remove from favorites"
                        aria-label={`Remove ${product.name} from favorites`}
                      >
                        <Heart className="w-4 h-4 fill-white animate-pulse" />
                      </button>

                      {/* Quick View Button on Desktop Hover */}
                      <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <button
                          id={`fav-quickview-btn-${product.id}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                          className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs hover:bg-white text-[#332C28] rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8C6F5A]" />
                          <span>Quick View</span>
                        </button>
                      </div>

                    </div>

                    {/* Content Section */}
                    <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Category & Star Rating */}
                        <div className="flex items-center justify-between text-xs text-[#332C28]/60 mb-1">
                          <span className="uppercase text-[10px] tracking-[1px] font-bold text-[#8C6F5A]">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#332C28]">
                            <Star className="w-3 h-3 text-[#D9A7A0] fill-[#D9A7A0]" />
                            <span>{product.rating}</span>
                            <span className="text-[#332C28]/40">({product.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Title (Clickable) */}
                        <h3
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="font-serif-heading text-xs sm:text-base font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h3>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs sm:text-base font-bold text-[#8C6F5A]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.comparePrice && (
                            <span className="text-[10px] sm:text-xs text-[#332C28]/40 line-through">
                              ₹{product.comparePrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Color Options */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            {product.colors.map((c) => (
                              <button
                                key={c.name}
                                type="button"
                                onClick={() => handleColorChange(product.id, c)}
                                className={`w-3.5 h-3.5 rounded-full border border-black/15 transition-transform ${
                                  activeColor.name === c.name ? 'ring-2 ring-[#8C6F5A] scale-110' : 'hover:scale-105'
                                }`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                                aria-label={`Select ${c.name} color`}
                              />
                            ))}
                            <span className="text-[10px] text-[#332C28]/60 ml-1 truncate">
                              {activeColor.name}
                            </span>
                          </div>
                        )}

                        {/* Stock Status Indicator */}
                        <div className="mt-2 text-[11px]">
                          {isOutOfStock ? (
                            <span className="text-red-600 font-bold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Currently unavailable</span>
                            </span>
                          ) : isLowStock ? (
                            <span className="text-[#C87D55] font-semibold flex items-center gap-1">
                              <span>⚡ Only {product.stock} items left in studio</span>
                            </span>
                          ) : (
                            <span className="text-green-700 font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>In Stock • Ready to ship</span>
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-3 mt-3 border-t border-[#E7DED2]/60 flex items-center gap-2">
                        <button
                          id={`fav-add-to-cart-${product.id}`}
                          onClick={() => {
                            if (!isOutOfStock) {
                              addToCart(product, activeColor, product.sizes?.[0], 1);
                            }
                          }}
                          disabled={isOutOfStock}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isOutOfStock
                              ? 'bg-[#E7DED2] text-[#332C28]/40 cursor-not-allowed'
                              : 'bg-[#332C28] hover:bg-[#8C6F5A] active:bg-[#735A48] text-white shadow-xs'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span className="truncate">
                            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                          </span>
                        </button>

                        <button
                          id={`fav-remove-btn-${product.id}`}
                          onClick={() => toggleWishlist(product)}
                          className="p-2 rounded-xl text-[#332C28]/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove from Favorites"
                          aria-label="Remove from Favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* RECOMMENDED SECTION ("You May Also Like") */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-10 border-t border-[#E7DED2]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A7A0]" />
                  <span>Curated Pairings</span>
                </div>
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#332C28] mt-1">
                  You May Also Like
                </h3>
                <p className="text-xs text-[#332C28]/60 mt-0.5">
                  Handcrafted slow-fashion pieces aligned with your favorites
                </p>
              </div>

              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-[#8C6F5A] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
              {recommendedProducts.map((product) => {
                const isFavorite = isInWishlist(product.id);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-[#F8F4EE] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => navigateTo('product-detail', { productId: product.id })}
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full shadow-xs flex items-center justify-center transition-all z-10 ${
                          isFavorite 
                            ? 'bg-[#D9A7A0] text-white' 
                            : 'bg-white/90 backdrop-blur-xs text-[#332C28] hover:text-[#D9A7A0]'
                        }`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C6F5A] tracking-wider">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="font-serif-heading text-xs sm:text-sm font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {product.name}
                        </h4>
                        <div className="text-xs font-bold text-[#332C28] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-1.5">
                        <button
                          onClick={() => addToCart(product, product.colors[0], product.sizes[0], 1)}
                          className="flex-1 py-1.5 rounded-xl bg-[#F8F4EE] hover:bg-[#332C28] hover:text-white border border-[#E7DED2] text-[11px] font-bold text-[#332C28] transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => openQuickView(product)}
                          className="p-1.5 rounded-xl bg-[#F8F4EE] hover:bg-[#E7DED2] text-[#332C28] border border-[#E7DED2] transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED SECTION */}
        {displayRecentlyViewed.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E7DED2]">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-[#8C6F5A]" />
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#332C28]">
                Recently Viewed
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
              {displayRecentlyViewed.map((product) => {
                const isFavorite = isInWishlist(product.id);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-[#F8F4EE] overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => navigateTo('product-detail', { productId: product.id })}
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full shadow-xs flex items-center justify-center transition-all z-10 ${
                          isFavorite 
                            ? 'bg-[#D9A7A0] text-white' 
                            : 'bg-white/90 backdrop-blur-xs text-[#332C28] hover:text-[#D9A7A0]'
                        }`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    <div className="p-3.5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C6F5A] tracking-wider">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => navigateTo('product-detail', { productId: product.id })}
                          className="font-serif-heading text-xs sm:text-sm font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {product.name}
                        </h4>
                        <div className="text-xs font-bold text-[#332C28] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product, product.colors[0], product.sizes[0], 1)}
                        className="mt-3 w-full py-1.5 rounded-xl bg-[#F8F4EE] hover:bg-[#332C28] hover:text-white border border-[#E7DED2] text-[11px] font-bold text-[#332C28] transition-colors flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* MOBILE STICKY BOTTOM BAR (Visible only on mobile when favorites exist) */}
      {wishlist.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7DED2] p-3 shadow-2xl safe-area-bottom">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-[#D9A7A0] text-[#D9A7A0]" />
              <div className="text-xs font-bold text-[#332C28]">
                {wishlist.length} {wishlist.length === 1 ? 'Favorite' : 'Favorites'}
              </div>
            </div>

            <button
              id="mobile-sticky-add-available-btn"
              onClick={handleAddAllAvailableToCart}
              disabled={availableItems.length === 0}
              className="py-2.5 px-4 rounded-xl bg-[#8C6F5A] active:bg-[#735A48] disabled:bg-[#8C6F5A]/40 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 flex-1 max-w-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Available to Cart</span>
              <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">
                {availableItems.length}
              </span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
