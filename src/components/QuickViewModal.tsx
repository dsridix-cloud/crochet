import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo 
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const currentColor = (quickViewProduct.colors && quickViewProduct.colors[selectedColorIndex]) || quickViewProduct.colors?.[0] || { name: 'Natural', hex: '#8C6F5A' };
  const currentSize = selectedSize || quickViewProduct.sizes?.[0] || 'One Size';
  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentColor, currentSize, quantity);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, currentColor, currentSize, quantity);
    closeQuickView();
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#E7DED2] z-10 animate-fade-in my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#332C28] hover:bg-[#F8F4EE] transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images Gallery */}
          <div className="p-6 bg-[#F8F4EE] flex flex-col justify-between">
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E7DED2] mb-3 relative">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#332C28] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                {quickViewProduct.category}
              </span>
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white transition-all ${
                      activeImageIndex === idx ? 'border-[#8C6F5A] ring-1 ring-[#8C6F5A]' : 'border-[#E7DED2] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Purchase Actions */}
          <div className="p-6 sm:p-7 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase text-[11px] font-bold tracking-wider text-[#8C6F5A]">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#332C28]">
                  <Star className="w-3.5 h-3.5 text-[#D9A7A0] fill-[#D9A7A0]" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-[#332C28]/50 font-normal">({quickViewProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif-heading text-2xl font-bold text-[#332C28]">
                {quickViewProduct.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-bold text-[#332C28]">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.comparePrice && (
                  <span className="text-sm text-[#332C28]/45 line-through">
                    ₹{quickViewProduct.comparePrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#5B734E] font-medium bg-[#5B734E]/10 px-2 py-0.5 rounded">
                  In Stock ({quickViewProduct.stock} left)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#332C28]/80 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#332C28] mb-2 flex items-center justify-between">
                    <span>Color: <strong className="text-[#8C6F5A]">{currentColor.name}</strong></span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((color, idx) => (
                      <button
                        key={color.name || idx}
                        onClick={() => {
                          setSelectedColorIndex(idx);
                          if (quickViewProduct.images[idx]) setActiveImageIndex(idx);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          selectedColorIndex === idx
                            ? 'border-[#8C6F5A] bg-[#F8F4EE] text-[#332C28] ring-1 ring-[#8C6F5A]'
                            : 'border-[#E7DED2] text-[#332C28]/80 hover:border-[#8C6F5A]/50'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/20" 
                          style={{ backgroundColor: color.hex || '#8C6F5A' }} 
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {quickViewProduct.sizes && (
                <div>
                  <div className="text-xs font-bold text-[#332C28] mb-2">
                    Size: <strong className="text-[#8C6F5A]">{currentSize}</strong>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          currentSize === size
                            ? 'border-[#332C28] bg-[#332C28] text-white'
                            : 'border-[#E7DED2] text-[#332C28] hover:border-[#8C6F5A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-bold text-[#332C28]">Quantity:</span>
                <div className="flex items-center border border-[#E7DED2] rounded-lg bg-[#F8F4EE]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#332C28] hover:bg-[#E7DED2] rounded-l-lg transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3.5 text-xs font-bold text-[#332C28]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#332C28] hover:bg-[#E7DED2] rounded-r-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="quickview-add-to-cart"
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D9A7A0]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  id="quickview-buy-now"
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-[#8C6F5A] hover:bg-[#725743] text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isSaved ? 'text-[#D9A7A0]' : 'text-[#332C28]/70 hover:text-[#D9A7A0]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D9A7A0]' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    closeQuickView();
                    navigateTo('product-detail', { productId: quickViewProduct.id });
                  }}
                  className="text-xs font-semibold text-[#8C6F5A] hover:underline flex items-center gap-1"
                >
                  <span>View Full Details & Reviews</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
