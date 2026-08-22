import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, PRODUCTS_DATA, INSTAGRAM_GALLERY, TESTIMONIALS_DATA, FAQS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  Heart, 
  ShieldCheck, 
  Feather, 
  Smile, 
  ChevronDown, 
  Instagram, 
  Star,
  CheckCircle2,
  Mail,
  Clock,
  Flower2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openLightbox, showToast } = useShop();

  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const bestSellers = PRODUCTS_DATA.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNewArrival).slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'We need a valid email to send updates', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed!', 'Thank you for joining our handmade drops newsletter.', 'success');
  };

  return (
    <div id="home-page" className="min-h-screen">
      
      {/* 1. HERO SECTION (Large editorial lifestyle) */}
      <section className="relative overflow-hidden bg-[#E7DED2]/40 border-b border-[#E7DED2]/80 pt-6 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Editorial Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-[#E7DED2] border border-[#8C6F5A]/20 text-[#8C6F5A] px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A7A0]" />
                <span>SLOW FASHION · ARTISANAL QUALITY</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#332C28] leading-[1.12]">
                Artisan Crochet for the <br className="hidden sm:inline" />
                <span className="italic font-normal font-editorial text-[#8C6F5A]">Modern Soul</span>.
              </h1>

              <p className="text-sm sm:text-base text-[#332C28]/80 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Discover modern handmade slow fashion, bespoke tops, textured tote bags, and heirloom amigurumi toys. Each item is hand-stitched loop by loop in Jaipur using 100% natural organic cotton yarn.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-shop-collection-btn"
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>EXPLORE THE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-custom-order-btn"
                  onClick={() => navigateTo('custom-orders')}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full border border-[#8C6F5A] text-[#332C28] hover:bg-[#E7DED2]/80 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#D9A7A0]" />
                  <span>CUSTOM ORDER</span>
                </button>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-6 border-t border-[#E7DED2] flex items-center justify-center lg:justify-start gap-6 text-xs text-[#332C28]/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#AAB5A0]"></span>
                  <span>100% Natural Yarns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D9A7A0]"></span>
                  <span>Over 2,400+ Stitches per Bag</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8C6F5A]"></span>
                  <span>Fair Artisan Livelihood</span>
                </div>
              </div>

            </div>

            {/* Right: Large Editorial Lifestyle Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Hero Image */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#E7DED2] relative group">
                  <img
                    src="https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1200&q=85"
                    alt="Artisanal crochet top lifestyle"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 text-[#332C28] shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8C6F5A] font-bold">Featured Drop</div>
                      <div className="font-serif-heading text-sm font-bold">Cloud Petal Halter Top</div>
                      <div className="text-xs font-semibold text-[#332C28]">₹1,499</div>
                    </div>
                    <button
                      onClick={() => navigateTo('product-detail', { productId: 'cr-top-01' })}
                      className="py-1.5 px-3 rounded-full bg-[#332C28] text-white text-xs font-semibold hover:bg-[#8C6F5A] transition-colors"
                    >
                      View Piece
                    </button>
                  </div>
                </div>

                {/* Floating Secondary Mini Card */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-[#E7DED2] items-center gap-3 max-w-[220px] animate-bounce-subtle z-20">
                  <img
                    src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=200&q=80"
                    alt="Daisy bag snippet"
                    className="w-12 h-12 rounded-xl object-cover border border-[#E7DED2]"
                  />
                  <div>
                    <div className="text-[10px] font-bold text-[#8C6F5A] uppercase">Artisan Pick</div>
                    <div className="text-xs font-bold text-[#332C28] line-clamp-1">Daisy Bloom Bag</div>
                    <div className="text-[11px] text-[#5B734E] font-semibold">★ 4.9 Rating</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-16 lg:py-24 bg-[#F8F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
              Mindfully Crafted
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] mt-1 mb-3">
              Shop by Category
            </h2>
            <p className="text-sm text-[#332C28]/70">
              Each collection is designed for conscious living, pairing timeless crochet motifs with contemporary silhouettes.
            </p>
          </div>

          {/* 5 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                id={`home-cat-card-${cat.id}`}
                onClick={() => navigateTo('collection', { categorySlug: cat.id })}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E7DED2] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-80"
              >
                {/* Category Image */}
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Category Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-wider text-[#E7DED2] font-semibold mb-0.5">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold group-hover:text-[#D9A7A0] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-white/80">
                    <span>{cat.count} styles</span>
                    <span className="flex items-center gap-1 font-semibold text-white group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-[#D9A7A0]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. BEST SELLERS ("Our Favorites") */}
      <section className="py-16 lg:py-20 bg-white border-y border-[#E7DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
                Customer Treasures
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] mt-1">
                Our Favorites
              </h2>
            </div>

            <button
              id="view-all-bestsellers-btn"
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6F5A] hover:text-[#332C28] transition-colors"
            >
              <span>View All 20+ Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 8 Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. HANDMADE STORY SECTION (Editorial Split) */}
      <section className="py-20 lg:py-28 bg-[#F8F4EE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Workshop & Artisans Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                  alt="Crochet yarn and hands in artisan workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#8C6F5A]/10"></div>
              </div>

              {/* Floating Quote Stamp */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-2xl shadow-xl border border-[#E7DED2] max-w-xs text-xs text-[#332C28] space-y-1">
                <div className="flex items-center gap-1 text-[#D9A7A0]">
                  <Star className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                  <Star className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                  <Star className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                  <Star className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                  <Star className="w-3.5 h-3.5 fill-[#D9A7A0]" />
                </div>
                <p className="italic text-[#332C28]/80 font-serif">
                  "No two stitches are in a hurry. That is what makes handmade irreplaceable."
                </p>
                <div className="text-[10px] font-bold text-[#8C6F5A] uppercase tracking-wider pt-1">
                  — Master Knitter, Jaipur
                </div>
              </div>
            </div>

            {/* Right: Brand Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-xs uppercase tracking-widest font-bold text-[#8C6F5A] bg-[#E7DED2] px-3 py-1 rounded-full">
                MADE BY HAND
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#332C28] leading-tight">
                Every loop tells a story.
              </h2>

              <p className="text-sm sm:text-base text-[#332C28]/80 leading-relaxed font-light">
                Our pieces are carefully crocheted by hand, one stitch at a time. In a world of fleeting fast-fashion, we believe handmade products should feel personal, timeless, and special.
              </p>

              <p className="text-sm text-[#332C28]/75 leading-relaxed">
                By supporting our collective, you provide sustainable, dignified work for women artisans across Rajasthan, preserving heritage textile crafts for future generations.
              </p>

              <div className="pt-2">
                <button
                  id="story-our-story-btn"
                  onClick={() => navigateTo('about')}
                  className="py-3 px-8 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
                >
                  <span>OUR STORY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (4 Feature Cards) */}
      <section className="py-16 lg:py-20 bg-white border-y border-[#E7DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
              Our Promise
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#332C28] mt-1">
              Why Choose Maison Crochet
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
                <Scissors className="w-6 h-6 text-[#8C6F5A]" />
              </div>
              <h3 className="font-serif-heading text-base font-bold text-[#332C28]">Handmade</h3>
              <p className="text-xs text-[#332C28]/75 leading-relaxed">
                Made carefully by hand, stitch by stitch with zero automated machinery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
                <Sparkles className="w-6 h-6 text-[#D9A7A0]" />
              </div>
              <h3 className="font-serif-heading text-base font-bold text-[#332C28]">Unique</h3>
              <p className="text-xs text-[#332C28]/75 leading-relaxed">
                Every piece has its own distinct character, organic tension, and artisanal charm.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
                <Feather className="w-6 h-6 text-[#AAB5A0]" />
              </div>
              <h3 className="font-serif-heading text-base font-bold text-[#332C28]">Quality Materials</h3>
              <p className="text-xs text-[#332C28]/75 leading-relaxed">
                Soft, skin-safe, and carefully selected organic combed cotton and bamboo fibers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F4EE] border border-[#E7DED2] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
                <Heart className="w-6 h-6 text-[#D9A7A0] fill-[#D9A7A0]" />
              </div>
              <h3 className="font-serif-heading text-base font-bold text-[#332C28]">Made With Love</h3>
              <p className="text-xs text-[#332C28]/75 leading-relaxed">
                Designed and created with immense patience, care, and attention to detail.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CUSTOM ORDER BANNER */}
      <section className="py-16 bg-[#E7DED2]/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#332C28] rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-2xl">
            {/* Background texture graphics */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D9A7A0]/10 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#AAB5A0]/10 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#D9A7A0] uppercase">
                <Scissors className="w-3.5 h-3.5" />
                <span>BESPOKE ARTISAN WORKSHOP</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F4EE]">
                Have Something Special in Mind?
              </h2>

              <p className="text-sm sm:text-base text-[#F8F4EE]/80 leading-relaxed font-light">
                Create a crochet piece made specifically for you. Choose your silhouette, custom yarn colors, specific measurements, and details.
              </p>

              <div className="pt-4">
                <button
                  id="banner-request-custom-order-btn"
                  onClick={() => navigateTo('custom-orders')}
                  className="py-3.5 px-8 rounded-full bg-[#D9A7A0] hover:bg-[#c9958e] text-[#332C28] text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl"
                >
                  REQUEST CUSTOM ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="py-16 lg:py-20 bg-[#F8F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#AAB5A0]">
                Fresh Off The Hook
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] mt-1">
                New Arrivals
              </h2>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6F5A] hover:text-[#332C28] transition-colors"
            >
              <span>Explore All New Styles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 8. INSTAGRAM / SOCIAL SECTION */}
      <section className="py-16 lg:py-20 bg-white border-y border-[#E7DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-1.5 text-[#D9A7A0] mb-2">
              <Instagram className="w-5 h-5 text-[#8C6F5A]" />
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#332C28]">
              Follow Our Handmade Journey
            </h2>
            <p className="text-xs font-semibold text-[#8C6F5A] tracking-wider mt-1">
              @maisoncrochet.in • Click any image to view in studio gallery
            </p>
          </div>

          {/* 6 Square Grid Gallery with Lightbox trigger */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {INSTAGRAM_GALLERY.map((post) => (
              <div
                key={post.id}
                id={`ig-gallery-${post.id}`}
                onClick={() => openLightbox(post.image, post.caption, post.tag)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#F8F4EE] border border-[#E7DED2] cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white text-center">
                  <Instagram className="w-5 h-5 mb-1 text-[#D9A7A0]" />
                  <span className="text-[10px] font-bold">♥ {post.likes}</span>
                  <span className="text-[9px] text-white/80 line-clamp-1 mt-1">
                    {post.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CUSTOMER REVIEWS */}
      <section className="py-16 lg:py-24 bg-[#F8F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
              Warm Words
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#332C28] mt-1">
              Customer Reviews
            </h2>
            <p className="text-xs text-[#332C28]/70 mt-1">
              Read real stories from our cherished crochet collectors across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-2xl border border-[#E7DED2] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D9A7A0] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D9A7A0]" />
                    ))}
                  </div>

                  <p className="font-serif italic text-sm text-[#332C28]/90 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7DED2]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#E7DED2]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#332C28]">{t.author}</div>
                      <div className="text-[10px] text-[#332C28]/60">{t.location}</div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-[#5B734E] bg-[#5B734E]/10 px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ PREVIEW */}
      <section className="py-16 bg-white border-y border-[#E7DED2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C6F5A]">
              Helpful Guidance
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#332C28] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.slice(0, 5).map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-[#E7DED2] overflow-hidden transition-all bg-[#F8F4EE]"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-[#332C28] hover:text-[#8C6F5A] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8C6F5A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#332C28]/80 leading-relaxed border-t border-[#E7DED2]/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              id="home-view-all-faqs-btn"
              onClick={() => navigateTo('faq')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6F5A] hover:underline"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 11. NEWSLETTER SECTION */}
      <section className="py-20 bg-[#F8F4EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#E7DED2]/50 p-8 sm:p-12 rounded-3xl border border-[#E7DED2] space-y-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C6F5A] mx-auto shadow-xs">
              <Mail className="w-5 h-5 text-[#8C6F5A]" />
            </div>

            <h2 className="font-serif-heading text-3xl font-bold text-[#332C28]">
              Stay in the Loop
            </h2>

            <p className="text-xs sm:text-sm text-[#332C28]/75 max-w-md mx-auto leading-relaxed">
              Get first access to new handmade drops, special offers, and behind-the-scenes artisan stories.
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-[#5B734E]/15 border border-[#5B734E]/30 rounded-2xl text-[#5B734E] text-xs font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing to Maison Crochet!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#E7DED2] rounded-full px-4 py-3 text-xs text-[#332C28] placeholder:text-[#332C28]/50 focus:outline-none focus:border-[#8C6F5A]"
                />
                <button
                  type="submit"
                  className="py-3 px-6 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold tracking-wider uppercase transition-colors shadow-xs"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}

            <div className="text-[10px] text-[#332C28]/50 pt-1">
              No spam, ever. Only gentle, slow-crafted updates.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
