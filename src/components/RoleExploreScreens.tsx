import React from 'react';
import {
  Building2,
  TrendingUp,
  KeyRound,
  Home,
  UserCheck,
  Search,
  Filter,
  Lock,
  ArrowRight,
  Star,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface RoleExploreScreenProps {
  roleId: string;
  onProceedToPayment: () => void;
}

export const RoleExploreScreen: React.FC<RoleExploreScreenProps> = ({
  roleId,
  onProceedToPayment,
}) => {
  const getExploreContent = () => {
    switch (roleId) {
      case 'broker':
        return {
          title: 'Broker Hub & Mandates',
          subtitle: 'Exclusive property listings & co-broker opportunities in your areas',
          badge: 'Broker Network',
          icon: Building2,
          cards: [
            {
              id: 1,
              title: '3 BHK Luxury Apartment in BKC',
              tag: 'Exclusive Mandate',
              price: '₹ 4.2 Cr',
              location: 'BKC, Mumbai',
              commission: '2.5% Split Commission',
              rating: '4.9',
            },
            {
              id: 2,
              title: 'Commercial Office Space - 5,000 sq ft',
              tag: 'Verified Listing',
              price: '₹ 1.8 L / mo',
              location: 'Bandra West, Mumbai',
              commission: '1 Month Brokerage',
              rating: '4.8',
            },
          ],
        };
      case 'investor':
        return {
          title: 'Investor Deal Flow',
          subtitle: 'Vetted real estate deals & high-growth PropTech startups',
          badge: 'Deal Flow',
          icon: TrendingUp,
          cards: [
            {
              id: 1,
              title: 'Valoris PropTech Series A Round',
              tag: 'Pre-vetted Deal',
              price: 'Target: ₹ 5 Cr',
              location: 'Bangalore / Mumbai',
              commission: '2.4x Target MOIC',
              rating: '5.0',
            },
            {
              id: 2,
              title: 'Prime Commercial Land Parcel - 12 Acres',
              tag: 'Co-Investment',
              price: '₹ 18.5 Cr Pool',
              location: 'ORR, Bangalore',
              commission: '14.5% Projected IRR',
              rating: '4.9',
            },
          ],
        };
      case 'tenant':
        return {
          title: 'Tenant Matches Feed',
          subtitle: 'Direct landlord properties matched to your budget & locality',
          badge: 'Property Matches',
          icon: KeyRound,
          cards: [
            {
              id: 1,
              title: 'Fully Furnished 2 BHK Apartment',
              tag: 'Zero Brokerage',
              price: '₹ 42,000 / mo',
              location: 'Koramangala 4th Block',
              commission: 'Immediate Move-in',
              rating: '4.9',
            },
            {
              id: 2,
              title: 'Independent Gated Builder Floor',
              tag: 'Verified Owner',
              price: '₹ 55,000 / mo',
              location: 'Indiranagar 100ft Rd',
              commission: 'Available in 15 days',
              rating: '4.8',
            },
          ],
        };
      case 'landlord':
        return {
          title: 'Tenant Enquiries & Leads',
          subtitle: 'Verified high-intent corporate & residential tenant matches',
          badge: 'Tenant Leads',
          icon: Home,
          cards: [
            {
              id: 1,
              title: 'Corporate MNC Lease Enquiry (30 Seats)',
              tag: 'Verified Tenant',
              price: 'Budget: ₹ 2.5 L / mo',
              location: 'Desired: Cyber City / BKC',
              commission: 'Long Term 3 Yrs',
              rating: '5.0',
            },
            {
              id: 2,
              title: 'Executive Family Seeking 3 BHK',
              tag: 'Pre-Screened Tenant',
              price: 'Budget: ₹ 85,000 / mo',
              location: 'Desired: Bandra / Worli',
              commission: 'Immediate Move-in',
              rating: '4.9',
            },
          ],
        };
      default:
        return {
          title: 'Founder Network & Talent Pool',
          subtitle: 'Connect with strategic investors, mentors, and partners',
          badge: 'Founder Hub',
          icon: UserCheck,
          cards: [
            {
              id: 1,
              title: 'Angel Syndicate PropTech Pool',
              tag: 'Strategic Capital',
              price: 'Cheque Size: ₹ 25L - ₹ 1Cr',
              location: 'Pan-India',
              commission: 'Mentorship Included',
              rating: '5.0',
            },
          ],
        };
    }
  };

  const content = getExploreContent();
  const Icon = content.icon;

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-5 bg-[#F8FAFC] overflow-y-auto">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1F4E5C] text-white flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#1F4E5C] tracking-tight">
              {content.badge}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            Role Activated
          </span>
        </div>

        {/* Title */}
        <div className="space-y-0.5 mb-3 text-left">
          <h2 className="text-lg font-black text-gray-900 leading-tight">
            {content.title}
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search listings, locations..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1F4E5C] text-gray-800 placeholder-gray-400 font-medium shadow-2xs"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-[#1F4E5C] cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Feed List */}
        <div className="space-y-2.5">
          {content.cards.map((card) => (
            <div
              key={card.id}
              className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-left space-y-2 relative group hover:border-[#1F4E5C]/40 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-[#1F4E5C] bg-[#EAF3F6] px-2 py-0.5 rounded-md">
                  {card.tag}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                  {card.rating}
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-900 leading-tight">
                {card.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{card.location}</span>
                </div>
                <span className="font-extrabold text-gray-900">{card.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lock Membership Banner */}
        <div className="mt-4 p-3.5 bg-gradient-to-br from-[#1F4E5C] to-[#092C3E] text-white rounded-2xl shadow-md text-left relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-extrabold tracking-wide">
                Membership Pass Required
              </span>
            </div>
            <Sparkles className="w-4 h-4 text-[#4ade80]" />
          </div>

          <p className="text-[11px] text-gray-200 leading-snug">
            To view full deal contacts, direct messaging & start matching, complete your platform subscription.
          </p>
        </div>
      </div>

      {/* Bottom CTA to Payment */}
      <button
        onClick={onProceedToPayment}
        className="w-full py-3.5 mt-3 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>Unlock Full Access — Pay ₹399</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
