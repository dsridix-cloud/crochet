import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill all fields', 'All fields are required to send a message', 'info');
      return;
    }

    setIsSent(true);
    showToast('Message Sent!', 'Our Jaipur artisan team will get back to you within 24 hours.', 'success');
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#F8F4EE] pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#E7DED2]/50 border-b border-[#E7DED2] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8C6F5A]">
            Direct Atelier Support
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#332C28] mt-1 mb-3">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#332C28]/75 max-w-md mx-auto">
            We’d love to hear from you. Whether you have a question about custom sizing, yarn care, or wholesale collaborations, our studio is here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-7 rounded-3xl border border-[#E7DED2] shadow-sm space-y-6">
              <h3 className="font-serif-heading text-xl font-bold text-[#332C28]">
                Studio & Workshop Details
              </h3>

              <div className="space-y-4 text-xs text-[#332C28]/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#332C28]">Jaipur Atelier</div>
                    <div>Plot 14, Crafts Lane, C-Scheme</div>
                    <div>Jaipur, Rajasthan 302001, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#332C28]">Email Us</div>
                    <div>hello@maisoncrochet.in</div>
                    <div>orders@maisoncrochet.in</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#332C28]">WhatsApp & Call</div>
                    <div>+91 98290 12345 / +91 141 238 9012</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F4EE] flex items-center justify-center text-[#8C6F5A] flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#332C28]">Workshop Hours</div>
                    <div>Monday – Saturday: 10:00 AM – 7:00 PM IST</div>
                    <div>Sunday: Closed for Yarn Spinning</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Follow Pill */}
            <div className="bg-[#332C28] text-white p-6 rounded-3xl shadow-md flex items-center justify-between">
              <div>
                <div className="text-xs uppercase font-bold text-[#D9A7A0]">Follow Behind the Scenes</div>
                <div className="font-serif-heading text-lg font-bold">@maisoncrochet.in</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D9A7A0]">
                <Instagram className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E7DED2] shadow-sm">
              
              {isSent ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#5B734E]/10 text-[#5B734E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#332C28]">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#332C28]/80 max-w-sm mx-auto leading-relaxed">
                    We have received your message regarding <strong>"{form.subject}"</strong>. An artisan coordinator will reply within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="py-2.5 px-6 rounded-full border border-[#332C28] text-xs font-bold uppercase tracking-wider text-[#332C28] hover:bg-[#332C28] hover:text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif-heading text-2xl font-bold text-[#332C28] mb-1">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#332C28]/60">
                      Fill out the form below and we'll reply directly to your inbox.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#332C28] mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Roy"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                        placeholder="e.g. ananya@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332C28] mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl px-3.5 py-2.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A] cursor-pointer"
                    >
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="Custom Order Status">Custom Order Status</option>
                      <option value="Yarn & Care Question">Yarn & Care Guidance</option>
                      <option value="Wholesale / Gifting">Wholesale or Corporate Gifting</option>
                      <option value="Press / Collaboration">Press & Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332C28] mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your thoughts, questions, or bespoke ideas here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F8F4EE] border border-[#E7DED2] rounded-xl p-3.5 text-xs text-[#332C28] focus:outline-none focus:border-[#8C6F5A]"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
