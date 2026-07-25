import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  CheckCircle2,
  MapPin,
  Utensils,
  BedDouble,
  PhoneCall,
  SlidersHorizontal,
  X,
  Building,
  MessageSquare,
  Lock,
  CreditCard,
  Smartphone,
  Ruler,
  Home,
  Check,
  ChevronRight,
  Camera,
  Image as ImageIcon,
  Trash2,
  ChevronLeft,
  Plus,
  Compass
} from 'lucide-react';

export interface ListingItem {
  id: string;
  title: string;
  actionType: 'buy' | 'sell' | 'give_rent'; // Buy, Sell, Give on listing
  propertyType: 'pg' | 'hostel' | 'apartment'; // PG, Hostel, Apartment
  price: string;
  deposit?: string;
  limitSet: 'negotiable' | 'non_negotiable'; // Negotiable or Non-Negotiable
  furnishing: 'fully_furnished' | 'semifurnished' | 'unfurnished'; // Fully furnished, unfurnished, semifurnished
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
  rating: string;
  isVerified?: boolean;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  isSponsored?: boolean;
  sponsoredBid?: number; // Bid amount in ₹
  images: string[]; // Multi-angle gallery images
}

const PRESET_SAMPLE_PHOTOS = [
  { label: 'Front View', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
  { label: 'Living Room', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kitchen & Dining', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Washroom & Balcony', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
];

const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: 'b-101',
    title: 'Starlight Co-Living PG for Professionals',
    actionType: 'give_rent',
    propertyType: 'pg',
    price: '₹ 14,500 / mo',
    deposit: '₹ 25,000',
    limitSet: 'negotiable',
    furnishing: 'fully_furnished',
    location: 'Koramangala 4th Block, Bangalore',
    address: 'Plot #42, 8th Main Road, Koramangala 4th Block',
    plotSize: '2,400 sq ft (Carpet Area)',
    maintenanceFee: '₹ 1,200 / mo',
    lockInPeriod: '6 Months Lock-in',
    roomType: 'Single & Twin Sharing',
    foodPolicy: '3 Meals Included (Veg & Non-Veg)',
    targetTenant: 'Working Professionals & Students',
    amenities: ['WiFi', 'AC', 'Housekeeping', 'Power Backup', 'Gym'],
    rating: '4.9',
    isVerified: true,
    contactName: 'Rajat Sharma (Broker)',
    contactPhone: '+91 98765 43210',
    contactEmail: 'rajat.broker@valoris.com',
    isSponsored: true,
    sponsoredBid: 500,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'b-102',
    title: 'Metro Executive Student Hostel',
    actionType: 'give_rent',
    propertyType: 'hostel',
    price: '₹ 9,800 / mo',
    deposit: '₹ 15,000',
    limitSet: 'non_negotiable',
    furnishing: 'semifurnished',
    location: 'Indiranagar 100ft Road, Bangalore',
    address: 'Building #108, 100ft Road, Opposite Metro Station',
    plotSize: '4,500 sq ft (Total Built-up)',
    maintenanceFee: 'Inclusive',
    lockInPeriod: '3 Months Lock-in',
    roomType: 'Triple & Four Sharing',
    foodPolicy: 'Breakfast & Dinner Included',
    targetTenant: 'College Students & Interns',
    amenities: ['WiFi', 'CCTV Security', 'Laundry', 'Study Hall'],
    rating: '4.7',
    isVerified: true,
    contactName: 'Ankit Mehta (Broker)',
    contactPhone: '+91 98123 76543',
    contactEmail: 'ankit.broker@valoris.com',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

  const getFurnishingLabel = (f: 'fully_furnished' | 'semifurnished' | 'unfurnished') => {
    switch (f) {
      case 'fully_furnished':
        return 'Fully Furnished';
      case 'semifurnished':
        return 'Semi-Furnished';
      case 'unfurnished':
        return 'Unfurnished';
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
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

      <div>
        {/* Ultra-Slim Icon-Only Navigation Bar */}
        <div className="bg-white/95 backdrop-blur-md py-1.5 px-4 border-b border-slate-200/70 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center justify-center gap-6 max-w-xs mx-auto">
            {/* Tab 1: Explore Feed */}
            <button
              onClick={() => setActiveTab('explore')}
              title="Explore Feed"
              className={`p-2 rounded-2xl transition-all cursor-pointer flex items-center justify-center relative ${
                activeTab === 'explore'
                  ? 'bg-[#007a6e] text-white shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
            </button>

            {/* Tab 2: List Property (₹50) */}
            <button
              onClick={() => setActiveTab('give_listing')}
              title="List Property (₹50)"
              className={`p-2 rounded-2xl transition-all cursor-pointer flex items-center justify-center relative ${
                activeTab === 'give_listing'
                  ? 'bg-[#092C3E] text-white shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span className="absolute -top-1 -right-1.5 bg-teal-500 text-slate-950 text-[8px] font-black px-1 rounded-full border border-white shadow-2xs">
                ₹50
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: EXPLORE FEED */}
        {activeTab === 'explore' && (
          <div className="p-4 space-y-3.5 max-w-lg mx-auto">
            
            {/* Pass Status Alert Banner */}
            {!isPaidMember && (
              <div className="bg-white border border-slate-200/80 p-3 rounded-2xl shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Contact Phone Numbers Locked</span>
                    <span className="text-[11px] text-slate-500 font-medium">Unlock full broker contacts for ₹399</span>
                  </div>
                </div>
                <button
                  onClick={onProceedToPayment}
                  className="px-3 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer hover:bg-slate-800 transition-all"
                >
                  Pay ₹399
                </button>
              </div>
            )}

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
                  showFilters || actionFilter !== 'all' || propertyTypeFilter !== 'all' || limitSetFilter !== 'all' || furnishingFilter !== 'all'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  Filters
                  {((actionFilter !== 'all' ? 1 : 0) + (propertyTypeFilter !== 'all' ? 1 : 0) + (limitSetFilter !== 'all' ? 1 : 0) + (furnishingFilter !== 'all' ? 1 : 0)) > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-teal-400 text-slate-950 rounded-full text-[10px] font-extrabold">
                      {(actionFilter !== 'all' ? 1 : 0) + (propertyTypeFilter !== 'all' ? 1 : 0) + (limitSetFilter !== 'all' ? 1 : 0) + (furnishingFilter !== 'all' ? 1 : 0)}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* ULTRA-PROFESSIONAL FILTER DROPDOWN PANEL */}
            {showFilters && (
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-4 animate-scaleUp text-left border-t-2 border-t-slate-900">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-slate-900" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Refine Property Search
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {(actionFilter !== 'all' || propertyTypeFilter !== 'all' || limitSetFilter !== 'all' || furnishingFilter !== 'all') && (
                      <button
                        onClick={() => {
                          setActionFilter('all');
                          setPropertyTypeFilter('all');
                          setLimitSetFilter('all');
                          setFurnishingFilter('all');
                        }}
                        className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        Reset All
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
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
                        className={`py-1.5 px-2 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer truncate ${
                          actionFilter === act.id
                            ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
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
                    Property Category:
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
                        className={`py-1.5 px-2 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer truncate ${
                          propertyTypeFilter === pt.id
                            ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                        }`}
                      >
                        {pt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Limit Set */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Price Limit Flexibility:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'all', label: 'All Limits' },
                      { id: 'negotiable', label: '🟢 Negotiable' },
                      { id: 'non_negotiable', label: '🔴 Fixed Limit' },
                    ].map((lim) => (
                      <button
                        key={lim.id}
                        onClick={() => setLimitSetFilter(lim.id as any)}
                        className={`py-1.5 px-2 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer ${
                          limitSetFilter === lim.id
                            ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
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
                        className={`py-1.5 px-1.5 text-[10px] font-semibold rounded-xl border transition-all cursor-pointer truncate ${
                          furnishingFilter === fur.id
                            ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                        }`}
                      >
                        {fur.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dropdown Action Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Showing <strong>{filteredListings.length}</strong> listings
                  </span>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    Apply & View Results
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
                      className="bg-white rounded-3xl border border-slate-200/80 text-left p-4 space-y-3 transition-all duration-200 relative group shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-md"
                    >
                      {/* MULTI-PHOTO GALLERY CAROUSEL COVER */}
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
                            {currentImageIdx + 1} / {propertyImages.length} Photos
                          </span>
                        </div>

                        {/* Navigation Arrows (Visible on multi-image properties) */}
                        {propertyImages.length > 1 && (
                          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                            <button
                              onClick={() => handlePrevImage(item.id, propertyImages.length)}
                              className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-md cursor-pointer active:scale-95"
                              title="Previous angle photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleNextImage(item.id, propertyImages.length)}
                              className="pointer-events-auto w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-md cursor-pointer active:scale-95"
                              title="Next angle photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Bottom Thumbnail Strip on Image */}
                        {propertyImages.length > 1 && (
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1.5 p-1 bg-slate-950/60 backdrop-blur-md rounded-xl overflow-x-auto">
                            {propertyImages.map((imgUrl, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => handleSelectImage(item.id, imgIdx)}
                                className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                                  currentImageIdx === imgIdx
                                    ? 'border-teal-400 ring-2 ring-teal-400/40 scale-105'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={imgUrl} alt={`Angle ${imgIdx + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
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

                        {/* Limit Flexibility Pill */}
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            item.limitSet === 'negotiable'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {item.limitSet === 'negotiable' ? '🟢 Limit: Negotiable' : '🔴 Limit: Fixed'}
                        </span>
                      </div>

                      {/* Title & Plot Size */}
                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span className="truncate max-w-[200px]">{item.location}</span>
                          </div>
                          {item.plotSize && (
                            <div className="flex items-center gap-1 text-slate-700 font-semibold border-l border-slate-200 pl-3">
                              <Ruler className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span>{item.plotSize}</span>
                            </div>
                          )}
                        </div>

                        {/* Full Address */}
                        {item.address && (
                          <p className="text-[10px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                            📍 <strong>Address:</strong> {item.address}
                          </p>
                        )}
                      </div>

                      {/* SPECIFICS BOX (RENT VS SALE) */}
                      {item.actionType === 'give_rent' ? (
                        /* Renting Specs */
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                          {item.roomType && (
                            <div className="flex items-center gap-1.5">
                              <BedDouble className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                              <span>{item.roomType}</span>
                            </div>
                          )}
                          {item.foodPolicy && (
                            <div className="flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{item.foodPolicy}</span>
                            </div>
                          )}
                          {item.maintenanceFee && (
                            <div className="text-[10px] text-slate-500">
                              Maint: <strong className="text-slate-800">{item.maintenanceFee}</strong>
                            </div>
                          )}
                          {item.lockInPeriod && (
                            <div className="text-[10px] text-slate-500">
                              Lock-in: <strong className="text-slate-800">{item.lockInPeriod}</strong>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Sale / Buy Specs */
                        <div className="bg-indigo-50/40 border border-indigo-100 p-2.5 rounded-2xl grid grid-cols-2 gap-2 text-[11px] font-medium">
                          {item.pricePerSqFt && (
                            <div className="text-indigo-950 font-bold">
                              Rate: {item.pricePerSqFt}
                            </div>
                          )}
                          {item.possessionStatus && (
                            <div className="text-slate-700">
                              Status: <strong className="text-slate-900">{item.possessionStatus}</strong>
                            </div>
                          )}
                          {item.ownershipType && (
                            <div className="col-span-2 text-[10px] text-slate-500">
                              Ownership: <strong className="text-slate-800">{item.ownershipType}</strong>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Agent / Contact Section */}
                      <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Listing Broker / Partner:</span>
                          <span className="font-semibold text-slate-900">{item.contactName}</span>
                        </div>

                        <div>
                          {isPaidMember ? (
                            <div className="text-right">
                              <span className="text-xs font-bold text-emerald-700 block flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                {item.contactPhone}
                              </span>
                              <span className="text-[9px] text-slate-400">{item.contactEmail}</span>
                            </div>
                          ) : (
                            <div className="text-right">
                              <span className="text-xs font-semibold text-slate-400 block flex items-center gap-1">
                                <Lock className="w-3 h-3 text-amber-500" />
                                +91 98765 *****
                              </span>
                              <span className="text-[9px] text-amber-600 font-medium">Pass Required</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing & Actions Footer */}
                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">
                            {item.actionType === 'give_rent' ? 'Monthly Rent:' : 'Property Price:'}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-slate-900">{item.price}</span>
                            {item.deposit && (
                              <span className="text-[10px] text-slate-500 font-medium">
                                (Dep: {item.deposit})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isPaidMember ? (
                            <>
                              <a
                                href={`tel:${item.contactPhone}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert(`Calling ${item.contactName} at ${item.contactPhone}`);
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                                Call
                              </a>

                              <button
                                onClick={() => alert(`Opening WhatsApp direct chat with ${item.contactName}`)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                                Chat
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={onProceedToPayment}
                              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                            >
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                              Unlock Phone
                            </button>
                          )}
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

              {/* 5. Limit Set */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">
                  5. Price Limit Policy
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
                    <span>🟢 Limit: Negotiable</span>
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
                    <span>🔴 Limit: Non-Negotiable</span>
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

              {/* 7. MULTI-PHOTO GALLERY UPLOAD SECTION */}
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

      {/* Bottom Sticky Pass Unlock Bar */}
      {!isPaidMember && onProceedToPayment && (
        <div className="p-3.5 bg-white border-t border-slate-200/80 shadow-lg flex items-center justify-between gap-3 max-w-lg mx-auto w-full sticky bottom-0 z-40">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Unlock Full Broker Contacts</span>
            <span className="text-[11px] text-slate-500 font-medium">₹399 membership pass for unlimited access</span>
          </div>
          <button
            onClick={onProceedToPayment}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            Unlock ₹399
          </button>
        </div>
      )}
    </div>
  );
};
