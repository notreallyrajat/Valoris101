import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  CreditCard,
  Smartphone,
  Mail,
  MessageSquare,
  Sparkles,
  Check,
  Building,
} from 'lucide-react';

interface PaymentPortalProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
  userEmail?: string;
  userPhone?: string;
  roleTitle?: string;
}

export const PaymentPortalScreen: React.FC<PaymentPortalProps> = ({
  onBack,
  onPaymentSuccess,
  userEmail = 'rajat@valoris.com',
  userPhone = '+1 (555) 234-5678',
  roleTitle = 'Broker',
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'qr'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-5 pt-3 pb-5 bg-white overflow-y-auto">
      <div>
        {/* Top Header Nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#1A3FAA] bg-gradient-to-r from-[#1A3FAA]/10 to-[#0097A7]/10 px-2.5 py-1 rounded-full border border-[#1A3FAA]/20">
            <Lock className="w-3 h-3 text-[#1A3FAA]" />
            256-Bit SSL Secure
          </div>
        </div>

        {/* Title */}
        <div className="space-y-0.5 mb-3 text-left">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Valoris Pass Checkout
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            One-time verification & membership setup fee
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-[#F8FAFC] border border-gray-200/80 p-3.5 rounded-2xl text-left space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200">
            <div>
              <span className="font-bold text-gray-900 block">
                {roleTitle} Membership Pass
              </span>
              <span className="text-[10px] text-gray-500 font-medium">
                Lifetime Platform Access & Direct Matchmaking
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-[#1A3FAA]">₹ 399</span>
              <span className="text-[9px] text-[#3CB043] font-bold block">
                All Inclusive
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
            <span>Account Email & Phone:</span>
            <span className="font-semibold text-gray-800 truncate max-w-[170px]">
              {userEmail} • {userPhone}
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2 text-left">
          <label className="block text-xs font-bold text-gray-800 ml-0.5">
            Select Payment Method
          </label>

          <div className="space-y-2">
            {/* UPI / GPay / PhonePe */}
            <div
              onClick={() => setMethod('upi')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                method === 'upi'
                  ? 'bg-gradient-to-r from-[#1A3FAA]/10 to-[#0097A7]/10 border-[#1A3FAA] ring-1 ring-[#1A3FAA]/30'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">
                    UPI / GPay / PhonePe / Paytm
                  </h4>
                  <p className="text-[10px] text-gray-500">Instant approval via UPI app</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === 'upi' ? 'border-[#1A3FAA] bg-[#1A3FAA] text-white' : 'border-gray-300'
                }`}
              >
                {method === 'upi' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>

            {/* QR Code */}
            <div
              onClick={() => setMethod('qr')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                method === 'qr'
                  ? 'bg-gradient-to-r from-[#1A3FAA]/10 to-[#0097A7]/10 border-[#1A3FAA] ring-1 ring-[#1A3FAA]/30'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Scan QR Code</h4>
                  <p className="text-[10px] text-gray-500">Scan with any banking app</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === 'qr' ? 'border-[#1A3FAA] bg-[#1A3FAA] text-white' : 'border-gray-300'
                }`}
              >
                {method === 'qr' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>

            {/* Cards / Netbanking */}
            <div
              onClick={() => setMethod('card')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                method === 'card'
                  ? 'bg-gradient-to-r from-[#1A3FAA]/10 to-[#0097A7]/10 border-[#1A3FAA] ring-1 ring-[#1A3FAA]/30'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Credit / Debit Card</h4>
                  <p className="text-[10px] text-gray-500">Visa, Mastercard, RuPay</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === 'card' ? 'border-[#1A3FAA] bg-[#1A3FAA] text-white' : 'border-gray-300'
                }`}
              >
                {method === 'card' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Badge */}
        <div className="mt-4 flex items-center gap-2 justify-center text-[11px] text-gray-500 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#3CB043]" />
          <span>Money-back guarantee & Instant setup notification</span>
        </div>
      </div>

      {/* Pay CTA */}
      <button
        onClick={handlePay}
        disabled={isProcessing}
        className="w-full py-3.5 mt-4 btn-brand active:scale-[0.99] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </span>
        ) : (
          <span>Pay ₹399 to Continue</span>
        )}
      </button>
    </div>
  );
};

interface PaymentSuccessProps {
  userEmail?: string;
  userPhone?: string;
  roleTitle?: string;
  onExploreDashboard: () => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessProps> = ({
  userEmail = 'rajat@valoris.com',
  userPhone = '+1 (555) 234-5678',
  roleTitle = 'Broker',
  onExploreDashboard,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-6 pb-6 bg-white text-center overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 my-auto">
        
        {/* Success Icon Badge with Pulse */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#1A3FAA] flex items-center justify-center shadow-lg animate-pulse">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5] text-emerald-600" />
          </div>
          <div className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 p-1.5 rounded-full shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Your Setup is Complete!
          </h2>
          <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full inline-block border border-emerald-200">
            Payment of ₹399 Received
          </p>
        </div>

        {/* Confirmation Notice Card (Requested Message) */}
        <div className="w-full bg-[#F8FAFC] border border-gray-200/80 p-4 rounded-2xl text-left space-y-3 shadow-2xs">
          <p className="text-xs text-gray-700 font-medium leading-relaxed">
            You will receive a <strong>confirmation email</strong> and a <strong>text message</strong> shortly with your account activation code, receipt, and platform guide.
          </p>

          <div className="space-y-1.5 pt-2 border-t border-gray-200/80 text-[11px]">
            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <Mail className="w-3.5 h-3.5 text-[#1A3FAA]" /> Email Sent To:
              </span>
              <span className="font-bold text-gray-900 truncate max-w-[140px]">{userEmail}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <MessageSquare className="w-3.5 h-3.5 text-[#1A3FAA]" /> SMS Sent To:
              </span>
              <span className="font-bold text-gray-900">{userPhone}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span className="flex items-center gap-1.5 font-semibold">
                <Building className="w-3.5 h-3.5 text-[#1A3FAA]" /> Assigned Role:
              </span>
              <span className="font-bold text-[#1A3FAA]">{roleTitle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Dashboard CTA */}
      <button
        onClick={onExploreDashboard}
        className="w-full py-3.5 btn-brand active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
      >
        Explore Dashboard
      </button>
    </div>
  );
};
