import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  Scissors, 
  Heart, 
  Leaf, 
  CheckCircle2, 
  ArrowRight, 
  Feather,
  Palette,
  PackageCheck,
  ShieldCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  const processSteps = [
    {
      step: '01',
      title: 'Design & Silhouette',
      description: 'Drawing inspiration from vintage botanical motifs and modern relaxed silhouettes to create timeless wardrobe pieces.',
      icon: Palette
    },
    {
      step: '02',
      title: 'Choose Materials',
      description: 'Selecting certified organic combed cotton, bamboo yarn, and natural plant-based dyes that are soft on sensitive skin.',
      icon: Leaf
    },
    {
      step: '03',
      title: 'Crochet by Hand',
      description: 'Master knitters in our Jaipur studio hand-stitch loop by loop using ergonomic wooden hooks. No machines are ever used.',
      icon: Scissors
    },
    {
      step: '04',
      title: 'Hand Finish & Block',
      description: 'Carefully weaving in all loose ends and steam-blocking the natural fibers to lock in shape and structural drape.',
      icon: Feather
    },
    {
      step: '05',
      title: 'Quality Check',
      description: 'Inspecting each seam tension, handle reinforcement, button placket, and dimensional accuracy under studio lights.',
      icon: ShieldCheck
    },
    {
      step: '06',
      title: 'Eco-Botanical Pack',
      description: 'Wrapping in 100% plastic-free recycled kraft paper with dried botanical sprigs and a handwritten artisan card.',
      icon: PackageCheck
    }
  ];

  return (
    <div id="about-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#E7DED2]/50 border-b border-[#E7DED2] py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6F5A]">
            The Artisanal Journey
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#332C28] mt-2 mb-4">
            Slowly made. <br />
            <span className="italic font-editorial font-normal text-[#8C6F5A]">Thoughtfully designed.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#332C28]/80 max-w-xl mx-auto leading-relaxed">
            We are a slow-fashion atelier reviving the quiet poetry of crochet, honoring the patient hands behind every loop.
          </p>
        </div>
      </div>

      {/* 1. Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
              Where It Began
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] leading-tight">
              A rebellion against fast fashion, one stitch at a time.
            </h2>
            <p className="text-sm text-[#332C28]/80 leading-relaxed font-light">
              Maison Crochet was born out of a deep reverence for generational textile arts. In an era dominated by hyper-speed synthetic garments, we set out to create a sanctuary for mindful, tactile craft.
            </p>
            <p className="text-sm text-[#332C28]/80 leading-relaxed font-light">
              Starting from a sunny balcony studio in Jaipur with a single ball of unbleached cotton yarn and a wooden hook, our vision has grown into a collaborative collective of over 35 women artisans.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="font-serif-heading text-3xl font-bold text-[#332C28]">35+</div>
                <div className="text-xs text-[#8C6F5A] font-semibold">Women Artisans Empowered</div>
              </div>
              <div className="w-px h-10 bg-[#E7DED2]"></div>
              <div>
                <div className="font-serif-heading text-3xl font-bold text-[#332C28]">100%</div>
                <div className="text-xs text-[#8C6F5A] font-semibold">Plastic-Free Packaging</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
                alt="Artisan hands crocheting in workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. The Maker Spotlight */}
      <div className="bg-white py-16 lg:py-24 border-y border-[#E7DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-[#F8F4EE]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                  alt="Founder and Master Artisan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
                The Maker
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
                Meet Aarohi Sharma, Founder & Creative Director
              </h2>
              <p className="font-serif italic text-base text-[#8C6F5A] leading-relaxed">
                "Crochet is a meditation. You cannot rush it; the tension of the thread responds directly to your breath."
              </p>
              <p className="text-sm text-[#332C28]/80 leading-relaxed font-light">
                Trained in textile design and raised in Rajasthan surrounded by block-printers and weavers, Aarohi wanted to translate traditional lace work into clean, architectural fashion pieces for the modern home and closet.
              </p>
              <p className="text-sm text-[#332C28]/80 leading-relaxed font-light">
                Today, she oversees every sample design, teaching intricate stitch geometry to young women in rural clusters and ensuring fair living wages.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Our 6-Step Artisanal Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
            Slow Craftsmanship
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28] mt-1">
            Our 6-Step Artisanal Process
          </h2>
          <p className="text-xs sm:text-sm text-[#332C28]/70 mt-2">
            Every creation takes between 6 to 18 hours of dedicated handwork before finding its way to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white p-7 rounded-2xl border border-[#E7DED2] shadow-xs space-y-4 hover:shadow-md transition-shadow relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif-heading text-2xl font-bold text-[#D9A7A0]">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
                  {step.title}
                </h3>

                <p className="text-xs text-[#332C28]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigateTo('shop')}
            className="py-3.5 px-8 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Handcrafted Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
