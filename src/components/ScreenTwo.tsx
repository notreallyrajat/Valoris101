import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Handshake,
  TrendingUp,
  Home,
  Users,
  User,
  Check,
} from 'lucide-react';

interface ScreenTwoProps {
  onBack?: () => void;
  onFinish?: (role: string) => void;
  selectedRole?: string;
}

export interface RoleItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ElementType;
}

export const ROLES: RoleItem[] = [
  {
    id: 'customer',
    title: 'Customer',
    icon: Users,
  },
  {
    id: 'landlord',
    title: 'Landlord',
    icon: Home,
  },
  {
    id: 'broker',
    title: 'Broker',
    icon: Handshake,
  },
  {
    id: 'investor',
    title: 'Investor / VC',
    icon: TrendingUp,
  },
  {
    id: 'founder',
    title: 'Founder',
    icon: User,
  },
];

export const ScreenTwo: React.FC<ScreenTwoProps> = ({
  onBack,
  onFinish,
  selectedRole: initialSelectedRole = 'customer',
}) => {
  const [selectedRole, setSelectedRole] = useState<string>(initialSelectedRole);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleNext = () => {
    if (onFinish) {
      onFinish(selectedRole);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-6 bg-white overflow-y-auto">
      {/* Top Header Navigation */}
      <div>
        <div className="flex items-center mb-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Title & Description */}
        <div className="space-y-1 mb-5">
          <h1 className="text-[21px] font-extrabold text-gray-900 leading-tight">
            What best describes you?
          </h1>
          <p className="text-[13px] text-gray-500 font-medium leading-snug">
            We'll personalize your experience based on your role.
          </p>
        </div>

        {/* Role Selection List */}
        <div className="space-y-2.5">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleSelect(role.id)}
                className={`w-full p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#EBF7F6] stroke-teal-700 border-[#00a896] shadow-sm ring-1 ring-[#00a896]/30'
                    : 'bg-white border-gray-100 hover:border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#00a896]/15 text-[#007a6e]'
                        : 'bg-gray-50 text-gray-600 border border-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3 className="text-[13.5px] font-bold text-gray-900 leading-tight">
                      {role.title}
                    </h3>
                  </div>
                </div>

                {/* Radio Check Circle */}
                <div className="flex-shrink-0 ml-1">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#00a896] flex items-center justify-center text-white shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="pt-4 mt-2">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-gray-100 hover:bg-[#00a896] hover:text-white text-gray-700 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] group"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
