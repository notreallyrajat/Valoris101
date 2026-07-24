import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ time = '9:41', dark = true }) => {
  return (
    <div
      className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none ${
        dark ? 'text-gray-900' : 'text-white'
      }`}
    >
      <span className="tracking-tight text-[13px] font-bold pl-1">{time}</span>
      <div className="flex items-center gap-1.5 pr-1">
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="relative flex items-center">
          <Battery className="w-5 h-5 stroke-[2]" />
          <div className="absolute left-[3px] top-[7px] w-[10px] h-[5px] bg-current rounded-[1px]" />
        </div>
      </div>
    </div>
  );
};
