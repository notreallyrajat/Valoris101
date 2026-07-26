import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  MapPin,
  PhoneCall,
  SlidersHorizontal,
  X,
  Building,
  Lock,
  CreditCard,
  Smartphone,
  Home,
  Check,
  ChevronRight,
  Camera,
  Trash2,
  ChevronLeft,
  Plus,
  Compass,
  ArrowLeft,
  Activity,
  TrendingUp,
  DollarSign,
  Menu,
  Layers,
  Eye,
  Headphones,
  Clock,
  Briefcase,
  Key,
  Store,
  IndianRupee,
  Building2,
  MessageCircle,
  Crown,
  ArrowUp,
  Calculator,
  FileQuestion,
  Star,
  Heart,
  ShieldCheck
} from 'lucide-react';

export interface ListingItem {
  id: string;
  title: string;
  actionType: 'buy' | 'sell' | 'give_rent'; // Buy, Sell, Give on listing
  propertyType: 'pg' | 'hostel' | 'apartment'; // PG, Hostel, Apartment
  price: string;
  deposit?: string;
  limitSet?: 'negotiable' | 'non_negotiable'; // Negotiable or Non-Negotiable
  furnishing?: 'fully_furnished' | 'semifurnished' | 'unfurnished'; // Fully furnished, unfurnished, semifurnished
  foodPreference?: 'vegetarian' | 'non_vegetarian' | 'both'; // Dietary preference
  occupancyType?: 'coed' | 'girls_only' | 'boys_only' | 'family_only' | 'bachelors_only' | 'students_only'; // Allowed occupancy
  availableFrom?: 'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'; // When property becomes available
  bhk?: string;
  location: string;
  address?: string; // Full Property Address
  plotSize?: string; // Plot Size / Carpet Area (e.g. 1,800 sq ft)
  pricePerSqFt?: string; // For Buy/Sell
  possessionStatus?: string; // Ready to move, etc.
  ownershipType?: string; // Freehold, Leasehold
  maintenanceFee?: string; // For Rent
  lockInPeriod?: string; // For Rent
  roomType?: string; // Single, Double sharing, etc.
  foodPolicy?: string; // Meals included, etc.
  targetTenant?: string; // Male, Female, Unisex, Professionals
  amenities: string[];
  rating?: string;
  isVerified?: boolean;
  isReraApproved?: boolean;
  reraRegNo?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  isSponsored?: boolean;
  sponsoredBid?: number; // Bid amount in ₹
  images: string[]; // Multi-angle gallery images
}

