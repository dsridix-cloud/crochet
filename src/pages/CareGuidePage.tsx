import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  Droplets, 
  Wind, 
  Sun, 
  Scissors, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  HelpCircle,
  Flower2,
  AlertTriangle
} from 'lucide-react';

export const CareGuidePage: React.FC = () => {
  const { navigateTo, showToast } = useShop();

  const handleDownloadCard = () => {
    showToast('Care Guide Downloaded', 'Printable Crochet Care Guide PDF saved', 'success');
  };

  const steps = [
    {
      icon: Droplets,
      step: '01',
      title: 'Gentle Cool Hand Wash',
      desc: 'Fill a clean basin with cool or lukewarm water (under 30°C). Add a mild pH-neutral liquid detergent or wool wash. Gently submerge your crochet piece and swirl for 2–3 minutes. Never scrub vigorously or use bleach.'
    },
    {
      icon: Wind,
      step: '02',
      title: 'The Towel Roll Method (No Wringing)',
      desc: 'Never twist or wring wet crochet yarn, as this stretches the tension of the loops. Instead, lay your item flat on a dry bath towel, gently roll the towel up like a sushi roll, and press down with your palms to absorb excess water.'
    },
    {
      icon: Sun,
      step: '03',
      title: 'Reshape & Flat Dry in Shade',
      desc: 'Unroll and place the piece flat on a clean dry towel or drying mesh in a shaded, well-ventilated area. Gently reshape sleeves, scalloped borders, and granny squares with your fingers. Never hang on a clothes hanger.'
    },
    {
      icon: Sparkles,
      step: '04',
      title: 'Steam Blocking for Crisp Edges',
      desc: 'To restore drape and crisp motifs, hover a garment steamer 2 inches away from the fabric while gently pinning edges. Never press a hot iron directly onto the raised textured stitches.'
    }
  ];

  const categories = [
    {
      title: 'Crochet Tops & Cardigans',
      tips: [
        'Always store folded inside your breathable cotton dust bag, never on wire or plastic hangers.',
        'If a loose loop snags on jewelry, never cut it! Use a small bobby pin or crochet hook to pull the loop back through to the inside of the garment.',
        'Steam lightly after unpacking to relax natural fiber folds.'
      ]
    },
    {
      title: 'Crochet Bags & Totes',
      tips: [
        'Spot clean local dirt smudges with a damp cloth and a drop of mild soap.',
        'When storing, stuff the bag gently with tissue paper or cotton cloth to maintain its structured silhouette.',
        'Do not machine spin to protect wooden base rings and braided shoulder straps.'
      ]
    },
    {
      title: 'Amigurumi Plush Toys',
      tips: [
        'Surface clean using a damp microfiber cloth with baby-safe soap lather.',
        'Do not submerge completely in water to prevent the inner polyfill core from clumping.',
        'Allow to air-dry completely in a sunny, breezy spot before gifting back to little hands.'
      ]
    },
    {
      title: 'Floral Bouquets & Home Decor',
      tips: [
        'Dust everlasting bouquets gently once a month using a soft makeup brush or a hairdryer on cool low setting.',
        'Keep out of prolonged direct scorching sunlight to maintain vibrant natural yarn dyes.',
        'Table runners can be pressed on reverse side with a cotton press cloth.'
      ]
    }
  ];

  return (
    <div id="care-guide-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6F5A]">
          Preserving Heirloom Quality
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#332C28]">
          The Complete Handmade Crochet Care Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70 leading-relaxed">
          With mindful love and proper care, your natural cotton and bamboo crochet pieces will soften beautifully and last for generations.
        </p>

        <div className="pt-2">
          <button
            onClick={handleDownloadCard}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E7DED2] text-xs font-bold text-[#332C28] hover:bg-[#F8F4EE] shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-[#8C6F5A]" />
            <span>Download Printable Care Card</span>
          </button>
        </div>
      </div>

      {/* 4 Golden Steps */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#332C28]">
            The 4-Step Golden Washing Ritual
          </h2>
          <p className="text-xs text-[#332C28]/60 mt-1">
            Follow this simple process for all wearable tops, cardigans, and home textiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-[#E7DED2] p-6 shadow-xs space-y-3 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E7DED2]/50 text-[#8C6F5A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-[#8C6F5A] font-serif-heading">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif-heading text-base font-bold text-[#332C28]">{item.title}</h3>
                  <p className="text-xs text-[#332C28]/70 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category-Specific Care Cards */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#332C28]">
            Care by Product Type
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#E7DED2] p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] pb-2 border-b border-[#E7DED2] flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#8C6F5A]" />
                <span>{cat.title}</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#332C28]/80 leading-relaxed">
                {cat.tips.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6F5A] flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What NOT to do Alert Card */}
      <div className="bg-[#E7DED2]/30 rounded-3xl border border-[#E7DED2] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-[#8C6F5A]">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-serif-heading text-base font-bold text-[#332C28]">
            Things to Avoid
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#332C28]/80">
          <div className="p-3.5 bg-white rounded-xl border border-[#E7DED2]">
            <strong className="text-red-700 block mb-1">✕ Never Machine Dry</strong>
            High tumbler heat will shrink natural cotton and damage loop structure.
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-[#E7DED2]">
            <strong className="text-red-700 block mb-1">✕ Never Hang When Wet</strong>
            The weight of wet water will stretch and deform shoulder seams permanently.
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-[#E7DED2]">
            <strong className="text-red-700 block mb-1">✕ Never Cut Loose Threads</strong>
            Pull them to the inside with a hook or pin to prevent unravelling.
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="text-center pt-4 space-y-3">
        <h3 className="font-serif-heading text-xl font-bold text-[#332C28]">
          Ready to Adorn Your Wardrobe with Heirloom Pieces?
        </h3>
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-xl bg-[#8C6F5A] text-white text-sm font-bold shadow-md hover:bg-[#735A48] transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Handcrafted Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
