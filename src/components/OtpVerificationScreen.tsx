import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { ValorisLogo } from './ValorisLogo';

interface OtpVerificationScreenProps {
  userEmail?: string;
  userPhone?: string;
  onVerified: () => void;
  onBack: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  userEmail = 'rajat@valoris.com',
  userPhone = '+1 (555) 234-5678',
  onVerified,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);
  const [isResending, setIsResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (error) setError(null);
    
    // Only accept single digit or numeric character
    const lastChar = value.slice(-1);
    if (lastChar && !/^\d+$/.test(lastChar)) return;

    const newOtp = [...otp];
    newOtp[index] = lastChar;
    setOtp(newOtp);

    // Auto-advance to next input if digit entered
    if (lastChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
      setError(null);
    }
  };

  const handleQuickFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setError(null);
    inputRefs.current[5]?.focus();
  };

  const handleResendCode = () => {
    setIsResending(true);
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    setError(null);
    setTimeout(() => {
      setIsResending(false);
      inputRefs.current[0]?.focus();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }
    // Success scenario
    onVerified();
  };

  const displayTarget = userPhone || userEmail;

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-3 pb-6 bg-white overflow-y-auto">
      {/* Navigation Top */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <ValorisLogo size="sm" showTagline={false} className="h-6 w-auto" />
        </div>

        {/* Shield Icon Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF7F6] border border-[#00a896]/30 flex items-center justify-center text-[#007a6e] shadow-xs mb-3">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h1 className="text-[21px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Verify OTP Code
          </h1>
          <p className="text-[12.5px] text-gray-500 font-medium px-1 mt-1 leading-snug">
            We sent a 6-digit verification code to
            <br />
            <strong className="text-gray-900 font-semibold">{displayTarget}</strong>
          </p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center gap-1.5 px-0.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-11 h-12 text-center text-lg font-black rounded-xl border transition-all focus:outline-none ${
                  digit
                    ? 'border-[#00a896] bg-[#EBF7F6]/50 text-[#092C3E] ring-2 ring-[#00a896]/20'
                    : 'border-gray-200 bg-gray-50/50 text-gray-900 focus:border-[#00a896] focus:bg-white'
                }`}
              />
            ))}
          </div>

          {/* Quick Auto-Fill helper badge */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100/80 border border-[#00a896]/30 text-[#007a6e] text-[11px] font-bold rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Auto-fill Test OTP (123456)
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Resend Section */}
          <div className="text-center text-xs text-gray-500 pt-1 font-medium">
            {timer > 0 ? (
              <span>
                Resend code in <strong className="text-gray-900">{timer}s</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-[#007a6e] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                Resend OTP Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#092C3E] hover:bg-[#061e2b] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Verify & Continue
          </button>
        </form>
      </div>

      {/* Progress Footer */}
      <div className="w-full pt-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
          <div className="w-2/5 h-full bg-[#00a896] rounded-full transition-all duration-300"></div>
        </div>
        <span className="text-[11px] font-semibold text-gray-400 tracking-wider">
          OTP Verification
        </span>
      </div>
    </div>
  );
};
