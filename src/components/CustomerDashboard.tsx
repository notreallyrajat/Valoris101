import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  PhoneCall,
  CheckCircle2,
  Building2,
  Home,
  BedDouble,
  Briefcase,
  ShieldCheck,
  Calendar,
  Check,
} from 'lucide-react';

export interface CustomerPropertyItem {
  id: string;
  title: string;
  transactionType: 'buy' | 'rent';
  propertyType: 'apartment' | 'villa' | 'pg' | 'commercial' | 'plot';
  price: string; // e.g. "₹ 35,000 / mo" or "₹ 1.2 Cr"
  deposit?: string;
  bhk?: string; // "2 BHK", "3 BHK"
  sharingType?: string; // For PG: "Single Sharing", "Double Sharing"
  foodPolicy?: string; // "Food Included", "Self Cooking"
  sqft: string;
  furnishing: 'fully_furnished' | 'semifurnished' | 'unfurnished';
  location: string;
  address: string;
  verified: boolean;
  postedBy: 'Owner' | 'Verified Broker';
  images: string[];
  amenities: string[];
}

const CUSTOMER_INITIAL_LISTINGS: CustomerPropertyItem[] = [
  {
    id: 'cust-1',
    title: 'Luxury 3 BHK High-Rise Apartment',
    transactionType: 'rent',
    propertyType: 'apartment',
    price: '₹ 45,000 / mo',
    deposit: '₹ 1.5 Lakhs Deposit',
    bhk: '3 BHK',
    sqft: '1,850 sq ft',
    furnishing: 'fully_furnished',
    location: 'Koramangala 4th Block, Bangalore',
    address: 'Greenwood Heights, 7th Main Rd',
    verified: true,
    postedBy: 'Owner',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: ['Pool', 'Gym', '24/7 Security', 'Covered Parking', 'Power Backup'],
  },
  {
    id: 'cust-2',
    title: 'Executive Premium PG & Coliving Space',
    transactionType: 'rent',
    propertyType: 'pg',
    price: '₹ 14,500 / mo',
    deposit: '₹ 20,000 Deposit',
    sharingType: 'Single & Double Sharing',
    foodPolicy: '3 Meals Included + High-Speed WiFi',
    sqft: '350 sq ft Studio',
    furnishing: 'fully_furnished',
    location: 'Indiranagar 100ft Road, Bangalore',
    address: 'Urban Stays Coliving, Near Metro Station',
    verified: true,
    postedBy: 'Owner',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: ['3 Meals Included', 'Housekeeping', 'High-Speed WiFi', 'AC', 'Laundry'],
  },
  {
    id: 'cust-3',
    title: 'Modern Independent Duplex Villa',
    transactionType: 'buy',
    propertyType: 'villa',
    price: '₹ 2.85 Cr',
    bhk: '4 BHK Villa',
    sqft: '3,200 sq ft Plot',
    furnishing: 'semifurnished',
    location: 'Whitefield, Bangalore',
    address: 'Palm Meadows Enclave, Phase 2',
    verified: true,
    postedBy: 'Verified Broker',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: ['Private Garden', 'Clubhouse', 'Solar Power', 'EV Charger', 'Gated Community'],
  },
  {
    id: 'cust-4',
    title: 'Fully Furnished Plug-and-Play Office Space',
    transactionType: 'rent',
    propertyType: 'commercial',
    price: '₹ 1.2 Lakhs / mo',
    sqft: '2,400 sq ft',
    furnishing: 'fully_furnished',
    location: 'Cyber City, Gurgaon',
    address: 'DLF Horizon Tower, 5th Floor',
    verified: true,
    postedBy: 'Verified Broker',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: ['35 Workstations', '2 Conference Rooms', 'Cafeteria', 'Central AC', 'Server Room'],
  },
  {
    id: 'cust-5',
    title: 'Corner Residential Plot in Gated Community',
    transactionType: 'buy',
    propertyType: 'plot',
    price: '₹ 78 Lakhs',
    sqft: '2,400 sq ft (40x60)',
    furnishing: 'unfurnished',
    location: 'Yelahanka, Bangalore',
    address: 'Greens Layout, Near International Airport Rd',
    verified: true,
    postedBy: 'Owner',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: ['Clear Title', 'Corner Plot', '30ft Wide Road', 'A-Katha Land', 'Underground Drainage'],
  },
];

