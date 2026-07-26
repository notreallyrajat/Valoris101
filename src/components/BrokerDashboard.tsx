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
  Image as ImageIcon,
  Trash2,
  ChevronLeft,
  Plus,
  Compass,
  ArrowLeft
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
    price: '₹ 45,000 / mo',
    deposit: '₹ 1.5 Lakhs',
    location: 'Koramangala 4th Block, Bangalore',
    address: 'Flat 402, Skyline Residency, 8th Main Road, Koramangala',
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
  const [activeTab, setActiveTab] = useState<'explore' | 'give_listing'>('explore');

  // Active Image Index map for explore feed gallery carousels: { listingId: activeIndex }
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Filters state
  const [actionFilter, setActionFilter] = useState<'all' | 'buy' | 'sell' | 'give_rent'>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'pg' | 'hostel' | 'apartment'>('all');
  const [limitSetFilter, setLimitSetFilter] = useState<'all' | 'negotiable' | 'non_negotiable'>('all');
  const [furnishingFilter, setFurnishingFilter] = useState<'all' | 'fully_furnished' | 'semifurnished' | 'unfurnished'>('all');
  const [foodPrefFilter, setFoodPrefFilter] = useState<'all' | 'vegetarian' | 'non_vegetarian' | 'both'>('all');
  const [occupancyFilter, setOccupancyFilter] = useState<'all' | 'coed' | 'girls_only' | 'boys_only' | 'family_only' | 'bachelors_only' | 'students_only'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
  const [newMaintenanceFee, setNewMaintenanceFee] = useState('');
  const [newLockInPeriod, setNewLockInPeriod] = useState('6 Months');
  const [newRoomType, setNewRoomType] = useState('Single & Twin Sharing');
  const [newFoodPolicy, setNewFoodPolicy] = useState('3 Meals Included');
  const [newTargetTenant, setNewTargetTenant] = useState('Working Professionals & Students');

  const [newAvailability, setNewAvailability] = useState<'immediate' | 'two_weeks' | 'one_month' | 'three_months' | 'six_months'>('immediate');

  // Buy/Sell specifics
  const [newPricePerSqFt, setNewPricePerSqFt] = useState('');
  const [newPossessionStatus, setNewPossessionStatus] = useState('Ready to Move');
  const [newOwnershipType, setNewOwnershipType] = useState('Freehold (Clear Title)');

  const [newLimitSet, setNewLimitSet] = useState<'negotiable' | 'non_negotiable'>('negotiable');
  const [newFurnishing, setNewFurnishing] = useState<'fully_furnished' | 'semifurnished' | 'unfurnished'>('fully_furnished');
  const [newAmenities, setNewAmenities] = useState<string[]>(['WiFi', 'AC', 'Housekeeping']);

  // Photo Gallery Form State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    PRESET_SAMPLE_PHOTOS[0].url,
    PRESET_SAMPLE_PHOTOS[1].url,
    PRESET_SAMPLE_PHOTOS[2].url,
  ]);
  const [customPhotoInput, setCustomPhotoInput] = useState('');

  // Modals & Fee state
  const [showListingFeeModal, setShowListingFeeModal] = useState(false);
  const [pendingListing, setPendingListing] = useState<ListingItem | null>(null);
  const [isProcessingListingFee, setIsProcessingListingFee] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAmenity = (amenity: string) => {
    if (newAmenities.includes(amenity)) {
      setNewAmenities(newAmenities.filter((a) => a !== amenity));
    } else {
      setNewAmenities([...newAmenities, amenity]);
    }
  };

  const handleAddPhotoUrl = (urlToAdd: string) => {
    if (!urlToAdd.trim()) return;
    if (uploadedPhotos.includes(urlToAdd.trim())) {
      alert('This photo is already added to the gallery');
      return;
    }
    setUploadedPhotos([...uploadedPhotos, urlToAdd.trim()]);
    setCustomPhotoInput('');
  };

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
      setActiveTab('explore');
    }, 1200);
  };

  // Gallery Navigation helper for explore feed cards
  const handlePrevImage = (listingId: string, totalImages: number) => {
    const currentIdx = activeImageIndices[listingId] || 0;
    const prevIdx = currentIdx === 0 ? totalImages - 1 : currentIdx - 1;
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

  // Filter & Sort listings
  const filteredListings = listings
    .filter((item) => {
      if (actionFilter !== 'all' && item.actionType !== actionFilter) return false;
      if (propertyTypeFilter !== 'all' && item.propertyType !== propertyTypeFilter) return false;
      if (limitSetFilter !== 'all' && item.limitSet !== limitSetFilter) return false;
      if (furnishingFilter !== 'all' && item.furnishing !== furnishingFilter) return false;
      if (foodPrefFilter !== 'all' && item.foodPreference !== foodPrefFilter) return false;
      if (occupancyFilter !== 'all' && item.occupancyType !== occupancyFilter) return false;
      if (availabilityFilter !== 'all' && item.availableFrom !== availabilityFilter) return false;
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

  // Helper labels
  const getFoodPrefLabel = (f?: string) => {
    switch (f) {
      case 'vegetarian': return '🥦 Vegetarian Only';
      case 'non_vegetarian': return '🍗 Non-Vegetarian';
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

  const getFurnishingLabel = (f?: 'fully_furnished' | 'semifurnished' | 'unfurnished') => {
    switch (f) {
      case 'fully_furnished':
        return 'Fully Furnished';
      case 'semifurnished':
        return 'Semi-Furnished';
      case 'unfurnished':
        return 'Unfurnished';
      default:
        return 'Fully Furnished';
    }
  };

  const getActionBadgeStyle = (action: 'buy' | 'sell' | 'give_rent') => {
    switch (action) {
      case 'buy':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'sell':
        return 'bg-sky-50 text-sky-700 border-sky-200/80';
      case 'give_rent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
  };

  const getActionLabel = (action: 'buy' | 'sell' | 'give_rent') => {
    switch (action) {
      case 'buy':
        return 'Buying Requirement';
      case 'sell':
        return 'For Sale';
      case 'give_rent':
        return 'Give on Rent';
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
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
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

      <div>
        {/* Ultra-Professional Navigation Bar with Icon & Text Below */}
        <div className="bg-white/95 backdrop-blur-md py-2 px-4 border-b border-slate-200/70 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center justify-center gap-10 max-w-xs mx-auto">
            {/* Tab 1: Explore Feed */}
            <button
              onClick={() => setActiveTab('explore')}
              className="flex flex-col items-center gap-1 transition-all cursor-pointer group"
            >
              <div
                className={`p-2 rounded-2xl transition-all flex items-center justify-center ${
                  activeTab === 'explore'
                    ? 'bg-[#007a6e] text-white shadow-sm scale-105'
                    : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Compass className="w-5 h-5 stroke-[2]" />
              </div>
              <span
                className={`text-xs font-extrabold tracking-tight ${
                  activeTab === 'explore' ? 'text-[#007a6e]' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                Explore
              </span>
            </button>

            {/* Tab 2: Add Listing */}
            <button
              onClick={() => setActiveTab('give_listing')}
              className="flex flex-col items-center gap-1 transition-all cursor-pointer group"
            >
              <div
                className={`p-2 rounded-2xl transition-all flex items-center justify-center relative ${
                  activeTab === 'give_listing'
                    ? 'bg-[#092C3E] text-white shadow-sm scale-105'
                    : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span className="absolute -top-1 -right-1.5 bg-teal-500 text-slate-950 text-[8px] font-black px-1 rounded-full border border-white shadow-2xs">
                  ₹50
                </span>
              </div>
              <span
                className={`text-xs font-extrabold tracking-tight ${
                  activeTab === 'give_listing' ? 'text-[#092C3E]' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                Add
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: EXPLORE FEED */}
        {activeTab === 'explore' && (
          <div className="p-4 space-y-3.5 max-w-lg mx-auto">
            


            {/* Search Bar & Filter Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search location, address, plot size..."
                  className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 font-medium shadow-xs transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2.5 border rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-xs ${
                  showFilters || actionFilter !== 'all' || propertyTypeFilter !== 'all' || limitSetFilter !== 'all' || furnishingFilter !== 'all' || foodPrefFilter !== 'all' || occupancyFilter !== 'all' || availabilityFilter !== 'all'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  Filters
                  {((actionFilter !== 'all' ? 1 : 0) + (propertyTypeFilter !== 'all' ? 1 : 0) + (limitSetFilter !== 'all' ? 1 : 0) + (furnishingFilter !== 'all' ? 1 : 0) + (foodPrefFilter !== 'all' ? 1 : 0) + (occupancyFilter !== 'all' ? 1 : 0) + (availabilityFilter !== 'all' ? 1 : 0)) > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-teal-400 text-slate-950 rounded-full text-[10px] font-extrabold">
                      {(actionFilter !== 'all' ? 1 : 0) + (propertyTypeFilter !== 'all' ? 1 : 0) + (limitSetFilter !== 'all' ? 1 : 0) + (furnishingFilter !== 'all' ? 1 : 0) + (foodPrefFilter !== 'all' ? 1 : 0) + (occupancyFilter !== 'all' ? 1 : 0) + (availabilityFilter !== 'all' ? 1 : 0)}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* ULTRA-PROFESSIONAL FILTER POPUP MODAL (FULL IN-APP SCREEN) */}
            {showFilters && (
              <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-4 overflow-y-auto animate-fadeIn text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#007a6e] flex items-center justify-center font-bold">
                        <SlidersHorizontal className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Refine Property Search</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Filter by mode, category, flexibility & furnishing</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 1. Transaction Purpose */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Transaction Mode:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'all', label: 'All Modes' },
                        { id: 'give_rent', label: '🔑 Rent' },
                        { id: 'buy', label: '🛒 Buy' },
                        { id: 'sell', label: '🏷️ Sell' },
                      ].map((act) => (
                        <button
                          key={act.id}
                          onClick={() => setActionFilter(act.id as any)}
                          className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            actionFilter === act.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Property Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Property Types:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'all', label: 'All Types' },
                        { id: 'pg', label: '🏠 PG' },
                        { id: 'hostel', label: '🏢 Hostel' },
                        { id: 'apartment', label: '🏬 Apt' },
                      ].map((pt) => (
                        <button
                          key={pt.id}
                          onClick={() => setPropertyTypeFilter(pt.id as any)}
                          className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            propertyTypeFilter === pt.id
                              ? 'bg-[#007a6e] text-white border-[#007a6e] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Price Flexibility */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Price Flexibility:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'negotiable', label: '🟢 Price: Negotiable' },
                        { id: 'non_negotiable', label: '🔴 Price: Non-Negotiable' },
                      ].map((lim) => (
                        <button
                          key={lim.id}
                          onClick={() => setLimitSetFilter(limitSetFilter === lim.id ? 'all' : lim.id as any)}
                          className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${
                            limitSetFilter === lim.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {lim.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Furnishing */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Furnishing State:
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'fully_furnished', label: 'Furnished' },
                        { id: 'semifurnished', label: 'Semi-Furn.' },
                        { id: 'unfurnished', label: 'Unfurnished' },
                      ].map((fur) => (
                        <button
                          key={fur.id}
                          onClick={() => setFurnishingFilter(fur.id as any)}
                          className={`py-2.5 px-1.5 text-[10px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            furnishingFilter === fur.id
                              ? 'bg-[#007a6e] text-white border-[#007a6e] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {fur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Food Preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      🥗 Food Preference:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'vegetarian', label: '🥦 Vegetarian' },
                        { id: 'non_vegetarian', label: '🍗 Non-Veg' },
                        { id: 'both', label: '🍽️ Both' },
                      ].map((fp) => (
                        <button
                          key={fp.id}
                          onClick={() => setFoodPrefFilter(foodPrefFilter === fp.id ? 'all' : fp.id as any)}
                          className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            foodPrefFilter === fp.id
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {fp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Occupancy / Tenant Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      🏠 Occupancy / Allowed Tenants:
                    </label>
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
                          className={`py-2.5 px-2 text-[10px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            occupancyFilter === oc.id
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {oc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 7. Availability / Move-in Timeline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      📅 Availability / Move-in Timeline:
                    </label>
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
                          className={`py-2.5 px-2 text-[10px] font-bold rounded-xl border transition-all cursor-pointer truncate ${
                            availabilityFilter === av.id
                              ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                          }`}
                        >
                          {av.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter Popup Footer Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => {
                      setActionFilter('all');
                      setPropertyTypeFilter('all');
                      setLimitSetFilter('all');
                      setFurnishingFilter('all');
                      setFoodPrefFilter('all');
                      setOccupancyFilter('all');
                      setAvailabilityFilter('all');
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer px-2"
                  >
                    Reset All
                  </button>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3.5 bg-[#007a6e] hover:bg-[#006258] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer text-center"
                  >
                    Apply Filters ({filteredListings.length} Matches)
                  </button>
                </div>
              </div>
            )}

            {/* LISTINGS FEED CARDS */}
            <div className="space-y-4 pt-1">
              {filteredListings.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                  <Building className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">No properties match your filter criteria</p>
                  <button
                    onClick={() => {
                      setActionFilter('all');
                      setPropertyTypeFilter('all');
                      setLimitSetFilter('all');
                      setFurnishingFilter('all');
                      setFoodPrefFilter('all');
                      setOccupancyFilter('all');
                      setAvailabilityFilter('all');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredListings.map((item) => {
                  const propertyImages = item.images && item.images.length > 0 ? item.images : [PRESET_SAMPLE_PHOTOS[0].url];
                  const currentImageIdx = activeImageIndices[item.id] || 0;
                  const activePhotoUrl = propertyImages[currentImageIdx] || propertyImages[0];

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPropertyDetail(item)}
                      className="bg-white rounded-3xl border border-slate-200/80 text-left p-4 space-y-3 transition-all duration-200 relative group shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-[#007a6e]/40 hover:shadow-md cursor-pointer active:scale-[0.99]"
                    >
                      {/* MULTI-PHOTO GALLERY COVER */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 group/gallery h-44 sm:h-48 w-full border border-slate-100 shadow-inner">
                        <img
                          src={activePhotoUrl}
                          alt={`${item.title} angle ${currentImageIdx + 1}`}
                          className="w-full h-full object-cover transition-all duration-300 group-hover/gallery:scale-105"
                        />
                        
                        {/* Overlay Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-xs">
                            <Camera className="w-3 h-3 text-teal-400" />
                            {propertyImages.length} Photos
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
                              className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-md cursor-pointer active:scale-95"
                              title="Previous angle photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage(item.id, propertyImages.length);
                              }}
                              className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-md cursor-pointer active:scale-95"
                              title="Next angle photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${getActionBadgeStyle(
                              item.actionType
                            )}`}
                          >
                            {getActionLabel(item.actionType)}
                          </span>

                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200/60 uppercase">
                            {item.propertyType}
                          </span>

                          <span className="text-[10px] font-medium bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-lg border border-teal-200/60">
                            {getFurnishingLabel(item.furnishing)}
                          </span>
                        </div>

                        {/* Price Flexibility Pill */}
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            item.limitSet === 'negotiable'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {item.limitSet === 'negotiable' ? '🟢 Price: Negotiable' : '🔴 Price: Non-Negotiable'}
                        </span>
                      </div>

                      {/* Title & Rough Location */}
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#007a6e] transition-colors">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
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

                      {/* Pricing & View Details Action Footer */}
                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">
                            {item.actionType === 'give_rent' ? 'Monthly Rent:' : 'Property Price:'}
                          </span>
                          <span className="text-sm font-black text-slate-900">{item.price}</span>
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
        )}

        {/* TAB 2: GIVE ON LISTING FORM */}
        {activeTab === 'give_listing' && (
          <form onSubmit={handleListingFormSubmit} className="p-4 space-y-4 max-w-lg mx-auto animate-fadeIn text-left">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Post New Property Listing
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Publish your listing to the Valoris broker network
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs">
                  ₹50 / Listing
                </span>
              </div>

              {/* 1. Transaction Purpose */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  1. Transaction Purpose <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'give_rent', label: '🔑 Give on Rent' },
                    { id: 'sell', label: '🏷️ Sell Property' },
                    { id: 'buy', label: '🛒 Buy Mandate' },
                  ].map((mode) => (
                    <button
                      type="button"
                      key={mode.id}
                      onClick={() => setNewActionType(mode.id as any)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        newActionType === mode.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Listing Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  2. Property Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'pg', label: '🏠 PG (Paying Guest)' },
                    { id: 'hostel', label: '🏢 Hostel' },
                    { id: 'apartment', label: '🏢 Apartment / Land' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setNewPropertyType(cat.id as any)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        newPropertyType === cat.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Basic Details */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Starlight Co-Living PG for Men & Women"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-800 block mb-1">
                      Locality / Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Koramangala 4th Block"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-800 block mb-1">
                      Plot Size / Area (sq ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newPlotSize}
                      onChange={(e) => setNewPlotSize(e.target.value)}
                      placeholder="e.g. 2,400 sq ft (30 x 80)"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Full Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="e.g. House #42, 8th Main Road, Koramangala 4th Block"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 text-slate-900 font-medium transition-all"
                  />
                </div>
              </div>

              {/* 4. DYNAMIC UI BASED ON RENTING VS SALE/BUY */}
              {newActionType === 'give_rent' ? (
                /* Renting UI */
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                    <Home className="w-4 h-4 text-teal-600" />
                    Renting & Lease Specifications
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                        Rent Amount / Month (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="e.g. 14,500 / mo"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                        Security Deposit (₹)
                      </label>
                      <input
                        type="text"
                        value={newDeposit}
                        onChange={(e) => setNewDeposit(e.target.value)}
                        placeholder="e.g. 25,000"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                        Maintenance Fee (₹)
                      </label>
                      <input
                        type="text"
                        value={newMaintenanceFee}
                        onChange={(e) => setNewMaintenanceFee(e.target.value)}
                        placeholder="e.g. ₹ 1,200 / mo"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                        Lock-in Period
                      </label>
                      <input
                        type="text"
                        value={newLockInPeriod}
                        onChange={(e) => setNewLockInPeriod(e.target.value)}
                        placeholder="e.g. 6 Months"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>
                  </div>

                  {(newPropertyType === 'pg' || newPropertyType === 'hostel') && (
                    <div className="space-y-2 pt-1 border-t border-slate-200">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                            Room Sharing Types
                          </label>
                          <input
                            type="text"
                            value={newRoomType}
                            onChange={(e) => setNewRoomType(e.target.value)}
                            placeholder="Single & Twin Sharing"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                            Food / Mess Policy
                          </label>
                          <input
                            type="text"
                            value={newFoodPolicy}
                            onChange={(e) => setNewFoodPolicy(e.target.value)}
                            placeholder="3 Meals Included"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                          Target Tenant Category
                        </label>
                        <input
                          type="text"
                          value={newTargetTenant}
                          onChange={(e) => setNewTargetTenant(e.target.value)}
                          placeholder="e.g. Working Professionals & Students"
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Buy / Sell UI */
                <div className="space-y-3 bg-indigo-50/50 p-3.5 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 border-b border-indigo-200/80 pb-1.5">
                    <Building className="w-4 h-4 text-indigo-700" />
                    Sale / Buying Mandate Specifications
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-800 block mb-0.5">
                        {newActionType === 'sell' ? 'Selling Price (₹)' : 'Target Budget (₹)'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="e.g. 1.45 Cr"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-800 block mb-0.5">
                        Price per Sq Ft (₹/sq ft)
                      </label>
                      <input
                        type="text"
                        value={newPricePerSqFt}
                        onChange={(e) => setNewPricePerSqFt(e.target.value)}
                        placeholder="e.g. ₹ 8,050 / sq ft"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                        Possession Status
                      </label>
                      <select
                        value={newPossessionStatus}
                        onChange={(e) => setNewPossessionStatus(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium"
                      >
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="New Launch">New Launch</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                        Ownership Title
                      </label>
                      <select
                        value={newOwnershipType}
                        onChange={(e) => setNewOwnershipType(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium"
                      >
                        <option value="Freehold (Clear Title)">Freehold (Clear Title)</option>
                        <option value="Leasehold">Leasehold</option>
                        <option value="Co-op Society">Co-op Society</option>
                        <option value="Power of Attorney">Power of Attorney</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Price Policy */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  5. Price Policy
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewLimitSet('negotiable')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      newLimitSet === 'negotiable'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>🟢 Price: Negotiable</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewLimitSet('non_negotiable')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      newLimitSet === 'non_negotiable'
                        ? 'bg-slate-100 border-slate-700 text-slate-900 font-bold ring-1 ring-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>🔴 Price: Non-Negotiable</span>
                  </button>
                </div>
              </div>

              {/* 6. Furnishing Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  6. Furnishing Status
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'fully_furnished', label: '🛋️ Fully Furnished' },
                    { id: 'semifurnished', label: '🛋️ Semi-Furnished' },
                    { id: 'unfurnished', label: '📦 Unfurnished' },
                  ].map((fur) => (
                    <button
                      type="button"
                      key={fur.id}
                      onClick={() => setNewFurnishing(fur.id as any)}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer ${
                        newFurnishing === fur.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {fur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Availability / Move-in Timeline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  7. 📅 Availability / Move-in Date
                </label>
                <p className="text-[10px] text-slate-500 font-medium -mt-0.5">When will this property be available?</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'immediate', label: '🟢 Available Now' },
                    { id: 'two_weeks', label: '📅 In 2 Weeks' },
                    { id: 'one_month', label: '📅 In 1 Month' },
                    { id: 'three_months', label: '📅 In 3 Months' },
                    { id: 'six_months', label: '📅 In 6 Months' },
                  ].map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setNewAvailability(av.id as any)}
                      className={`py-2 px-1 text-[10px] font-semibold rounded-xl border transition-all cursor-pointer ${
                        newAvailability === av.id
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {av.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 8. MULTI-PHOTO GALLERY UPLOAD SECTION */}
              <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-teal-600" />
                    <label className="text-xs font-bold text-slate-900 block">
                      7. Property Photo Gallery (Multi-Angle Photos) <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                    {uploadedPhotos.length} Photos Attached
                  </span>
                </div>

                {/* Preset Angle Buttons */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold block">Quick Add Angle Presets:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {PRESET_SAMPLE_PHOTOS.map((preset, pIdx) => (
                      <button
                        type="button"
                        key={pIdx}
                        onClick={() => handleAddPhotoUrl(preset.url)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-700 flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-3 h-3 text-teal-600" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Photo URL Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={customPhotoInput}
                    onChange={(e) => setCustomPhotoInput(e.target.value)}
                    placeholder="Paste custom photo URL (https://...)"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddPhotoUrl(customPhotoInput)}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Add URL
                  </button>
                </div>

                {/* Thumbnails List */}
                {uploadedPhotos.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                    {uploadedPhotos.map((photoUrl, pIdx) => (
                      <div key={pIdx} className="relative rounded-xl overflow-hidden group border border-slate-200 bg-slate-900 h-20 shadow-xs">
                        <img src={photoUrl} alt={`Angle ${pIdx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-slate-950/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          Angle #{pIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(pIdx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs hover:bg-red-700 transition-all cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-xl border border-dashed border-slate-300 text-center space-y-1">
                    <ImageIcon className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-[11px] font-medium text-slate-500">No photos added yet. Click preset angles above or add custom URLs.</p>
                  </div>
                )}
              </div>

              {/* 8. Amenities */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  8. Amenities Included
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['WiFi', 'AC', 'Housekeeping', 'Power Backup', 'Gym', 'CCTV Security', 'Elevator', 'Clubhouse'].map(
                    (am) => {
                      const isSelected = newAmenities.includes(am);
                      return (
                        <button
                          type="button"
                          key={am}
                          onClick={() => toggleAmenity(am)}
                          className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? `✓ ${am}` : `+ ${am}`}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Pay ₹50 & Publish Listing ({uploadedPhotos.length} Photos)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>


    </div>
  );
};
