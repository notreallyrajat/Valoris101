import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  ShieldCheck,
  Plus,
  X,
  Building,
  Home,
  MapPin,
  Share2,
} from 'lucide-react';

interface RoleProfileScreenProps {
  roleId: string;
  onBack: () => void;
  onComplete: (data: any) => void;
}

/* Common Profile Photo Component */
const ProfilePhotoUpload = ({ label = 'Upload Photo' }: { label?: string }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-3">
      <label className="relative cursor-pointer group">
        <div className="w-20 h-20 rounded-full bg-[#EAF3F6] border-2 border-[#1F4E5C]/20 flex items-center justify-center overflow-hidden shadow-xs group-hover:border-[#1F4E5C] transition-all">
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-[#1F4E5C] font-bold text-xl">VS</div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#1F4E5C] text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <Camera className="w-3.5 h-3.5" />
        </div>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
      <span className="text-[11px] font-semibold text-gray-500 mt-1.5">{label}</span>
    </div>
  );
};

/* Multi-Tag Input Component */
const MultiTagInput = ({
  placeholder,
  tags,
  onAddTag,
  onRemoveTag,
}: {
  placeholder: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) {
        onAddTag(input.trim());
        setInput('');
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF3F6] text-[#1F4E5C] border border-[#1F4E5C]/15"
          >
            <MapPin className="w-3 h-3 text-[#1F4E5C]" />
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(idx)}
              className="hover:text-red-500 ml-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F4E5C]/30 focus:border-[#1F4E5C] text-gray-800 placeholder-gray-400 font-medium"
        />
        <button
          type="button"
          onClick={() => {
            if (input.trim()) {
              onAddTag(input.trim());
              setInput('');
            }
          }}
          className="px-3 py-2.5 bg-[#EAF3F6] text-[#1F4E5C] font-bold text-xs rounded-xl hover:bg-[#1F4E5C] hover:text-white transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* Stepper Input */
const StepperInput = ({
  value,
  onChange,
  min = 1,
  max = 50,
}: {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-1.5 px-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 cursor-pointer shadow-2xs"
      >
        -
      </button>
      <span className="text-sm font-extrabold text-gray-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 cursor-pointer shadow-2xs"
      >
        +
      </button>
    </div>
  );
};

/* 1. BROKER PROFILE SETUP */
const BrokerProfileSetup: React.FC<{ onBack: () => void; onComplete: (d: any) => void }> = ({
  onBack,
  onComplete,
}) => {
  const [firmName, setFirmName] = useState('Valoris Realty Advisors');
  const [reraNum, setReraNum] = useState('PRM/KA/RERA/1251/310/PR/210');
  const [experience, setExperience] = useState(5);
  const [localities, setLocalities] = useState<string[]>(['Bandra West', 'BKC', 'Worli']);
  const [propertyTypes, setPropertyTypes] = useState<string[]>(['Residential', 'Commercial']);

  const togglePropertyType = (type: string) => {
    if (propertyTypes.includes(type)) {
      setPropertyTypes(propertyTypes.filter((t) => t !== type));
    } else {
      setPropertyTypes([...propertyTypes, type]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      <div>
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold tracking-wider text-[#1F4E5C] bg-[#EAF3F6] px-2.5 py-1 rounded-full">
            Broker Profile Setup
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-0.5 mb-3">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Broker Profile Setup
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Tell us about your brokerage practice
          </p>
        </div>

        {/* Profile Photo */}
        <ProfilePhotoUpload label="Broker Photo / Logo" />

        {/* Form Fields */}
        <div className="space-y-3 pt-1">
          {/* Brokerage Firm Name */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Brokerage Firm Name
            </label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="e.g. Apex Realty"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F4E5C]/30 focus:border-[#1F4E5C] text-gray-800 font-semibold"
            />
          </div>

          {/* RERA Reg Number */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              RERA Registration Number
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={reraNum}
                onChange={(e) => setReraNum(e.target.value)}
                placeholder="RERA Number"
                className="w-full px-3.5 py-2.5 pr-9 text-xs bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F4E5C]/30 focus:border-[#1F4E5C] text-gray-800 font-semibold uppercase tracking-wider"
              />
              <ShieldCheck className="absolute right-3 w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Years of Experience */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Years of Experience
            </label>
            <StepperInput value={experience} onChange={setExperience} min={1} max={40} />
          </div>

          {/* Property Types Pill Group */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Property Types You Deal In
            </label>
            <div className="flex gap-2">
              {['Residential', 'Commercial', 'Industrial'].map((type) => {
                const selected = propertyTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => togglePropertyType(type)}
                    className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Areas / Localities */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Areas / Localities You Operate In
            </label>
            <MultiTagInput
              placeholder="Add area & press Enter..."
              tags={localities}
              onAddTag={(tag) => setLocalities([...localities, tag])}
              onRemoveTag={(idx) => setLocalities(localities.filter((_, i) => i !== idx))}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ firmName, reraNum, experience, localities, propertyTypes })}
        className="w-full py-3.5 mt-4 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Complete Profile
      </button>
    </div>
  );
};

/* 2. INVESTOR / VC PROFILE SETUP */
const InvestorProfileSetup: React.FC<{ onBack: () => void; onComplete: (d: any) => void }> = ({
  onBack,
  onComplete,
}) => {
  const [investorType, setInvestorType] = useState<'firm' | 'individual'>('firm');
  const [firmName, setFirmName] = useState('Valoris Ventures');
  const [focus, setFocus] = useState<'Real Estate' | 'Startups' | 'Both'>('Both');
  const [ticketSize, setTicketSize] = useState(50); // ₹ lakhs
  const [sectors, setSectors] = useState<string[]>(['FinTech', 'PropTech']);
  const [linkedin, setLinkedin] = useState('linkedin.com/in/investor-valoris');

  const toggleSector = (sec: string) => {
    if (sectors.includes(sec)) setSectors(sectors.filter((s) => s !== sec));
    else setSectors([...sectors, sec]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold tracking-wider text-[#1F4E5C] bg-[#EAF3F6] px-2.5 py-1 rounded-full">
            Investor Profile Setup
          </span>
        </div>

        <div className="space-y-0.5 mb-2">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Investor Profile Setup
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Help founders and partners understand your focus
          </p>
        </div>

        <ProfilePhotoUpload label="Investor Photo / Logo" />

        <div className="space-y-3 pt-1 text-left">
          {/* Investor Type Segmented Toggle */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setInvestorType('firm')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                investorType === 'firm'
                  ? 'bg-white text-[#1F4E5C] shadow-xs'
                  : 'text-gray-500'
              }`}
            >
              VC Firm
            </button>
            <button
              type="button"
              onClick={() => setInvestorType('individual')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                investorType === 'individual'
                  ? 'bg-white text-[#1F4E5C] shadow-xs'
                  : 'text-gray-500'
              }`}
            >
              Individual Angel
            </button>
          </div>

          {investorType === 'firm' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-800 ml-0.5">
                Firm Name
              </label>
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4E5C]/30 text-gray-800 font-semibold"
              />
            </div>
          )}

          {/* Investment Focus */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Investment Focus
            </label>
            <div className="flex gap-2">
              {(['Real Estate', 'Startups', 'Both'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFocus(opt)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    focus === opt
                      ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Size Slider */}
          <div className="space-y-1 bg-gray-50/80 p-3 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800">Target Ticket Size</span>
              <span className="font-extrabold text-[#1F4E5C]">
                ₹ {ticketSize >= 100 ? `${(ticketSize / 100).toFixed(1)} Cr` : `${ticketSize} Lakhs`}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={ticketSize}
              onChange={(e) => setTicketSize(Number(e.target.value))}
              className="w-full accent-[#1F4E5C] cursor-pointer"
            />
          </div>

          {/* Preferred Sectors */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Preferred Sectors
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['FinTech', 'PropTech', 'EdTech', 'HealthTech', 'CleanTech', 'SaaS'].map((sec) => {
                const isSelected = sectors.includes(sec);
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => toggleSector(sec)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1F4E5C] text-white border-[#1F4E5C]'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {sec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              LinkedIn Profile
            </label>
            <div className="relative flex items-center">
              <Share2 className="absolute left-3 w-4 h-4 text-blue-600" />
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4E5C]/30 text-gray-800 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ investorType, firmName, focus, ticketSize, sectors, linkedin })}
        className="w-full py-3.5 mt-4 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Complete Profile
      </button>
    </div>
  );
};

/* 3. TENANT PROFILE SETUP */
const TenantProfileSetup: React.FC<{ onBack: () => void; onComplete: (d: any) => void }> = ({
  onBack,
  onComplete,
}) => {
  const [lookingFor, setLookingFor] = useState<'Residential' | 'Commercial'>('Residential');
  const [budget, setBudget] = useState(45); // ₹ thousands
  const [localities, setLocalities] = useState<string[]>(['Koramangala', 'Indiranagar']);
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [occupants, setOccupants] = useState(2);

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold tracking-wider text-[#1F4E5C] bg-[#EAF3F6] px-2.5 py-1 rounded-full">
            Tenant Setup
          </span>
        </div>

        <div className="space-y-0.5 mb-3">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Tenant Profile Setup
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Let landlords and brokers find the right match for you
          </p>
        </div>

        <div className="space-y-3.5 pt-1 text-left">
          {/* Segmented Toggle: Residential vs Commercial */}
          <div className="flex p-1 bg-gray-100 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setLookingFor('Residential')}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                lookingFor === 'Residential'
                  ? 'bg-[#1F4E5C] text-white shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Residential
            </button>
            <button
              type="button"
              onClick={() => setLookingFor('Commercial')}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                lookingFor === 'Commercial'
                  ? 'bg-[#1F4E5C] text-white shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Commercial
            </button>
          </div>

          {/* Budget Range */}
          <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800">Monthly Budget</span>
              <span className="font-extrabold text-[#1F4E5C]">₹ {budget},000 / month</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#1F4E5C] cursor-pointer"
            />
          </div>

          {/* Preferred Localities */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Preferred Localities
            </label>
            <MultiTagInput
              placeholder="Add locality..."
              tags={localities}
              onAddTag={(tag) => setLocalities([...localities, tag])}
              onRemoveTag={(idx) => setLocalities(localities.filter((_, i) => i !== idx))}
            />
          </div>

          {/* Move-in Timeline Horizontal Selector */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Move-in Timeline
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {['Immediately', 'Within 1 Month', '1–3 Months', '3–6 Months'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap border cursor-pointer transition-all ${
                    timeline === t
                      ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Family / Team Size Stepper */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              {lookingFor === 'Residential' ? 'Family / Occupants Size' : 'Team Size'}
            </label>
            <StepperInput value={occupants} onChange={setOccupants} min={1} max={500} />
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ lookingFor, budget, localities, timeline, occupants })}
        className="w-full py-3.5 mt-4 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Find Properties
      </button>
    </div>
  );
};

/* 4. LANDLORD PROFILE SETUP */
const LandlordProfileSetup: React.FC<{ onBack: () => void; onComplete: (d: any) => void }> = ({
  onBack,
  onComplete,
}) => {
  const [numProperties, setNumProperties] = useState(3);
  const [types, setTypes] = useState<string[]>(['Residential', 'Commercial']);
  const [portfolioVal, setPortfolioVal] = useState(2.5); // Cr
  const [leaseTerm, setLeaseTerm] = useState('Long Term (1yr+)');

  const toggleType = (t: string) => {
    if (types.includes(t)) setTypes(types.filter((x) => x !== t));
    else setTypes([...types, t]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold tracking-wider text-[#1F4E5C] bg-[#EAF3F6] px-2.5 py-1 rounded-full">
            Landlord Setup
          </span>
        </div>

        <div className="space-y-0.5 mb-2">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Landlord Profile Setup
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Tell us about your property portfolio
          </p>
        </div>

        <ProfilePhotoUpload label="Landlord Photo" />

        <div className="space-y-3.5 pt-1 text-left">
          {/* Number of Properties Stepper */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Number of Properties Owned
            </label>
            <StepperInput value={numProperties} onChange={setNumProperties} min={1} max={100} />
          </div>

          {/* Property Types Pill Grid */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Property Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Residential', 'Commercial', 'Industrial', 'Warehouse'].map((t) => {
                const selected = types.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleType(t)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#EAF3F6] border-[#1F4E5C] text-[#1F4E5C]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Value Range */}
          <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800">Portfolio Value Range</span>
              <span className="font-extrabold text-[#1F4E5C]">₹ {portfolioVal} Cr+</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={portfolioVal}
              onChange={(e) => setPortfolioVal(Number(e.target.value))}
              className="w-full accent-[#1F4E5C] cursor-pointer"
            />
          </div>

          {/* Preferred Lease Term */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Preferred Lease Term
            </label>
            <div className="flex gap-2">
              {['Long Term (1yr+)', 'Short Term', 'Flexible'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLeaseTerm(term)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    leaseTerm === term
                      ? 'bg-[#1F4E5C] text-white border-[#1F4E5C]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ numProperties, types, portfolioVal, leaseTerm })}
        className="w-full py-3.5 mt-4 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Complete Profile
      </button>
    </div>
  );
};

/* 5. FOUNDER PROFILE SETUP */
const FounderProfileSetup: React.FC<{ onBack: () => void; onComplete: (d: any) => void }> = ({
  onBack,
  onComplete,
}) => {
  const [startupName, setStartupName] = useState('Valoris SaaS');
  const [stage, setStage] = useState('Seed');
  const [funding, setFunding] = useState('$500K');

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-bold tracking-wider text-[#1F4E5C] bg-[#EAF3F6] px-2.5 py-1 rounded-full">
            Founder Setup
          </span>
        </div>

        <div className="space-y-0.5 mb-2">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Founder Profile Setup
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Connect with investors, partners, and key talent
          </p>
        </div>

        <ProfilePhotoUpload label="Startup Logo / Founder Photo" />

        <div className="space-y-3 pt-1 text-left">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">Startup Name</label>
            <input
              type="text"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4E5C]/30 text-gray-800 font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">Stage</label>
            <div className="flex gap-2">
              {['Idea', 'Pre-Seed', 'Seed', 'Series A+'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    stage === s
                      ? 'bg-[#1F4E5C] text-white border-[#1F4E5C]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">Target / Raised Funding</label>
            <input
              type="text"
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4E5C]/30 text-gray-800 font-semibold"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete({ startupName, stage, funding })}
        className="w-full py-3.5 mt-4 bg-[#1F4E5C] hover:bg-[#163842] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Complete Profile
      </button>
    </div>
  );
};

/* MASTER ROUTING COMPONENT FOR ROLE SETUP */
export const RoleProfileScreen: React.FC<RoleProfileScreenProps> = ({
  roleId,
  onBack,
  onComplete,
}) => {
  switch (roleId) {
    case 'broker':
      return <BrokerProfileSetup onBack={onBack} onComplete={onComplete} />;
    case 'investor':
      return <InvestorProfileSetup onBack={onBack} onComplete={onComplete} />;
    case 'tenant':
      return <TenantProfileSetup onBack={onBack} onComplete={onComplete} />;
    case 'landlord':
      return <LandlordProfileSetup onBack={onBack} onComplete={onComplete} />;
    case 'founder':
      return <FounderProfileSetup onBack={onBack} onComplete={onComplete} />;
    default:
      return <BrokerProfileSetup onBack={onBack} onComplete={onComplete} />;
  }
};
