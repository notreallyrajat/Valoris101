import { useState } from 'react';
import { ValorisLogo } from './ValorisLogo';

interface ScreenOneProps {
  onNext?: (data: { fullName: string; email: string; phone: string }) => void;
  initialData?: { fullName: string; email: string; phone: string };
}

export const ScreenOne: React.FC<ScreenOneProps> = ({ onNext, initialData }) => {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext({ fullName, email, phone });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-4 pb-6 bg-white overflow-y-auto">
      {/* Top Header Logo Area */}
      <div className="flex flex-col items-center pt-2 pb-2">
        <ValorisLogo size="md" showTagline={true} className="w-full max-w-[280px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center my-2 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">
            Join the Network
          </h1>
          <p className="text-[13px] text-gray-500 font-medium px-2 leading-snug">
            Connect with professionals across every industry
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Full Name */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/40 focus:border-[#00A896] transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/40 focus:border-[#00A896] transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/40 focus:border-[#00A896] transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#092C3E] hover:bg-[#061e2b] active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Account Link */}
        <div className="text-center text-xs text-gray-500 pt-1 font-medium">
          Already have an account?{' '}
          <button className="text-gray-900 font-bold hover:underline cursor-pointer">
            Sign In
          </button>
        </div>
      </div>

      {/* Progress Footer */}
      <div className="w-full pt-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
          <div className="w-1/4 h-full bg-[#092C3E] rounded-full transition-all duration-300"></div>
        </div>
        <span className="text-[11px] font-semibold text-gray-400 tracking-wider">
          Step 1: Account Details
        </span>
      </div>
    </div>
  );
};
