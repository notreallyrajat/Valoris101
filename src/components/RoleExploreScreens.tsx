import React from 'react';
import { BrokerDashboard } from './BrokerDashboard';
import { CustomerDashboard } from './CustomerDashboard';
import {
  Coffee,
  Sparkles,
  Armchair,
  Clock,
  Briefcase,
  Compass,
} from 'lucide-react';

interface RoleExploreScreenProps {
  roleId: string;
  onProceedToPayment: () => void;
  isPaidMember?: boolean;
}

export const ComingSoonScreen: React.FC<{ roleTitle: string; onSwitchToBroker?: () => void }> = ({
  roleTitle,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#0F2860] via-slate-900 to-[#0A1931] text-white overflow-y-auto animate-fadeIn text-center relative">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#1A3FAA]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#0097A7]/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold text-slate-200 tracking-wide uppercase">
            {roleTitle} Portal
          </span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-[#0097A7]/25 border border-[#0097A7]/40 px-2.5 py-0.5 rounded-full shadow-xs">
          Coming Soon
        </span>
      </div>

      {/* Center Hero Content & Illustration */}
      <div className="my-auto py-6 space-y-6 z-10 flex flex-col items-center">
        
        {/* Custom High-Fidelity SVG Lounge & Coffee Illustration */}
        <div className="relative group">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#0F2860] via-[#1A3FAA] to-[#0097A7] p-0.5 shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/20">
            <div className="w-full h-full bg-slate-900/90 rounded-[22px] flex flex-col items-center justify-center p-3 relative">
              <Armchair className="w-12 h-12 text-cyan-300 stroke-[1.5] drop-shadow-md" />
              <div className="absolute top-3 right-3 bg-amber-400/20 p-1.5 rounded-full border border-amber-400/40">
                <Coffee className="w-4 h-4 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Floating Sparkles & Pulse Rings */}
          <div className="absolute -top-2 -right-2 bg-[#3CB043] text-white p-1.5 rounded-full shadow-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 bg-[#1A3FAA] text-white p-1.5 rounded-full shadow-md">
            <Compass className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Messaging Box */}
        <div className="space-y-2.5 max-w-xs mx-auto">
          <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
            Coming Soon!
          </h2>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-xs font-bold text-teal-200 leading-relaxed">
              We are working hard to bring you this service, please take a seat ☕✨
            </p>
          </div>
          <p className="text-[11.5px] text-slate-400 font-medium leading-relaxed pt-1">
            Our specialized <span className="text-slate-200 font-bold">{roleTitle}</span> dashboard & match algorithm is currently undergoing private beta testing.
          </p>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="space-y-3 z-10 w-full max-w-xs mx-auto">
        <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-[11px] text-slate-400 font-medium flex items-center justify-center gap-2">
          <Briefcase className="w-4 h-4 text-teal-400" />
          <span>Active Service: Broker Dashboard is fully available</span>
        </div>
      </div>
    </div>
  );
};

export const RoleExploreScreen: React.FC<RoleExploreScreenProps> = ({
  roleId,
  onProceedToPayment,
  isPaidMember = false,
}) => {
  if (roleId === 'broker' || roleId === 'landlord') {
    return <BrokerDashboard onProceedToPayment={onProceedToPayment} isPaidMember={isPaidMember} />;
  }

  if (roleId === 'customer') {
    return <CustomerDashboard onProceedToPayment={onProceedToPayment} isPaidMember={isPaidMember} />;
  }

  if (roleId === 'investor') {
    return <ComingSoonScreen roleTitle="Investor / VC" />;
  }

  if (roleId === 'founder') {
    return <ComingSoonScreen roleTitle="Founder" />;
  }

  return <BrokerDashboard onProceedToPayment={onProceedToPayment} isPaidMember={isPaidMember} />;
};
