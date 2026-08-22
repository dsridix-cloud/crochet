import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  Sparkles, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Scissors, 
  Sun,
  Award
} from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { navigateTo } = useShop();

  const artisans = [
    {
      name: 'Shanti Devi',
      role: 'Master Granny Square Artisan',
      experience: '22 Years of Craft',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      bio: 'Known as the "Queen of Motifs", Shanti ji has trained over 40 women in her village in symmetrical tension and traditional Rajasthani floral blocking.',
      specialty: 'Vintage Bags & Textured Cardigans'
    },
    {
      name: 'Anita Bai',
      role: 'Fine Lace & Floral Specialist',
      experience: '14 Years of Craft',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      bio: 'Anita creates the intricate daisy bouquets, sunflower coasters, and fine lace table runners with meticulous botanical accuracy.',
      specialty: 'Everlasting Flowers & Lace Runners'
    },
    {
      name: 'Sunita Sharma',
      role: 'Amigurumi Sculptor',
      experience: '9 Years of Craft',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      bio: 'Sunita breathes life into our amigurumi plushies, testing each one for baby-safe seams, velvety softness, and whimsical charm.',
      specialty: 'Amigurumi Plushies & Nursery Toys'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The First Crochet Hook',
      desc: 'Started as a small living room experiment in Jaipur with 2 artisans and a bundle of unbleached organic cotton yarn.'
    },
    {
      year: '2022',
      title: 'Empowering 50+ Women',
      desc: 'Formed an organized artisan cooperative providing flexible home-based living wages and healthcare coverage.'
    },
    {
      year: '2024',
      title: 'Zero-Waste & Plastic Free',
      desc: 'Eliminated 100% of synthetic packaging, moving entirely to recycled seed paper boxes and botanical plant dyes.'
    },
    {
      year: 'Today',
      title: 'Global Slow Craft Boutique',
      desc: 'Delivering thousands of heirloom crochet pieces across India and worldwide with pride in every single stitch.'
    }
  ];

  return (
    <div id="our-story-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Narrative */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Our Journey & Heritage
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#332C28] leading-tight">
          Where Every Loop Tells a Human Story
        </h1>
        <p className="text-sm sm:text-base text-[#332C28]/80 leading-relaxed pt-2">
          In an era of disposable fast fashion and automated textile mills, Maison Crochet was founded with a quiet, deliberate rebellion: to celebrate the timeless artistry of the single crochet hook and the skilled hands that hold it.
        </p>
      </div>

      {/* Main Feature Image with Story Overlay */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E7DED2]">
        <img
          src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=85"
          alt="Artisan hands crocheting with pure cotton yarn"
          className="w-full h-80 sm:h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#332C28]/90 via-[#332C28]/40 to-transparent flex items-end p-6 sm:p-12">
          <div className="max-w-2xl text-white space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E7DED2]">
              Handmade in Jaipur, Rajasthan
            </span>
            <h2 className="font-serif-heading text-xl sm:text-3xl font-bold">
              Slow Fashion. Honest Living Wages. Pure Natural Fibers.
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Every single piece takes anywhere from 4 to 28 hours of continuous hand-crocheting. There are no machines, no cutting corners, and no mass production.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-[#E7DED2] p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Scissors className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
            100% Machine-Free
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
            Unlike knitting, true crochet cannot be replicated by any industrial machine. When you own a crochet piece, you own a pure human creation.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7DED2] p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
            Pure Organic Cotton & Bamboo
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
            We exclusively source skin-friendly long-staple Indian combed cotton, butter-soft bamboo yarn, and hypoallergenic milk fiber. Zero synthetic polyester itch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7DED2] p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">
            Women Economic Empowerment
          </h3>
          <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
            Our collective provides flexible working hours so rural women can earn independent financial security while maintaining balance with family life.
          </p>
        </div>
      </div>

      {/* Meet the Master Artisans */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
            The Hands Behind the Loops
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28]">
            Meet Our Master Artisans
          </h2>
          <p className="text-xs sm:text-sm text-[#332C28]/70 max-w-xl mx-auto">
            These talented women bring warmth, heritage stitch traditions, and artistic precision into every bag, top, toy, and floral arrangement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#E7DED2] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-64 object-cover object-top"
              />
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#332C28]">{artisan.name}</h3>
                  <div className="text-xs font-semibold text-[#8C6F5A]">{artisan.role}</div>
                  <div className="text-[11px] text-[#332C28]/60 mt-0.5">{artisan.experience}</div>
                </div>
                <p className="text-xs text-[#332C28]/75 leading-relaxed">
                  {artisan.bio}
                </p>
                <div className="pt-2 border-t border-[#E7DED2]/60 text-[11px] text-[#332C28]/80 font-medium">
                  Specialty: <strong className="text-[#332C28]">{artisan.specialty}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Timeline */}
      <div className="bg-[#E7DED2]/25 rounded-3xl p-8 sm:p-12 border border-[#E7DED2] space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
            Milestones
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28]">
            How We Grew, Stitch by Stitch
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E7DED2] shadow-xs space-y-2 relative">
              <span className="text-2xl font-serif-heading font-black text-[#8C6F5A]">
                {item.year}
              </span>
              <h3 className="text-sm font-bold text-[#332C28]">{item.title}</h3>
              <p className="text-xs text-[#332C28]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 py-6">
        <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#332C28]">
          Experience the Warmth of True Craftsmanship
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-xl bg-[#8C6F5A] text-white text-sm font-bold shadow-md hover:bg-[#735A48] transition-colors inline-flex items-center gap-2"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('custom-orders')}
            className="px-8 py-3.5 rounded-xl bg-white border border-[#E7DED2] text-[#332C28] text-sm font-bold hover:bg-[#F8F4EE] transition-colors"
          >
            Request Custom Piece
          </button>
        </div>
      </div>

    </div>
  );
};
