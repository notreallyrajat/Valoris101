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
  ArrowLeft,
  Lock,
} from 'lucide-react';

interface CustomerDashboardProps {
  onProceedToPayment?: () => void;
  isPaidMember?: boolean;
}

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
  foodPreference?: 'vegetarian' | 'non_vegetarian' | 'both'; // Dietary preference
  occupancyType?: 'coed' | 'girls_only' | 'boys_only' | 'family_only' | 'bachelors_only' | 'students_only'; // Allowed occupancy
  availableFrom?: 'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'; // When property becomes available
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
    foodPreference: 'both',
    occupancyType: 'family_only',
    availableFrom: 'immediate',
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
    foodPreference: 'vegetarian',
    occupancyType: 'coed',
    availableFrom: 'two_weeks',
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

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onProceedToPayment,
  isPaidMember = false,
}) => {
  const [listings] = useState<CustomerPropertyItem[]>(CUSTOMER_INITIAL_LISTINGS);
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Filter States
  const [activeTab, setActiveTab] = useState<'all' | 'apartment' | 'villa' | 'pg' | 'commercial' | 'plot'>('all');
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [bhkFilter, setBhkFilter] = useState<'all' | '1bhk' | '2bhk' | '3bhk' | '4bhk'>('all');
  const [furnishingFilter, setFurnishingFilter] = useState<'all' | 'fully_furnished' | 'semifurnished' | 'unfurnished'>('all');
  const [pgSharingFilter, setPgSharingFilter] = useState<'all' | 'single' | 'double'>('all');
  const [foodPrefFilter, setFoodPrefFilter] = useState<'all' | 'vegetarian' | 'non_vegetarian' | 'both'>('all');
  const [occupancyFilter, setOccupancyFilter] = useState<'all' | 'coed' | 'girls_only' | 'boys_only' | 'family_only' | 'bachelors_only' | 'students_only'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Contact / Visit Schedule Modal State
  const [selectedPropertyForContact, setSelectedPropertyForContact] = useState<CustomerPropertyItem | null>(null);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<CustomerPropertyItem | null>(null);
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

  const handleSelectImage = (id: string, index: number) => {
    setActiveImageIndices({ ...activeImageIndices, [id]: index });
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

    // Food preference filter
    const matchesFoodPref = foodPrefFilter === 'all' || item.foodPreference === foodPrefFilter;

    // Occupancy type filter
    const matchesOccupancy = occupancyFilter === 'all' || item.occupancyType === occupancyFilter;

    // Availability filter
    const matchesAvailability = availabilityFilter === 'all' || item.availableFrom === availabilityFilter;

    return matchesSearch && matchesType && matchesTx && matchesFurnishing && matchesBhk && matchesPgSharing && matchesFoodPref && matchesOccupancy && matchesAvailability;
  });

  const activeFilterCount =
    (transactionFilter !== 'all' ? 1 : 0) +
    (furnishingFilter !== 'all' ? 1 : 0) +
    (bhkFilter !== 'all' ? 1 : 0) +
    (pgSharingFilter !== 'all' ? 1 : 0) +
    (foodPrefFilter !== 'all' ? 1 : 0) +
    (occupancyFilter !== 'all' ? 1 : 0) +
    (availabilityFilter !== 'all' ? 1 : 0);

  // Helper labels
  const getFoodPrefLabel = (f?: string) => {
    switch (f) {
      case 'vegetarian': return '🥦 Vegetarian';
      case 'non_vegetarian': return '🍗 Non-Veg';
      case 'both': return '🍽️ Veg & Non-Veg';
      default: return null;
    }
  };

  const getOccupancyLabel = (o?: string) => {
    switch (o) {
      case 'coed': return '👫 Co-ed';
      case 'girls_only': return '👩 Girls Only';
      case 'boys_only': return '👨 Boys Only';
      case 'family_only': return '👨‍👩‍👧 Family Only';
      case 'bachelors_only': return '🎓 Bachelors Only';
      case 'students_only': return '📚 Students Only';
      default: return null;
    }
  };

  const getAvailabilityLabel = (a?: string) => {
    switch (a) {
      case 'immediate': return '🟢 Available Now';
      case 'two_weeks': return '📅 In 2 Weeks';
      case 'one_month': return '📅 In 1 Month';
      case 'three_months': return '📅 In 3 Months';
      case 'six_months': return '📅 In 6 Months';
      default: return null;
    }
  };

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
            <h1 className="text-base font-black text-slate-900 tracking-tight">Explore</h1>
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

      {/* FILTER MODAL (FULL IN-APP SCREEN) */}
      {showFilterModal && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-4 overflow-y-auto animate-fadeIn text-left">
          <div className="space-y-4">
            
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
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Section 1: Transaction Type (Buy vs Rent) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">1. Property Types</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'rent', label: 'For Rent' },
                  { id: 'buy', label: 'For Sale' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTransactionFilter(opt.id as any)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
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
                    { id: '4bhk', label: '4 BHK' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBhkFilter(opt.id as any)}
                      className={`py-2.5 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                        bhkFilter === opt.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Filter Section 3: PG Sharing (When PG selected) */}
            {(activeTab === 'all' || activeTab === 'pg') && (
              <div className="space-y-1.5 p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <label className="text-xs font-extrabold text-amber-900">3. PG Room Sharing</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'all', label: 'All Types' },
                    { id: 'single', label: 'Single Occupancy' },
                    { id: 'double', label: 'Double Sharing' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPgSharingFilter(opt.id as any)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
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
                    className={`py-2.5 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
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
          </div>

          {/* Filter Section 5: Food Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">🥗 Food Preference</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'vegetarian', label: '🥦 Vegetarian' },
                { id: 'non_vegetarian', label: '🍗 Non-Veg' },
                { id: 'both', label: '🍽️ Both' },
              ].map((fp) => (
                <button
                  key={fp.id}
                  onClick={() => setFoodPrefFilter(foodPrefFilter === fp.id ? 'all' : fp.id as any)}
                  className={`py-2.5 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                    foodPrefFilter === fp.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {fp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Section 6: Occupancy / Tenant Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">🏠 Occupancy Type</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'coed', label: '👫 Co-ed' },
                { id: 'girls_only', label: '👩 Girls Only' },
                { id: 'boys_only', label: '👨 Boys Only' },
                { id: 'family_only', label: '👨‍👩‍👧 Family' },
                { id: 'bachelors_only', label: '🎓 Bachelors' },
                { id: 'students_only', label: '📚 Students' },
              ].map((oc) => (
                <button
                  key={oc.id}
                  onClick={() => setOccupancyFilter(occupancyFilter === oc.id ? 'all' : oc.id as any)}
                  className={`py-2.5 text-[10px] font-bold rounded-xl border transition-all cursor-pointer ${
                    occupancyFilter === oc.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {oc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Section 7: Availability / Move-in Timeline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">📅 Availability / Move-in Timeline</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'immediate', label: '🟢 Now' },
                { id: 'two_weeks', label: '📅 2 Weeks' },
                { id: 'one_month', label: '📅 1 Month' },
                { id: 'three_months', label: '📅 3 Months' },
                { id: 'six_months', label: '📅 6 Months' },
              ].map((av) => (
                <button
                  key={av.id}
                  onClick={() => setAvailabilityFilter(availabilityFilter === av.id ? 'all' : av.id as any)}
                  className={`py-2.5 text-[10px] font-bold rounded-xl border transition-all cursor-pointer ${
                    availabilityFilter === av.id
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av.label}
                </button>
              ))}
            </div>
          </div>

          {/* Apply & Reset Buttons */}
          <div className="flex gap-2 pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => {
                setTransactionFilter('all');
                setBhkFilter('all');
                setFurnishingFilter('all');
                setPgSharingFilter('all');
                setFoodPrefFilter('all');
                setOccupancyFilter('all');
                setAvailabilityFilter('all');
              }}
              className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
            >
              Reset All
            </button>
            <button
              onClick={() => setShowFilterModal(false)}
              className="flex-1 py-3.5 bg-[#007a6e] hover:bg-[#006258] text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer text-center"
            >
              Apply Filters ({filteredListings.length} Matches)
            </button>
          </div>
        </div>
      )}

      {/* SCHEDULE VISIT / CONTACT MODAL */}
      {selectedPropertyForContact && (
        <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
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

      {/* SEPARATE FULL PROPERTY DETAIL SCREEN FOR CUSTOMERS */}
      {selectedPropertyDetail && (
        <div className="absolute inset-0 z-50 bg-[#F8FAFC] flex flex-col overflow-y-auto text-left animate-fadeIn">
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
            <button
              onClick={() => setSelectedPropertyDetail(null)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-extrabold text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Feed</span>
            </button>

            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Property Details
            </span>

            <button
              onClick={() => setSelectedPropertyDetail(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-w-lg mx-auto w-full pb-16">
            {/* Gallery limited to maximum 2 images */}
            {(() => {
              const fullImages = selectedPropertyDetail.images && selectedPropertyDetail.images.length > 0
                ? selectedPropertyDetail.images
                : [CUSTOMER_INITIAL_LISTINGS[0].images[0]];
              const detailImages = fullImages.slice(0, 2);
              const activeDetailImgIdx = Math.min(activeImageIndices[selectedPropertyDetail.id] || 0, detailImages.length - 1);

              return (
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 h-52 w-full border border-slate-200 shadow-md">
                  <img
                    src={detailImages[activeDetailImgIdx] || detailImages[0]}
                    alt={selectedPropertyDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-xs">
                    <Camera className="w-3.5 h-3.5 text-teal-400" />
                    {activeDetailImgIdx + 1} of {detailImages.length} Preview Photos
                  </div>

                  {detailImages.length > 1 && (
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                      <button
                        onClick={() => handlePrevImage(selectedPropertyDetail.id, detailImages.length)}
                        className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => handleNextImage(selectedPropertyDetail.id, detailImages.length)}
                        className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  )}

                  {/* Thumbnail Strip */}
                  {detailImages.length > 1 && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1.5 p-1 bg-slate-950/70 backdrop-blur-md rounded-xl overflow-x-auto">
                      {detailImages.map((imgUrl, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={() => handleSelectImage(selectedPropertyDetail.id, imgIdx)}
                          className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            activeDetailImgIdx === imgIdx
                              ? 'border-teal-400 ring-2 ring-teal-400/40 scale-105'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumb ${imgIdx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Rough Location & Title (ALWAYS UNBLURRED) */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg border ${
                  selectedPropertyDetail.transactionType === 'rent'
                    ? 'bg-teal-500 text-slate-950 border-teal-300'
                    : 'bg-amber-400 text-slate-950 border-amber-300'
                }`}>
                  {selectedPropertyDetail.transactionType === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 uppercase">
                  {selectedPropertyDetail.propertyType}
                </span>
              </div>

              <div>
                <h1 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedPropertyDetail.title}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold mt-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Rough Location: {selectedPropertyDetail.location}</span>
                </div>
              </div>
            </div>

            {/* DETAILED SPECIFICATIONS SECTION - BLURRED WHEN UNPAID */}
            <div className="relative rounded-3xl overflow-hidden min-h-[360px]">
              {/* Blurred / Visible Container */}
              <div className={`space-y-4 transition-all duration-300 ${!isPaidMember ? 'filter blur-md select-none pointer-events-none opacity-30' : ''}`}>
                
                {/* Price & Deposit */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">
                        {selectedPropertyDetail.transactionType === 'rent' ? 'Monthly Rent:' : 'Selling Price:'}
                      </span>
                      <span className="text-lg font-black text-[#007a6e]">{selectedPropertyDetail.price}</span>
                    </div>
                    {selectedPropertyDetail.deposit && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-medium block">Security Deposit:</span>
                        <span className="text-xs font-bold text-slate-700">{selectedPropertyDetail.deposit}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Landlord / Listing Agent Info & Schedule Visit CTA */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Landlord / Owner:</span>
                        <h3 className="text-sm font-extrabold text-slate-900">Posted by {selectedPropertyDetail.postedBy}</h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Listing
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const itemToContact = selectedPropertyDetail;
                      setSelectedPropertyDetail(null);
                      setSelectedPropertyForContact(itemToContact);
                    }}
                    className="w-full py-3 bg-[#007a6e] hover:bg-[#006258] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-teal-300" />
                    <span>Schedule Visit / Request Callback</span>
                  </button>
                </div>

                {/* Full Address */}
                {selectedPropertyDetail.address && (
                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-teal-600" /> Precise Address
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {selectedPropertyDetail.address}
                    </p>
                  </div>
                )}

                {/* Full Property Specifications */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Property Specifications
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    {selectedPropertyDetail.sqft && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Carpet Area:</span>
                        <span className="font-bold text-slate-900">{selectedPropertyDetail.sqft}</span>
                      </div>
                    )}
                    {selectedPropertyDetail.bhk && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Configuration:</span>
                        <span className="font-bold text-slate-900">{selectedPropertyDetail.bhk}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* PAYWALL OVERLAY - PROMINENTLY DISPLAYED OVER BLURRED CONTENT WHEN UNPAID */}
              {!isPaidMember && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 text-center bg-slate-950/75 backdrop-blur-xs rounded-3xl border border-amber-300/40 shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg mb-3">
                    <Lock className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-base font-black text-white tracking-tight">
                    Complete Profile Locked
                  </h3>
                  <p className="text-xs text-slate-200 font-medium max-w-xs mt-1.5 leading-relaxed">
                    Pay ₹399 to unlock complete profile, price details, full address & direct landlord contact info.
                  </p>
                  <button
                    onClick={onProceedToPayment}
                    className="mt-5 w-full py-3.5 bg-[#007a6e] hover:bg-[#006258] text-white font-extrabold text-xs rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-teal-300/40 active:scale-[0.98]"
                  >
                    <Lock className="w-4 h-4 text-teal-300" />
                    <span>Pay ₹399 to Unlock Complete Profile</span>
                  </button>
                </div>
              )}
            </div>
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
                onClick={() => setSelectedPropertyDetail(item)}
                className="bg-white rounded-3xl border border-slate-200/80 text-left p-4 space-y-3 transition-all duration-200 relative group shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-[#007a6e]/40 hover:shadow-md cursor-pointer active:scale-[0.99]"
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
                        {propertyImages.length} Photos
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
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.bhk && (
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-bold text-[10px] rounded-lg border border-slate-200">
                        {item.bhk}
                      </span>
                    )}
                    {item.sharingType && (
                      <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 font-bold text-[10px] rounded-lg border border-amber-200">
                        {item.sharingType}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-teal-50 text-teal-800 font-bold text-[10px] rounded-lg capitalize border border-teal-200/60">
                      {item.furnishing.replace('_', ' ')}
                    </span>
                  </div>

                  {/* PROPERTY TITLE & ROUGH LOCATION */}
                  <div className="space-y-1">
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#007a6e] transition-colors">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span className="truncate max-w-[240px]">{item.location}</span>
                    </div>

                    {/* Food Preference & Occupancy Tags */}
                    {(item.foodPreference || item.occupancyType || item.availableFrom) && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {item.foodPreference && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                            item.foodPreference === 'vegetarian'
                              ? 'bg-green-50 text-green-800 border-green-200'
                              : item.foodPreference === 'non_vegetarian'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}>
                            {getFoodPrefLabel(item.foodPreference)}
                          </span>
                        )}
                        {item.occupancyType && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-indigo-50 text-indigo-700 border-indigo-200">
                            {getOccupancyLabel(item.occupancyType)}
                          </span>
                        )}
                        {item.availableFrom && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                            item.availableFrom === 'immediate'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-sky-50 text-sky-700 border-sky-200'
                          }`}>
                            {getAvailabilityLabel(item.availableFrom)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PRICING & VIEW DETAILS CTA */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Pricing:</span>
                      <span className="text-sm font-black text-[#007a6e] block">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#007a6e] bg-teal-50 group-hover:bg-[#007a6e] group-hover:text-white px-3 py-1.5 rounded-xl border border-teal-200/80 transition-all shadow-2xs">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
            );
          })
        )}
      </div>
    </div>
  );
};
