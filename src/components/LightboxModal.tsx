import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Instagram, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightboxItem, closeLightbox, navigateTo } = useShop();

  if (!lightboxItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeLightbox}
      />

      {/* Lightbox Content */}
      <div className="relative max-w-4xl w-full bg-[#F8F4EE] rounded-2xl shadow-2xl border border-[#E7DED2] overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
          aria-label="Close lightbox"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Large Image */}
        <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={lightboxItem.image}
            alt="Handmade crochet spotlight"
            className="w-full h-full max-h-[70vh] md:max-h-[85vh] object-cover"
          />
        </div>

        {/* Story & Context Sidebar */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F4EE]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6F5A]">
              <Instagram className="w-4 h-4 text-[#D9A7A0]" />
              <span>@maisoncrochet.in</span>
            </div>

            <div className="font-serif-heading text-xl font-bold text-[#332C28]">
              Behind the Handmade Stitch
            </div>

            <p className="text-xs sm:text-sm text-[#332C28]/80 leading-relaxed">
              {lightboxItem.caption || 'Every piece is slowly crafted with pure organic cotton yarn by our master knitters in Jaipur.'}
            </p>

            {lightboxItem.tag && (
              <span className="inline-block bg-[#E7DED2] text-[#8C6F5A] text-xs font-medium px-2.5 py-1 rounded-full">
                {lightboxItem.tag}
              </span>
            )}
          </div>

          <div className="pt-6 border-t border-[#E7DED2] space-y-3">
            <button
              onClick={() => {
                closeLightbox();
                navigateTo('shop');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9A7A0]" />
              <span>Shop the Collection</span>
            </button>

            <button
              onClick={() => {
                closeLightbox();
                navigateTo('custom-orders');
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[#8C6F5A] text-[#8C6F5A] hover:bg-[#E7DED2]/50 text-xs font-semibold transition-colors text-center"
            >
              Order Similar Custom Piece
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
