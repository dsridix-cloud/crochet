import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { User, Mail, Phone, Calendar, Sparkles, CheckCircle2, Edit3, Save, X, Camera } from 'lucide-react';

export const AccountProfile: React.FC = () => {
  const { user, updateUserProfile } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || 'Priya');
  const [lastName, setLastName] = useState(user?.lastName || 'Sharma');
  const [email, setEmail] = useState(user?.email || 'priya@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [dob, setDob] = useState(user?.dob || '1995-04-12');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      firstName,
      lastName,
      email,
      phone,
      dob,
      avatarUrl
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setDob(user.dob || '');
      setAvatarUrl(user.avatarUrl || avatarOptions[0]);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
              Personal Information
            </h1>
            <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
              Manage your personal details, contact preferences, and profile avatar.
            </p>
          </div>

          {!isEditing ? (
            <button
              id="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              className="py-2.5 px-5 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT PROFILE</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-4 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>CANCEL</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[#E7DED2]/80">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#D9A7A0] shadow-xs"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0 p-1.5 bg-[#332C28] text-white rounded-full border-2 border-white">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-[#332C28]">
                {firstName} {lastName}
              </h3>
              <p className="text-xs text-[#332C28]/60">
                Customer account active since {user?.memberSince || 'March 2025'}
              </p>

              {isEditing && (
                <div className="pt-2">
                  <span className="text-xs font-medium text-[#332C28]/70 block mb-1.5">Choose Avatar:</span>
                  <div className="flex items-center gap-2">
                    {avatarOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAvatarUrl(opt)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                          avatarUrl === opt ? 'border-[#8C6F5A] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={opt} alt={`Avatar option ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label htmlFor="profile-firstname" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="profile-firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] disabled:bg-transparent disabled:border-[#E7DED2]/50 disabled:text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="profile-lastname" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Last Name
              </label>
              <input
                id="profile-lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] disabled:bg-transparent disabled:border-[#E7DED2]/50 disabled:text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="profile-email" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] disabled:bg-transparent disabled:border-[#E7DED2]/50 disabled:text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="profile-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] disabled:bg-transparent disabled:border-[#E7DED2]/50 disabled:text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                  required
                />
              </div>
            </div>

            {/* Date of Birth (Optional) */}
            <div>
              <label htmlFor="profile-dob" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                Date of Birth <span className="text-[#332C28]/40 font-normal lowercase">(for birthday surprises)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#332C28]/40">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  id="profile-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] disabled:bg-transparent disabled:border-[#E7DED2]/50 disabled:text-[#332C28] focus:outline-hidden focus:border-[#8C6F5A]"
                />
              </div>
            </div>
          </div>

          {/* Action Button When in Edit Mode */}
          {isEditing && (
            <div className="pt-4 border-t border-[#E7DED2] flex items-center gap-3">
              <button
                id="save-profile-btn"
                type="submit"
                className="py-3 px-6 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE CHANGES</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="py-3 px-5 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors"
              >
                CANCEL
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
