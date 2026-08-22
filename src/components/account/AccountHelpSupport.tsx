import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const AccountHelpSupport: React.FC = () => {
  const { showToast } = useShop();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('Order Tracking');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const faqs = [
    {
      q: 'How long does handmade crochet production & delivery take?',
      a: 'Because each piece is individually hand-crocheted with 100% organic cotton yarn by our skilled women artisans, crafting usually takes 2–3 business days. Courier shipping across India takes an additional 3–5 business days.'
    },
    {
      q: 'Can I request a custom colorway or size?',
      a: 'Yes! We love bespoke pieces. Please contact our support studio on WhatsApp or via the message form below with your desired dimensions and Pantone/shade preferences.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer a 7-day easy exchange window for unused, unwashed handmade pieces with original tags intact. If an item arrives damaged in transit, we will replace it immediately free of charge.'
    },
    {
      q: 'How should I care for my crochet items?',
      a: 'Hand wash gently in cold water with mild detergent. Do not wring or tumble dry. Lay flat on a clean dry towel in shade to maintain structural shape and yarn softness.'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      showToast('Message Sent', 'Our artisan support team will reply within 24 hours.', 'success');

      setTimeout(() => {
        setIsSent(false);
        setContactMessage('');
        setShowContactModal(false);
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
          Help & Support
        </h1>
        <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
          Have a question about your order, yarn care, or bespoke requests? We're here for you.
        </p>
      </div>

      {/* 3 Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WhatsApp Support */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full uppercase tracking-wider">Fastest</span>
          </div>
          <div>
            <h3 className="font-serif text-base text-[#332C28]">WhatsApp Studio</h3>
            <p className="text-xs text-[#332C28]/70 mt-1">+91 98765 43210</p>
            <p className="text-[11px] text-[#332C28]/50 mt-0.5">Mon–Sat, 10 AM – 7 PM IST</p>
          </div>
        </a>

        {/* Contact Form Modal */}
        <button
          onClick={() => setShowContactModal(true)}
          className="bg-[#FFFFFF] border border-[#E7DED2] hover:border-[#8C6F5A] rounded-2xl p-5 text-left transition-all hover:shadow-xs group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6F5A]/15 text-[#8C6F5A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#8C6F5A] bg-[#E7DED2]/50 px-2 py-0.5 rounded-full uppercase tracking-wider">Direct</span>
          </div>
          <div>
            <h3 className="font-serif text-base text-[#332C28]">Send a Message</h3>
            <p className="text-xs text-[#332C28]/70 mt-1">support@crochetmaison.com</p>
            <p className="text-[11px] text-[#332C28]/50 mt-0.5">Replies within 24 hours</p>
          </div>
        </button>

        {/* Shipping & Returns info */}
        <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#AAB5A0]/20 text-[#4e6341] flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#332C28]/60 bg-[#E7DED2]/40 px-2 py-0.5 rounded-full uppercase tracking-wider">Policy</span>
          </div>
          <div>
            <h3 className="font-serif text-base text-[#332C28]">7-Day Exchanges</h3>
            <p className="text-xs text-[#332C28]/70 mt-1">Free returns for defective pieces</p>
            <p className="text-[11px] text-[#332C28]/50 mt-0.5">Standard pan-India logistics</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="font-serif text-xl text-[#332C28] pb-2 border-b border-[#E7DED2]">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-[#E7DED2]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div key={idx} className="py-4 first:pt-2 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-sm font-semibold text-[#332C28] group-hover:text-[#8C6F5A] transition-colors">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#8C6F5A] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#332C28]/40 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="text-xs sm:text-sm text-[#332C28]/80 leading-relaxed mt-2.5 pl-1 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Send Message Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#E7DED2] pb-4">
              <div>
                <h3 className="font-serif text-xl text-[#332C28]">
                  Contact Artisan Support
                </h3>
                <p className="text-xs text-[#332C28]/60 mt-0.5">
                  We reply directly to your registered email.
                </p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1.5 text-[#332C28]/50 hover:text-[#332C28] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSent ? (
              <div className="p-6 bg-[#AAB5A0]/20 border border-[#AAB5A0]/50 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#AAB5A0] mx-auto" />
                <h4 className="font-semibold text-sm text-[#332C28]">Message Received</h4>
                <p className="text-xs text-[#332C28]/70">Thank you! An artisan coordinator will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                  >
                    <option value="Order Tracking">Order & Tracking Inquiries</option>
                    <option value="Bespoke Request">Custom / Bespoke Crochet Request</option>
                    <option value="Exchange or Return">Exchange & Returns</option>
                    <option value="Yarn & Product Care">Yarn & Product Care Advice</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe how we can help you today..."
                    className="w-full p-3.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A]"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex-1 py-3 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <div className="w-4 h-4 border-2 border-[#F8F4EE] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="py-3 px-5 border border-[#E7DED2] text-xs font-semibold text-[#332C28] rounded-xl hover:bg-[#F8F4EE]"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