const PRESET_SAMPLE_PHOTOS = [
  { label: 'Exterior Front View', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Living Room / Interior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Modern Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' }
];

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: 'b-1',
    title: 'Modern 3 BHK Luxury Apartment in Koramangala',
    actionType: 'give_rent',
    propertyType: 'apartment',
    bhk: '3 BHK',
    price: '₹ 45,000 / mo',
    deposit: '₹ 1.5 Lakhs',
    location: 'Koramangala 4th Block, Bangalore',
    address: 'Flat 402, Skyline Residency, 8th Main Road, Koramangala',
    isReraApproved: true,
    reraRegNo: 'PRM/KA/RERA/1251/310/PR/180516/001732',
    contactName: 'Rajat Sharma (Owner)',
    contactPhone: '+91 98765 43210',
    contactEmail: 'rajat.owner@veloris.com',
    furnishing: 'fully_furnished',
    limitSet: 'negotiable',
    foodPreference: 'both',
    occupancyType: 'family_only',
    availableFrom: 'immediate',
    roomType: '3 BHK (3 Baths)',
    maintenanceFee: '₹ 3,500 / mo',
    lockInPeriod: '6 Months',
    amenities: ['Power Backup', 'Gym & Clubhouse', '24/7 Security', 'Covered Parking', 'Swimming Pool'],
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'b-2',
    title: 'Premium Executive Single Sharing PG for Tech Professionals',
    actionType: 'give_rent',
    propertyType: 'pg',
    price: '₹ 14,500 / mo',
    deposit: '₹ 20,000',
    location: 'Indiranagar 100ft Road, Bangalore',
    lockInPeriod: '3 Months Lock-in',
    roomType: 'Triple & Four Sharing',
    foodPolicy: 'Breakfast & Dinner Included',
    foodPreference: 'vegetarian',
    occupancyType: 'boys_only',
    availableFrom: 'two_weeks',
    targetTenant: 'College Students & Interns',
    amenities: ['WiFi', 'CCTV Security', 'Laundry', 'Study Hall'],
    rating: '4.7',
    isVerified: true,
    contactName: 'Ankit Mehta (Broker)',
    contactPhone: '+91 98123 76543',
    contactEmail: 'ankit.broker@valoris.com',
    furnishing: 'fully_furnished',
    limitSet: 'non_negotiable',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'b-103',
    title: '3 BHK High-Rise Luxury Condo',
    actionType: 'sell',
    propertyType: 'apartment',
    bhk: '3 BHK',
    price: '₹ 1.45 Cr',
    pricePerSqFt: '₹ 8,050 / sq ft',
    deposit: '10% Booking Amount',
    limitSet: 'negotiable',
    furnishing: 'unfurnished',
    availableFrom: 'immediate',
    location: 'BKC, Mumbai',
    address: 'Tower A, Flat 1402, Valoris Horizon, BKC',
    plotSize: '1,800 sq ft (30 x 60 Plot)',
    possessionStatus: 'Ready to Move',
    ownershipType: 'Freehold (Clear Title)',
    amenities: ['Power Backup', 'Clubhouse', 'Swimming Pool', '24x7 Security'],
    rating: '4.9',
    isVerified: true,
    contactName: 'Rajat Sharma (Broker)',
    contactPhone: '+91 98765 43210',
    contactEmail: 'rajat.broker@valoris.com',
    isSponsored: true,
    sponsoredBid: 300,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'b-104',
    title: 'Urban Nest Women PG & Co-Living',
    actionType: 'give_rent',
    propertyType: 'pg',
    price: '₹ 16,000 / mo',
    deposit: '₹ 30,000',
    limitSet: 'negotiable',
    furnishing: 'fully_furnished',
    availableFrom: 'immediate',
    foodPreference: 'vegetarian',
    occupancyType: 'girls_only',
    location: 'HSR Layout Sector 1, Bangalore',
    address: 'House #55, 14th Cross, HSR Sector 1',
    plotSize: '1,600 sq ft',
    maintenanceFee: '₹ 1,000 / mo',
    lockInPeriod: '6 Months',
    roomType: 'Private Suite & Single Room',
    foodPolicy: 'Self Kitchen + Daily Cafe Pass',
    targetTenant: 'Female Professionals',
    amenities: ['WiFi', 'AC', 'Housekeeping', 'Smart TV', 'Ergonomic Desk'],
    rating: '4.8',
    isVerified: true,
    contactName: 'Priya V. (Broker Partner)',
    contactPhone: '+91 97111 22334',
    contactEmail: 'priya.broker@valoris.com',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'b-105',
    title: 'Commercial Corporate Floor Requirement',
    actionType: 'buy',
    propertyType: 'apartment',
    bhk: '4 BHK',
    price: 'Budget: ₹ 3.2 Cr',
    pricePerSqFt: '₹ 10,500 / sq ft Target',
    limitSet: 'non_negotiable',
    furnishing: 'semifurnished',
    availableFrom: 'three_months',
    location: 'Cyber City, Gurgaon',
    address: 'Desired: Cyber City Phase 2 / Golf Course Rd',
    plotSize: '3,050 sq ft Carpet Requirement',
    possessionStatus: 'Immediate Possession Required',
    ownershipType: 'Institutional / Freehold',
    amenities: ['Elevator', 'Power Backup', 'Valet Parking'],
    rating: '5.0',
    isVerified: true,
    contactName: 'Devang V. (Mandate Broker)',
    contactPhone: '+91 99887 66554',
    contactEmail: 'devang.broker@valoris.com',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

interface BrokerDashboardProps {
  onProceedToPayment?: () => void;
  isPaidMember?: boolean; // Controlled pass status (true = ₹399 pass active)
}

export const BrokerDashboard: React.FC<BrokerDashboardProps> = ({
  onProceedToPayment,
  isPaidMember = false,
}) => {
  const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
  const [activeMainTab, setActiveMainTab] = useState<'explore' | 'give_listing' | 'activity' | 'menu'>('explore');
  const [categorySidebarTab, setCategorySidebarTab] = useState<'sell_rent' | 'buy_residential' | 'rent_pg' | 'buy_commercial' | 'lease_commercial' | 'price_insights' | 'activity_support'>('sell_rent');

  // Favorites & Watch History State
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['b-1', 'b-103']);
  const [watchHistoryIds, setWatchHistoryIds] = useState<string[]>(['b-1', 'b-2']);
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

  // Active Image Index map for explore feed gallery carousels: { listingId: activeIndex }
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Comprehensive Filter States
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'pg' | 'hostel' | 'apartment'>('all');
  const [limitSetFilter, setLimitSetFilter] = useState<'all' | 'negotiable' | 'non_negotiable'>('all');
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
  const [minBudget, setMinBudget] = useState('No Min');
  const [maxBudget, setMaxBudget] = useState('No Max');
  const [locationChips, setLocationChips] = useState<string[]>(['Jodhpur', 'Koramangala']);
  const [locationInput, setLocationInput] = useState('');

  // Selected property for full detail view screen
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<ListingItem | null>(null);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newActionType, setNewActionType] = useState<'give_rent' | 'buy' | 'sell'>('give_rent');
  const [newPropertyType, setNewPropertyType] = useState<'pg' | 'hostel' | 'apartment'>('pg');
  const [newPrice, setNewPrice] = useState('');
  const [newDeposit, setNewDeposit] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPlotSize, setNewPlotSize] = useState('');
  
  // Rent specifics
  const [newMaintenanceFee] = useState('');
  const [newLockInPeriod] = useState('6 Months');
  const [newRoomType] = useState('Single & Twin Sharing');
  const [newFoodPolicy] = useState('3 Meals Included');
  const [newTargetTenant] = useState('Working Professionals & Students');

  const [newAvailability] = useState<'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'>('immediate');

  // Buy/Sell specifics
  const [newPricePerSqFt] = useState('');
  const [newPossessionStatus] = useState('Ready to Move');
  const [newOwnershipType] = useState('Freehold (Clear Title)');

  const [newLimitSet] = useState<'negotiable' | 'non_negotiable'>('negotiable');
  const [newFurnishing] = useState<'fully_furnished' | 'semifurnished' | 'unfurnished'>('fully_furnished');
  const [newAmenities] = useState<string[]>(['WiFi', 'AC', 'Housekeeping']);

  // Photo Gallery Form State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    PRESET_SAMPLE_PHOTOS[0].url,
    PRESET_SAMPLE_PHOTOS[1].url,
    PRESET_SAMPLE_PHOTOS[2].url,
  ]);

  // Modals & Fee state
  const [showListingFeeModal, setShowListingFeeModal] = useState(false);
  const [pendingListing, setPendingListing] = useState<ListingItem | null>(null);
  const [isProcessingListingFee, setIsProcessingListingFee] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRemovePhoto = (indexToRemove: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Listing Form -> Prompt ₹50 Listing Fee
  const handleListingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newLocation || !newAddress) {
      alert('Please fill in property title, price, location, and property address.');
      return;
    }

    if (uploadedPhotos.length === 0) {
      alert('Please add at least 1 photo to the property gallery.');
      return;
    }

    const itemToPay: ListingItem = {
      id: `b-${Date.now()}`,
      title: newTitle,
      actionType: newActionType,
      propertyType: newPropertyType,
      price: newPrice.startsWith('₹') ? newPrice : `₹ ${newPrice}`,
      deposit: newDeposit ? (newDeposit.startsWith('₹') ? newDeposit : `₹ ${newDeposit}`) : undefined,
      limitSet: newLimitSet,
      furnishing: newFurnishing,
      location: newLocation,
      address: newAddress,
      plotSize: newPlotSize || '1,500 sq ft',
      maintenanceFee: newActionType === 'give_rent' ? newMaintenanceFee : undefined,
      lockInPeriod: newActionType === 'give_rent' ? newLockInPeriod : undefined,
      pricePerSqFt: newActionType !== 'give_rent' ? newPricePerSqFt : undefined,
      possessionStatus: newActionType !== 'give_rent' ? newPossessionStatus : undefined,
      ownershipType: newActionType !== 'give_rent' ? newOwnershipType : undefined,
      roomType: newPropertyType !== 'apartment' && newActionType === 'give_rent' ? newRoomType : undefined,
      foodPolicy: newPropertyType !== 'apartment' && newActionType === 'give_rent' ? newFoodPolicy : undefined,
      targetTenant: newPropertyType !== 'apartment' && newActionType === 'give_rent' ? newTargetTenant : undefined,
      amenities: newAmenities,
      availableFrom: newAvailability,
      rating: '5.0',
      isVerified: true,
      contactName: 'Rajat Sharma (Broker)',
      contactPhone: '+91 98765 43210',
      contactEmail: 'rajat.broker@valoris.com',
      images: uploadedPhotos,
    };

    setPendingListing(itemToPay);
    setShowListingFeeModal(true);
  };

  // Confirm ₹50 Listing Fee Payment
  const handlePayListingFee = () => {
    if (!pendingListing) return;
    setIsProcessingListingFee(true);

    setTimeout(() => {
      setIsProcessingListingFee(false);
      setShowListingFeeModal(false);
      setListings([pendingListing, ...listings]);
      setToastMessage(`Property listing with ${pendingListing.images.length} photos published!`);
      setTimeout(() => setToastMessage(null), 4000);

      // Clear Form & Switch to explore
      setNewTitle('');
      setNewPrice('');
      setNewDeposit('');
      setNewAddress('');
      setNewLocation('');
      setNewPlotSize('');
      setUploadedPhotos([
        PRESET_SAMPLE_PHOTOS[0].url,
        PRESET_SAMPLE_PHOTOS[1].url,
        PRESET_SAMPLE_PHOTOS[2].url,
      ]);
      setPendingListing(null);
      setActiveMainTab('explore');
    }, 1200);
  };

  // Gallery Navigation helper for explore feed cards
  const handlePrevImage = (listingId: string, totalImages: number) => {
    const currentIdx = activeImageIndices[listingId] || 0;
    const prevIdx = (currentIdx - 1 + totalImages) % totalImages;
    setActiveImageIndices({ ...activeImageIndices, [listingId]: prevIdx });
  };

  const handleNextImage = (listingId: string, totalImages: number) => {
    const currentIdx = activeImageIndices[listingId] || 0;
    const nextIdx = (currentIdx + 1) % totalImages;
    setActiveImageIndices({ ...activeImageIndices, [listingId]: nextIdx });
  };

  const handleSelectImage = (listingId: string, index: number) => {
    setActiveImageIndices({ ...activeImageIndices, [listingId]: index });
  };

  // Comprehensive Filter & Sort listings
  const filteredListings = listings
    .filter((item) => {
      // Transaction Filter
      if (transactionFilter === 'buy' && item.actionType === 'give_rent') return false;
      if (transactionFilter === 'rent' && item.actionType !== 'give_rent') return false;

      // Property Type & Limit Set
      if (propertyTypeFilter !== 'all' && item.propertyType !== propertyTypeFilter) return false;
      if (limitSetFilter !== 'all' && item.limitSet !== limitSetFilter) return false;
      if (furnishingFilter !== 'all' && item.furnishing !== furnishingFilter) return false;

      // BHK Filter
      if (bhkFilter !== 'all' && item.bhk) {
        if (bhkFilter === '1bhk' && !item.bhk.includes('1 BHK')) return false;
        if (bhkFilter === '2bhk' && !item.bhk.includes('2 BHK')) return false;
        if (bhkFilter === '3bhk' && !item.bhk.includes('3 BHK')) return false;
        if (bhkFilter === '4bhk' && !item.bhk.includes('4 BHK')) return false;
      }

      // Food & Occupancy
      if (transactionFilter !== 'buy' && foodPrefFilter !== 'all' && item.foodPreference !== foodPrefFilter) return false;
      if (transactionFilter !== 'buy' && occupancyFilter !== 'all' && item.occupancyType !== occupancyFilter) return false;
      if (availabilityFilter !== 'all' && item.availableFrom !== availabilityFilter) return false;

      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchAddr = item.address?.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchAddr) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const bidA = a.isSponsored ? a.sponsoredBid || 100 : 0;
      const bidB = b.isSponsored ? b.sponsoredBid || 100 : 0;
      return bidB - bidA;
    });

  const activeFilterCount =
    (transactionFilter !== 'all' ? 1 : 0) +
    (furnishingFilter !== 'all' ? 1 : 0) +
    (bhkFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && pgSharingFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && foodPrefFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && occupancyFilter !== 'all' ? 1 : 0) +
    (transactionFilter !== 'buy' && availabilityFilter !== 'all' ? 1 : 0);

  // Helper labels
  const getFoodPrefLabel = (f?: string) => {
    switch (f) {
      case 'vegetarian': return 'Vegetarian Only';
      case 'non_vegetarian': return 'Non-Vegetarian';
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

  const getFurnishingLabel = (f?: 'fully_furnished' | 'semifurnished' | 'unfurnished') => {
    switch (f) {
      case 'fully_furnished': return 'Fully Furnished';
      case 'semifurnished': return 'Semi-Furnished';
      case 'unfurnished': return 'Unfurnished';
      default: return 'Fully Furnished';
    }
  };

  const getActionBadgeStyle = (action: 'buy' | 'sell' | 'give_rent') => {
    switch (action) {
      case 'buy': return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'sell': return 'bg-sky-50 text-sky-700 border-sky-200/80';
      case 'give_rent': return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
  };

  const getActionLabel = (action: 'buy' | 'sell' | 'give_rent') => {
    switch (action) {
      case 'buy': return 'Buy';
      case 'sell': return 'Sell';
      case 'give_rent': return 'Rent';
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-800 overflow-y-auto text-left relative selection:bg-slate-900 selection:text-white font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 flex items-center justify-between gap-3 text-xs font-semibold animate-fadeIn max-w-sm w-full mx-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MODAL 1: ₹50 LISTING FEE PAYMENT MODAL */}
      {showListingFeeModal && pendingListing && (
        <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-left border border-slate-100 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ₹50
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Publish Property Listing</h3>
                  <span className="text-[10px] text-slate-500 font-medium">1x Listing Credit ({pendingListing.images.length} Photos)</span>
                </div>
              </div>
              <button
                onClick={() => setShowListingFeeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{pendingListing.title}</span>
                <span className="font-bold text-slate-900 text-sm">₹ 50.00</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                <span>Broker Network Fee</span>
                <span className="text-emerald-600 font-medium">GST Included</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Payment Method:</label>
              <div className="space-y-1.5">
                <div className="p-3 rounded-xl border border-slate-900 bg-slate-900 text-white flex items-center justify-between text-xs font-medium cursor-pointer shadow-xs">
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" /> UPI Instant (GPay / PhonePe)
                  </span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                  <span className="flex items-center gap-2 font-medium">
                    <CreditCard className="w-4 h-4 text-slate-400" /> Valoris Wallet Balance
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayListingFee}
              disabled={isProcessingListingFee}
              className="w-full py-3 btn-brand active:scale-[0.99] font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isProcessingListingFee ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing Listing...
                </span>
              ) : (
                <span>Pay ₹50 & Publish Listing</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* SEPARATE FULL PROPERTY DETAIL SCREEN */}
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
                : [PRESET_SAMPLE_PHOTOS[0].url];
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
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg border ${getActionBadgeStyle(selectedPropertyDetail.actionType)}`}>
                  {getActionLabel(selectedPropertyDetail.actionType)}
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
                        {selectedPropertyDetail.actionType === 'give_rent' ? 'Monthly Rent:' : 'Property Price:'}
                      </span>
                      <span className="text-lg font-black text-slate-900">{selectedPropertyDetail.price}</span>
                    </div>
                    {selectedPropertyDetail.deposit && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-medium block">Security Deposit:</span>
                        <span className="text-xs font-bold text-slate-700">{selectedPropertyDetail.deposit}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Landlord / Owner Contact Card */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Landlord / Owner:</span>
                      <h3 className="text-sm font-extrabold text-slate-900">{selectedPropertyDetail.contactName || 'Property Owner'}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Unlocked
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        {selectedPropertyDetail.contactPhone}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{selectedPropertyDetail.contactEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Complete Address */}
                {selectedPropertyDetail.address && (
                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-teal-600" /> Complete Address
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {selectedPropertyDetail.address}
                    </p>
                  </div>
                )}

                {/* Full Property Specifications */}
                <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Full Property Specifications
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    {selectedPropertyDetail.plotSize && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Area / Plot Size:</span>
                        <span className="font-bold text-slate-900">{selectedPropertyDetail.plotSize}</span>
                      </div>
                    )}
                    {selectedPropertyDetail.roomType && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Room Configuration:</span>
                        <span className="font-bold text-slate-900">{selectedPropertyDetail.roomType}</span>
                      </div>
                    )}
                    {selectedPropertyDetail.foodPolicy && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Food & Mess Policy:</span>
                        <span className="font-bold text-amber-900">{selectedPropertyDetail.foodPolicy}</span>
                      </div>
                    )}
                    {selectedPropertyDetail.maintenanceFee && (
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold">Maintenance Charge:</span>
                        <span className="font-bold text-slate-900">{selectedPropertyDetail.maintenanceFee}</span>
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

      {/* FULL HIGH-FIDELITY FILTER MODAL (VALORIS & 2-PANEL STYLE) */}
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
                      (tab.id === 'commercial' && propertyTypeFilter === 'apartment');

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.id === 'rent') {
                            setTransactionFilter('rent');
                          } else if (tab.id === 'all') {
                            setTransactionFilter('buy');
                          } else if (tab.id === 'commercial') {
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
                  </div>
                  <span className="text-xs text-slate-400 font-bold">to</span>
                  <div className="flex-1 relative">
                    <select
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      className="w-full p-2.5 pr-8 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 appearance-none focus:ring-2 focus:ring-[#1F4E5C]"
                    >
                      <option value="No Max">No Max</option>
                      <option value="₹ 50,000">₹ 50,000</option>
                      <option value="₹ 1 Lakh">₹ 1 Lakh</option>
                      <option value="₹ 50 Lakhs">₹ 50 Lakhs</option>
                      <option value="₹ 1 Cr+">₹ 1 Cr+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Bedrooms (BHK Configuration) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Bedrooms (BHK)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All BHKs' },
                    { id: '1bhk', label: '1 BHK' },
                    { id: '2bhk', label: '2 BHK' },
                    { id: '3bhk', label: '3 BHK' },
                    { id: '4bhk', label: '4 BHK' },
                  ].map((bhk) => {
                    const isSelected = bhkFilter === bhk.id;
                    return (
                      <button
                        key={bhk.id}
                        onClick={() => setBhkFilter(bhk.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1F4E5C] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {bhk.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: Property Type */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Property Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All Types' },
                    { id: 'apartment', label: 'Flat / Apartment' },
                    { id: 'pg', label: 'PG / Co-Living' },
                    { id: 'hostel', label: 'Hostel' },
                  ].map((pt) => {
                    const isSelected = propertyTypeFilter === pt.id;
                    return (
                      <button
                        key={pt.id}
                        onClick={() => setPropertyTypeFilter(pt.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border border-[#1F4E5C] text-[#1F4E5C]'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: Occupancy & Allowed Tenants */}
              {transactionFilter !== 'buy' && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">Allowed Tenants / Occupancy</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'all', label: 'All Occupants' },
                      { id: 'family_only', label: '👨‍👩‍👧 Family Only' },
                      { id: 'bachelors_only', label: '🎓 Bachelors' },
                      { id: 'girls_only', label: '👩 Girls Only' },
                      { id: 'boys_only', label: '👨 Boys Only' },
                      { id: 'coed', label: '👫 Co-ed / Unisex' },
                    ].map((occ) => {
                      const isSelected = occupancyFilter === occ.id;
                      return (
                        <button
                          key={occ.id}
                          onClick={() => setOccupancyFilter(occ.id as any)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-indigo-50 border border-indigo-400 text-indigo-900'
                              : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {occ.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 5: Furnishing */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-slate-800 tracking-tight">Furnishing Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All Furnishing' },
                    { id: 'fully_furnished', label: 'Fully Furnished' },
                    { id: 'semifurnished', label: 'Semi-Furnished' },
                    { id: 'unfurnished', label: 'Unfurnished' },
                  ].map((fur) => {
                    const isSelected = furnishingFilter === fur.id;
                    return (
                      <button
                        key={fur.id}
                        onClick={() => setFurnishingFilter(fur.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#EAF3F6] border border-[#1F4E5C] text-[#1F4E5C]'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {fur.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* 2-PANEL LAYOUT MODE */
            <div className="flex-1 flex overflow-hidden bg-white text-left">
              <div className="w-28 sm:w-36 bg-slate-50 border-r border-slate-200 overflow-y-auto shrink-0">
                {[
                  { id: 'type', label: 'Property Type' },
                  { id: 'bhk', label: 'BHK Config' },
                  { id: 'furnishing', label: 'Furnishing' },
                  { id: 'food', label: 'Food Policy' },
                  { id: 'occupancy', label: 'Occupancy' },
                  { id: 'availability', label: 'Availability' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterCategoryTab(tab.id as any)}
                    className={`w-full p-3 text-left text-xs font-bold border-b border-slate-100 transition-all cursor-pointer ${
                      filterCategoryTab === tab.id
                        ? 'bg-white text-[#1F4E5C] border-l-4 border-l-[#1F4E5C] shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 p-3.5 overflow-y-auto bg-white">
                {filterCategoryTab === 'type' && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Select Property Type</h4>
                    {[
                      { id: 'all', label: 'All Types' },
                      { id: 'apartment', label: 'Flat / Apartment' },
                      { id: 'pg', label: 'PG / Co-Living' },
                      { id: 'hostel', label: 'Hostel' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setPropertyTypeFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                          propertyTypeFilter === opt.id
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {propertyTypeFilter === opt.id && <Check className="w-4 h-4 text-[#1F4E5C]" />}
                      </div>
                    ))}
                  </div>
                )}

                {filterCategoryTab === 'bhk' && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Bedrooms (BHK)</h4>
                    {[
                      { id: 'all', label: 'All BHK Configurations' },
                      { id: '1bhk', label: '1 BHK' },
                      { id: '2bhk', label: '2 BHK' },
                      { id: '3bhk', label: '3 BHK' },
                      { id: '4bhk', label: '4 BHK' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setBhkFilter(opt.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                          bhkFilter === opt.id
                            ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {bhkFilter === opt.id && <Check className="w-4 h-4 text-[#1F4E5C]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sticky Bottom Bar */}
          <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 shadow-2xl">
            <button
              onClick={() => {
                setTransactionFilter('all');
                setBhkFilter('all');
                setPropertyTypeFilter('all');
                setLimitSetFilter('all');
                setFurnishingFilter('all');
                setPgSharingFilter('all');
                setFoodPrefFilter('all');
                setOccupancyFilter('all');
                setAvailabilityFilter('all');
                setMinBudget('No Min');
                setMaxBudget('No Max');
                setSearchTerm('');
              }}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Clear All
            </button>

            <button
              onClick={() => setShowFilterModal(false)}
              className="flex-1 py-2.5 bg-[#1F4E5C] hover:bg-[#163842] text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Apply Filters ({filteredListings.length} Matches)</span>
            </button>
          </div>
        </div>
      )}

      {/* ALL CATEGORIES OVERLAY SCREEN (VALORIS 2-PANEL REPLICA) */}
      {activeMainTab === 'menu' && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden text-left animate-fadeIn">
          
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xs">
            <button
              onClick={() => setActiveMainTab('explore')}
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
                  id: 'sell_rent',
                  label: 'Sell/Rent',
                  icon: Plus,
                  hasBadge: true,
                  badgeText: '+ FREE',
                },
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

                    {/* Free Badge above icon */}
                    {item.hasBadge && (
                      <span className="bg-[#00B050] text-white text-[7.5px] font-bold px-1.5 py-[1px] rounded-full uppercase tracking-tight mb-1 shadow-2xs">
                        {item.badgeText}
                      </span>
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
              
              {/* TAB 1: SELL / RENT */}
              {categorySidebarTab === 'sell_rent' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Property posting options
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setActiveMainTab('give_listing');
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs group"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#1A3FAA] text-white flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center group-hover:text-[#1A3FAA]">
                          Post Property
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setToastMessage('Opening WhatsApp Valoris Assistant...');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs group"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center group-hover:text-emerald-700">
                          Post via WhatsApp
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                      Stand out with higher visibility
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onProceedToPayment && onProceedToPayment()}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <Crown className="w-5 h-5 text-amber-500" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Broker Pass Plan
                        </span>
                      </button>

                      <button
                        onClick={() => onProceedToPayment && onProceedToPayment()}
                        className="bg-[#F0F5FF] hover:bg-[#E2ECFF] p-3 rounded-2xl border border-blue-100/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all cursor-pointer shadow-2xs"
                      >
                        <ArrowUp className="w-5 h-5 text-emerald-600" />
                        <span className="text-[10.5px] font-normal text-slate-800 leading-tight text-center">
                          Dealer Boost
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BUY RESIDENTIAL */}
              {categorySidebarTab === 'buy_residential' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Property Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Flat / Apartment', icon: Building2, color: 'text-blue-600', filter: 'apartment' },
                      { label: 'Residential Land', icon: Layers, color: 'text-emerald-600', filter: 'apartment' },
                      { label: 'Independent House / Villa', icon: Home, color: 'text-amber-600', filter: 'apartment' },
                      { label: 'Builder Floor', icon: Building2, color: 'text-purple-600', filter: 'apartment' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setTransactionFilter('buy');
                            setPropertyTypeFilter(opt.filter as any);
                            setActiveMainTab('explore');
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

              {/* TAB 3: RENT / PG */}
              {categorySidebarTab === 'rent_pg' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Rent / PG Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'PG / Co-Living', icon: Building2, color: 'text-indigo-600', filter: 'pg' },
                      { label: 'Hostel', icon: Home, color: 'text-amber-600', filter: 'hostel' },
                      { label: 'Flat / Apartment', icon: Building2, color: 'text-blue-600', filter: 'apartment' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setTransactionFilter('rent');
                            setPropertyTypeFilter(opt.filter as any);
                            setActiveMainTab('explore');
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

              {/* TAB 4: BUY COMMERCIAL */}
              {categorySidebarTab === 'buy_commercial' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Commercial Buy Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Commercial Office Space', icon: Building2, color: 'text-blue-600' },
                      { label: 'Commercial Shop', icon: Store, color: 'text-amber-600' },
                      { label: 'Commercial Showroom', icon: Building, color: 'text-emerald-600' },
                      { label: 'Commercial Land', icon: Layers, color: 'text-purple-600' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setTransactionFilter('buy');
                            setActiveMainTab('explore');
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

              {/* TAB 5: LEASE COMMERCIAL */}
              {categorySidebarTab === 'lease_commercial' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Commercial Lease Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Office Space on Lease', icon: Briefcase, color: 'text-blue-600' },
                      { label: 'Co-Working Space', icon: Building2, color: 'text-indigo-600' },
                      { label: 'Showroom on Lease', icon: Store, color: 'text-emerald-600' },
                      { label: 'Industrial Warehouse', icon: Building, color: 'text-purple-600' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setTransactionFilter('rent');
                            setActiveMainTab('explore');
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

              {/* TAB 6: PRICE & INSIGHTS */}
              {categorySidebarTab === 'price_insights' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Valoris Intelligence
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Property Valuation Calculator', icon: Calculator, color: 'text-[#1A3FAA]' },
                      { label: 'Locality Price Trends', icon: TrendingUp, color: 'text-emerald-600' },
                      { label: 'Broker Market Yields', icon: DollarSign, color: 'text-amber-600' },
                      { label: 'Commercial Index', icon: Activity, color: 'text-purple-600' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setToastMessage(`Opening ${opt.label}...`);
                            setTimeout(() => setToastMessage(null), 3000);
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

              {/* TAB 7: ACTIVITY & SUPPORT */}
              {categorySidebarTab === 'activity_support' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Support & Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Saved Properties', icon: Star, color: 'text-amber-500' },
                      { label: 'Viewed Mandates', icon: Eye, color: 'text-blue-600' },
                      { label: 'Broker Support Desk', icon: Headphones, color: 'text-emerald-600' },
                      { label: 'Valoris FAQs', icon: FileQuestion, color: 'text-purple-600' },
                    ].map((opt, i) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setToastMessage(`Opening ${opt.label}...`);
                            setTimeout(() => setToastMessage(null), 3000);
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
            </div>
          </div>
        </div>
      )}

      <div>
        {/* STICKY TOP SEARCH HEADER */}
        {activeMainTab === 'explore' && (
          <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 p-3 shadow-2xs">
            <div className="relative flex items-center">
              {/* Search Icon */}
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              
              {/* Main Search Input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search location, address, plot size..."
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
        )}

        {/* TAB 1: EXPLORE FEED */}
        {activeMainTab === 'explore' && (
          <div className="p-4 space-y-3.5 max-w-lg mx-auto">

            {/* Quick Active Filter Badges Strip */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold text-slate-700">
                <span className="text-slate-400 text-[10px] uppercase font-black shrink-0">Active:</span>
                {transactionFilter !== 'all' && (
                  <span className="bg-[#EAF3F6] text-[#1F4E5C] px-2.5 py-1 rounded-full border border-[#1F4E5C]/30 flex items-center gap-1 shrink-0">
                    Mode: {transactionFilter}
                    <button onClick={() => setTransactionFilter('all')} className="hover:text-rose-600 cursor-pointer">✕</button>
                  </span>
                )}
                {propertyTypeFilter !== 'all' && (
                  <span className="bg-[#EAF3F6] text-[#1F4E5C] px-2.5 py-1 rounded-full border border-[#1F4E5C]/30 flex items-center gap-1 shrink-0">
                    Type: {propertyTypeFilter}
                    <button onClick={() => setPropertyTypeFilter('all')} className="hover:text-rose-600 cursor-pointer">✕</button>
                  </span>
                )}
                {bhkFilter !== 'all' && (
                  <span className="bg-[#EAF3F6] text-[#1F4E5C] px-2.5 py-1 rounded-full border border-[#1F4E5C]/30 flex items-center gap-1 shrink-0">
                    BHK: {bhkFilter.toUpperCase()}
                    <button onClick={() => setBhkFilter('all')} className="hover:text-rose-600 cursor-pointer">✕</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setTransactionFilter('all');
                    setPropertyTypeFilter('all');
                    setBhkFilter('all');
                    setFurnishingFilter('all');
                    setOccupancyFilter('all');
                    setFoodPrefFilter('all');
                    setAvailabilityFilter('all');
                  }}
                  className="text-xs font-black text-rose-600 underline cursor-pointer shrink-0 ml-1"
                >
                  Clear
                </button>
              </div>
            )}

            {/* LISTINGS FEED CARDS */}
            <div className="space-y-4">
              {filteredListings.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
                  <Building className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-500">No properties match your active filter criteria.</p>
                  <button
                    onClick={() => {
                      setTransactionFilter('all');
                      setPropertyTypeFilter('all');
                      setBhkFilter('all');
                      setFurnishingFilter('all');
                      setOccupancyFilter('all');
                      setFoodPrefFilter('all');
                      setAvailabilityFilter('all');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredListings.map((item) => {
                  const activeImgIdx = activeImageIndices[item.id] || 0;
                  const totalImgs = item.images.length;
                  const currentPhotoUrl = item.images[activeImgIdx] || item.images[0];

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedPropertyDetail(item);
                        setWatchHistoryIds((prev) => prev.includes(item.id) ? prev : [item.id, ...prev]);
                      }}
                      className={`rounded-3xl text-left p-4 space-y-3 transition-all duration-200 relative group cursor-pointer active:scale-[0.99] ${
                        item.isReraApproved
                          ? 'bg-white dark:bg-[#0D1117] border-2 border-emerald-500/80 dark:border-emerald-400/80 shadow-[0_0_16px_rgba(16,185,129,0.15)] bg-gradient-to-b from-emerald-50/20 to-transparent dark:from-emerald-950/10'
                          : 'bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-slate-800 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-[#1A3FAA]/40 hover:shadow-md'
                      }`}
                    >
                      {/* Sponsored Badge */}
                      {item.isSponsored && (
                        <div className="absolute top-3 right-3 z-10 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs border border-white/40 flex items-center gap-1">
                          <Crown className="w-3 h-3 fill-slate-950" />
                          SPONSORED MANDATE
                        </div>
                      )}

                      {/* Header Row: Action Badge + Type + RERA */}
                      <div className="flex items-center justify-between flex-wrap gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg border ${getActionBadgeStyle(item.actionType)}`}>
                            {getActionLabel(item.actionType)}
                          </span>
                          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 uppercase">
                            {item.propertyType}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.isReraApproved && (
                            <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 shadow-2xs">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> RERA Approved
                            </span>
                          )}

                          {item.isVerified && !item.isReraApproved && (
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Photo Carousel Preview */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-44 w-full border border-slate-100">
                        <img
                          src={currentPhotoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-2.5 left-2.5 bg-slate-950/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
                          <Camera className="w-3 h-3 text-teal-400" />
                          {activeImgIdx + 1}/{totalImgs} Photos
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-2.5 right-2.5 z-10 w-7.5 h-7.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                          title={savedPropertyIds.includes(item.id) ? 'Remove from favorites' : 'Save to favorites'}
                        >
                          <Heart className={`w-4 h-4 ${savedPropertyIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'}`} />
                        </button>

                        {/* Left / Right Carousel Controls */}
                        {totalImgs > 1 && (
                          <div className="absolute inset-y-0 inset-x-1.5 flex items-center justify-between pointer-events-none">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevImage(item.id, totalImgs);
                              }}
                              className="pointer-events-auto w-6 h-6 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-xs cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage(item.id, totalImgs);
                              }}
                              className="pointer-events-auto w-6 h-6 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-xs cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#1A3FAA] transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-base font-black text-slate-900">{item.price}</span>
                          {item.deposit && (
                            <span className="text-[11px] font-bold text-slate-500">Deposit: {item.deposit}</span>
                          )}
                        </div>
                      </div>

                      {/* Location Badge */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>

                      {/* Dynamic Property Attribute Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.furnishing && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                            {getFurnishingLabel(item.furnishing)}
                          </span>
                        )}
                        {item.occupancyType && getOccupancyLabel(item.occupancyType) && (
                          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200/60">
                            {getOccupancyLabel(item.occupancyType)}
                          </span>
                        )}
                        {item.foodPreference && getFoodPrefLabel(item.foodPreference) && (
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            {getFoodPrefLabel(item.foodPreference)}
                          </span>
                        )}
                        {item.availableFrom && (
                          <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-200/60">
                            {getAvailabilityLabel(item.availableFrom)}
                          </span>
                        )}
                      </div>

                      {/* Tap for Full Details */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#1A3FAA]">
                        <span>View Specifications & Contact Owner</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ADD LISTING FORM */}
        {activeMainTab === 'give_listing' && (
          <div className="p-4 space-y-4 max-w-lg mx-auto text-left">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
              <h2 className="text-base font-black text-slate-900">Post New Property Listing</h2>
              <p className="text-xs text-slate-500 font-semibold">
                Publish your property mandate to thousands of brokers & verified clients for ₹50.
              </p>
            </div>

            <form onSubmit={handleListingFormSubmit} className="space-y-4">
              {/* Title & Type */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <label className="text-xs font-extrabold text-slate-900 block">Property Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 3 BHK Luxury Apartment in Koramangala"
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 font-bold"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Intent</label>
                    <select
                      value={newActionType}
                      onChange={(e) => setNewActionType(e.target.value as any)}
                      className="w-full p-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="give_rent">Give on Rent</option>
                      <option value="buy">Buy Requirement</option>
                      <option value="sell">Sell Property</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={newPropertyType}
                      onChange={(e) => setNewPropertyType(e.target.value as any)}
                      className="w-full p-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="pg">PG / Co-Living</option>
                      <option value="hostel">Hostel</option>
                      <option value="apartment">Apartment / Flat</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price & Location */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Price / Rent (₹) *</label>
                    <input
                      type="text"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. ₹ 45,000 / mo"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Deposit (₹)</label>
                    <input
                      type="text"
                      value={newDeposit}
                      onChange={(e) => setNewDeposit(e.target.value)}
                      placeholder="e.g. ₹ 1.5 Lakhs"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Locality / Area *</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Koramangala 4th Block, Bangalore"
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Exact door number, building name & street..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 block">
                    Property Gallery ({uploadedPhotos.length} Photos) *
                  </label>
                  <span className="text-[10px] text-slate-400 font-bold">Max 5 Photos</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {uploadedPhotos.map((photoUrl, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden h-24 border border-slate-200 bg-slate-900 group">
                      <img src={photoUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1.5 right-1.5 bg-slate-900/80 text-white p-1 rounded-full hover:bg-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {uploadedPhotos.length < 5 && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextPhoto = PRESET_SAMPLE_PHOTOS[uploadedPhotos.length % PRESET_SAMPLE_PHOTOS.length];
                        setUploadedPhotos([...uploadedPhotos, nextPhoto.url]);
                      }}
                      className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-900 bg-slate-50 flex flex-col items-center justify-center p-2 h-24 transition-all cursor-pointer text-slate-600"
                    >
                      <Plus className="w-5 h-5 text-teal-600 mb-1" />
                      <span className="text-[10px] font-bold">Add Photo</span>
                    </button>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 btn-brand active:scale-[0.99] font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Pay ₹50 Listing Fee</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ACTIVITY / FAVORITES FEED */}
        {activeMainTab === 'activity' && (
          <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-[#0A0D14] animate-fadeIn pb-12">
            {/* Activity Header */}
            <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0A0D14]/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shadow-2xs">
              <button
                onClick={() => setActiveMainTab('explore')}
                className="p-1.5 -ml-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <div className="flex-1 text-center pr-6">
                <h2 className="text-base font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Broker Activity
                </h2>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                  Saved Favorites & Watch History
                </span>
              </div>
            </div>

            {/* Sub-Tab Switcher */}
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-w-lg mx-auto w-full">
              {/* SUB-TAB 1: FAVORITES */}
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
                          Tap the heart icon on any property card to bookmark it for fast client reference.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveMainTab('explore')}
                        className="px-5 py-2.5 btn-brand text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        Explore Feed
                      </button>
                    </div>
                  ) : (
                    listings
                      .filter((item) => savedPropertyIds.includes(item.id))
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedPropertyDetail(item);
                            setWatchHistoryIds((prev) => prev.includes(item.id) ? prev : [item.id, ...prev]);
                          }}
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
                                    item.actionType === 'give_rent'
                                      ? 'bg-teal-500 text-slate-950 border-teal-300'
                                      : 'bg-amber-400 text-slate-950 border-amber-300'
                                  }`}>
                                    {item.actionType === 'give_rent' ? 'For Rent' : 'For Sale'}
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
                  {watchHistoryIds.length === 0 ? (
                    <div className="p-8 bg-white dark:bg-[#0D1117] rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3 my-4 shadow-2xs">
                      <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                        <Clock className="w-7 h-7 stroke-[2]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">No Viewed Properties</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                          Properties you inspect will automatically appear here for quick history tracking.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveMainTab('explore')}
                        className="px-5 py-2.5 btn-brand text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        Browse Feed
                      </button>
                    </div>
                  ) : (
                    listings
                      .filter((item) => watchHistoryIds.includes(item.id))
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedPropertyDetail(item);
                          }}
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
                                    item.actionType === 'give_rent'
                                      ? 'bg-teal-500 text-slate-950 border-teal-300'
                                      : 'bg-amber-400 text-slate-950 border-amber-300'
                                  }`}>
                                    {item.actionType === 'give_rent' ? 'For Rent' : 'For Sale'}
                                  </span>
                                  
                                  <button
                                    onClick={(e) => toggleFavorite(item.id, e)}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                                    title={savedPropertyIds.includes(item.id) ? 'Remove from favorites' : 'Save to favorites'}
                                  >
                                    <Heart className={`w-4 h-4 ${savedPropertyIds.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
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
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-0.5">
                                  Viewed <ChevronRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM NAVIGATION BAR */}
      <div className="sticky bottom-0 z-30 bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.05)] flex items-center justify-around text-center">
        {/* Tab 1: Explore Feed */}
        <button
          onClick={() => setActiveMainTab('explore')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'explore' ? 'text-[#1A3FAA] dark:text-sky-400 font-black' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>

        {/* Tab 2: Add Listing */}
        <button
          onClick={() => setActiveMainTab('give_listing')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'give_listing' ? 'text-[#1A3FAA] dark:text-sky-400 font-black' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-2 bg-[#0097A7] text-white text-[7.5px] font-black px-1 rounded-full border border-white shadow-2xs">
              ₹50
            </span>
          </div>
          <span className="text-[10px] font-bold">Add Listing</span>
        </button>

        {/* Tab 3: Activity / Favorites */}
        <button
          onClick={() => setActiveMainTab('activity')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'activity' ? 'text-[#1A3FAA] dark:text-sky-400 font-black' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Heart className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Activity</span>
        </button>

        {/* Tab 4: All Categories Menu */}
        <button
          onClick={() => setActiveMainTab('menu')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 cursor-pointer transition-all ${
            activeMainTab === 'menu' ? 'text-[#1A3FAA] dark:text-[#1A3FAA] font-black' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>
    </div>
  );
};
