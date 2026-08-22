import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Instagram, 
  Facebook, 
  Pin as Pinterest, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'We need a valid email to send updates', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed!', 'Thank you for joining our handmade newsletter.', 'success');
  };

  return (
    <footer id="main-footer" className="bg-[#E7DED2]/60 border-t border-[#E7DED2] text-[#332C28] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#332C28]/10 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mb-3 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#332C28]">100% Hand Crocheted</h4>
            <p className="text-xs text-[#332C28]/70 mt-1 max-w-[180px]">No machines used. Mindfully crafted stitch by stitch.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mb-3 shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#332C28]">Free Shipping Over ₹999</h4>
            <p className="text-xs text-[#332C28]/70 mt-1 max-w-[180px]">Express, eco-friendly plastic-free delivery across India.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mb-3 shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#332C28]">Artisan Empowerment</h4>
            <p className="text-xs text-[#332C28]/70 mt-1 max-w-[180px]">Fair wages and flexible livelihood for women knitters.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] mb-3 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#332C28]">Natural Pure Yarns</h4>
            <p className="text-xs text-[#332C28]/70 mt-1 max-w-[180px]">Organic cotton, breathable bamboo & soft milk fibers.</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              id="footer-brand-btn"
              onClick={() => navigateTo('home')} 
              className="text-left group focus:outline-none"
            >
              <span className="font-serif-heading text-2xl font-bold tracking-widest text-[#332C28] group-hover:text-[#8C6F5A] transition-colors">
                MAISON CROCHET
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8C6F5A] font-semibold -mt-0.5">
                Artisanal Studio • Jaipur
              </span>
            </button>

            <p className="text-sm text-[#332C28]/80 leading-relaxed max-w-sm">
              We are a modern slow-fashion boutique celebrating the enduring beauty of traditional crochet. Every loop tells a story of patience, passion, and personal craftsmanship.
            </p>

            <div className="space-y-1.5 text-xs text-[#332C28]/75 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8C6F5A]" />
                <span>Artisan Studio, C-Scheme, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C6F5A]" />
                <span>hello@maisoncrochet.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C6F5A]" />
                <span>+91 98765 43210 (Mon–Sat, 10am–6pm IST)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#F8F4EE] border border-[#332C28]/15 flex items-center justify-center text-[#332C28] hover:text-[#8C6F5A] hover:border-[#8C6F5A] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#F8F4EE] border border-[#332C28]/15 flex items-center justify-center text-[#332C28] hover:text-[#8C6F5A] hover:border-[#8C6F5A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-[#F8F4EE] border border-[#332C28]/15 flex items-center justify-center text-[#332C28] hover:text-[#8C6F5A] hover:border-[#8C6F5A] transition-colors"
              >
                <Pinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Shop Collections</h4>
            <ul className="space-y-2 text-sm text-[#332C28]/80">
              <li>
                <button 
                  id="footer-link-all" 
                  onClick={() => navigateTo('shop')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-tops" 
                  onClick={() => navigateTo('collection', { categorySlug: 'tops' })} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Crochet Tops
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-bags" 
                  onClick={() => navigateTo('collection', { categorySlug: 'bags' })} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Crochet Bags
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-toys" 
                  onClick={() => navigateTo('collection', { categorySlug: 'toys' })} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Crochet Toys
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-home" 
                  onClick={() => navigateTo('collection', { categorySlug: 'home-decor' })} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Home & Decor
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-gifts" 
                  onClick={() => navigateTo('collection', { categorySlug: 'gifts' })} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Handmade Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Customer Care</h4>
            <ul className="space-y-2 text-sm text-[#332C28]/80">
              <li>
                <button 
                  id="footer-link-account" 
                  onClick={() => navigateTo('account')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  My Customer Account
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-track" 
                  onClick={() => navigateTo('account')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-wishlist" 
                  onClick={() => navigateTo('wishlist')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Your Saved Wishlist
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-faq" 
                  onClick={() => navigateTo('faq')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-contact" 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Contact Studio
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-custom" 
                  onClick={() => navigateTo('custom-orders')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Custom Order Request
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-care" 
                  onClick={() => navigateTo('care-guide')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Yarn Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Information Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6F5A]">Information & Policies</h4>
            <ul className="space-y-2 text-sm text-[#332C28]/80">
              <li>
                <button 
                  id="footer-link-about" 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-our-story" 
                  onClick={() => navigateTo('our-story')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Our Story & Artisans
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-shipping" 
                  onClick={() => navigateTo('shipping-info')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-returns" 
                  onClick={() => navigateTo('returns-refunds')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-privacy" 
                  onClick={() => navigateTo('privacy-policy')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-terms" 
                  onClick={() => navigateTo('terms-conditions')} 
                  className="hover:text-[#8C6F5A] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Demo Note */}
        <div className="pt-8 mt-8 border-t border-[#8C6F5A]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#332C28]/70 uppercase tracking-[0.5px]">
          <div>
            © {new Date().getFullYear()} MAISON CROCHET HANDMADE BOUTIQUE
          </div>
          <div className="flex items-center gap-6 font-medium text-[#8C6F5A]">
            <span className="hover:text-[#332C28] cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-[#332C28] cursor-pointer transition-colors">PINTEREST</span>
            <span className="hover:text-[#332C28] cursor-pointer transition-colors">JOURNAL</span>
          </div>
          <div className="text-[10px] tracking-widest text-[#8C6F5A] font-semibold">
            SLOW CRAFTED IN JAIPUR, INDIA
          </div>
        </div>

      </div>
    </footer>
  );
};
