import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Scissors, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  HelpCircle,
  Clock,
  Ruler,
  Info,
  AlertCircle
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openLightbox,
    navigateTo, 
    showToast,
    recentlyViewed 
  } = useShop();

  const product = selectedProduct || PRODUCTS_DATA[1];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'size' | 'care' | 'reviews'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const isSaved = isInWishlist(product.id);
  const currentColor = (product.colors && product.colors[selectedColorIndex]) || product.colors?.[0] || { name: 'Natural', hex: '#8C6F5A' };

  const readyToShipQty = product.stock ?? 9;
  const isQuantityExceeded = quantity > readyToShipQty;
  const isQuantityInvalid = isQuantityExceeded || quantity <= 0;

  const discountPercent = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  // Handle color change and switch active image if matched
  const handleColorSelect = (idx: number) => {
    setSelectedColorIndex(idx);
    if (product.images[idx]) {
      setActiveImageIndex(idx);
    }
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (isQuantityExceeded) {
      showToast('Quantity Exceeded', 'Quantity cannot be greater than Ready to Ship quantity.', 'error');
      return;
    }
    if (quantity <= 0) {
      showToast('Invalid Quantity', 'Please enter a valid quantity of 1 or more.', 'error');
      return;
    }
    addToCart(product, currentColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (isQuantityExceeded) {
      showToast('Quantity Exceeded', 'Quantity cannot be greater than Ready to Ship quantity.', 'error');
      return;
    }
    if (quantity <= 0) {
      showToast('Invalid Quantity', 'Please enter a valid quantity of 1 or more.', 'error');
      return;
    }
    addToCart(product, currentColor, selectedSize, quantity);
    navigateTo('checkout');
  };

  // Related products from same category
  const relatedProducts = PRODUCTS_DATA
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div id="product-detail-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#332C28]/60 flex items-center gap-2">
        <button onClick={() => navigateTo('home')} className="hover:text-[#8C6F5A]">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-[#8C6F5A]">Shop</button>
        <span>/</span>
        <button onClick={() => navigateTo('collection', { categorySlug: product.category.toLowerCase().replace(' & ', '-') })} className="hover:text-[#8C6F5A]">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#332C28] font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Product Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DED2] shadow-sm">
          
          {/* LEFT: Interactive Multi-angle Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[500px] flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`thumbnail-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 bg-[#F8F4EE] transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#8C6F5A] ring-2 ring-[#8C6F5A]/20 scale-102'
                      : 'border-[#E7DED2] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Interactive Stage with Zoom */}
            <div className="flex-1 relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#F8F4EE] border border-[#E7DED2] group">
              
              {/* Product Image */}
              <div
                className="w-full h-full relative cursor-crosshair overflow-hidden"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover select-none transition-transform duration-200"
                  style={
                    isZoomed
                      ? {
                          transform: 'scale(1.8)',
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        }
                      : {}
                  }
                />
              </div>

              {/* Prev / Next Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#332C28] flex items-center justify-center hover:bg-white shadow-md transition-transform active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#332C28] flex items-center justify-center hover:bg-white shadow-md transition-transform active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen Lightbox Button */}
              <button
                onClick={() => openLightbox(product.images[activeImageIndex], product.name, product.category)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#332C28] shadow-md transition-colors"
                title="Fullscreen Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Zoom hint badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[#332C28] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-black/10 pointer-events-none">
                Hover to Zoom • Handcrafted Tension Details
              </div>
            </div>

          </div>

          {/* RIGHT: Product Buy Box & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
                  {product.category}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-[#D9A7A0] text-[#332C28] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#D9A7A0]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D9A7A0]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#332C28]">{product.rating}</span>
                <span className="text-xs text-[#332C28]/60">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-bold text-[#332C28]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-[#332C28]/45 line-through">
                    ₹{product.comparePrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#5B734E] font-medium bg-[#5B734E]/10 px-2.5 py-1 rounded-md">
                  Tax included • Free Shipping above ₹999
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#332C28]/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2 border-t border-[#E7DED2]/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#332C28]">
                      Color: <strong className="text-[#8C6F5A]">{currentColor.name}</strong>
                    </span>
                    <span className="text-[11px] text-[#332C28]/60">100% Colorfast Natural Dye</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name || idx}
                        onClick={() => handleColorSelect(idx)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          selectedColorIndex === idx
                            ? 'border-[#8C6F5A] bg-[#F8F4EE] text-[#332C28] ring-2 ring-[#8C6F5A]/20'
                            : 'border-[#E7DED2] bg-white text-[#332C28]/80 hover:border-[#8C6F5A]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: color.hex || '#8C6F5A' }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-2 border-t border-[#E7DED2]/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#332C28]">
                      Size: <strong className="text-[#8C6F5A]">{selectedSize}</strong>
                    </span>
                    <button 
                      onClick={() => setActiveTab('size')} 
                      className="text-[11px] text-[#8C6F5A] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>View Measurements</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'border-[#332C28] bg-[#332C28] text-white shadow-xs'
                            : 'border-[#E7DED2] bg-white text-[#332C28] hover:border-[#8C6F5A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Inventory Status */}
              <div className="pt-2 border-t border-[#E7DED2]/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#332C28]">Quantity:</span>
                    <div 
                      className={`flex items-center border rounded-xl transition-all ${
                        isQuantityExceeded
                          ? 'border-[#C45A5A] bg-[#FFF0F0] ring-2 ring-[#C45A5A]/30'
                          : 'border-[#E7DED2] bg-[#F8F4EE]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-[#332C28] hover:bg-[#E7DED2] rounded-l-xl transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        id="pdp-quantity-input"
                        min="1"
                        max={readyToShipQty}
                        value={quantity === 0 ? '' : quantity}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          setQuantity(isNaN(val) ? 0 : val);
                        }}
                        className={`w-12 sm:w-14 text-center text-xs font-bold bg-transparent focus:outline-none py-1.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                          isQuantityExceeded ? 'text-[#C45A5A]' : 'text-[#332C28]'
                        }`}
                        aria-invalid={isQuantityExceeded}
                        aria-describedby={isQuantityExceeded ? "quantity-error-msg" : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-[#332C28] hover:bg-[#E7DED2] rounded-r-xl transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <span className={`text-xs font-medium flex items-center gap-1 ${
                    isQuantityExceeded ? 'text-[#C45A5A]' : 'text-[#5B734E]'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      isQuantityExceeded ? 'bg-[#C45A5A]' : 'bg-[#5B734E] animate-pulse'
                    }`}></span>
                    <span>{readyToShipQty} items ready to ship</span>
                  </span>
                </div>

                {/* Red warning/error message directly below the Quantity field */}
                {isQuantityExceeded && (
                  <div 
                    id="quantity-error-msg" 
                    className="mt-2.5 flex items-start gap-1.5 text-xs text-[#C45A5A] font-semibold bg-[#FFF0F0] border border-[#C45A5A]/30 p-2.5 rounded-xl animate-fade-in"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 text-[#C45A5A] flex-shrink-0 mt-0.5" />
                    <span>Quantity cannot be greater than Ready to Ship quantity.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="space-y-3 pt-4 border-t border-[#E7DED2]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={isQuantityInvalid}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                    isQuantityInvalid
                      ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed shadow-none'
                      : 'bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] cursor-pointer'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#D9A7A0]" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  id="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={isQuantityInvalid}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                    isQuantityInvalid
                      ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed shadow-none'
                      : 'bg-[#8C6F5A] hover:bg-[#725743] text-white cursor-pointer'
                  }`}
                >
                  <span>BUY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist button */}
              <button
                id="pdp-wishlist-toggle-btn"
                onClick={() => toggleWishlist(product)}
                className={`w-full py-2.5 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isSaved
                    ? 'border-[#D9A7A0] bg-[#D9A7A0]/10 text-[#D9A7A0]'
                    : 'border-[#E7DED2] text-[#332C28]/80 hover:border-[#8C6F5A] hover:text-[#8C6F5A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D9A7A0] text-[#D9A7A0]' : ''}`} />
                <span>{isSaved ? 'Saved in Your Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Handmade Variation Note */}
              <div className="p-3.5 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] text-[11px] text-[#332C28]/75 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#8C6F5A] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Handmade Note:</strong> Because each piece is crocheted by hand, small organic variations in stitch tension and hue are natural marks of authenticity.
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Product Details Tabs (Description, Dimensions, Care, Reviews) */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DED2] shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-[#E7DED2] overflow-x-auto gap-4 sm:gap-8 pb-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm font-bold pb-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'details' ? 'text-[#8C6F5A]' : 'text-[#332C28]/60 hover:text-[#332C28]'
              }`}
            >
              Product Details & Materials
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('size')}
              className={`text-sm font-bold pb-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'size' ? 'text-[#8C6F5A]' : 'text-[#332C28]/60 hover:text-[#332C28]'
              }`}
            >
              Dimensions & Fit
              {activeTab === 'size' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`text-sm font-bold pb-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'care' ? 'text-[#8C6F5A]' : 'text-[#332C28]/60 hover:text-[#332C28]'
              }`}
            >
              Artisanal Care Guide
              {activeTab === 'care' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews' ? 'text-[#8C6F5A]' : 'text-[#332C28]/60 hover:text-[#332C28]'
              }`}
            >
              Customer Reviews ({product.reviewsCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8C6F5A] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#332C28]/80 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#332C28] mb-1">Craftsmanship:</h4>
                  <p>{product.description}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#332C28] mb-1">Material & Origin:</h4>
                  <p>{product.material}</p>
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-[#332C28] mb-2">Key Highlights:</h4>
                  <ul className="space-y-1.5 list-disc pl-5">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'size' && (
              <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-[#332C28]/80">
                <h4 className="font-bold text-[#332C28]">Handcrafted Measurements:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8F4EE] p-5 rounded-2xl border border-[#E7DED2]">
                  {product.sizeDimensions.width && (
                    <div>
                      <span className="text-[#8C6F5A] font-semibold block text-[11px] uppercase">Width</span>
                      <span className="font-bold text-[#332C28]">{product.sizeDimensions.width}</span>
                    </div>
                  )}
                  {product.sizeDimensions.height && (
                    <div>
                      <span className="text-[#8C6F5A] font-semibold block text-[11px] uppercase">Height</span>
                      <span className="font-bold text-[#332C28]">{product.sizeDimensions.height}</span>
                    </div>
                  )}
                  {product.sizeDimensions.handle && (
                    <div>
                      <span className="text-[#8C6F5A] font-semibold block text-[11px] uppercase">Handle / Strap Drop</span>
                      <span className="font-bold text-[#332C28]">{product.sizeDimensions.handle}</span>
                    </div>
                  )}
                  {product.sizeDimensions.length && (
                    <div>
                      <span className="text-[#8C6F5A] font-semibold block text-[11px] uppercase">Length</span>
                      <span className="font-bold text-[#332C28]">{product.sizeDimensions.length}</span>
                    </div>
                  )}
                  {product.sizeDimensions.diameter && (
                    <div>
                      <span className="text-[#8C6F5A] font-semibold block text-[11px] uppercase">Diameter</span>
                      <span className="font-bold text-[#332C28]">{product.sizeDimensions.diameter}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#332C28]/60 italic">
                  *Because crochet has organic elasticity, dimensions may have a ±1cm hand variation.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-[#332C28]/80">
                <h4 className="font-bold text-[#332C28]">How to Preserve Your Handmade Piece:</h4>
                <div className="space-y-2.5">
                  {product.care.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#E7DED2] text-[#8C6F5A] text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7DED2]">
                  <div>
                    <div className="font-serif-heading text-2xl font-bold text-[#332C28]">
                      {product.rating} out of 5 Stars
                    </div>
                    <p className="text-xs text-[#332C28]/60">Based on {product.reviewsCount} verified customer orders</p>
                  </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#332C28]">{rev.author}</span>
                            {rev.location && <span className="text-[#332C28]/50">({rev.location})</span>}
                            {rev.verified && (
                              <span className="text-[10px] text-[#5B734E] font-semibold bg-[#5B734E]/10 px-2 py-0.5 rounded">
                                Verified Collector
                              </span>
                            )}
                          </div>
                          <span className="text-[#332C28]/50 text-[11px]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#D9A7A0]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                          ))}
                        </div>
                        <p className="text-xs text-[#332C28]/80 leading-relaxed font-light">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#332C28]/60">No written reviews yet for this limited batch.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">Similar Creations</span>
                <h3 className="font-serif-heading text-2xl font-bold text-[#332C28] mt-1">You May Also Cherish</h3>
              </div>
              <button
                onClick={() => navigateTo('collection', { categorySlug: product.category.toLowerCase() })}
                className="text-xs font-bold text-[#8C6F5A] hover:underline"
              >
                View Category
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