export const CustomerDashboard: React.FC = () => {
  const [listings] = useState<CustomerPropertyItem[]>(CUSTOMER_INITIAL_LISTINGS);
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Filter States
  const [activeTab, setActiveTab] = useState<'all' | 'apartment' | 'villa' | 'pg' | 'commercial' | 'plot'>('all');
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [bhkFilter, setBhkFilter] = useState<'all' | '1bhk' | '2bhk' | '3bhk' | '4bhk'>('all');
  const [furnishingFilter, setFurnishingFilter] = useState<'all' | 'fully_furnished' | 'semifurnished' | 'unfurnished'>('all');
  const [pgSharingFilter, setPgSharingFilter] = useState<'all' | 'single' | 'double'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Contact / Visit Schedule Modal State
  const [selectedPropertyForContact, setSelectedPropertyForContact] = useState<CustomerPropertyItem | null>(null);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Image Navigation
  const handlePrevImage = (id: string, total: number) => {
    const curr = activeImageIndices[id] || 0;
    setActiveImageIndices({ ...activeImageIndices, [id]: (curr - 1 + total) % total });
  };

  const handleNextImage = (id: string, total: number) => {
    const curr = activeImageIndices[id] || 0;
    setActiveImageIndices({ ...activeImageIndices, [id]: (curr + 1) % total });
  };

  // Filter Logic
  const filteredListings = listings.filter((item) => {
    // Search filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Property Type filter
    const matchesType = activeTab === 'all' || item.propertyType === activeTab;

    // Transaction filter (Buy vs Rent)
    const matchesTx = transactionFilter === 'all' || item.transactionType === transactionFilter;

    // Furnishing filter
    const matchesFurnishing = furnishingFilter === 'all' || item.furnishing === furnishingFilter;

    // BHK Filter (for apartments / villas)
    let matchesBhk = true;
    if (bhkFilter !== 'all' && item.bhk) {
      if (bhkFilter === '1bhk') matchesBhk = item.bhk.includes('1 BHK');
      if (bhkFilter === '2bhk') matchesBhk = item.bhk.includes('2 BHK');
      if (bhkFilter === '3bhk') matchesBhk = item.bhk.includes('3 BHK');
      if (bhkFilter === '4bhk') matchesBhk = item.bhk.includes('4 BHK');
    }

    // PG Sharing Filter
    let matchesPgSharing = true;
    if (pgSharingFilter !== 'all' && item.propertyType === 'pg' && item.sharingType) {
      if (pgSharingFilter === 'single') matchesPgSharing = item.sharingType.toLowerCase().includes('single');
      if (pgSharingFilter === 'double') matchesPgSharing = item.sharingType.toLowerCase().includes('double');
    }

    return matchesSearch && matchesType && matchesTx && matchesFurnishing && matchesBhk && matchesPgSharing;
  });

  const activeFilterCount =
    (transactionFilter !== 'all' ? 1 : 0) +
    (furnishingFilter !== 'all' ? 1 : 0) +
    (bhkFilter !== 'all' ? 1 : 0) +
    (pgSharingFilter !== 'all' ? 1 : 0);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Visit scheduled for ${selectedPropertyForContact?.title} on ${visitDate || 'Tomorrow'} at ${visitTime}!`);
    setSelectedPropertyForContact(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-slate-50 overflow-y-auto text-left relative">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Search & Context Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 p-3.5 space-y-2.5 shadow-2xs">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight">Explore Properties</h1>
            <p className="text-[11px] text-slate-500 font-medium">Find apartments, villas, PGs & commercial spaces</p>
          </div>
          
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs relative"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-700" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#007a6e] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search locality, area, or property name..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-100/80 border border-slate-200/80 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007a6e] focus:bg-white transition-all placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* PROPERTY TYPE CATEGORY PILL TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
          {[
            { id: 'all', label: 'All Listings', icon: Home },
            { id: 'apartment', label: 'Apartments', icon: Building2 },
            { id: 'villa', label: 'Villas', icon: Home },
            { id: 'pg', label: 'PG / Coliving', icon: BedDouble },
            { id: 'commercial', label: 'Commercial', icon: Briefcase },
            { id: 'plot', label: 'Plots / Land', icon: MapPin },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#007a6e] text-white shadow-xs scale-102'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl text-left border border-slate-100 max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#007a6e]" />
                <h3 className="text-sm font-bold text-slate-900">Property Filters</h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Section 1: Transaction Type (Buy vs Rent) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">1. Transaction Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'rent', label: 'For Rent' },
                  { id: 'buy', label: 'For Sale' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTransactionFilter(opt.id as any)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      transactionFilter === opt.id
                        ? 'bg-[#007a6e] text-white border-[#007a6e] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Filter Section 2: BHK (When Apartment or Villa) */}
            {(activeTab === 'all' || activeTab === 'apartment' || activeTab === 'villa') && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">2. Bedrooms (BHK Config)</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: '1bhk', label: '1 BHK' },
                    { id: '2bhk', label: '2 BHK' },
                    { id: '3bhk', label: '3 BHK' },
                    { id: '4bhk', label: '4+ BHK' },
                  ].map((bhk) => (
                    <button
                      key={bhk.id}
                      onClick={() => setBhkFilter(bhk.id as any)}
                      className={`py-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                        bhkFilter === bhk.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {bhk.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Filter Section 3: PG / Coliving Specifics */}
            {(activeTab === 'all' || activeTab === 'pg') && (
              <div className="space-y-1.5 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80">
                <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-amber-600" /> PG Room Occupancy Type
                </label>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { id: 'all', label: 'Any Sharing' },
                    { id: 'single', label: 'Single Occupancy' },
                    { id: 'double', label: 'Double Sharing' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPgSharingFilter(opt.id as any)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        pgSharingFilter === opt.id
                          ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-xs'
                          : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Section 4: Furnishing Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Furnishing Level</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'fully_furnished', label: 'Fully' },
                  { id: 'semifurnished', label: 'Semi' },
                  { id: 'unfurnished', label: 'Unfurnished' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFurnishingFilter(f.id as any)}
                    className={`py-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                      furnishingFilter === f.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setTransactionFilter('all');
                  setBhkFilter('all');
                  setFurnishingFilter('all');
                  setPgSharingFilter('all');
                }}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-3 bg-[#007a6e] hover:bg-[#006258] text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer text-center"
              >
                Apply & View ({filteredListings.length} Matches)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE VISIT / CONTACT MODAL */}
      {selectedPropertyForContact && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-sm w-full rounded-3xl p-5 space-y-4 shadow-2xl border border-slate-100 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#007a6e]" />
                <h3 className="text-sm font-bold text-slate-900">Schedule Property Visit</h3>
              </div>
              <button
                onClick={() => setSelectedPropertyForContact(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-teal-50/80 p-3 rounded-2xl border border-teal-100 space-y-1">
              <span className="text-xs font-extrabold text-teal-900 block">{selectedPropertyForContact.title}</span>
              <span className="text-[11px] text-teal-700 font-medium block">{selectedPropertyForContact.location}</span>
              <span className="text-xs font-black text-slate-900 block pt-0.5">{selectedPropertyForContact.price}</span>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Select Date:</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#007a6e]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Preferred Time Slot:</label>
                <select
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-[#007a6e]"
                >
                  <option value="10:00 AM">10:00 AM - Morning</option>
                  <option value="11:30 AM">11:30 AM - Morning</option>
                  <option value="02:30 PM">02:30 PM - Afternoon</option>
                  <option value="05:00 PM">05:00 PM - Evening</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#007a6e] hover:bg-[#006258] text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Confirm & Contact {selectedPropertyForContact.postedBy}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PROPERTY LISTINGS FEED */}
      <div className="p-4 space-y-3.5 max-w-lg mx-auto w-full">
        {filteredListings.length === 0 ? (
          <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
            <Home className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No properties match your filters</h3>
            <p className="text-xs text-slate-500">Try adjusting your category or furnishing filters.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setTransactionFilter('all');
                setBhkFilter('all');
                setFurnishingFilter('all');
                setPgSharingFilter('all');
                setSearchTerm('');
              }}
              className="mt-2 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredListings.map((item) => {
            const propertyImages = item.images && item.images.length > 0 ? item.images : [CUSTOMER_INITIAL_LISTINGS[0].images[0]];
            const currentImageIdx = activeImageIndices[item.id] || 0;
            const activePhotoUrl = propertyImages[currentImageIdx] || propertyImages[0];

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/80 text-left p-4 space-y-3 transition-all duration-200 relative group shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-md"
              >
                {/* MULTI-PHOTO GALLERY CAROUSEL COVER */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 group/gallery h-44 sm:h-48 w-full border border-slate-100 shadow-inner">
                  <img
                    src={activePhotoUrl}
                    alt={`${item.title} angle ${currentImageIdx + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover/gallery:scale-105"
                  />
                  
                  {/* Photo Counter Overlay Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-xs">
                      <Camera className="w-3 h-3 text-teal-400" />
                      {currentImageIdx + 1} / {propertyImages.length} Photos
                    </span>
                  </div>

                  {/* Transaction Badge (Rent vs Sale) */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs border ${
                      item.transactionType === 'rent'
                        ? 'bg-teal-500 text-slate-950 border-teal-300'
                        : 'bg-amber-400 text-slate-950 border-amber-300'
                    }`}>
                      {item.transactionType === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  {propertyImages.length > 1 && (
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage(item.id, propertyImages.length);
                        }}
                        className="p-1.5 rounded-full bg-slate-900/70 text-white backdrop-blur-md pointer-events-auto hover:bg-slate-950 transition-all cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(item.id, propertyImages.length);
                        }}
                        className="p-1.5 rounded-full bg-slate-900/70 text-white backdrop-blur-md pointer-events-auto hover:bg-slate-950 transition-all cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  )}

                  {/* Dot Indicators */}
                  {propertyImages.length > 1 && (
                    <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1">
                      {propertyImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentImageIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* PROPERTY TITLE & PRICING */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h2>
                    <div className="text-right whitespace-nowrap">
                      <span className="text-sm font-black text-[#007a6e] block">{item.price}</span>
                      {item.deposit && (
                        <span className="text-[10px] text-slate-500 font-semibold block">{item.deposit}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{item.address}</span>
                  </div>
                </div>

                {/* SPECIFICATIONS PILLS */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  {item.bhk && (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200">
                      {item.bhk}
                    </span>
                  )}
                  {item.sharingType && (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-900 font-bold rounded-lg border border-amber-200">
                      {item.sharingType}
                    </span>
                  )}
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-semibold rounded-lg">
                    {item.sqft}
                  </span>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 font-bold rounded-lg capitalize">
                    {item.furnishing.replace('_', ' ')}
                  </span>
                </div>

                {/* AMENITIES PILLS */}
                {item.amenities && item.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100">
                    {item.amenities.map((am) => (
                      <span
                        key={am}
                        className="text-[10px] bg-slate-50 text-slate-600 font-medium px-2 py-0.5 rounded-md border border-slate-100 flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        {am}
                      </span>
                    ))}
                  </div>
                )}

                {/* POSTED BY & ACTION BUTTON */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-700">Posted by {item.postedBy}</span>
                  </div>

                  <button
                    onClick={() => setSelectedPropertyForContact(item)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>Schedule Visit</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
