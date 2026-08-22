import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Scissors, 
  Sparkles, 
  UploadCloud, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Image as ImageIcon,
  DollarSign,
  Palette,
  Ruler,
  HelpCircle,
  FileText
} from 'lucide-react';

export const CustomOrderPage: React.FC = () => {
  const { showToast, navigateTo } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: 'Crochet Bag',
    preferredColor: 'Cream & Sage Mix',
    size: 'Standard / Medium',
    quantity: 1,
    budget: '₹1,500 - ₹2,500',
    desiredDate: '',
    notes: ''
  });

  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const productTypes = [
    'Crochet Bag / Tote',
    'Custom Top / Halter / Vest',
    'Amigurumi Toy / Heirloom Plush',
    'Coaster / Placemat Set',
    'Crochet Pillow Cover',
    'Everlasting Flower Bouquet',
    'Other Bespoke Creation'
  ];

  const colorPalettes = [
    'Pastel Garden (Pink, Cream, Butter)',
    'Earthy Sage & Mocha',
    'Monochrome Ivory & Beige',
    'Terracotta & Warm Ecru',
    'Vibrant Bohemian (Custom Mix)'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageName(file.name);
      setImagePreviewUrl(URL.createObjectURL(file));
      showToast('Reference Image Attached', file.name, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill required fields', 'Name, email, and phone are needed', 'info');
      return;
    }

    const genTicket = `CR-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(genTicket);
    setIsSubmitted(true);
    showToast('Custom Request Received!', `Your ticket is ${genTicket}`, 'success');
  };

  // Estimated days based on product
  const estimatedTimeline = formData.productType.includes('Top')
    ? '7–10 Business Days'
    : formData.productType.includes('Bag')
    ? '5–7 Business Days'
    : '4–6 Business Days';

  return (
    <div id="custom-order-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#332C28] text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-semibold text-[#D9A7A0] uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5" />
            <span>BESPOKE ARTISAN WORKSHOP</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F4EE]">
            Custom Crochet Studio
          </h1>

          <p className="text-sm sm:text-base text-[#F8F4EE]/85 max-w-xl mx-auto leading-relaxed font-light">
            Have an idea? Let's make it together. Our Jaipur master knitters transform your sketches, Pinterest moodboards, and dream color palettes into handcrafted reality.
          </p>
        </div>
      </div>

      {/* Main Content Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7DED2] shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#5B734E]/10 text-[#5B734E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#8C6F5A] uppercase tracking-widest">
                Request Confirmation
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-[#332C28]">
                We've Received Your Custom Request!
              </h2>
              <div className="inline-block bg-[#F8F4EE] px-4 py-1.5 rounded-full border border-[#E7DED2] font-mono text-sm font-bold text-[#332C28]">
                Ticket #{ticketNumber}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#332C28]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our head artisan Aarohi will review your specifications for <strong>{formData.productType}</strong> and contact you via WhatsApp / Email within 24 hours with yarn swatch photos and exact stitch pricing.
            </p>

            {/* Next Steps Checklist */}
            <div className="max-w-md mx-auto bg-[#F8F4EE] p-5 rounded-2xl border border-[#E7DED2] text-left space-y-2 text-xs text-[#332C28]/80">
              <div className="font-bold text-[#332C28] pb-1 border-b border-[#E7DED2]">Artisan Workflow Next Steps:</div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#8C6F5A] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Yarn sample & color swatch confirmation via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#8C6F5A] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <span>50% deposit approval to secure natural organic yarn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#8C6F5A] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Work-in-progress photos & video updates from Jaipur</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    productType: 'Crochet Bag',
                    preferredColor: 'Cream & Sage Mix',
                    size: 'Standard / Medium',
                    quantity: 1,
                    budget: '₹1,500 - ₹2,500',
                    desiredDate: '',
                    notes: ''
                  });
                }}
                className="py-3 px-6 rounded-full border border-[#332C28] text-[#332C28] text-xs font-bold uppercase tracking-wider hover:bg-[#332C28] hover:text-white transition-colors"
              >
                Submit Another Request
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="py-3 px-6 rounded-full bg-[#332C28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8C6F5A] transition-colors"
              >
                Browse Ready Stock Shop
              </button>
            </div>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DED2] shadow-xl space-y-8"
          >
            
            {/* Step 1: Contact info */}
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2 pb-3 border-b border-[#E7DED2]">
                <span className="w-6 h-6 rounded-full bg-[#332C28] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Your Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Custom Specifications */}
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2 pb-3 border-b border-[#E7DED2]">
                <span className="w-6 h-6 rounded-full bg-[#332C28] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Product Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    What would you like to create?
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A] cursor-pointer"
                  >
                    {productTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Preferred Yarn Color Palette
                  </label>
                  <select
                    value={formData.preferredColor}
                    onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A] cursor-pointer"
                  >
                    {colorPalettes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Dimensions / Sizing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bust: 34 inch, Strap drop 25cm"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Estimated Budget Range (₹ INR)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A] cursor-pointer"
                  >
                    <option value="₹500 - ₹1,000">₹500 - ₹1,000 (Small Accents, Coasters, Scrunchies)</option>
                    <option value="₹1,000 - ₹2,000">₹1,000 - ₹2,000 (Totes, Tops, Amigurumi)</option>
                    <option value="₹2,000 - ₹3,500">₹2,000 - ₹3,500 (Detailed Cardigans, Large Bags)</option>
                    <option value="₹3,500+">₹3,500+ (Heirloom Blankets, Complex Sets)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Desired Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.desiredDate}
                    onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Estimated Crafting Timeline
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#E7DED2]/40 rounded-xl text-xs font-semibold text-[#8C6F5A] border border-[#E7DED2]">
                    <Clock className="w-4 h-4 text-[#8C6F5A]" />
                    <span>Approx. {estimatedTimeline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Reference Image Upload UI (Visual only) */}
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#332C28] flex items-center gap-2 pb-3 border-b border-[#E7DED2]">
                <span className="w-6 h-6 rounded-full bg-[#332C28] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Inspiration & Reference Images</span>
              </h3>

              <div className="pt-4 space-y-3">
                <label className="block border-2 border-dashed border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#F8F4EE]/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {imagePreviewUrl ? (
                    <div className="flex items-center justify-center gap-4">
                      <img src={imagePreviewUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-[#E7DED2]" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-[#332C28]">{uploadedImageName}</div>
                        <div className="text-[11px] text-[#5B734E]">Click to change image</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <UploadCloud className="w-8 h-8 text-[#8C6F5A] mx-auto opacity-70" />
                      <div className="text-xs font-bold text-[#332C28]">
                        Drag and drop reference photos, or <span className="text-[#8C6F5A] underline">Browse</span>
                      </div>
                      <div className="text-[11px] text-[#332C28]/60">
                        PNG, JPG, or Pinterest screenshots up to 10MB
                      </div>
                    </div>
                  )}
                </label>

                <div>
                  <label className="block text-xs font-bold text-[#332C28] mb-1">
                    Special Notes / Specific Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your idea, stitch preferences, strap lengths, or occasion date..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl p-3.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E7DED2]">
              <button
                id="custom-order-submit-btn"
                type="submit"
                className="w-full py-4 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>SUBMIT CUSTOM ORDER REQUEST</span>
                <ArrowRight className="w-4 h-4 text-[#D9A7A0]" />
              </button>
              <p className="text-center text-[11px] text-[#332C28]/60 mt-2">
                No payment required now. We will discuss yarn shades and share mockups before beginning work.
              </p>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
