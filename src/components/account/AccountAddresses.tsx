import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Home, 
  Briefcase, 
  Compass, 
  X, 
  Check, 
  Star 
} from 'lucide-react';
import { SavedAddress } from '../../types';

export const AccountAddresses: React.FC = () => {
  const { 
    savedAddresses, 
    addSavedAddress, 
    updateSavedAddress, 
    deleteSavedAddress, 
    setDefaultAddress 
  } = useShop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<SavedAddress | null>(null);

  // Form states
  const [label, setLabel] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [fullName, setFullName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Surat');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('395009');
  const [country, setCountry] = useState('India');
  const [isDefault, setIsDefault] = useState(false);
  const [formError, setFormError] = useState('');

  const isLimitReached = savedAddresses.length >= 3;

  const openAddModal = () => {
    if (isLimitReached) return;
    setEditingAddress(null);
    setLabel('Home');
    setFullName('Priya Sharma');
    setPhone('+91 98765 43210');
    setAddressLine1('');
    setAddressLine2('');
    setLandmark('');
    setCity('Surat');
    setState('Gujarat');
    setPincode('395009');
    setCountry('India');
    setIsDefault(savedAddresses.length === 0);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setLabel(addr.label);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setAddressLine1(addr.addressLine1);
    setAddressLine2(addr.addressLine2 || '');
    setLandmark(addr.landmark || '');
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setCountry(addr.country);
    setIsDefault(addr.isDefault);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }
    if (!addressLine1.trim()) {
      setFormError('Please provide address line 1 (Flat, House no., Building).');
      return;
    }
    if (!city.trim() || !state.trim()) {
      setFormError('Please provide both city and state.');
      return;
    }
    if (!pincode.trim() || pincode.length < 6) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (editingAddress) {
      updateSavedAddress(editingAddress.id, {
        label,
        fullName,
        phone,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pincode,
        country,
        isDefault
      });
    } else {
      addSavedAddress({
        label,
        fullName,
        phone,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pincode,
        country,
        isDefault
      });
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      deleteSavedAddress(addressToDelete.id);
      setAddressToDelete(null);
    }
  };

  const getLabelIcon = (l: 'Home' | 'Work' | 'Other') => {
    switch (l) {
      case 'Home': return <Home className="w-3.5 h-3.5 text-[#8C6F5A]" />;
      case 'Work': return <Briefcase className="w-3.5 h-3.5 text-[#8C6F5A]" />;
      case 'Other': return <Compass className="w-3.5 h-3.5 text-[#8C6F5A]" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#332C28]">
                Saved Addresses
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#E7DED2]/50 text-[#332C28]">
                {savedAddresses.length} of 3 Saved
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#332C28]/70 mt-1">
              Manage your delivery addresses for seamless checkout. (Maximum 3 addresses permitted).
            </p>
          </div>

          {/* Add Address CTA */}
          <button
            id="add-new-address-btn"
            onClick={openAddModal}
            disabled={isLimitReached}
            className={`py-3 px-5 text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap ${
              isLimitReached
                ? 'bg-[#E7DED2] text-[#332C28]/40 cursor-not-allowed'
                : 'bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* Max 3 Limit Warning Note */}
        {isLimitReached && (
          <div className="mt-4 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold">You can save up to 3 addresses.</span> To add a new delivery location, please delete an existing address first.
            </div>
          </div>
        )}
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedAddresses.map((addr, idx) => (
          <div
            key={addr.id}
            className={`bg-[#FFFFFF] border rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all relative ${
              addr.isDefault 
                ? 'border-[#8C6F5A] ring-2 ring-[#8C6F5A]/15' 
                : 'border-[#E7DED2] hover:border-[#8C6F5A]/40'
            }`}
          >
            <div>
              {/* Card Header: Label & Default Badge */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7DED2]/60">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E7DED2]/40 text-xs font-semibold text-[#332C28]">
                  {getLabelIcon(addr.label)}
                  <span className="uppercase tracking-wider text-[11px]">{addr.label}</span>
                </div>

                {addr.isDefault ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#8C6F5A] text-[#F8F4EE] shadow-2xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>DEFAULT</span>
                  </span>
                ) : (
                  <button
                    id={`set-default-btn-${addr.id}`}
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] text-[#8C6F5A] hover:underline font-medium hover:text-[#332C28]"
                  >
                    SET AS DEFAULT
                  </button>
                )}
              </div>

              {/* Address Content */}
              <div className="space-y-1 text-xs text-[#332C28]">
                <h4 className="font-bold text-sm text-[#332C28] pb-1">
                  {addr.fullName}
                </h4>
                <p className="leading-relaxed text-[#332C28]/90">
                  {addr.addressLine1}
                </p>
                {addr.addressLine2 && (
                  <p className="text-[#332C28]/80">{addr.addressLine2}</p>
                )}
                {addr.landmark && (
                  <p className="text-[#332C28]/60 italic">Landmark: {addr.landmark}</p>
                )}
                <p className="font-medium text-[#332C28]">
                  {addr.city}, {addr.state}
                </p>
                <p className="font-mono text-[#332C28]/80">{addr.pincode}</p>
                <p className="text-[#332C28]/60">{addr.country}</p>

                <div className="pt-2 text-[11px] text-[#332C28]/70">
                  <span className="font-semibold text-[#332C28]">Phone:</span> {addr.phone}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Edit & Delete */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E7DED2]/80">
              <button
                id={`edit-address-btn-${addr.id}`}
                onClick={() => openEditModal(addr)}
                className="py-1.5 px-3 rounded-lg border border-[#E7DED2] hover:border-[#332C28] text-xs font-semibold text-[#332C28] hover:bg-[#F8F4EE] transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8C6F5A]" />
                <span>EDIT</span>
              </button>

              <button
                id={`delete-address-btn-${addr.id}`}
                onClick={() => setAddressToDelete(addr)}
                className="py-1.5 px-3 rounded-lg border border-red-100 hover:border-red-300 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>DELETE</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl my-auto animate-scaleUp overflow-hidden">
            {/* Modal Title - Fixed Header */}
            <div className="flex items-center justify-between border-b border-[#E7DED2] p-4 sm:p-6 flex-shrink-0 bg-white">
              <div>
                <h3 className="font-serif text-lg sm:text-2xl text-[#332C28]">
                  {editingAddress ? 'Edit Saved Address' : 'Add New Delivery Address'}
                </h3>
                <p className="text-xs text-[#332C28]/60 mt-0.5">
                  Standard Indian format for reliable parcel delivery.
                </p>
              </div>
              <button
                id="close-address-modal-btn"
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#332C28]/50 hover:text-[#332C28] rounded-full hover:bg-[#F8F4EE] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1 overscroll-contain">
              {/* Form Error */}
              {formError && (
                <div className="p-3 bg-[#D9A7A0]/20 border border-[#D9A7A0]/50 rounded-xl text-xs text-[#332C28] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D9A7A0] flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Address Form */}
              <form id="saved-address-form" onSubmit={handleFormSubmit} className="space-y-4">
                {/* Address Label Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                    Address Label <span className="text-[#D9A7A0]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['Home', 'Work', 'Other'] as const).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setLabel(tag)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          label === tag
                            ? 'bg-[#332C28] text-[#F8F4EE] border-[#332C28] shadow-xs'
                            : 'bg-[#F8F4EE]/50 border-[#E7DED2] text-[#332C28] hover:bg-[#E7DED2]/40'
                        }`}
                      >
                        {getLabelIcon(tag)}
                        <span>{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="addr-fullname" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      Full Name <span className="text-[#D9A7A0]">*</span>
                    </label>
                    <input
                      id="addr-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addr-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      Phone Number <span className="text-[#D9A7A0]">*</span>
                    </label>
                    <input
                      id="addr-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label htmlFor="addr-line1" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                    Address Line 1 (House/Flat/Block) <span className="text-[#D9A7A0]">*</span>
                  </label>
                  <input
                    id="addr-line1"
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. 12, Green Avenue"
                    className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="addr-line2" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      Address Line 2 (Area/Locality)
                    </label>
                    <input
                      id="addr-line2"
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Adajan Main Road"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="addr-landmark" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      Landmark
                    </label>
                    <input
                      id="addr-landmark"
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Floral Garden"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                    />
                  </div>
                </div>

                {/* City, State, PIN Code */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="addr-city" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      City <span className="text-[#D9A7A0]">*</span>
                    </label>
                    <input
                      id="addr-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Surat"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addr-state" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      State <span className="text-[#D9A7A0]">*</span>
                    </label>
                    <input
                      id="addr-state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Gujarat"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addr-pincode" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                      PIN Code <span className="text-[#D9A7A0]">*</span>
                    </label>
                    <input
                      id="addr-pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="395009"
                      className="w-full px-3.5 py-2.5 bg-[#F8F4EE]/50 border border-[#E7DED2] rounded-xl text-xs text-[#332C28] placeholder-[#332C28]/40 focus:outline-hidden focus:border-[#8C6F5A] focus:bg-[#FFFFFF] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="addr-country" className="block text-xs font-semibold uppercase tracking-wider text-[#332C28]/80 mb-1.5">
                    Country
                  </label>
                  <input
                    id="addr-country"
                    type="text"
                    value={country}
                    disabled
                    className="w-full px-3.5 py-2.5 bg-[#E7DED2]/30 border border-[#E7DED2] rounded-xl text-xs text-[#332C28]/70"
                  />
                </div>

                {/* Default Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      className="w-4 h-4 rounded border-[#E7DED2] text-[#8C6F5A] focus:ring-[#8C6F5A] accent-[#8C6F5A]"
                    />
                    <span className="text-xs text-[#332C28] font-medium">
                      Set as default address for faster checkout
                    </span>
                  </label>
                </div>
              </form>
            </div>

            {/* Modal Footer - Fixed at Bottom */}
            <div className="flex items-center gap-3 p-4 sm:p-6 border-t border-[#E7DED2] flex-shrink-0 bg-white">
              <button
                id="save-address-submit-btn"
                type="submit"
                form="saved-address-form"
                className="flex-1 py-3 bg-[#332C28] hover:bg-[#8C6F5A] text-[#F8F4EE] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs"
              >
                {editingAddress ? 'SAVE CHANGES' : 'SAVE ADDRESS'}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="py-3 px-5 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E7DED2] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-serif text-xl text-[#332C28]">
                Delete this address?
              </h3>
              <p className="text-xs text-[#332C28]/70">
                This address ({addressToDelete.label}: {addressToDelete.addressLine1}, {addressToDelete.city}) will be removed from your saved addresses.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                id="confirm-delete-address-btn"
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                DELETE ADDRESS
              </button>
              <button
                type="button"
                onClick={() => setAddressToDelete(null)}
                className="py-2.5 px-5 border border-[#E7DED2] hover:bg-[#F8F4EE] text-xs font-semibold text-[#332C28] rounded-xl transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
