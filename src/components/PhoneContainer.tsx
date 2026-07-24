import React from 'react';
import { StatusBar } from './StatusBar';

interface PhoneContainerProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  active?: boolean;
}

export const PhoneContainer: React.FC<PhoneContainerProps> = ({
  children,
  title,
  badge,
  active = true,
}) => {
  return (
    <div className="flex flex-col items-center">
      {title && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-200/70 px-3 py-1 rounded-full border border-gray-300/50">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#008075] bg-[#EBF7F6] px-2.5 py-1 rounded-full border border-[#00a896]/30">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* iPhone 15 Pro Device Frame */}
      <div
        className={`relative w-[340px] h-[690px] sm:w-[365px] sm:h-[730px] rounded-[52px] bg-black p-[11px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.08),inset_0_0_0_2px_rgba(255,255,255,0.2)] transition-all duration-300 select-none ${
          active ? 'ring-2 ring-emerald-500/20 shadow-2xl' : 'opacity-95'
        }`}
      >
        {/* Outer Metallic Edge & Side Buttons */}
        {/* Volume Up */}
        <div className="absolute -left-[14px] top-[115px] w-[3px] h-[34px] bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-md shadow-sm" />
        {/* Volume Down */}
        <div className="absolute -left-[14px] top-[160px] w-[3px] h-[34px] bg-gradient-to-r from-gray-400 to-gray-600 rounded-l-md shadow-sm" />
        {/* Power Button */}
        <div className="absolute -right-[14px] top-[135px] w-[3px] h-[55px] bg-gradient-to-l from-gray-400 to-gray-600 rounded-r-md shadow-sm" />

        {/* Inner Phone Screen Chassis */}
        <div className="relative w-full h-full rounded-[42px] bg-white overflow-hidden flex flex-col justify-between border border-gray-200">
          
          {/* Dynamic Island / Camera Pill */}
          <div className="absolute top-[9px] left-1/2 -translate-x-1/2 w-[92px] h-[25px] bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#080d1a] border border-[#1e293b]" />
            <div className="w-2 h-2 rounded-full bg-[#052e16] border border-[#065f46]" />
          </div>

          {/* Status Bar */}
          <div className="z-40 relative pt-1 bg-white">
            <StatusBar />
          </div>

          {/* Dynamic Screen Content */}
          <div className="flex-1 relative overflow-hidden bg-white">
            {children}
          </div>

          {/* Bottom Home Bar Indicator */}
          <div className="w-full pt-1 pb-2 flex justify-center bg-white z-40">
            <div className="w-[125px] h-[4px] bg-gray-900 rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
