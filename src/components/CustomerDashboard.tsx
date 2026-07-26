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
  ChevronDown,
  Plus,
  Layers,
  Zap,
  Shield,
  Car,
  Waves,
  Dumbbell,
  Trees,
  Compass,
  Droplets,
  Key,
  Store,
  TrendingUp,
  Clock,
  HelpCircle,
  Heart,
  Menu,
  ArrowUp,
  ThumbsUp,
  IndianRupee,
  Eye,
  Users,
  Phone,
  Headphones,
  MessageSquare,
  Bell,
  Globe,
  FileText,
  Tag,
  Sparkles,
  Crop,
  PiggyBank,
  Armchair,
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
  isReraApproved?: boolean;
  reraRegNo?: string;
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
    isReraApproved: true,
    reraRegNo: 'PRM/KA/RERA/1251/310/PR/180516/001732',
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
    isReraApproved: true,
    reraRegNo: 'PRM/KA/RERA/1251/446/PR/190822/002910',
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
  const [occupancyFilter, setOccupancyFilter] = useState<'all' | 'coed' | 'girls_only' | 'boys_only' | 'family_only' | 'bachelors_only' | 'students_only' | 'gov_employed' | 'private_employed' | 'self_employed'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterCategoryTab, setFilterCategoryTab] = useState<'type' | 'bhk' | 'pg' | 'furnishing' | 'food' | 'occupancy' | 'availability'>('type');
  const [filterViewStyle, setFilterViewStyle] = useState<'valoris' | '2panel'>('valoris');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minBudget, setMinBudget] = useState('No Min');
  const [maxBudget, setMaxBudget] = useState('No Max');
  const [constructionStatus, setConstructionStatus] = useState<'all' | 'ready_to_move' | 'under_construction' | 'new_launch'>('all');
  const [ownershipType, setOwnershipType] = useState<'all' | 'freehold' | 'leasehold'>('all');
  const [locationChips, setLocationChips] = useState<string[]>(['Jodhpur', 'Koramangala']);
  const [locationInput, setLocationInput] = useState('');
  const [activeMainTab, setActiveMainTab] = useState<'home' | 'search' | 'activity' | 'menu'>('home');
  const [categorySidebarTab, setCategorySidebarTab] = useState<'buy_residential' | 'rent_pg' | 'buy_commercial' | 'lease_commercial' | 'price_insights' | 'activity_support'>('buy_residential');
  const [postedByFilter, setPostedByFilter] = useState<'all' | 'owner' | 'builder' | 'agent'>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [builtAreaSqft, setBuiltAreaSqft] = useState<number>(1200);
  const [carpetAreaSqft, setCarpetAreaSqft] = useState<number>(950);
  const [floorPrefFilter, setFloorPrefFilter] = useState<'all' | 'ground' | 'low_rise' | 'mid_rise' | 'high_rise' | 'top_floor' | 'penthouse'>('all');
  const [facingFilter, setFacingFilter] = useState<'all' | 'east' | 'west' | 'north' | 'south' | 'ne' | 'nw' | 'se'>('all');
  const [ageOfPropertyFilter, setAgeOfPropertyFilter] = useState<'all' | 'under_construction' | '0_1' | '1_5' | '5_10' | '10_plus'>('all');
  const [bathroomsFilter, setBathroomsFilter] = useState<'all' | '1' | '2' | '3' | '4_plus'>('all');
  const [parkingTypeFilter, setParkingTypeFilter] = useState<'all' | 'covered' | 'open' | 'no_pref'>('all');
  const [waterSupplyFilter, setWaterSupplyFilter] = useState<string[]>([]);
  const [saleTypeFilter, setSaleTypeFilter] = useState<'all' | 'new_launch' | 'resale'>('all');

  // Favorites & Watch History State
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['cust-1', 'cust-3']);
  const [watchHistoryIds, setWatchHistoryIds] = useState<string[]>(['cust-1', 'cust-2']);
  const [activitySubTab, setActivitySubTab] = useState<'favorites' | 'history'>('favorites');

  const toggleFavorite = (propertyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPropertyIds((prev) => {
      const isSaved = prev.includes(propertyId);
      if (isSaved) {
        setToastMessage('Removed property from Favorites');
        setTimeout(() => setToastMessage(null), 3000);
        return prev.filter((id) => id !== propertyId);
      } else {
        setToastMessage('Saved property to Favorites ❤️');
        setTimeout(() => setToastMessage(null), 3000);
        return [...prev, propertyId];
      }
    });
  };

  const handleOpenPropertyDetail = (item: CustomerPropertyItem) => {
    setSelectedPropertyDetail(item);
    setWatchHistoryIds((prev) => [item.id, ...prev.filter((id) => id !== item.id)]);
  };

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

    // PG Sharing Filter (Ignored for Buy)
    let matchesPgSharing = true;
    if (transactionFilter !== 'buy' && pgSharingFilter !== 'all' && item.propertyType === 'pg' && item.sharingType) {
      if (pgSharingFilter === 'single') matchesPgSharing = item.sharingType.toLowerCase().includes('single');
      if (pgSharingFilter === 'double') matchesPgSharing = item.sharingType.toLowerCase().includes('double');
    }

    // Food preference filter (Ignored for Buy)
    const matchesFoodPref = transactionFilter === 'buy' || foodPrefFilter === 'all' || item.foodPreference === foodPrefFilter;

    // Occupancy type filter (Ignored for Buy)
    const matchesOccupancy = transactionFilter === 'buy' || occupancyFilter === 'all' || item.occupancyType === occupancyFilter;

    // Availability filter
    const matchesAvailability = availabilityFilter === 'all' || item.availableFrom === availabilityFilter;

    return matchesSearch && matchesType && matchesTx && matchesFurnishing && matchesBhk && matchesPgSharing && matchesFoodPref && matchesOccupancy && matchesAvailability;
  });

  const activeFilterCount =
    (transactionFilter !== 'all' ? 1 : 0) +
    (furnishingFilter !== 'all' ? 1 : 0) +
    (bhkFilter !== 'all' ? 1 : 0) +
    (constructionStatus !== 'all' ? 1 : 0) +
    (ownershipType !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && pgSharingFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && foodPrefFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && occupancyFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && availabilityFilter !== 'all' ? 1 : 0);

  // Helper labels
  const getFoodPrefLabel = (f?: string) => {
    switch (f) {
      case 'vegetarian': return 'Vegetarian';
      case 'non_vegetarian': return 'Non-Veg';
      case 'both': return 'Veg & Non-Veg';
      default: return null;
    }
  };

  const getOccupancyLabel = (o?: string) => {
    switch (o) {
      case 'gov_employed': return 'Govt. Employed';
      case 'private_employed': return 'Private Employed';
      case 'self_employed': return 'Self Employed';
      case 'coed': return 'Co-ed';
      case 'girls_only': return 'Girls Only';
      case 'boys_only': return 'Boys Only';
      case 'family_only': return 'Family Only';
      case 'bachelors_only': return 'Bachelors Only';
      case 'students_only': return 'Students Only';
      default: return null;
    }
  };

  const getAvailabilityLabel = (a?: string) => {
    switch (a) {
      case 'immediate': return 'Available Now';
      case 'two_weeks': return 'In 2 Weeks';
      case 'one_month': return 'In 1 Month';
      case 'three_months': return 'In 3 Months';
      case 'six_months': return 'In 6 Months';
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

      {/* Top Integrated Search & Filter Header */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 p-3 shadow-2xs">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          
          {/* Main Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search locality, area, or property name..."
            className="w-full pl-10 pr-24 py-2.5 text-xs bg-white dark:bg-[#141C2E] border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1A3FAA] dark:focus:ring-sky-500 transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs"
          />

          {/* Right Action Group inside Search Bar (Clear Search + Integrated Filters Button) */}
          <div className="absolute right-1.5 flex items-center gap-1.5">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer rounded-full transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Integrated Filter Button inside Search Bar */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1A3FAA]/10 dark:bg-sky-400/15 hover:bg-[#1A3FAA]/20 dark:hover:bg-sky-400/25 text-[#1A3FAA] dark:text-sky-300 border border-[#1A3FAA]/20 dark:border-sky-400/30 text-[11px] font-extrabold rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
              title="Open Filters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1A3FAA] dark:text-sky-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-[#1A3FAA] dark:bg-sky-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FILTER MODAL (VALORIS CARD LAYOUT & FLIPKART 2-PANEL TOGGLE) */}
      {showFilterModal && (
        <div className="absolute inset-0 z-50 bg-slate-100 flex flex-col justify-between overflow-hidden animate-fadeIn text-left">
          
          {/* Modal Header: Deep Teal-Navy (Valoris Style) */}
          <div className="bg-[#1F4E5C] text-white p-3.5 space-y-3 shrink-0 shadow-md">
            
            {/* Top Bar: Title, Style Switcher & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-300" />
                <h3 className="text-sm font-black text-white tracking-tight">Valoris Filters</h3>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 bg-cyan-400 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              {/* Layout Switcher Toggle */}
              <div className="flex items-center bg-slate-900/60 p-0.5 rounded-xl border border-white/20">
                <button
                  onClick={() => setFilterViewStyle('valoris')}
                  className={`px-2 py-1 text-[10px] font-extrabold rounded-lg transition-all ${
                    filterViewStyle === 'valoris'
                      ? 'bg-white text-[#1F4E5C] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  🏢 Valoris
                </button>
                <button
                  onClick={() => setFilterViewStyle('2panel')}
                  className={`px-2 py-1 text-[10px] font-extrabold rounded-lg transition-all ${
                    filterViewStyle === '2panel'
                      ? 'bg-white text-[#1F4E5C] shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  📱 2-Panel
                </button>
              </div>

              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Valoris Top Category Pill Tabs (Buy, Rent/PG, Commercial) */}
            {filterViewStyle === 'valoris' && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-1.5 bg-slate-900/40 p-1 rounded-2xl border border-white/10">
                  {[
                    { id: 'all', label: 'Buy & Sale' },
                    { id: 'rent', label: 'Rent / PG' },
                    { id: 'commercial', label: 'Commercial' },
                  ].map((tab) => {
                    const isSelected =
                      (tab.id === 'rent' && transactionFilter === 'rent') ||
                      (tab.id === 'all' && transactionFilter === 'buy') ||
                      (tab.id === 'commercial' && activeTab === 'commercial');

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.id === 'rent') {
                            setTransactionFilter('rent');
                            if (activeTab === 'commercial') setActiveTab('all');
                          } else if (tab.id === 'all') {
                            setTransactionFilter('buy');
                            if (activeTab === 'commercial') setActiveTab('all');
                          } else if (tab.id === 'commercial') {
                            setActiveTab('commercial');
                            setTransactionFilter('all');
                          }
                        }}
                        className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-white text-[#1F4E5C] shadow-sm'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Location Search Bar & Chips */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 bg-white rounded-xl px-2.5 py-1.5 text-slate-900 shadow-2xs">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && locationInput.trim()) {
                          setLocationChips([...locationChips, locationInput.trim()]);
                          setLocationInput('');
                        }
                      }}
                      placeholder="Enter city or area name..."
                      className="flex-1 text-xs font-semibold bg-transparent border-none focus:outline-none placeholder-slate-400"
                    />
                    <button
                      onClick={() => {
                        if (locationInput.trim()) {
                          setLocationChips([...locationChips, locationInput.trim()]);
                          setLocationInput('');
                        }
                      }}
                      className="flex items-center gap-0.5 text-[10px] font-black text-[#1F4E5C] bg-[#EAF3F6] px-2 py-1 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Removable Location Chips */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {locationChips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs border border-white/20"
                      >
                        {chip}
                        <button
                          onClick={() => setLocationChips(locationChips.filter((_, i) => i !== idx))}
                          className="hover:text-amber-300 cursor-pointer ml-0.5"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* VALORIS SECTION-CARD LAYOUT */}
          {filterViewStyle === 'valoris' ? (
            <div className="flex-1 bg-slate-100 overflow-y-auto p-3.5 space-y-3 text-left">
              
              {/* SECTION 1: Budget in ₹ */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Budget in ₹</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <select
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      className="w-full p-2.5 pr-8 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 appearance-none focus:ring-2 focus:ring-[#1F4E5C]"
                    >
                      <option value="No Min">No Min</option>
                      <option value="₹ 10,000">₹ 10,000</option>
                      <option value="₹ 25,000">₹ 25,000</option>
                      <option value="₹ 50,000">₹ 50,000</option>
                      <option value="₹ 1 Lakh">₹ 1 Lakh</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  <span className="text-xs font-bold text-slate-400">to</span>

                  <div className="flex-1 relative">
                    <select
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      className="w-full p-2.5 pr-8 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 appearance-none focus:ring-2 focus:ring-[#1F4E5C]"
                    >
                      <option value="No Max">No Max</option>
                      <option value="₹ 35,000">₹ 35,000</option>
                      <option value="₹ 75,000">₹ 75,000</option>
                      <option value="₹ 1.5 Lakhs">₹ 1.5 Lakhs</option>
                      <option value="₹ 3 Cr">₹ 3 Cr</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: No. of Bedrooms */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">No. of Bedrooms</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'all', label: 'All BHK' },
                    { id: '1bhk', label: '1RK / 1BHK' },
                    { id: '2bhk', label: '2 BHK' },
                    { id: '3bhk', label: '3 BHK' },
                    { id: '4bhk', label: '4 BHK' },
                    { id: '4plus', label: '4+ BHK' },
                  ].map((bhk) => {
                    const isSelected = bhkFilter === bhk.id || (bhk.id === '4plus' && bhkFilter === '4bhk');
                    return (
                      <button
                        key={bhk.id}
                        onClick={() => setBhkFilter(bhk.id as any)}
                        className={`px-3 py-2 text-xs font-bold rounded-xl border shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {bhk.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: Property Types (3-Column Icon Grid) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Property Types</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'apartment', label: 'Flat / Apartment', icon: Building2 },
                    { id: 'villa', label: 'House / Villa', icon: Home },
                    { id: 'pg', label: '1RK / Studio Flat', icon: BedDouble },
                    { id: 'commercial', label: 'Commercial Office', icon: Briefcase },
                    { id: 'plot', label: 'Plot / Farm Land', icon: MapPin },
                    { id: 'all', label: 'All Categories', icon: Layers },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = activeTab === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id as any)}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-2 border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-[#1F4E5C]" />
                        <span className="text-[11px] font-bold leading-tight">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 5: Furnishing Status */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Furnishing Status</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fully_furnished', label: 'Furnished' },
                    { id: 'semifurnished', label: 'Semi-furnished' },
                    { id: 'unfurnished', label: 'Unfurnished' },
                  ].map((f) => {
                    const isSelected = furnishingFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFurnishingFilter(furnishingFilter === f.id ? 'all' : f.id as any)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 6: Available For / Tenant Preference */}
              {transactionFilter !== 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Available For / Tenant Preference</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'family_only', label: '👨‍👩‍👧 Family' },
                      { id: 'bachelors_only', label: '🎓 Bachelors' },
                      { id: 'girls_only', label: '👩 Girls Only' },
                      { id: 'boys_only', label: '👨 Boys Only' },
                      { id: 'coed', label: '👫 Co-ed' },
                      { id: 'students_only', label: '📚 Students' },
                    ].map((tp) => {
                      const isSelected = occupancyFilter === tp.id;
                      return (
                        <button
                          key={tp.id}
                          onClick={() => setOccupancyFilter(occupancyFilter === tp.id ? 'all' : tp.id as any)}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {tp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 7: Posted By */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Posted By</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'owner', label: '👤 Owner' },
                    { id: 'builder', label: '🏢 Builder' },
                    { id: 'agent', label: '💼 Agent / Dealer' },
                  ].map((pb) => {
                    const isSelected = postedByFilter === pb.id;
                    return (
                      <button
                        key={pb.id}
                        onClick={() => setPostedByFilter(postedByFilter === pb.id ? 'all' : pb.id as any)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pb.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 8: Amenities (3-Column Multi-Select Icon Grid) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Amenities</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'power_backup', label: 'Power Backup', icon: Zap },
                    { id: 'lift', label: 'Lift / Elevator', icon: Building2 },
                    { id: 'parking', label: 'Car Parking', icon: Car },
                    { id: 'security', label: '24x7 Security', icon: Shield },
                    { id: 'pool', label: 'Swimming Pool', icon: Waves },
                    { id: 'gym', label: 'Fitness Gym', icon: Dumbbell },
                    { id: 'park', label: 'Garden Park', icon: Trees },
                    { id: 'clubhouse', label: 'Club House', icon: Home },
                    { id: 'vastu', label: 'Vastu Compliant', icon: Compass },
                    { id: 'rainwater', label: 'Rainwater Harvest', icon: Droplets },
                  ].map((am) => {
                    const Icon = am.icon;
                    const isSelected = selectedAmenities.includes(am.id);
                    return (
                      <button
                        key={am.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== am.id));
                          } else {
                            setSelectedAmenities([...selectedAmenities, am.id]);
                          }
                        }}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center text-center space-y-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-2 border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#1F4E5C]" />
                        <span className="text-[10px] font-bold leading-tight">{am.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 9: Area in sq.ft. */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Super Built-up Area</h4>
                  <span className="text-xs font-extrabold text-[#1F4E5C]">{builtAreaSqft} sq.ft.</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={builtAreaSqft}
                  onChange={(e) => setBuiltAreaSqft(Number(e.target.value))}
                  className="w-full accent-[#1F4E5C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>500 sq.ft.</span>
                  <span>5,000+ sq.ft.</span>
                </div>
              </div>

              {/* SECTION 10: Floor Preference */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Floor Preference</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'ground', label: 'Ground Floor' },
                    { id: 'low_rise', label: 'Low Rise (1-4)' },
                    { id: 'mid_rise', label: 'Mid Rise (5-9)' },
                    { id: 'high_rise', label: 'High Rise (10+)' },
                    { id: 'top_floor', label: 'Top Floor' },
                    { id: 'penthouse', label: 'Penthouse' },
                  ].map((fl) => {
                    const isSelected = floorPrefFilter === fl.id;
                    return (
                      <button
                        key={fl.id}
                        onClick={() => setFloorPrefFilter(floorPrefFilter === fl.id ? 'all' : fl.id as any)}
                        className={`px-3 py-2 text-xs font-bold rounded-xl border shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {fl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 11: Facing Direction */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Facing Direction</h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'east', label: 'East' },
                    { id: 'west', label: 'West' },
                    { id: 'north', label: 'North' },
                    { id: 'south', label: 'South' },
                    { id: 'ne', label: 'North-East' },
                    { id: 'nw', label: 'North-West' },
                    { id: 'se', label: 'South-East' },
                  ].map((fc) => {
                    const isSelected = facingFilter === fc.id;
                    return (
                      <button
                        key={fc.id}
                        onClick={() => setFacingFilter(facingFilter === fc.id ? 'all' : fc.id as any)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {fc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 12: Age of Property */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Age of Property</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'under_construction', label: 'Under Construction' },
                    { id: '0_1', label: '0-1 Year' },
                    { id: '1_5', label: '1-5 Years' },
                    { id: '5_10', label: '5-10 Years' },
                    { id: '10_plus', label: '10+ Years' },
                  ].map((ag) => {
                    const isSelected = ageOfPropertyFilter === ag.id;
                    return (
                      <button
                        key={ag.id}
                        onClick={() => setAgeOfPropertyFilter(ageOfPropertyFilter === ag.id ? 'all' : ag.id as any)}
                        className={`px-3 py-2 text-xs font-bold rounded-xl border shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {ag.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 13: Carpet Area in sq.ft. */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Carpet Area</h4>
                  <span className="text-xs font-extrabold text-[#1F4E5C]">{carpetAreaSqft} sq.ft.</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="4000"
                  step="50"
                  value={carpetAreaSqft}
                  onChange={(e) => setCarpetAreaSqft(Number(e.target.value))}
                  className="w-full accent-[#1F4E5C] cursor-pointer"
                />
              </div>

              {/* SECTION 14: No. of Bathrooms */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">No. of Bathrooms</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: '1', label: '1' },
                    { id: '2', label: '2' },
                    { id: '3', label: '3' },
                    { id: '4_plus', label: '4+' },
                  ].map((bt) => {
                    const isSelected = bathroomsFilter === bt.id;
                    return (
                      <button
                        key={bt.id}
                        onClick={() => setBathroomsFilter(bathroomsFilter === bt.id ? 'all' : bt.id as any)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {bt.label} Bath
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 15: Parking */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Parking Availability</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'covered', label: '🚗 Covered' },
                    { id: 'open', label: '🅿️ Open Parking' },
                    { id: 'no_pref', label: 'Any Parking' },
                  ].map((pk) => {
                    const isSelected = parkingTypeFilter === pk.id;
                    return (
                      <button
                        key={pk.id}
                        onClick={() => setParkingTypeFilter(parkingTypeFilter === pk.id ? 'all' : pk.id as any)}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pk.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 16: Water Supply */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Water Supply</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'corporation', label: '🚰 Corporation' },
                    { id: 'borewell', label: '⛲ Borewell' },
                    { id: '24x7', label: '💦 24x7 Supply' },
                  ].map((ws) => {
                    const isSelected = waterSupplyFilter.includes(ws.id);
                    return (
                      <button
                        key={ws.id}
                        onClick={() => {
                          if (isSelected) setWaterSupplyFilter(waterSupplyFilter.filter((w) => w !== ws.id));
                          else setWaterSupplyFilter([...waterSupplyFilter, ws.id]);
                        }}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {ws.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 17: PG Room Sharing (Visible when PG active) */}
              {(activeTab === 'pg' || transactionFilter === 'rent') && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">PG Room Sharing</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'single', label: 'Single Occupancy' },
                      { id: 'double', label: 'Double Sharing' },
                      { id: 'all', label: 'All Types' },
                    ].map((sh) => {
                      const isSelected = pgSharingFilter === sh.id;
                      return (
                        <button
                          key={sh.id}
                          onClick={() => setPgSharingFilter(pgSharingFilter === sh.id ? 'all' : sh.id as any)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {sh.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 18: Food Preference */}
              {transactionFilter !== 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Food Preference</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vegetarian', label: '🥦 Veg Only' },
                      { id: 'non_vegetarian', label: '🍗 Non-Veg' },
                      { id: 'both', label: '🍽️ Both' },
                    ].map((fp) => {
                      const isSelected = foodPrefFilter === fp.id;
                      return (
                        <button
                          key={fp.id}
                          onClick={() => setFoodPrefFilter(foodPrefFilter === fp.id ? 'all' : fp.id as any)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {fp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 19: Move-in Timeline / Availability */}
              {transactionFilter !== 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Move-in Timeline</h4>
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {[
                      { id: 'immediate', label: 'Immediately' },
                      { id: 'two_weeks', label: 'Within 2 Weeks' },
                      { id: 'one_month', label: 'Within 1 Month' },
                      { id: 'three_months', label: 'Within 3 Months' },
                    ].map((av) => {
                      const isSelected = availabilityFilter === av.id;
                      return (
                        <button
                          key={av.id}
                          onClick={() => setAvailabilityFilter(availabilityFilter === av.id ? 'all' : av.id as any)}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border shrink-0 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {av.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 20: Sale Type (Buy mode) */}
              {transactionFilter === 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Sale Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'new_launch', label: '🚀 New Launch' },
                      { id: 'resale', label: '🔄 Resale Property' },
                    ].map((st) => {
                      const isSelected = saleTypeFilter === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setSaleTypeFilter(saleTypeFilter === st.id ? 'all' : st.id as any)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 21: Construction Status (Buy mode) */}
              {transactionFilter === 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Construction Status</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'under_construction', label: '🧱 Under Construction' },
                      { id: 'ready_to_move', label: '🏗️ Ready to Move' },
                      { id: 'new_launch', label: '✨ New Launch' },
                    ].map((cs) => {
                      const isSelected = constructionStatus === cs.id;
                      return (
                        <button
                          key={cs.id}
                          onClick={() => setConstructionStatus(constructionStatus === cs.id ? 'all' : cs.id as any)}
                          className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center leading-tight ${
                            isSelected
                              ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C] font-extrabold shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {cs.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 22: Advanced Filters Accordion Row */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs font-black text-slate-800 tracking-tight">Advanced Filters</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Possession Date, RERA Approval & Additional Specifications
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

            </div>
          ) : (
            /* FLIPKART 2-PANEL LAYOUT (ALTERNATIVE VIEW) */
            <div className="flex-1 flex overflow-hidden bg-white text-left">
              
              {/* LEFT PANEL: Category Tabs */}
              <div className="w-[125px] sm:w-[155px] shrink-0 bg-slate-50 border-r border-slate-200 overflow-y-auto">
                {[
                  { id: 'type', label: 'Property Type', count: transactionFilter !== 'all' ? 1 : 0, forBuy: true },
                  { id: 'bhk', label: 'Bedrooms', count: bhkFilter !== 'all' ? 1 : 0, forBuy: true },
                  { id: 'furnishing', label: 'Furnishing', count: furnishingFilter !== 'all' ? 1 : 0, forBuy: true },
                  { id: 'pg', label: 'PG Sharing', count: pgSharingFilter !== 'all' ? 1 : 0, forBuy: false },
                  { id: 'food', label: 'Food Preference', count: foodPrefFilter !== 'all' ? 1 : 0, forBuy: false },
                  { id: 'occupancy', label: 'Occupancy & Employment', count: occupancyFilter !== 'all' ? 1 : 0, forBuy: false },
                  { id: 'availability', label: 'Move-in Timeline', count: availabilityFilter !== 'all' ? 1 : 0, forBuy: false },
                ]
                  .filter((cat) => transactionFilter !== 'buy' || cat.forBuy)
                  .map((cat) => {
                  const isActive = filterCategoryTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategoryTab(cat.id as any)}
                      className={`w-full text-left px-3 py-3.5 text-xs font-bold transition-all relative flex items-center justify-between border-b border-slate-100/80 cursor-pointer ${
                        isActive
                          ? 'bg-[#EAF3F6] text-[#1F4E5C] border-l-4 border-l-[#1F4E5C] font-black'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-4 border-l-transparent'
                      }`}
                    >
                      <span className="leading-snug">{cat.label}</span>
                      {cat.count > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#1A3FAA] shrink-0"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* RIGHT PANEL: Selectable Rows */}
              <div className="flex-1 bg-white overflow-y-auto p-3.5 space-y-2">
                {filterCategoryTab === 'type' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Select Property Type</h4>
                    {[
                      { id: 'all', label: 'All Property Types' },
                      { id: 'rent', label: 'For Rent' },
                      { id: 'buy', label: 'For Sale' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setTransactionFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          transactionFilter === opt.id
                            ? 'bg-[#EAF3F6] border-[#1F4E5C]/40 text-[#1F4E5C]'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          transactionFilter === opt.id ? 'border-[#1F4E5C] bg-[#1F4E5C]' : 'border-slate-300'
                        }`}>
                          {transactionFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filterCategoryTab === 'bhk' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Select BHK</h4>
                    {[
                      { id: 'all', label: 'All BHK Options' },
                      { id: '1bhk', label: '1 BHK Apartment' },
                      { id: '2bhk', label: '2 BHK Apartment' },
                      { id: '3bhk', label: '3 BHK Apartment' },
                      { id: '4bhk', label: '4+ BHK Villa / Flat' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setBhkFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          bhkFilter === opt.id
                            ? 'bg-[#EAF3F6] border-[#1F4E5C]/40 text-[#1F4E5C]'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          bhkFilter === opt.id ? 'border-[#1F4E5C] bg-[#1F4E5C]' : 'border-slate-300'
                        }`}>
                          {bhkFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* CATEGORY: PG Room Sharing */}
                {filterCategoryTab === 'pg' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">PG Sharing Type</h4>
                    {[
                      { id: 'all', label: 'All PG Configurations' },
                      { id: 'single', label: 'Single Occupancy Room' },
                      { id: 'double', label: 'Double / Shared Room' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setPgSharingFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          pgSharingFilter === opt.id
                            ? 'bg-amber-50 border-amber-400 text-amber-900 font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          pgSharingFilter === opt.id ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                        }`}>
                          {pgSharingFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CATEGORY: Furnishing */}
                {filterCategoryTab === 'furnishing' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Furnishing Status</h4>
                    {[
                      { id: 'all', label: 'All Furnishing Levels' },
                      { id: 'fully_furnished', label: 'Fully Furnished' },
                      { id: 'semifurnished', label: 'Semi-Furnished' },
                      { id: 'unfurnished', label: 'Unfurnished' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setFurnishingFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          furnishingFilter === opt.id
                            ? 'bg-[#EAF3F6] border-[#1F4E5C]/40 text-[#1F4E5C]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          furnishingFilter === opt.id ? 'border-[#1F4E5C] bg-[#1F4E5C]' : 'border-slate-300'
                        }`}>
                          {furnishingFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CATEGORY: Food Preference */}
                {filterCategoryTab === 'food' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Food Policy / Preference</h4>
                    {[
                      { id: 'all', label: 'Any Dietary Policy' },
                      { id: 'vegetarian', label: '🥦 Vegetarian Only' },
                      { id: 'non_vegetarian', label: '🍗 Non-Veg Allowed' },
                      { id: 'both', label: '🍽️ Veg & Non-Veg' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setFoodPrefFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          foodPrefFilter === opt.id
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          foodPrefFilter === opt.id ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                        }`}>
                          {foodPrefFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CATEGORY: Occupancy & Employment */}
                {filterCategoryTab === 'occupancy' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Occupancy & Employment Type</h4>
                    {[
                      { id: 'all', label: 'All Occupancy / Employment Types' },
                      { id: 'gov_employed', label: '🏛️ Government Employed' },
                      { id: 'private_employed', label: '💼 Private Employed' },
                      { id: 'self_employed', label: '👨‍💼 Self Employed' },
                      { id: 'family_only', label: '👨‍👩‍👧 Family Only' },
                      { id: 'bachelors_only', label: '🎓 Bachelors Only' },
                      { id: 'girls_only', label: '👩 Girls Only' },
                      { id: 'boys_only', label: '👨 Boys Only' },
                      { id: 'students_only', label: '📚 Students Only' },
                      { id: 'coed', label: '👫 Co-ed / Unisex' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setOccupancyFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          occupancyFilter === opt.id
                            ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          occupancyFilter === opt.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}>
                          {occupancyFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CATEGORY: Move-in Availability */}
                {filterCategoryTab === 'availability' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Move-in Availability</h4>
                    {[
                      { id: 'all', label: 'Any Availability Timeline' },
                      { id: 'immediate', label: 'Available Now' },
                      { id: 'two_weeks', label: '📅 In 2 Weeks' },
                      { id: 'one_month', label: '📅 In 1 Month' },
                      { id: 'three_months', label: '📅 In 3 Months' },
                      { id: 'six_months', label: '📅 In 6 Months' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setAvailabilityFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          availabilityFilter === opt.id
                            ? 'bg-sky-50 border-sky-400 text-sky-900 font-extrabold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          availabilityFilter === opt.id ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                        }`}>
                          {availabilityFilter === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sticky Bottom Bar (Valoris Style) */}
          <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 shadow-2xl">
            <button
              onClick={() => {
                setActiveTab('all');
                setTransactionFilter('all');
                setBhkFilter('all');
                setFurnishingFilter('all');
                setPgSharingFilter('all');
                setFoodPrefFilter('all');
                setOccupancyFilter('all');
                setAvailabilityFilter('all');
                setMinBudget('No Min');
                setMaxBudget('No Max');
                setConstructionStatus('all');
                setOwnershipType('all');
                setPostedByFilter('all');
                setSelectedAmenities([]);
                setBuiltAreaSqft(1200);
                setCarpetAreaSqft(950);
                setFloorPrefFilter('all');
                setFacingFilter('all');
                setAgeOfPropertyFilter('all');
                setBathroomsFilter('all');
                setParkingTypeFilter('all');
                setWaterSupplyFilter([]);
                setSaleTypeFilter('all');
                setLocationChips(['Jodhpur']);
              }}
              className="text-[#1F4E5C] hover:text-slate-900 font-extrabold text-xs cursor-pointer py-2 px-1"
            >
              Reset All
            </button>
            <button
              onClick={() => setShowFilterModal(false)}
              className="py-3 px-5 bg-[#1F4E5C] hover:bg-[#163742] text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer text-center flex-1 max-w-[240px]"
            >
              See all {filteredListings.length > 0 ? filteredListings.length : 524} properties
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
                <Calendar className="w-4 h-4 text-[#1A3FAA]" />
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
                className="w-full py-3 btn-brand text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
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
                      <span className="text-lg font-black text-[#1A3FAA]">{selectedPropertyDetail.price}</span>
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
                    className="w-full py-3 btn-brand text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-cyan-300" />
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
                    className="mt-5 w-full py-3.5 btn-brand text-white font-extrabold text-xs rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyan-300/40 active:scale-[0.98]"
                  >
                    <Lock className="w-4 h-4 text-cyan-300" />
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
                onClick={() => handleOpenPropertyDetail(item)}
                className={`bg-white dark:bg-[#0D1117] rounded-3xl text-left p-4 space-y-3 transition-all duration-200 relative group cursor-pointer active:scale-[0.99] ${
                  item.isReraApproved
                    ? 'border-2 border-emerald-500/80 dark:border-emerald-400/80 shadow-[0_0_16px_rgba(16,185,129,0.15)] bg-gradient-to-b from-emerald-50/20 to-transparent dark:from-emerald-950/10'
                    : 'border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-[#1A3FAA]/40 hover:shadow-md'
                }`}
              >
                  {/* MULTI-PHOTO GALLERY CAROUSEL COVER */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 group/gallery h-44 sm:h-48 w-full border border-slate-100 dark:border-slate-800 shadow-inner">
                    <img
                      src={activePhotoUrl}
                      alt={`${item.title} angle ${currentImageIdx + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover/gallery:scale-105"
                    />
                    
                    {/* Photo Counter & RERA Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[70%]">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-xs">
                        <Camera className="w-3 h-3 text-teal-400" />
                        {propertyImages.length} Photos
                      </span>

                      {item.isReraApproved && (
                        <span className="bg-emerald-600/90 text-white backdrop-blur-md text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-400 shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                          <span>RERA APPROVED</span>
                        </span>
                      )}
                    </div>

                    {/* Transaction Badge & Heart Favorite Toggle */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-md transition-all cursor-pointer shadow-md border border-white/20 hover:scale-110 active:scale-95"
                        title={savedPropertyIds.includes(item.id) ? 'Remove from favorites' : 'Save to favorites'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${savedPropertyIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                      </button>
                      
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
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1A3FAA] transition-colors">
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
                      <span className="text-sm font-black text-[#1A3FAA] block">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#1A3FAA] bg-gradient-to-r from-[#1A3FAA]/10 to-[#0097A7]/10 group-hover:bg-brand-gradient group-hover:text-white px-3 py-1.5 rounded-xl border border-[#1A3FAA]/20 transition-all shadow-2xs">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
            );
          })
        )}
      </div>

      {/* ACTIVITY & HISTORY OVERLAY SCREEN */}
      {activeMainTab === 'activity' && (
        <div className="absolute inset-0 z-50 bg-slate-50 dark:bg-[#0A0D14] flex flex-col overflow-hidden text-left animate-fadeIn">
          
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-3.5 flex items-center justify-between shadow-2xs">
            <button
              onClick={() => setActiveMainTab('home')}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="flex-1 text-center pr-6">
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100 tracking-tight">
                My Activity
              </h2>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                Saved Favorites & Watch History
              </span>
            </div>
          </div>

          {/* Activity Sub-Tab Switcher */}
          <div className="p-3 bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-[#141C2E] p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActivitySubTab('favorites')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activitySubTab === 'favorites'
                    ? 'bg-white dark:bg-slate-800 text-[#1A3FAA] dark:text-sky-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${activitySubTab === 'favorites' ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                <span>Favorites</span>
                <span className="px-1.5 py-0.2 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-full">
                  {savedPropertyIds.length}
                </span>
              </button>

              <button
                onClick={() => setActivitySubTab('history')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activitySubTab === 'history'
                    ? 'bg-white dark:bg-slate-800 text-[#1A3FAA] dark:text-sky-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Watch History</span>
                <span className="px-1.5 py-0.2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-full">
                  {watchHistoryIds.length}
                </span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            
            {/* SUB-TAB 1: FAVORITES / SAVED PROPERTIES */}
            {activitySubTab === 'favorites' && (
              <>
                {savedPropertyIds.length === 0 ? (
                  <div className="p-8 bg-white dark:bg-[#0D1117] rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3 my-4 shadow-2xs">
                    <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
                      <Heart className="w-7 h-7 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">No Saved Properties</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                        Tap the heart icon on any property card to bookmark it for fast reference.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveMainTab('home')}
                      className="px-5 py-2.5 btn-brand text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  listings
                    .filter((item) => savedPropertyIds.includes(item.id))
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleOpenPropertyDetail(item)}
                        className="bg-white dark:bg-[#0D1117] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3.5 space-y-3 transition-all cursor-pointer relative shadow-2xs hover:shadow-md"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                  item.transactionType === 'rent'
                                    ? 'bg-teal-500 text-slate-950 border-teal-300'
                                    : 'bg-amber-400 text-slate-950 border-amber-300'
                                }`}>
                                  {item.transactionType === 'rent' ? 'For Rent' : 'For Sale'}
                                </span>
                                
                                <button
                                  onClick={(e) => toggleFavorite(item.id, e)}
                                  className="p-1.5 text-rose-500 hover:scale-110 cursor-pointer transition-transform"
                                  title="Remove from favorites"
                                >
                                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                                </button>
                              </div>

                              <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate mt-1">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                                {item.location}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                              <span className="text-xs font-black text-[#1A3FAA] dark:text-sky-400">{item.price}</span>
                              <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-0.5">
                                View <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </>
            )}

            {/* SUB-TAB 2: WATCH HISTORY */}
            {activitySubTab === 'history' && (
              <>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Recently Viewed Properties ({watchHistoryIds.length})
                  </span>
                  {watchHistoryIds.length > 0 && (
                    <button
                      onClick={() => {
                        setWatchHistoryIds([]);
                        setToastMessage('Cleared Watch History');
                        setTimeout(() => setToastMessage(null), 3000);
                      }}
                      className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {watchHistoryIds.length === 0 ? (
                  <div className="p-8 bg-white dark:bg-[#0D1117] rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3 my-4 shadow-2xs">
                    <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                      <Clock className="w-7 h-7 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">No Watch History</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                        Properties you view will automatically show up here so you can re-visit them easily.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveMainTab('home')}
                      className="px-5 py-2.5 btn-brand text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Explore Properties
                    </button>
                  </div>
                ) : (
                  watchHistoryIds.map((id) => {
                    const item = listings.find((l) => l.id === id);
                    if (!item) return null;
                    const isFavorited = savedPropertyIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleOpenPropertyDetail(item)}
                        className="bg-white dark:bg-[#0D1117] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3.5 space-y-3 transition-all cursor-pointer relative shadow-2xs hover:shadow-md"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" /> Viewed Recently
                                </span>
                                
                                <button
                                  onClick={(e) => toggleFavorite(item.id, e)}
                                  className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                                >
                                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                                </button>
                              </div>

                              <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate mt-1">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                                {item.location}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                              <span className="text-xs font-black text-[#1A3FAA] dark:text-sky-400">{item.price}</span>
                              <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-0.5">
                                Re-visit <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* ALL CATEGORIES OVERLAY SCREEN (VALORIS 2-PANEL REPLICA) */}
      {activeMainTab === 'menu' && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden text-left animate-fadeIn">
          
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xs">
            <button
              onClick={() => setActiveMainTab('home')}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex-1 text-center pr-6">
              All Categories
            </h2>
          </div>

          {/* TWO-PANEL SPLIT BODY */}
          <div className="flex-1 flex overflow-hidden bg-white">
            
            {/* LEFT PANEL: CATEGORY PARENT MENU SIDEBAR */}
            <div className="w-[115px] sm:w-[135px] shrink-0 bg-[#F4F5F8] border-r border-slate-200/80 overflow-y-auto">
              {[
                {
                  id: 'buy_residential',
                  label: 'Buy Residential',
                  icon: Home,
                },
                {
                  id: 'rent_pg',
                  label: 'Rent / PG',
                  icon: Key,
                },
                {
                  id: 'buy_commercial',
                  label: 'Buy Commercial',
                  icon: Store,
                },
                {
                  id: 'lease_commercial',
                  label: 'Lease Commercial',
                  icon: Briefcase,
                },
                {
                  id: 'price_insights',
                  label: 'Price & Insights',
                  icon: IndianRupee,
                },
                {
                  id: 'activity_support',
                  label: 'Activity & Support',
                  icon: Clock,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = categorySidebarTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCategorySidebarTab(item.id as any)}
                    className={`w-full py-3 px-1.5 flex flex-col items-center text-center transition-all relative border-b border-slate-200/40 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#1C1C1C] font-bold shadow-2xs'
                        : 'bg-[#F4F5F8] text-slate-500 font-medium hover:bg-slate-200/50'
                    }`}
                  >
                    {/* Active Left Blue Accent Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[#0066FF] rounded-r-sm" />
                    )}

                    {/* Icon inside soft circle */}
                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-center mb-1 transition-colors ${
                      isActive ? 'bg-[#EBF3FF] text-[#0066FF]' : 'bg-slate-200/60 text-slate-500'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                    </div>

                    <span className="text-[10.5px] leading-tight font-bold text-center px-0.5">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT PANEL: OPTIONS CONTENT (CENTERED ICONS, MINIMAL UNBOLDED TEXT) */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4 bg-white text-left">

              {/* TAB 2: BUY RESIDENTIAL */}
              {categorySidebarTab === 'buy_residential' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Property Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Flat / Apartment', icon: Building2, color: 'text-blue-600', filter: 'apartment' },
                      { label: 'Residential Land', icon: Layers, color: 'text-emerald-600', filter: 'plot' },
                      { label: 'Independent House / Villa', icon: Home, color: 'text-amber-600', filter: 'villa' },
                      { label: 'Builder Floor', icon: Building2, color: 'text-purple-600', filter: 'apartment' },
                      { label: 'Studio Apartment', icon: BedDouble, color: 'text-teal-600', filter: 'apartment' },
                      { label: 'Farm House', icon: Trees, color: 'text-yellow-700', filter: 'villa' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setTransactionFilter('buy');
                            setActiveTab(opt.filter as any);
                            setActiveMainTab('home');
                          }}
                          className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Icon className={`w-5 h-5 ${opt.color}`} />
                          <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}

                    <button
                      onClick={() => {
                        setTransactionFilter('buy');
                        setActiveTab('apartment');
                        setActiveMainTab('home');
                      }}
                      className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs col-span-2"
                    >
                      <BedDouble className="w-5 h-5 text-rose-600" />
                      <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                        Serviced Apartments
                      </span>
                    </button>
                  </div>

                  {/* Feedback Banner */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-2 mt-4 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-[11px] font-medium text-slate-700">
                        Help us improve Valoris
                      </span>
                    </div>
                    <button
                      onClick={() => setToastMessage('Thank you for rating Valoris!')}
                      className="px-3.5 py-1.5 bg-[#0066FF] hover:bg-blue-700 text-white text-[11px] font-medium rounded-full cursor-pointer shadow-xs"
                    >
                      Rate now
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: RENT / PG */}
              {categorySidebarTab === 'rent_pg' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Property Options
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { label: 'Flat / Apartment', icon: Building2, color: 'text-blue-600', filter: 'apartment' },
                        { label: 'Independent House / Villa', icon: Home, color: 'text-amber-600', filter: 'villa' },
                        { label: 'Builder Floor', icon: Building2, color: 'text-purple-600', filter: 'apartment' },
                        { label: 'Studio Apartment', icon: BedDouble, color: 'text-teal-600', filter: 'apartment' },
                        { label: 'Serviced Apartments', icon: BedDouble, color: 'text-rose-600', filter: 'apartment' },
                        { label: 'Farm House', icon: Trees, color: 'text-yellow-700', filter: 'villa' },
                      ].map((opt, i) => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setTransactionFilter('rent');
                              setActiveTab(opt.filter as any);
                              setActiveMainTab('home');
                            }}
                            className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                          >
                            <Icon className={`w-5 h-5 ${opt.color}`} />
                            <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      PG/Co-living options
                    </h3>
                    <button
                      onClick={() => {
                        setTransactionFilter('rent');
                        setActiveTab('pg');
                        setActiveMainTab('home');
                      }}
                      className="w-full bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                        PG/Co-living properties
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: BUY COMMERCIAL */}
              {categorySidebarTab === 'buy_commercial' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Property Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Retail Shops / Showrooms', icon: Store, color: 'text-blue-600' },
                      { label: 'Ready to move Offices', icon: Briefcase, color: 'text-purple-600' },
                      { label: 'Bare shell Offices', icon: Layers, color: 'text-emerald-600' },
                      { label: 'Plot / Land', icon: Layers, color: 'text-teal-600' },
                      { label: 'Factory Manufacturing', icon: Building2, color: 'text-amber-600' },
                      { label: 'Warehouse', icon: Store, color: 'text-yellow-700' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveTab('commercial');
                            setActiveMainTab('home');
                          }}
                          className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Icon className={`w-5 h-5 ${opt.color}`} />
                          <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}

                    <button
                      onClick={() => {
                        setActiveTab('commercial');
                        setActiveMainTab('home');
                      }}
                      className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs col-span-2"
                    >
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                        Others
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: LEASE COMMERCIAL (EXACT MATCH FOR USER SCREENSHOT 1) */}
              {categorySidebarTab === 'lease_commercial' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Property Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Ready to move Offices', icon: Armchair, color: 'text-[#7C3AED]' },
                      { label: 'Bare shell Offices', icon: Layers, color: 'text-[#00B050]' },
                      { label: 'Co-working Offices', icon: Users, color: 'text-[#D946EF]' },
                      { label: 'Retail Shops / Showrooms', icon: Store, color: 'text-[#0066FF]' },
                      { label: 'Warehouse', icon: Store, color: 'text-[#65A30D]' },
                      { label: 'Factory / Manufacturing', icon: Building2, color: 'text-[#B91C1C]' },
                      { label: 'Plot / Land', icon: Layers, color: 'text-[#059669]' },
                      { label: 'Others', icon: Home, color: 'text-[#0284C7]' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveTab('commercial');
                            setActiveMainTab('home');
                          }}
                          className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Icon className={`w-5 h-5 ${opt.color}`} />
                          <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: PRICE & INSIGHTS (EXACT MATCH FOR USER SCREENSHOTS 2 & 3) */}
              {categorySidebarTab === 'price_insights' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Insights Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Insights
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Opening Real Estate Insights...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <TrendingUp className="w-5 h-5 text-[#0066FF]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Real Estate Insights
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Price Trends...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <ArrowUp className="w-5 h-5 text-[#00B050] stroke-[2.5]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Price Trends
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Tools
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Opening Budget Calculator...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <PiggyBank className="w-5 h-5 text-[#00B050]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Budget Calculator
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Area Converter...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Crop className="w-5 h-5 text-[#DC2626]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Area Converter
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Articles & Guides Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Articles & Guides
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Opening Articles...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-5 h-5 text-[#00B050]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Articles
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Home Buying Guide...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Key className="w-5 h-5 text-[#0066FF]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Home Buying Guide
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Home Interiors Guide...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Sparkles className="w-5 h-5 text-[#0D9488]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Home Interiors Guide
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Seller Guide...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Tag className="w-5 h-5 text-[#D97706]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Seller Guide
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Discover Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Discover
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Opening All India Homepage...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <MapPin className="w-5 h-5 text-[#0066FF]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          All India Homepage
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening NRI Homepage...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Globe className="w-5 h-5 text-[#D97706]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          NRI Homepage
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Review your Society or Locality Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Review your Society or Locality
                    </h3>
                    <button
                      onClick={() => {
                        setToastMessage('Opening Locality Reviews...');
                        setTimeout(() => setToastMessage(null), 3000);
                      }}
                      className="w-full bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      <MessageSquare className="w-5 h-5 text-[#F97316]" />
                      <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                        Share reviews
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 7: ACTIVITY & SUPPORT (EXACT MATCH FOR USER SCREENSHOT 4) */}
              {categorySidebarTab === 'activity_support' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Activity Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Activity
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Showing Contacted listings...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Phone className="w-5 h-5 text-[#0066FF]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Contacted
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveMainTab('activity');
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Heart className="w-5 h-5 text-[#DC2626] fill-[#DC2626]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Shortlisted
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Showing Recently Viewed listings...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs col-span-2"
                      >
                        <Eye className="w-5 h-5 text-[#F97316]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Viewed
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Support & Settings Section */}
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Support & Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setToastMessage('Opening Manage Profile...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <HelpCircle className="w-5 h-5 text-[#1C1C1C]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Manage Profile
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Customer Service...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Headphones className="w-5 h-5 text-[#1C1C1C]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Customer Service
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Give Feedback...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <MessageSquare className="w-5 h-5 text-[#1C1C1C]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Give Feedback
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Change Password...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Lock className="w-5 h-5 text-[#1C1C1C]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Change Password
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening Communication Settings...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs col-span-2"
                      >
                        <Bell className="w-5 h-5 text-[#1C1C1C]" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Communication Settings
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback Banner */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-2 mt-4 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-[11px] font-medium text-slate-700">
                        Help us improve Valoris
                      </span>
                    </div>
                    <button
                      onClick={() => setToastMessage('Thank you for rating Valoris!')}
                      className="px-3.5 py-1.5 bg-[#0066FF] hover:bg-blue-700 text-white text-[11px] font-medium rounded-full cursor-pointer shadow-xs"
                    >
                      Rate now
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around text-center shadow-lg shrink-0">
        <button
          onClick={() => setActiveMainTab('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'home' ? 'text-[#1A3FAA] font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveMainTab('search');
            setShowFilterModal(true);
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'search' ? 'text-[#1A3FAA] font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        <button
          onClick={() => setActiveMainTab('activity')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'activity' ? 'text-[#1A3FAA] font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Activity</span>
        </button>

        <button
          onClick={() => setActiveMainTab('menu')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'menu' ? 'text-[#1A3FAA] font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Menu className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>
    </div>
  );
};
