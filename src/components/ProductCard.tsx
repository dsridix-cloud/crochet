import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCategory = true }) => {
  const { 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView 
  } = useShop();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isSaved = isInWishlist(product.id);

  const discountPercent = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#E7DED2]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F8F4EE]">
        {/* Main Product Image */}
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#D9A7A0] text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#AAB5A0] text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              NEW DROP
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#8C6F5A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            isSaved 
              ? 'bg-[#D9A7A0] text-white shadow-md' 
              : 'bg-white/80 backdrop-blur-xs text-[#332C28] hover:bg-white hover:text-[#D9A7A0] shadow-xs'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button (Desktop Hover overlay) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
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

          <button
            id={`quick-add-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.colors[0], product.sizes[0], 1);
            }}
            className="py-2 px-3 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D9A7A0]" />
            <span className="hidden md:inline">Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#332C28]/60 mb-1.5">
            {showCategory && (
              <span className="uppercase text-[10px] tracking-[1px] font-semibold text-[#AAB5A0]">
                {product.category}
              </span>
            )}
            <div className="flex items-center gap-1 ml-auto text-[#332C28]/80 text-[11px] font-medium">
              <Star className="w-3 h-3 text-[#D9A7A0] fill-[#D9A7A0]" />
              <span>{product.rating}</span>
              <span className="text-[#332C28]/40">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title (Clickable) */}
          <button
            id={`product-title-${product.id}`}
            onClick={() => navigateTo('product-detail', { productId: product.id })}
            className="text-left font-serif-heading text-sm sm:text-base font-semibold text-[#332C28] hover:text-[#8C6F5A] transition-colors line-clamp-1 block w-full focus:outline-none"
          >
            {product.name}
          </button>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 mb-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name || idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.images && product.images[idx]) {
                      setCurrentImageIndex(idx);
                    }
                  }}
                  className={`w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs transition-transform ${
                    currentImageIndex === idx ? 'ring-2 ring-[#8C6F5A] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex || '#8C6F5A' }}
                  title={color.name || 'Color option'}
                  aria-label={`Select color ${color.name || idx}`}
                />
              ))}
              {product.colors.length > 1 && (
                <span className="text-[10px] text-[#332C28]/50 ml-1">
                  {product.colors.length} shades
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing and Mobile Add Button */}
        <div className="pt-2 border-t border-[#E7DED2]/50 flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-[#8C6F5A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-[#332C28]/45 line-through">
                ₹{product.comparePrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile Direct Add Button */}
          <button
            id={`mob-add-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.colors[0], product.sizes[0], 1);
            }}
            className="sm:hidden p-2 rounded-lg bg-[#F8F4EE] hover:bg-[#332C28] hover:text-[#F8F4EE] text-[#332C28] transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
